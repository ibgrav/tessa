const Help = () => {
  return (
    <div style={{margin: '20px'}}>
      <h2>Helpful Links:</h2>
      <ul>
        <li>Content: <a href="https://tessa.prismic.io/" target="_blank">Prismic</a></li>
        <li>Media: <a href="https://console.firebase.google.com/u/0/project/tessa-e95ff/storage/tessa-e95ff.appspot.com/files~2F" target="_blank">Firebase Storage</a></li>
        <li><a href="https://console.cloud.google.com/storage/browser/tessa-e95ff.appspot.com" target="_blank">Google Storage Bucket (Admin Only)</a></li>
        <li>Analytics: <a href="https://console.firebase.google.com/u/0/project/tessa-e95ff/analytics/app/web:ODFlZTk4N2EtYzRlMi00OGQ1LWFiNDgtOTMzOWQyZDE0ODJm/overview~2F%3Ft=1581436302788&fpn=387014740994&swu=1&sgu=1&sus=upgraded&cs=app.m.dashboard.overview&g=1" target="_blank">Google Analytics</a></li>
        <li>Code: <a href="https://github.com/ibgrav/tessa/" target="_blank">Github</a></li>
        <li>Host: <a href="https://zeit.co/ibgrav/tessa" target="_blank">Now.sh</a></li>
        <li>Dev Site: <a href="https://dev-tessa.now.sh" target="_blank">dev-tessa.now.sh</a></li>
      </ul>

      <h2>How media storage works:</h2>
      <b>Home</b>
      <ul>
        <li>The newest-uploaded file to <a href="https://console.firebase.google.com/u/0/project/tessa-e95ff/storage/tessa-e95ff.appspot.com/files~2Fhome-video" target="_blank">/home-video</a> will be used as the background auto-play video for the homepage</li>
      </ul>
      <b>About</b>
      <ul>
        <li>The about photo will use the about.jpg used in the <a href="https://console.firebase.google.com/u/0/project/tessa-e95ff/storage/tessa-e95ff.appspot.com/files~2Fabout" target="_blank">/about</a> folder</li>
      </ul>
      <b>Personal</b>
      <ul>
        <li>All photos inside <a href="https://console.firebase.google.com/u/0/project/tessa-e95ff/storage/tessa-e95ff.appspot.com/files~2Fpersonal" target="_blank">/personal</a> will be used, ordered by newest first.</li>
        <li>The photo gallery is three vertical columns, starting on the left. The newest photo is on the top left, descending down.</li>
      </ul>
      <b>Professional</b>
      <ul>
        <li></li>
      </ul>
      <b>Academic</b>
      <ul>
        <li></li>
      </ul>
    </div>
  )
}

export default Help;