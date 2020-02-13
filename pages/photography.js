import { Client } from '../lib/prismic';
import Layout from '../lib/Layout';
import ImageGallery from '../lib/ImageGallery';

const Photography = ({ photography, meta }) => {
    const { gallery } = photography && photography.data;
    console.log({ gallery, photography });

    return (
        <Layout meta={meta}>
            <ImageGallery clickable images={gallery} numberOfColumns={3} isVertical />
        </Layout>
    );
}

Photography.getInitialProps = async ctx => {
    const photography = await Client(ctx.req).getSingle('photography');
    const meta = await Client(ctx.req).getSingle('metadata');
    return { photography, meta }
}

export default Photography;