
import Prismic from 'prismic-javascript';

export const apiEndpoint = 'https://tessa.cdn.prismic.io/api/v2';
export const accessToken = process ? process.env.prismic_access_token : '';

// Client method to query documents from the Prismic repo
export const Client = (req = null) => (
  Prismic.client(apiEndpoint, createClientOptions(req, accessToken))
)

const createClientOptions = (req = null, prismicAccessToken = null) => {
  const reqOption = req ? { req } : {};
  const accessTokenOption = prismicAccessToken ? { accessToken: prismicAccessToken } : {};
  return {
    ...reqOption,
    ...accessTokenOption,
  }
}

export const linkResolver = (doc) => {
  switch (doc.type) {
    case 'home': return '/';
    case 'metadata': return '/about';
    case 'academic': return '/academic/' + doc.uid;
    case 'project': return '/professional#' + doc.uid;
    default: return `/${doc.uid ? doc.uid : doc.type}`;
  }
};