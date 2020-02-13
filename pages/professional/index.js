import Layout from '../../lib/Layout';
import { Client } from '../../lib/prismic';
import Prismic from 'prismic-javascript';
import Cards from '../../lib/Cards';

const Professional = ({ items, meta }) => {
  console.log({ professionalItems: items })

  return (
    <Layout meta={meta}>
      <Cards items={items} />
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