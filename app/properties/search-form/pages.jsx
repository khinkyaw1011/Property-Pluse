import PropertyCard from '@/components/PropertyCard';
import PropertySearchForm from '@/components/PropertySearchForm';
import connectDB from '@/config/database';
import Property from '@/models/property';
import { convertToSerializeObject } from '@/utils/convertToObject';
import { FaArrowAltCircleLeft } from 'react-icons/fa';

const SearchResultsPage = async ({ searchParams: { location, propertyType } }) => {
  await connectDB();

  // Create case-insensitive regex for location
  const locationPattern = new RegExp(location, 'i');

  // Match location search query against multiple fields in MongoDB
  let query = {
    $or: [
      { name: locationPattern },
      { description: locationPattern },
      { 'location.street': locationPattern },
      { 'location.city': locationPattern },
      { 'location.state': locationPattern },
      { 'location.zipcode': locationPattern },
    ],
  };

  // Only filter by property type if it is provided and not set to 'All'
  if (propertyType && propertyType !== 'All') {
    const typePattern = new RegExp(propertyType, 'i');
    query.type = typePattern;
  }

  // Execute database query with lean() for lightweight JavaScript objects
  const propertiesQueryResults = await Property.find(query).lean();
  const properties = convertToSerializeObject(propertiesQueryResults);
   console.log(properties);

  return (
    <>
      <section className='bg-blue-700 py-4'>
         <div className="max-w-7xl mx-auto px-4 flex-col items-start sm:px-6 ">
            <PropertySearchForm/>
            <section className='px-4 py-6'>
                <div className="container-xl lg:container m-auto px-4 py-6">
                    <Link href='/properties' className='flex items-center text-blue-500 hover:underline mb-3 '>
                    <FaArrowAltCircleLeft className='mr-2 mb-1'/></Link>
                    <h1 className='text-2xl mb-4'>Search Results</h1>
                    {
                        properties.length === 0 ? (<p>No Search Result</p>): (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {
                                    properties.map((property)=>(
                                        <PropertyCard key={property._id} property={property}/>                                     
                                      
                                    ))
                                }
                            </div>
                        )
                    }
                </div>

            </section>
         </div>
      </section>
    </>
  );
};

export default SearchResultsPage;