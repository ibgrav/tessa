import { useCallback } from 'react';

import Layout from '../components/Layout';
import Prismic from 'prismic-javascript';
import { RichText } from 'prismic-reactjs';
import { Client, linkResolver } from '../lib/prismic-configuration';

import useApp from '../lib/useApp';
import ImageGallery from '../components/ImageGallery';
import { fadeInOnScrollListener } from '../lib/global';

const Professional = ({ projects }) => {
    const { theme, currentPrimary } = useApp();

    const addAnimateInListener = useCallback((el) => {
        fadeInOnScrollListener(el);
    });

    const ProjectGallery = ({ project }) => {
        const { title_image, description, images, credit, is_vertical, subtitle, subtitle_color } = project.data;

        const TitleItem = () => (
            <div className="main-container">
                <div className="title-box">
                    <img className="title-image" src={title_image.url} alt={title_image.alt} />
                    <div className="subtitle" style={{ color: subtitle_color ? subtitle_color : 'inherit' }}>{subtitle ? RichText.render(subtitle, linkResolver) : ''}</div>
                </div>
                <div className="description">{description ? RichText.render(description, linkResolver) : ''}</div>
                {credit && <div className="credit">{RichText.render(credit, linkResolver)}</div>}
            </div>
        )

        return (
            <div className="project-gallery waiting-to-animate" id={project.uid} ref={addAnimateInListener}>
                <style global jsx>{`
                    .project-gallery {
                        display: flex;
                        flex-flow: row;
                        flex-wrap: wrap;
                        justify-content: space-between;
                        border-bottom: 1px solid ${theme.text[currentPrimary]};
                        padding: 20px 0 20px 0;
                    }

                    .project-gallery:nth-child(1) {
                        padding-top: 0;
                    }

                    .title-row {
                        display: flex;
                        flex-flow: row;
                        width: 100%;
                    }

                    .title-box {
                        position: relative;
                    }

                    .subtitle {
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        width: 100%;
                        text-align: right;
                        box-sizing: border-box;
                        padding: 10px 10px 20px 10px;
                        font-size: 0.9em;
                    }

                    .subtitle p {
                        margin: 0px;
                        line-height: 1.3em;
                    }

                    .title-image {
                        width: 100%;
                        height: auto;
                    }

                    .main-container {
                        width: 100%;
                    }

                    .image-container {
                        width: calc(50% - 20px);
                        margin-bottom: 40px;
                    }

                    .title-row .image-container {
                        width: 60%;
                        background-repeat: no-repeat;
                        background-position: center;
                        background-size: cover;
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

                    .description {
                        line-height: 1.3em;
                    }

                    .credit {
                        font-size: 0.8em;
                    }

                    .mobile-main-img {
                        display: none;
                    }

                    #project-list {
                        display: flex;
                        flex-flow: row;
                        justify-content: space-between;
                        flex-wrap: wrap;
                        margin-bottom: 40px;
                    }

                    #project-list a {
                        color: ${theme.link.primary};
                        text-decoration: none;
                        padding: 0 5px;
                    }

                    #project-list p {
                        margin: 5px 0;
                    }

                    #project-list a.active, #project-list a:hover {
                        color: ${theme.link.active};
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
                            width: 100%;
                            margin: auto;
                        }
                        .title-row .image-container {
                            width: 80%;
                            margin-top: 20px;
                        }
                        .title-row .image-container .gallery-photo {
                            width: 80%;
                            height: auto;
                        }
                    }

                    @media screen and (max-width: 600px) {
                        .main-container {
                            width: 100%;
                        }
                        .image-container, .title-row .image-container {
                            width: 100%;
                            margin: 10px 0;
                        }
                        .title-image {
                            width: 100%;
                        }
                        .mobile-main-img {
                            display: block;
                            width: 100%;
                            height: auto;
                        }
                    }
                `}</style>
                {images && images.length &&
                    <ImageGallery images={images} numberOfColumns={2} isVertical={is_vertical}>{(title_image || description) && <TitleItem />}</ImageGallery>
                }
            </div>
        )
    };

    const ProjectList = () => (
        projects && projects.results && projects.results.length ?
            <div id="project-list">
                {projects.results.map((project, index) => (
                    <a key={index} href={`#${project.uid}`}> {RichText.render(project.data.title)} </a>
                ))}
            </div>
            : null
    )

    return (
        <Layout>
            {/* <ProjectList /> */}
            {projects && projects.results && projects.results.length ? projects.results.map((project, index) => (
                <ProjectGallery project={project} key={index} />
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