'use client'
import { useRouter ,useParams} from "next/navigation";

const PropertyId = () => {
    const router =useRouter();
    const params=useParams();
  
    return (  
       
       <div>
         <div>Property Page with ID{params.id}</div>
       </div>
    );
}
 
export default PropertyId;