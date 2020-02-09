import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Client } from '../lib/prismic-configuration';

import useApp from '../lib/useApp';

import Social from './Social';
import { getCookieValue, setCookie } from '../lib/global';

let initialHeaderHeight = null;


const Layout = ({ children }) => {
    const { theme, meta, setMeta, isDark, toggleDark, eventsSet, setEvents, currentPrimary } = useApp();
    const [menuOpen, setMenuOpen] = useState(false);
    const router = useRouter();

    const triggerStickyHeader = () => {
        if (document.querySelector('#layout') && document.querySelector('#header')) {
            const scroll = window.pageYOffset;
            const layout = document.querySelector('#layout');
            const hasSticky = layout.classList.contains('sticky');
            const menu = document.querySelector('#mobile-tabs');

            if (!initialHeaderHeight) initialHeaderHeight = document.querySelector('#header').offsetHeight;

            if (scroll > initialHeaderHeight && !hasSticky) {
                layout.classList.add('sticky');
                menu.classList.remove('open');
            } else if (scroll < (initialHeaderHeight - 50) && hasSticky) {
                layout.classList.remove('sticky');
                menu.classList.remove('open');
            }
        }
    }

    useEffect(() => {
        const setMetaData = async () => {
            const metadata = await Client().getSingle('metadata');
            console.log({ metadata });
            setMeta(metadata);
        }

        const checkTheme = () => {
            const isDarkCookie = getCookieValue('isDarkTheme');
            if (isDarkCookie === 'true') toggleDark(true);
        }

        const setScrollListener = () => {
            console.log('adding scroll event listener for sticky header');
            window.addEventListener('scroll', triggerStickyHeader);
            triggerStickyHeader();
            setEvents();
        }

        if (!meta) setMetaData();
        checkTheme();
        if (!eventsSet && document.querySelector('#layout') && document.querySelector('#header')) setScrollListener();
    }, []);

    const tabs = [
        {
            title: 'academic',
            href: '/academic'
        },
        {
            title: 'professional',
            href: '/professional'
        },
        {
            title: 'personal',
            href: '/personal'
        },
        {
            title: 'about',
            href: '/about'
        }
    ]

    const TabLinks = () => (
        tabs.map((tab, i) => (
            <Link key={i} href={tab.href}><a className={router.pathname.indexOf(tab.href) > -1 ? 'active' : ''}>{tab.title}</a></Link>
        ))
    );

    const toggleTabs = () => {
        setMenuOpen(!menuOpen);
    }

    const themeToggle = () => {
        const isDarkToggled = toggleDark();
        setCookie('isDarkTheme', isDarkToggled);
        triggerStickyHeader();
    }

    const metaAnimate = 'background-color 500ms, color 500ms';

    return (
        <div id="layout">
            <Head>
                <style>{`
                    * {
                        -webkit-font-smoothing: antialiased;
                        -moz-osx-font-smoothing: grayscale;
                        font-family: 'Josefin Sans', sans-serif;
                    }

                    body {
                        margin: 0 auto;
                        color: ${theme.text[currentPrimary]};
                        background-color: ${theme.background[currentPrimary]};
                        font-size: 16px;
                        transition: ${metaAnimate};
                    }

                    @media screen and (max-width: 600px) {
                        body {
                            font-size: 16px;
                        }
                    }

                    @media screen and (max-width: 420px) {
                        body {
                            font-size: 16px;
                        }
                    }
                `}</style>
            </Head>
            <style global jsx>{`
                #container, #header-container {
                    width: 1400px;
                    margin: 0 auto;
                    box-sizing: border-box;
                    overflow-x: hidden;
                    padding: 0px 20px;
                }

                #container {
                    position: relative;
                    padding: 245px 20px 0 20px;
                }

                #child-container {
                    animation: fade-in 2s forwards;
                }

                #header {
                    position: absolute;
                    top: 0;
                    width: calc(100% - 40px);
                    height: 125px;
                    margin: 0px auto;
                    padding: 60px 0;
                    background-color: ${theme.background[currentPrimary]};
                    transition: ${metaAnimate};
                }

                #header-container {
                    display: flex;
                    flex-flow: row;
                    justify-content: space-between;
                    height: 100%;
                    overflow: hidden;
                }

                #logo {
                    height: 100%;
                    width: auto;
                    z-index: 100;
                }

                #logo:hover {
                    cursor: pointer;
                }

                .logo-placeholder {
                    height: 100%;
                    width: 25%
                }

                #tabs {
                    line-height: 125px;
                }

                #tabs a, #mobile-tabs a {
                    margin: 0 10px;
                    text-decoration: none;
                    color: ${theme.link.primary};
                    letter-spacing: 2px;
                }

                #tabs .active, #tabs a:hover, #mobile-tabs .active, #mobile-tabs a:hover {
                    color: ${theme.link.active};
                }

                #footer {
                    margin: 140px auto 60px auto;
                }

                #mobile-tabs {
                    position: absolute;
                    display: none;
                    right: 0px;
                    top: 10px;
                    width: 100%;
                }

                #mobile-tabs .links {
                    position: absolute;
                    right: 10px;
                    top: -200px;
                    transition: top 500ms, opacity 500ms, ${metaAnimate};
                    opacity: 0;
                    display: flex;
                    flex-flow: column;
                    text-align: right;
                    align-content: space-between;
                    z-index: 10;
                }

                #layout.sticky #mobile-tabs .links {
                    transition: top 500ms, ${metaAnimate};
                }

                #layout.sticky #mobile-tabs.open .links {
                    top: 45px;
                    transition: top 1s, ${metaAnimate};
                }

                #layout.sticky #mobile-tabs .open-btn {
                    top: 0;
                    right: 14px;
                }

                #mobile-tabs .links a {
                    margin: 5px;
                }

                #mobile-tabs.open .links {
                    top: 40px;
                    opacity: 1;
                    transition: top 1s, opacity 1s 500ms, ${metaAnimate};
                }

                #mobile-tabs .open-btn {
                    position: absolute;
                    top: 10px;
                    right: 0;
                    z-index: 100;
                }

                #mobile-tabs .open-btn .bar {
                    width: 23px;
                    height: 2px;
                    margin: 6px;
                    background: #78b2de;
                    transition: transform 1000ms, ${metaAnimate};
                }

                #mobile-tabs.open .open-btn .bar:nth-child(1) {
                    transform: rotate(90deg) translate(5px,11px);
                }

                #mobile-tabs.open .open-btn .bar:nth-child(2) {
                    transform: rotate(-45deg) translate(-1px,-2px);
                }

                #mobile-tabs.open .open-btn .bar:nth-child(3) {
                    transform: rotate(-180deg);
                }

                #theme-toggle {
                    text-align: center;
                    margin: 80px 0;
                }
                #theme-toggle span:hover {
                    cursor: pointer;
                }

                #layout.sticky #header {
                    position: fixed;
                    top: 0;
                    left: 0;
                    padding: 0 20px;
                    width: 100%;
                    box-sizing: border-box;
                    z-index: 100;
                    height: 50px;
                    margin: 0 auto;
                    transform: translateY(-50px);
                    animation: slide-down 500ms 1s forwards;
                    box-shadow: 0px 0px 10px -5px rgba(0,0,0,0.3);
                }

                #layout.sticky #tabs {
                    line-height: 50px;
                }

                @keyframes fade-in {
                    from {opacity: 0}
                    to {opacity: 1}
                }

                @keyframes slide-down {
                    from {transform: translateY(-50px)}
                    to {transform: translateY(0)}
                }

                @media screen and (max-width: 1440px) {
                    #container, #header-container {
                        width: 100%;
                    }
                    #layout.sticky #header-container {
                        padding: 0;
                    }
                }

                @media screen and (max-width: 600px) {
                    #tabs {
                        display: none;
                    }

                    #mobile-tabs {
                        display: block;
                    }

                    #logo {
                        margin-top: 10px;
                    }

                    #layout.sticky #logo {
                        margin-top: 0;
                    }

                    #header {
                        padding: 0 0 30px 0;
                    }

                    #container {
                        padding-top: 155px;
                    }

                    #header-container {
                        padding: 0;
                    }

                    #project-list {
                        margin-bottom: 10px !important;
                    }
                }
            `}</style>

            <div id="container">
                <div id="header">
                    <div id="header-container">
                        {meta && meta.data ? <Link href="/">
                            <img id="logo" src={meta.data.nav_logo.url} />
                        </Link> : <div className="logo-placeholder"></div>}
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
                </div>

                <div id="child-container">
                    {children}
                </div>

                <div id="footer">
                    <Social color={theme.text[currentPrimary]} />
                    <div id="theme-toggle"><span onClick={themeToggle}>{isDark ? '🌕' : '🌑'}</span></div>
                </div>
            </div>
        </div>
    )
}

export default Layout;