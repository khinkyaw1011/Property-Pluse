import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import connectDB from "@/config/database";
import Property from "@/models/property";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import PropertyDetails from "@/components/PropertyDetails";
const PropertyPage = async({params}) => {
  const { id } = await params;
  await connectDB();
  const property=await Property.findById(id).lean();
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
    <section class="bg-blue-50">
      <div class="container m-auto py-10 px-6">
        <div class="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
        {/* property Info */}
            <PropertyDetails property={property}/>
          </div>
          </div>
            </section>
       </section>
       </>
    );
}
 
export default PropertyPage;
