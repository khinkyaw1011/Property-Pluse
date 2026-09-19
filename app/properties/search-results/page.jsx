import PropertyCard from '@/components/PropertyCard';
import Link from 'next/link';
import { FaArrowAltCircleLeft } from 'react-icons/fa';
import connectDB from '@/config/database';
import Property from '@/models/property';
import Pagination from '@/components/Pagination';

const PropertySearchResults = async ({ searchParams }) => {
  const params = await searchParams;
  const page = parseInt(params.page || 1, 10);
  const pageSize = parseInt(params.pageSize || 1, 10);
  const location = params.location || '';
  const propertyType = params.propertyType || 'All';

  await connectDB();

  const locationPattern = new RegExp(location, 'i');
  const query = {
    $or: [
      { 'location.city': locationPattern },
      { 'location.state': locationPattern },
      { 'location.zipcode': locationPattern },
    ],
  };

  if (propertyType !== 'All') {
    query.type = new RegExp(propertyType, 'i');
  }

  const skip = (page - 1) * pageSize;
  const total = await Property.countDocuments(query);
  const properties = await Property.find(query)
    .skip(skip)
    .limit(pageSize)
    .lean();
  const showPagination = total > pageSize;
  const basePath = `/properties/search-results?location=${encodeURIComponent(location)}&propertyType=${encodeURIComponent(propertyType)}`;

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        <Link
          href="/properties"
          className="flex items-center text-blue-500 hover:underline mb-3"
        >
          <FaArrowAltCircleLeft className="mr-2 mb-1" />
          Back to Properties
        </Link>
        <h1 className="text-2xl mb-4">Search Results</h1>
        {properties.length === 0 ? (
          <p>No Search Result</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
        {showPagination && (
          <Pagination
            page={page}
            pageSize={pageSize}
            totalItems={total}
            basePath={basePath}
          />
        )}
      </div>
    </section>
  );
};

export default PropertySearchResults;