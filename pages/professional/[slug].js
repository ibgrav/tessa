import Layout from '../../lib/Layout';
import Prismic from 'prismic-javascript';
import { RichText } from 'prismic-reactjs';
import { Client, linkResolver } from '../../lib/prismic';

import ImageGallery from '../../lib/ImageGallery';

const Project = ({ project, meta }) => {

  console.log({ project })

  const ProjectGallery = ({ project }) => {
    const { card_image, description, images, credit, is_vertical, subtitle, subtitle_color } = project.data;

    const TitleItem = () => (
      <div className="main-container">
        <div className="title-box">
          <img className="title-image" src={card_image.url} alt={card_image.alt} />
          <div className="subtitle" style={{ color: subtitle_color ? subtitle_color : 'inherit' }}>{subtitle ? RichText.render(subtitle, linkResolver) : ''}</div>
        </div>
        <div className="description">{description ? RichText.render(description, linkResolver) : ''}</div>
        {credit && <div className="credit">{RichText.render(credit, linkResolver)}</div>}
      </div>
    )

    return (
      <div className="project-gallery" id={project.uid}>
        {images && images.length &&
          <ImageGallery images={images} numberOfColumns={2} isVertical={is_vertical}>{(card_image || description) && <TitleItem />}</ImageGallery>
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
    <Layout meta={meta}>
      <div className="professional-project">
        {/* <ProjectList /> */}
        {project && project.data ? <ProjectGallery project={project} /> : null}
      </div>
    </Layout>
  );
}

Project.getInitialProps = async ctx => {
  const slug = ctx.query.slug;
  const meta = await Client(ctx.req).getSingle('metadata');
  const project = await Client(ctx.req).query(
    Prismic.Predicates.at('my.project.uid', slug),
    { orderings: '[my.project.order]' }
  );
  return { project: project && project.results[0], meta }
}

export default Project;