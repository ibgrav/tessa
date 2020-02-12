import Link from 'next/link';
import { RichText } from 'prismic-reactjs';
import { Client, linkResolver } from '../lib/prismic';
import Social from '../lib/Social';

const Home = ({ home }) => {
  return (
    <div id="home">
      <style global jsx>{`
        body {
          overflow: hidden !important;
        }
      `}</style>
      <video className="bg-vid" src={home.data.video.url} type="video/mp4" poster={home.data.video_poster.url} playsInline autoPlay loop muted />
      <div className="video-cover"></div>
      <div className="content">
        <img className="logo" src={home.data.header.url} alt={home.data.header.alt ? home.data.header.alt : "tessa crespo"} />
        <div className="blurb">
          <div className="title">{home.data.title ? RichText.render(home.data.title, linkResolver) : 'tessa crespo'}</div>
          <div className="subtext">{home.data.subtitle ? RichText.render(home.data.subtitle, linkResolver) : ''}</div>{console.log(home.data.button_link)}
          <Link href={linkResolver(home.data.button_link)}><a className="launch">{home.data.button_text ? home.data.button_text : 'story time'}</a></Link>
        </div>
        <Social />
      </div>
    </div>
  )
}

Home.getInitialProps = async ctx => {
  const home = await Client(ctx.req).getSingle('home');
  console.log({ home });
  return { home }
}

export default Home;