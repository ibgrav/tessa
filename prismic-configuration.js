
import Prismic from 'prismic-javascript'

export const apiEndpoint = 'https://tessa.cdn.prismic.io/api/v2'
export const accessToken = 'MC5YajlTMmhNQUFDQUFtYVE1.77-9aANg77-977-977-9QgIiMEvvv73vv71DKe-_vU1TFFtM77-977-977-9I--_vQ1b77-9EQk';

// Client method to query documents from the Prismic repo
export const Client = (req = null) => (
  Prismic.client(apiEndpoint, createClientOptions(req, accessToken))
)

const createClientOptions = (req = null, prismicAccessToken = null) => {
  const reqOption = req ? { req } : {}
  const accessTokenOption = prismicAccessToken ? { accessToken: prismicAccessToken } : {}
  return {
    ...reqOption,
    ...accessTokenOption,
  }
}

export const linkResolver = (doc) => {
  // Pretty URLs for known types
  if (doc.type === 'academic') return "/academic/" + doc.uid;
  if(doc.link_type === 'Document' && doc.uid) return doc.uid;
  // Fallback for other types, in case new custom types get created
  return "/" + doc.uid;
};

export const hrefResolver = (doc) => {
  if (doc.type === 'academic') {
    return '/academic/[uid]'
  }
  return '/'
}