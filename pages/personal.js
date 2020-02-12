import { Client } from '../lib/prismic';
import Layout from '../lib/Layout';
import ImageGallery from '../lib/ImageGallery';

const Personal = ({ personal, meta }) => {
    const { images } = personal && personal.data;
    console.log({ images, personal })

    return (
        <Layout meta={meta}>
            <ImageGallery clickable images={images} numberOfColumns={3} isVertical />
        </Layout>
    );
}

Personal.getInitialProps = async ctx => {
    const personal = await Client(ctx.req).getSingle('personal');
    const meta = await Client(ctx.req).getSingle('metadata');
    return { personal, meta }
}

export default Personal;