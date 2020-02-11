import * as admin from 'firebase-admin';
import * as serviceAccount from '../../lib/serviceAccountKey.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  apiKey: "AIzaSyCPUFkzdNSJtekNuLS-rTO3PS9eKooAuyQ",
  authDomain: "tessa-e95ff.firebaseapp.com",
  databaseURL: "https://tessa-e95ff.firebaseio.com",
  projectId: "tessa-e95ff",
  storageBucket: "  v",
  messagingSenderId: "387014740994",
  appId: "1:387014740994:web:dd9ff74f403d18a018ab1b",
  measurementId: "G-55H8ZK41DW"
});

const bucket = admin.storage().bucket();

async function listFiles() {
  const [files] = await bucket.getFiles();

  console.log('Files:');
  files.forEach(file => {
    console.log(file.name);
  });
}

export default async (req, res) => {
  const path = req.query.path;
  if (path) {
    try {
      const allFiles = await listFiles();
      res.status(200).json(allFiles);
    } catch {
      res.status(400).send('Something went wrong with the previewSession request');
    }
  } else {
    res.status(400).send('Missing path');
  }
}