import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { Client } from '../../lib/prismic-configuration';
import Prismic from 'prismic-javascript';

import ImageGallery from '../../components/ImageGallery';

const AcademicItem = ({ doc }) => {
    const router = useRouter();
    const slug = router.query.slug;

    console.log({ doc });

    const VimeoPlayer = ({ id }) => (
        <iframe
            className="vimeo-embed"
            allow="autoplay; fullscreen"
            src={`https://player.vimeo.com/video/${id}?autoplay=1&amp;loop=1&amp;wmode=opaque`}
            frameBorder="0"
        ></iframe>
    )

    return (
        <Layout>
            <style global jsx>{`
                .vimeo-embed {
                    width: 100%;
                    height: calc(100vh - 245px);
                    margin-bottom: 40px;
                }
            `}</style>
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
    const req = ctx.req;
    const slug = ctx.query.slug;
    const doc = await Client(req).query(
        Prismic.Predicates.at('my.academic.uid', slug)
    );
    return { doc: doc && doc.results[0] }
}

export default AcademicItem;