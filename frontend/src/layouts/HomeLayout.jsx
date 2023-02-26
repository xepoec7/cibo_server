import {Outlet} from 'react-router-dom';
import HomeNav from '../components/shared/HomeNav';
import FooterComponent from '../components/shared/FooterComponent';

const HomeLayout = () => {
    return (
        <>
            <HomeNav />
            <Outlet />
            <FooterComponent />
        </>
    )
}

export default HomeLayout;