import Layout from '../components/Layout';
import Prismic from 'prismic-javascript';
import { RichText } from 'prismic-reactjs';
import { Client, linkResolver } from '../prismic-configuration';

import useApp from '../lib/useApp';
import theme from '../lib/theme';

const Professional = ({ projects }) => {
    const { isDark } = useApp();
    const { font, bg } = theme(isDark);

    console.log({ projects });

    const ProjectGallery = ({ project }) => {
        const { title_image, description, images, credit } = project.data;
        return (
            <div className="project-gallery">
                <style jsx>{`
                    .project-gallery {
                        display: flex;
                        flex-flow: row;
                        flex-wrap: wrap;
                        justify-content: space-between;
                        border-bottom: 1px solid ${font.primary};
                        padding-top: 40px;
                    }

                    .project-gallery:nth-child(1) {
                        padding-top: 0;
                    }

                    .title-row {
                        display: flex;
                        flex-flow: row;
                        width: 100%;
                    }

                    .main-container {
                        width: 40%;
                        margin: 0 40px 20px 0;
                        box-sizing: border-box;
                    }

                    .image-container {
                        width: calc(50% - 20px);
                        margin-bottom: 40px;
                    }

                    .title-row .image-container {
                        width: 60%;
                        overflow: hidden;
                        display: flex;
                        align-items: flex-start;
                        justify-content: center;
                    }

                    .image-container .gallery-photo {
                        width: 100%;
                        height: auto;
                    }

                    .image-container.wide {
                        width: 100%;
                    }

                    .title-row .image-container .gallery-photo {
                        width: auto;
                        height: 100%;
                    }

                    .credit {
                        font-size: 0.8em;
                    }

                    @media screen and (max-width: 1440px) {
                        .image-container {
                            width: calc(50% - 10px);
                            margin-bottom: 20px;
                        }
                    }

                    @media screen and (max-width: 1000px) {
                        .project-gallery {
                            padding-top: 25px;
                        }
                        .title-row {
                            flex-flow: column;
                            margin: 0;
                        }
                        .main-container {
                            width: 80%;
                            margin: auto;
                        }
                        .title-row .image-container {
                            width: 100%;
                            margin-top: 20px;
                        }
                        .title-row .image-container .gallery-photo {
                            width: 100%;
                            height: auto;
                        }
                    }

                    @media screen and (max-width: 600px) {
                        .main-container {
                            width: 100%;
                        }
                        .image-container {
                            width: 100%;
                        }
                        .title-image {
                            width: 100%;
                        }
                    }
                `}</style>
                <div className="title-row">
                    <div className="main-container">
                        <img className="title-image" src={title_image.url} alt={title_image.alt} />
                        <div className="description">{description ? RichText.render(description, linkResolver) : ''}</div>
                        {credit && <div className="credit">{RichText.render(credit, linkResolver)}</div>}
                    </div>
                    <div className="image-container">
                        <img className="gallery-photo" src={images[0].image.url} alt={images[0].image.alt} />
                    </div>
                </div>
                {images.length && images.map(({ image, wide }, i) => (
                    i !== 0 ?
                        <div key={i} className={`image-container ${wide ? 'wide' : ''}`}>
                            <img className="gallery-photo" src={image.url} alt={image.alt} />
                        </div>
                        : null
                ))}
            </div>
        )
    };

    return (
        <Layout>
            {projects.results.length ? projects.results.map((project, index) => (
                <ProjectGallery key={index} project={project} />
            )) : null}
        </Layout>
    );
}

Professional.getInitialProps = async ctx => {
    const req = ctx.req;
    const projects = await Client(req).query(
        Prismic.Predicates.at('document.type', 'project'),
        { orderings: '[my.project.order]' }
    );
    return {
        projects
    }
}

export default Professional;