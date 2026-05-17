import Header from './Header/Header.jsx';
import Footer from './Footer/Footer.jsx';
import {Outlet} from 'react-router-dom';
//Todo lo que pongamos dentro de <Layout> en App.jsx sera el children

function Layout({children}){
    return(
        <>
            <Header />
            <main>
                {}
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default Layout;