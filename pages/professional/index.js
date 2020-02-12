import Layout from '../../lib/Layout';
import { Client } from '../../lib/prismic';
import Prismic from 'prismic-javascript';
import Link from 'next/link';

const Professional = ({ items, meta }) => {
  console.log({ professionalItems: items })

  return (
    <Layout meta={meta}>
      <div id="professional">
        {items.length && items.map((item, index) => (
          <Link href={`/professional/${item.uid}`} key={index}><img className="title-img" src={item.data.title_image.url ? item.data.title_image.url : item.data.images[0].image.url} /></Link>
        ))}
      </div>
    </Layout>
  );
}

Professional.getInitialProps = async ctx => {
  const meta = await Client(ctx.req).getSingle('metadata');
  const items = await Client(ctx.req).query(
    Prismic.Predicates.at('document.type', 'project'),
    { orderings: '[my.project.order]' }
  );
  return { items: items && items.results, meta }
}

export default Professional;