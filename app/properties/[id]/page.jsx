import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import connectDB from "@/config/database";
import Property from "@/models/property";
import PropertyImages from "@/components/PropertyImages";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import PropertyDetails from "@/components/PropertyDetails";
import { convertToSerializableObject } from "@/utils/convertToObject";
import BookmarkButton from "@/components/BookmarkButton";
import ShareButtons from "@/components/ShareButtons";
import PropertyContactForm from "@/components/PropertyContactForm";
const PropertyPage = async({params}) => {
  const { id } = await params;
  await connectDB();
  const propertyDocs=await Property.findById(id).lean();
  const property=convertToSerializableObject(propertyDocs);
 if(!property){
  return(
    <h1 className="text-center text-2xl font-bold mt-10">
      Property Not Found
    </h1>
  )
 }
    return (  
       
       <>
       <section>
        <PropertyHeaderImage image={property.images[0]}/>
        {property.name}
         <section>
      <div className="container m-auto py-6 px-6">
        <Link
          href="/properties"
          className="text-blue-500 hover:text-blue-600 flex items-center"
        >
          <FaArrowLeft className="mr-2"/> Back to Properties
        </Link>
      </div>
    </section>
    <section className="bg-blue-50">
      <div className="container m-auto py-10 px-6">
        <div className="grid grid-cols-1  md:grid-cols-[70%_30%]  w-full gap-6">
        {/* property Info */}
            <PropertyDetails property={property}/>
            <aside className="space-y-4">
              <BookmarkButton property={property}/>
              <ShareButtons property={property}/>
              <PropertyContactForm property={property}/>
            </aside>
          </div>
          </div>
            </section>
       </section>
       <PropertyImages images={property.images}/>
       </>
    );
}
 
export default PropertyPage;
