import Layout from '../lib/Layout';
import { RichText } from 'prismic-reactjs';
import { Client, linkResolver } from '../lib/prismic';
import Link from 'next/link';

const About = ({ about, meta }) => {
    console.log({ about, meta });

    return about ? (
        <Layout meta={meta}>
            <div id="about">
                <img className="portrait" src={about.data.image.url} alt={about.data.image.alt || "Tessa Portrait"} />
                <div className="blurb">{about.data.content ? RichText.render(about.data.content, linkResolver) : ''}</div>
                <Link href="/photography"><a className="photo-link">Photography</a></Link>
            </div>
        </Layout>
    ) : null;
}

About.getInitialProps = async ctx => {
    const about = await Client(ctx.req).getSingle('about');
    const meta = await Client(ctx.req).getSingle('metadata');
    return { about, meta }
}

export default About;