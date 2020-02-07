import Link from 'next/link';
import { useRouter } from 'next/router';

import Social from './Social';
import theme from './theme';

export default ({ children }) => {
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

    return (
        <div id="layout">
            <style jsx>{`
                #container {
                    width: 1400px;
                    padding: 20px;
                    margin: 0 auto;
                    box-sizing: border-box;
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

                #tabs a {
                    margin: 0 10px;
                    text-decoration: none;
                    color: #78b2de;
                    letter-spacing: 2px;
                }

                #tabs .active, #tabs a:hover {
                    color: #c58c8c;
                }

                #footer {
                    margin: 140px auto 80px auto;
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
            `}</style>

            <div id="container">
                <div id="header">
                    <Link href="/">
                        <img id="logo" src="../moth.png" />
                    </Link>
                    <div id="tabs">
                        {tabs.map((tab, i) => (
                            <Link key={i} href={tab.href}><a className={router.pathname === tab.href ? 'active' : ''}>{tab.title}</a></Link>
                        ))}
                    </div>
                </div>

                {children}

                <div id="footer"><Social color="black" /></div>
            </div>
        </div>
    )
}