import React from 'react'
import { useEffect, useState } from 'react';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from "reactstrap";

const NavLayout = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [navbar, setNavbar] = useState(false);
    const [active, setActive] = useState('default');
    

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
        window.addEventListener("scroll", changeBackground)
    });


    return (
        <div>
            <header>
                <Navbar className={navbar? "navbarVisible" : "navbarTransparent"} dark fixed='top' expand="md">
                    <NavbarBrand className='logo-font' href='/'>Cibo Colorato</NavbarBrand>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav 
                            className='me-auto justify-content-end' 
                            style={{width: "100%"}} 
                            navbar
                            
                        >
                            <NavItem>
                                <NavLink href='/'>Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href='/#about'>Über Uns</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href='/#dishes'>Gerichte</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href='/#location'>Wo Wir Sind</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href='#contact'>Kontakt</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href='/menu'>SpeiseKarte</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </header>
        </div>
    )
}

export default NavLayout;