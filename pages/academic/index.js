import Layout from '../../lib/Layout';
import { Client } from '../../lib/prismic';
import Prismic from 'prismic-javascript';
import { RichText } from 'prismic-reactjs';
import Link from 'next/link';

const Academic = ({ items, meta }) => {
    console.log({ academicItems: items })

    return (
        <Layout meta={meta}>
            <div id="academic">
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
    const meta = await Client(ctx.req).getSingle('metadata');
    const items = await Client(ctx.req).query(
        Prismic.Predicates.at('document.type', 'academic'),
        { orderings: '[my.academic.order]' }
    );
    return { items: items && items.results, meta }
}

export default Academic;