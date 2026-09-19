'use server'
import connectDB from "@/config/database"
import cloudinary from "@/config/cloudnary"
import Property from "@/models/property"
import { getSessionUser } from "@/utils/getSessionUser"
import { revalidatePath } from "next/cache"


async function deleteProperty(propertyId) {
    const sessionUser=await getSessionUser();
 if(!sessionUser || !sessionUser.userId){
    throw new Error('User ID is required');

 }
 const {userId} =sessionUser;
 const property=await Property.findById(propertyId);
 if(!property) throw new Error('Property Not Found');
// Verify ownership
if(property.owner.toString() !== userId){
    throw new Error('Unauthorized');
}
//Extract public ID from image URLs
const publicIds =property.images.map((imagesUrl)=>{
    const parts=imagesUrl.split('/');
    return parts.at(-1).split('.').at(0);
})
//Delete images from Cloudinary
if(publicIds.length>0){
    for(let publicId of publicIds)
        await cloudinary.uploader.destroy('propertypluse/' + publicId)
}
await property.deleteOne();
revalidatePath('/','layout');
}
export default deleteProperty;