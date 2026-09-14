'use server';
import connectDB from "@/config/database";
import Property from "@/models/property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import cloudinary from "@/config/cloudnary";

 async function addProperty(formData){
   await connectDB();
   const sessionUser=await getSessionUser();
   if(!sessionUser || !sessionUser.userId){
      throw new Error('User ID is required');

   }
   const {userId}=sessionUser;

   //Assess all values from amentities and images
    const images=formData.getAll('images')
    .filter((images)=>images.name !== '')
 
 const propertyData={
   owner:userId,
    type:formData.get('type'),
    name:formData.get('name'),
    description:formData.get('description'),
    location:{
        street:formData.get('location.street'),
        city:formData.get('location.city'),
        state:formData.get('location.state'),
        zipcode:formData.get('location.zipcode'),     
    },
    beds:formData.get('beds'),
    baths:formData.get('baths'),
    square_feet:formData.get('square_feet'),
    amenities:formData.getAll('amenities'),
    rates:{
      nightly:formData.get('rates.nightly'),
      weekly:formData.get('rates.weekly'),
      monthly:formData.get('rates.monthly')
    },
    seller_info:{
      name:formData.get('seller_info.name'),
      email:formData.get('seller_info.email'),
      phone:formData.get('seller_info.phone'),
    },
    
   }
   const imagesUrls=[];
   for(const imageFile of images ){
        try{
        const imagesBuffer=await imageFile.arrayBuffer();
        const imageArray=Array.from(new Uint8Array(imagesBuffer));
        const imageData= Buffer.from(imageArray);
        //Convert to base64
        const imageBase64=imageData.toString('base64')
        //Make request to cloudinary
        const result=await cloudinary.uploader.upload(`data:image/png;base64,${imageBase64}`,{
          folder:'propertypluse'
        });
        imagesUrls.push(result.secure_url);  
        }catch(error){
            console.error('Image upload failed, continuing without it:', error.message);
        }
   }
   propertyData.images=imagesUrls
   
   const newProperty=new Property(propertyData);
   await newProperty.save();
   revalidatePath('/','layout');
   revalidatePath('/profile', 'layout');
   redirect(`/properties/${newProperty._id}`);
 }
export default addProperty;