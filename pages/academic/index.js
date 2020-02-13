import Layout from '../../lib/Layout';
import { Client } from '../../lib/prismic';
import Prismic from 'prismic-javascript';
import Cards from '../../lib/Cards';

const Academic = ({ items, meta }) => {
    console.log({ academicItems: items })

    return (
        <Layout meta={meta}>
            <Cards items={items} />
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