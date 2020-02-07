import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Social from './Social';
import theme from './theme';

export default ({ children }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const router = useRouter();
    const { font, bg } = theme();

    const tabs = [
        {
            title: 'academic',
            href: '/story/academic'
        },
        {
            title: 'professional',
            href: '/story/professional'
        },
        {
            title: 'personal',
            href: '/story/personal'
        },
        {
            title: 'about',
            href: '/story/about'
        }
    ]

    const TabLinks = () => (
        tabs.map((tab, i) => (
            <Link key={i} href={tab.href}><a className={router.pathname === tab.href ? 'active' : ''}>{tab.title}</a></Link>
        ))
    );

    const toggleTabs = () => {
        setMenuOpen(!menuOpen);
    }

    return (
        <div id="layout">
            <style global jsx>{`
                #container {
                    width: 1400px;
                    padding: 20px;
                    margin: 0 auto;
                    box-sizing: border-box;
                }

                #child-container {
                    animation: fade-in 2s forwards;
                }

                #header {
                    height: 125px;
                    margin: 60px auto;
                    display: flex;
                    flex-flow: row;
                    justify-content: space-between;
                }

                #logo {
                    height: 100%;
                    width: auto;
                }

                #logo:hover {
                    cursor: pointer;
                }

                #tabs {
                    line-height: 125px;
                }

                #tabs a, #mobile-tabs a {
                    margin: 0 10px;
                    text-decoration: none;
                    color: #78b2de;
                    letter-spacing: 2px;
                }

                #tabs .active, #tabs a:hover, #mobile-tabs .active {
                    color: #c58c8c;
                }

                #footer {
                    margin: 140px auto 80px auto;
                }

                #mobile-tabs {
                    display: none;
                    position: relative;
                }

                #mobile-tabs .links {
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    transform: translateX(100%);
                    transition: transform 1s;
                    display: flex;
                    flex-flow: column;
                    align-content: space-between;
                }

                #mobile-tabs.open .links {
                    transform: translateX(-100%);
                }

                #mobile-tabs .open-btn .bar {
                    width: 20px;
                    height: 3px;
                    margin: 3px;
                    background: #78b2de;
                    transition: transform 1000ms;
                }

                #mobile-tabs.open .open-btn .bar:nth-child(1) {
                    transform: rotate(90deg) translate(3px, 10px);
                }

                #mobile-tabs.open .open-btn .bar:nth-child(2) {
                    transform: rotate(-45deg) translate(0px, -3px);
                }

                #mobile-tabs.open .open-btn .bar:nth-child(3) {
                    transform: rotate(-180deg);
                }

                @keyframes fade-in {
                    from {opacity: 0}
                    to {opacity: 1}
                }

                @media screen and (max-width: 1440px) {
                    #container {
                        width: 100%;
                    }
                }

                @media screen and (max-width: 600px) {
                    #tabs {
                        display: none;
                    }

                    #mobile-tabs {
                        display: block;
                    }
                }
            `}</style>

            <div id="container">
                <div id="header">
                    <Link href="/">
                        <img id="logo" src="../moth.png" />
                    </Link>
                    <div id="tabs"><TabLinks /></div>
                    <div id="mobile-tabs" className={menuOpen ? 'open' : 'closed'}>
                        <div className="open-btn" onClick={toggleTabs}>
                            <div className="bar"></div>
                            <div className="bar"></div>
                            <div className="bar"></div>
                        </div>
                        <div className="links">
                            <TabLinks />
                        </div>
                    </div>
                </div>

                <div id="child-container">
                    {children}
                </div>

                <div id="footer"><Social color="black" /></div>
            </div>
        </div>
    )
}