import Layout from '../components/Layout';
import { RichText } from 'prismic-reactjs';
import { Client, hrefResolver, linkResolver } from '../prismic-configuration';

const About = ({ doc, meta }) => {
    console.log({ doc });

    return (
        <Layout meta={meta}>
            <style jsx>{`
                #about {
                    width: 700px;
                    margin: 0 auto;
                    box-sizing: border-box;
                }

                #portrait {
                    width: 100%;
                    margin-bottom: 80px;
                }

                #blurb {
                    line-height: 1.8em;
                    letter-spacing: .02em;
                }

                @media screen and (max-width: 700px) {
                    #about {
                        width: 100%;
                    }
                    #portrait {
                        margin-bottom: 10px;
                    }
                }
            `}</style>
            <div id="about">
                <img id="portrait" src={doc.data.image.url} alt={doc.data.image.alt} />
                <div id="blurb">{doc.data.content ? RichText.render(doc.data.content, linkResolver) : ''}</div>
            </div>
        </Layout>
    );
}

About.getInitialProps = async ctx => {
    const req = ctx.req;
    const doc = await Client(req).getSingle('about');
    const meta = await Client(req).getSingle('metadata');
    return { doc, meta }
}

export default About;