import PropertyEditForm from "@/components/PropertyEditForm";
import connectDB from "@/config/database";
import Property from "@/models/property";
import { convertToSerializableObject } from "@/utils/convertToObject";

const editPropertyPage = async({params}) => {
    const { id } = await params;
    await connectDB();
    const propertyDoc=await Property.findById(id).lean();
    if(!propertyDoc){
      return <h2 className="text-center text-2xl font-bold mt-10">
        Property Not Found
      </h2>  
    }
    const property= convertToSerializableObject(propertyDoc);
    return (  <section className="bg-blue-50">
            <div className="container m-auto max-w-2xl py-24">
                <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
                    
                    <PropertyEditForm property={property}/>
                </div>
            </div>
    </section>);
}
 
export default editPropertyPage;