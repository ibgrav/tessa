import Layout from '../../lib/Layout';
import { Client, linkResolver } from '../../lib/prismic';
import Prismic from 'prismic-javascript';
import ImageGallery from '../../lib/ImageGallery';
import { RichText } from 'prismic-reactjs';

const AcademicItem = ({ doc, meta }) => {
    console.log({ academicItem: doc });
    const { title, vimeo_id, youtube_id, order, subtitle, details, title_image, gallery } = doc && doc.data;

    const VideoPlayer = ({ id, isVimeo, isYoutube }) => {
        const vimeoUrl = `https://player.vimeo.com/video/${id}?autoplay=1&amp;loop=1&amp;wmode=opaque`;
        const youtubeUrl = `http://www.youtube.com/embed/${id}?autoplay=1`;

        return <iframe
            className="video-embed"
            allow="autoplay; fullscreen"
            src={isVimeo ? vimeoUrl : isYoutube ? youtubeUrl : ''}
            frameBorder="0"
        ></iframe>
    }

    return (
        <Layout meta={meta}>
            {doc ?
                <div className="academic-item">
                    {vimeo_id && <VideoPlayer id={vimeo_id} isVimeo />}
                    {youtube_id && <VideoPlayer id={youtube_id} isYoutube />}
                    <div className="title-container">
                        <div className="text-items">
                            {order && <div className="number">{order < 10 ? "0" + order : order}</div>}
                            {subtitle && <div className="subtitle">{RichText.render(subtitle)}</div>}
                            {details && <div className="details">{RichText.render(details, linkResolver)}</div>}
                        </div>
                        {title_image && <div className="title-photo" style={{ background: `url(${title_image.url})` }}>
                            {/* <img src={title_image.url} alt={title_image.alt || title} /> */}
                        </div>}
                    </div>
                    {gallery && gallery.length && <ImageGallery images={gallery} numberOfColumns={1} isVertical />}
                </div>
                : <div style={{ textAlign: 'center' }}>404 item not found</div>
            }
        </Layout >
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