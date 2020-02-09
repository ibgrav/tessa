import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Client } from '../lib/prismic-configuration';

import useApp from '../lib/useApp';

import Social from './Social';
import theme from '../lib/theme';
import { getCookieValue, setCookie, deleteCookie } from '../lib/global';

const Layout = ({ children }) => {
    const { meta, setMeta, isDark, toggleDark } = useApp();
    const [menuOpen, setMenuOpen] = useState(false);

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

        if (!meta) setMetaData();
        checkTheme();
    }, []);

    const router = useRouter();
    const { font, bg } = theme(isDark);

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
            <Link key={i} href={tab.href}><a className={router.pathname === tab.href ? 'active' : ''}>{tab.title}</a></Link>
        ))
    );

    const toggleTabs = () => {
        setMenuOpen(!menuOpen);
    }

    const themeToggle = () => {
        const isDarkToggled = toggleDark();
        setCookie('isDarkTheme', isDarkToggled);
    }

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
                        color: ${font.primary};
                        background-color: ${bg.primary};
                        font-size: 16px;
                        transition: background-color 500ms, color 500ms;
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
                #container {
                    width: 1400px;
                    padding: 20px;
                    margin: 0 auto;
                    box-sizing: border-box;
                    overflow-x: hidden;
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
                    color: #78b2de;
                    letter-spacing: 2px;
                }

                #tabs .active, #tabs a:hover, #mobile-tabs .active {
                    color: #c58c8c;
                }

                #footer {
                    margin: 140px auto 60px auto;
                }

                #mobile-tabs {
                    display: none;
                    position: relative;
                    width: 100%;
                }

                #mobile-tabs .links {
                    position: absolute;
                    right: 0;
                    top: -200px;
                    transition: top 500ms, opacity 500ms, background-color 500ms, color 500ms;
                    opacity: 0;
                    display: flex;
                    flex-flow: column;
                    align-content: space-between;
                    z-index: 10;
                    background-color: ${bg.primary};
                }

                #mobile-tabs .links a {
                    margin: 5px;
                }

                #mobile-tabs.open .links {
                    top: 40px;
                    opacity: 1;
                    transition: top 1s, opacity 1s 500ms, background-color 500ms, color 500ms;
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
                    transition: transform 1000ms, background-color 500ms, color 500ms;
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

                    #header {
                        margin: 0 auto 40px auto;
                    }
                }
            `}</style>

            <div id="container">
                <div id="header">
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

                <div id="child-container">
                    {children}
                </div>

                <div id="footer">
                    <Social color={font.primary} />
                    <div id="theme-toggle" onClick={themeToggle}>{isDark ? '🌕' : '🌑'}</div>
                </div>
            </div>
        </div>
    )
}

export default Layout;