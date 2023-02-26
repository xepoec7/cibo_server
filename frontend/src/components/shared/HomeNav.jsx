import { useEffect, useState } from 'react';
import {Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink} from 'reactstrap';


const HomeNav = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [navbar, setNavbar] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    const changeBackground = () => {
        if (window.scrollY >= 66) {
            setNavbar(true);
        } else {
            setNavbar(false);
        }
    }

    useEffect(() => {
        changeBackground();
        window.addEventListener("scroll", changeBackground);
    });

    return (
        <>
            <header>
                <Navbar className={navbar ? "navbarVisible" : "navbarTransparent"} color="dark" dark fixed='top' expand="md" container="md">
                    <NavbarBrand className='logo-font' href='/'>Cibo Colorato</NavbarBrand> 
                    <NavbarToggler onClick={toggle} />
                    <Collapse navbar>
                        <Nav
                            className='me-auto justify-content-end text-uppercase'
                            navbar
                        >
                            <NavItem>
                                <NavLink href='/'>Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href='/#about'>Über uns</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href='/#dishes'>Gerichte</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href='/#location'>Wo Wir sind</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href='#contact'>Kontakt</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href='/'>Speisekarte</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </header>
        </>
    )
}

export default HomeNav;