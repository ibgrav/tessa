import fbAdmin from '../../lib/fbAdmin';

const bucket = fbAdmin.storage().bucket();

async function listFiles({ prefix, delimiter, type, sort, desc }) {
  const options = {};
  if (prefix) options.prefix = prefix.indexOf('/') < 0 ? `${prefix}/` : prefix;
  if (delimiter) options.delimiter = delimiter;

  const [files] = await bucket.getFiles(options);
  const filteredFiles = type ? files.filter(file => file.metadata.contentType === type) : files;
  const filteredFields = filteredFiles.map(file => ({
    url: `https://firebasestorage.googleapis.com/v0/b/tessa-e95ff.appspot.com/o/${encodeURIComponent(file.name)}?alt=media&token=${file.metadata.metadata.firebaseStorageDownloadTokens}`,
    type: file.metadata.contentType,
    updated: file.metadata.updated,
    name: file.name
  }));
  const sortedFiles = sort ? filteredFields.sort((a, b) => {
    if (desc) return ('' + a[sort]).localeCompare(b[sort]);
    return ('' + b[sort]).localeCompare(a[sort]);
  }) : filteredFields;
  return sortedFiles;
}

export default async (req, res) => {
  const prefix = req.query.prefix;
  const type = req.query.type;
  const sort = req.query.sort;
  const desc = req.query.desc;
  const delimiter = req.query.delimiter || '/';
  if (prefix) {
    try {
      const allFiles = await listFiles({ prefix, delimiter, type, sort, desc });
      res.status(200).json(allFiles);
    } catch {
      res.status(400).send('Something went wrong');
    }
  } else {
    res.status(400).send('Missing ?prefix=');
  }
}