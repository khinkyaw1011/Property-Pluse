import Navbar from '@/components/Navbar';
import '@/assets/styles/globals.css'
import Footer from '@/components/Footer';
export const metadata={
        title:'Property Pluse',
        keywords:'rentak,property,real estate',
        description:'Find the perfect retal property'
    }

const MainLayout = ({children}) => {

    return (  
        <html>
            <body>
                <main>
                    <Navbar/>
                   {children}
                   <Footer/>
                </main>
            </body>
        </html>
    );
}
 
export default MainLayout;