import { Outlet } from "react-router-dom";
import NavLayout from "./NavLayout";
import FooterLayout from './FooterLayout';

const Layout = () => {
    return (
        <>
            <NavLayout />

            <Outlet />

            <FooterLayout />
        </>
    )
};

export default Layout;