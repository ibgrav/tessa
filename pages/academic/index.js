import Layout from '../../components/Layout';
import { Client } from '../../lib/prismic-configuration';
import Prismic from 'prismic-javascript';
import Link from 'next/link';

const Academic = ({ items }) => {
    console.log({ items })

    const HoverPanel = (item) => {
        return null;
    }

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

                .cover {
                    width: 100%;
                    height: 100%;
                    opacity: 0;
                    transition: opacity 500ms;
                }

                .cover:hover {
                    opacity: 1;
                }
            `}</style>
            <div id="card-container">
                {items.length && items.map((item, index) => (
                    <div key={index} className="card" style={{ backgroundImage: `url(${item.data.card_image && item.data.card_image.url})` }}>
                        <div className="cover">
                            <Link href={`/academic/${item.uid}`}><a>{item.uid}</a></Link>
                        </div>
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