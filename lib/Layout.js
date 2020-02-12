import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { getThemeFromMeta } from './global';
import Social from './Social';
import ThemeStyles from './ThemeStyles';
import GlobalTransitions from './GlobalTransitions';
import { getCookieValue, setCookie, triggerStickyHeader } from '../lib/global';

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

const Layout = ({ children, meta }) => {
    const router = useRouter();

    const [state, setState] = useState({
        menuOpen: false,
        cookieChecked: false,
        isDark: false
    });
    const { menuOpen, cookieChecked, isDark } = state;

    const theme = getThemeFromMeta(meta);

    useEffect(() => {
        const isDarkCookie = getCookieValue('isDarkTheme');
        if (isDarkCookie === 'true') setState(state => ({ ...state, isDark: true }));
        setTimeout(() => setState(state => ({ ...state, cookieChecked: true })), 1000);
    }, []);

    const toggleTabs = () => {
        setState(state => ({ ...state, menuOpen: !menuOpen }));
    }

    const TabLinks = () => (
        tabs.map((tab, i) => (
            <Link key={i} href={tab.href}><a className={router.pathname.indexOf(tab.href) > -1 ? 'active' : ''}>{tab.title}</a></Link>
        ))
    );

    const themeToggle = () => {
        const themeNewVal = !state.isDark;
        setState(state => ({ ...state, isDark: themeNewVal }));
        setCookie('isDarkTheme', themeNewVal);
        triggerStickyHeader();
    }

    return (
        <div id="layout">
            <ThemeStyles isDark={isDark} background={theme.background} text={theme.text} link={theme.link} />
            <GlobalTransitions isReady={cookieChecked} />
            <div className="container">
                <div className="header">
                    <div className="header-container">
                        {meta && meta.data && meta.data.nav_logo ? <Link href="/">
                            <img className="logo" src={meta.data.nav_logo.url} />
                        </Link> : <div className="logo-placeholder"></div>}
                        <div className="tabs"><TabLinks /></div>
                        <div className={`${menuOpen ? 'open' : 'closed'} mobile-tabs`}>
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

                <div className="child-container">
                    {children}
                </div>

                <div className="footer">
                    <Social />
                    <div className="theme-toggle"><span onClick={themeToggle}>{isDark ? '🌕' : '🌑'}</span></div>
                </div>
            </div>
        </div>
    )
}

export default Layout;