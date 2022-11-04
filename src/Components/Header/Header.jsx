import React, {useEffect, useRef, useState} from "react";
import {Link} from 'react-router-dom';
import {Sling as Hamburger} from 'hamburger-react';

import s from './header.module.scss';


const navItems = [
    {name: 'Home', toLink: '/'},
    {name: 'Rooms', toLink: '/rooms'},
];


const Header = () => {

    const [isOpen, setOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const clickOutsideHandler = (e) => {
            if (!menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", clickOutsideHandler);

        return () => {
            document.removeEventListener("mousedown", clickOutsideHandler);
        }
    }, []);

    return (
        <div ref={menuRef}>
            <header className={s.header}>
                <div
                    className={s.logo}
                    onClick={() => isOpen && setOpen(false)}
                >
                    <img src='https://savoywestend.cz/upload/iblock/b01/b014a613ff64eaf9de97eecd75029310.png' alt="Beach Resort logo"/>
                </div>
                <nav className={s.fullScreenNavbar}>
                    <ul>
                        {
                            navItems.map((obj, index) => <li
                                onClick={() => {
                                    setOpen(false)
                                }}
                                key={index}
                            >
                                <Link to={obj.toLink}>{obj.name}</Link>
                            </li>)
                        }
                    </ul>
                </nav>
                <nav className={s.navbarMenu}>
                    <button className={s.menuButton}>
                        <Hamburger size={27} toggled={isOpen} toggle={setOpen}/>
                    </button>
                </nav>
            </header>

            <ul
                className={isOpen ? `${s.menuContent} ${s.active}` : s.menuContent}
            >
                {
                    navItems.map((obj, index) => <li
                        onClick={() => {
                            setOpen(false)
                        }}
                        key={index}
                    >
                        <Link to={obj.toLink}>{obj.name}</Link>
                    </li>)
                }
            </ul>
        </div>
    );
}

export default Header;