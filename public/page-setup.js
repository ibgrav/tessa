// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCPUFkzdNSJtekNuLS-rTO3PS9eKooAuyQ",
  authDomain: "tessa-e95ff.firebaseapp.com",
  databaseURL: "https://tessa-e95ff.firebaseio.com",
  projectId: "tessa-e95ff",
  storageBucket: "tessa-e95ff.appspot.com",
  messagingSenderId: "387014740994",
  appId: "1:387014740994:web:dd9ff74f403d18a018ab1b",
  measurementId: "G-55H8ZK41DW"
};
// Initialize Firebase
if (firebase) {
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
}

window.prismic = { endpoint: 'https://tessa.cdn.prismic.io/api/v2' };