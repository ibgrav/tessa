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

      <h2>Additional Info:</h2>
      <ul>
        <li>There is a monthly bandwidth limit of 100GB for Prismic (aka, every time someone views the site and sees an image, it counts towards the bandwidth).</li>
        <li>Prismic should automatically compress images for the most efficiant space-saving quality, but be aware of the limit (I'm sure it'll be fine, unless like 5,000 people visit the site all of a sudden</li>
        <li>You can check the current bandwidth usage <a href="https://tessa.prismic.io/settings/bandwidth/" target="_blank">here</a>.</li>
      </ul>
    </div>
  )
}

export default Help;