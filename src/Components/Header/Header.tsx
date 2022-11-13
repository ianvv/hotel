import React, {useEffect, useRef, useState} from "react";
import {Link} from 'react-router-dom';
import {Sling as Hamburger} from 'hamburger-react';

import s from './header.module.scss';


type TNavItem = {
    name: string;
    toLink: string;
}

const navItems: TNavItem[] = [
    {name: 'Home', toLink: '/'},
    {name: 'Rooms', toLink: '/rooms'},
];

type MenuClick = MouseEvent & {
    path: Node[];
};


const Header: React.FC = () => {

    const [isOpen, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const clickOutsideHandler = (event: MouseEvent) => {
            const _event = event as MenuClick;

            if (menuRef.current && !_event.path.includes(menuRef.current)) {
                setOpen(false);
            }
        };
        document.body.addEventListener("mousedown", clickOutsideHandler);

        return () => document.body.removeEventListener("mousedown", clickOutsideHandler);
    }, []);

    return (
        <div ref={menuRef}>
            <header className={s.header}>
                <div
                    className={s.logo}
                    onClick={() => isOpen && setOpen(false)}
                >
                    <img
                        src='https://savoywestend.cz/upload/iblock/b01/b014a613ff64eaf9de97eecd75029310.png'
                        alt="Hotel logo"
                    />
                </div>
                <nav className={s.fullScreenNavbar}>
                    <ul>
                        {
                            navItems.map((obj, index) => <li
                                onClick={() => setOpen(false)}
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
                        onClick={() => setOpen(false)}
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