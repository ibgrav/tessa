import Layout from '../../lib/Layout';
import { Client } from '../../lib/prismic';
import Prismic from 'prismic-javascript';
import ImageGallery from '../../lib/ImageGallery';

const AcademicItem = ({ doc, meta }) => {
    console.log({ academicItem: doc });

    const VimeoPlayer = ({ id }) => (
        <iframe
            className="vimeo-embed"
            allow="autoplay; fullscreen"
            src={`https://player.vimeo.com/video/${id}?autoplay=1&amp;loop=1&amp;wmode=opaque`}
            frameBorder="0"
        ></iframe>
    )

    return (
        <Layout meta={meta}>
            {doc ?
                <div className="academic-item">
                    {doc.data.vimeo_id && <VimeoPlayer id={doc.data.vimeo_id} />}
                    {doc.data.gallery.length && <ImageGallery images={doc.data.gallery} numberOfColumns={1} isVertical />}
                </div>
                : <div style={{ textAlign: 'center' }}>404 item not found</div>
            }
        </Layout>
    );
}

AcademicItem.getInitialProps = async ctx => {
    const slug = ctx.query.slug;
    const meta = await Client(ctx.req).getSingle('metadata');
    const doc = await Client(ctx.req).query(
        Prismic.Predicates.at('my.academic.uid', slug)
    );
    return { doc: doc && doc.results[0], meta }
}

export default AcademicItem;