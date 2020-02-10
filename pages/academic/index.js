import Layout from '../../components/Layout';
import { Client } from '../../lib/prismic-configuration';
import Prismic from 'prismic-javascript';
import { RichText } from 'prismic-reactjs';
import Link from 'next/link';

import useApp from '../../lib/useApp';

const Academic = ({ items }) => {
    const { theme, currentPrimary } = useApp();
    console.log({ theme, items })

    return (
        <Layout>
            <style global jsx>{`
                #card-container {
                    display: flex;
                    flex-flow: row;
                    flex-wrap: wrap;
                    justify-content: space-between;
                }

                .card {
                    width: calc(50% - 10px);
                    height: 45vh;
                    background-position: center;
                    background-size: cover;
                    margin-bottom: 20px;
                }

                .card-title {
                    overflow: hidden;
                    white-space: nowrap;
                }

                .card-title h2 {
                    margin: 0;
                    white-space: nowrap;
                }

                .cover {
                    width: 100%;
                    height: 100%;
                    opacity: 0;
                    transition: opacity 500ms;
                    display: block;
                    text-decoration: none;
                    background-color: ${theme.link.active};
                    color: ${theme.background[currentPrimary]};
                    text-align: center;
                    line-height: 45vh;
                    font-size: 0.8em;
                }

                .cover:hover {
                    opacity: 1;
                }

                @media screen and (max-width: 800px) {
                    .card {
                        width: 100%;
                    }
                }
            `}</style>
            <div id="card-container">
                {items.length && items.map((item, index) => (
                    <div key={index} className="card" style={{ backgroundImage: `url(${item.data.card_image && item.data.card_image.url})` }}>
                        <Link href={`/academic/${item.uid}`}><a className="cover"><span className="card-title">{RichText.render(item.data.title)}</span></a></Link>
                    </div>
                ))}
            </div>
        </Layout>
    );
}

Academic.getInitialProps = async ctx => {
    const req = ctx.req;
    const items = await Client(req).query(
        Prismic.Predicates.at('document.type', 'academic'),
        { orderings: '[my.academic.order]' }
    );
    return { items: items && items.results }
}

export default Academic;