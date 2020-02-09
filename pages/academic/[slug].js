import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { Client } from '../../lib/prismic-configuration';
import Prismic from 'prismic-javascript';

const AcademicItem = ({ doc }) => {
    const router = useRouter();
    const slug = router.query.slug;

    console.log({ doc });

    return (
        <Layout>
            {doc.length ? <h1>{slug}</h1> : <div style={{ textAlign: 'center' }}>404 item not found</div>}
        </Layout>
    );
}

AcademicItem.getInitialProps = async ctx => {
    const req = ctx.req;
    const slug = ctx.query.slug;
    const doc = await Client(req).query(
        Prismic.Predicates.at('my.academic.uid', slug)
    );
    return { doc: doc && doc.results }
}

export default AcademicItem;