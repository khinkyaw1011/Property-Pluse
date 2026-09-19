import Navbar from '@/components/Navbar';
import '@/assets/styles/globals.css'
import Footer from '@/components/Footer';
import AuthProvider from '@/components/AuthProvider';
import { ToastContainer } from 'react-toastify';
import { GlobalProvider } from '@/context/GlobalContext';
import '@/assets/styles/globals.css';
import 'photoswipe/dist/photoswipe.css'
export const metadata={
        title:'Property Pluse',
        keywords:'rentak,property,real estate',
        description:'Find the perfect retal property'
    }

const MainLayout = ({children}) => {

    return (  
        <AuthProvider>
            <GlobalProvider>
            <html>
            <body>
                <main>
                    <Navbar/>
                   {children}
                   <Footer/>
                   <ToastContainer/>
                </main>
               </body>
            </html>
            </GlobalProvider>
        </AuthProvider>
        
    );
}
 
export default MainLayout;