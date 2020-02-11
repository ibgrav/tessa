import { useCallback } from 'react';
import Link from 'next/link';

import { RichText } from 'prismic-reactjs';
import { Client, linkResolver } from '../lib/prismic-configuration';
import { storageFetch } from '../lib/global';
import Social from '../components/Social';

const Home = ({ doc, video }) => {
    const videoMounted = useCallback((vid) => {
        if (vid) {
            const src = vid.dataset.src;
            console.log({ vid, src })
            vid.src = src;
            vid.play();
        }
    });

    console.log({ doc, video, linkResolver: linkResolver(doc) })

    return (
        <div id="home">
            <style global jsx>{`
                body {
                    overflow: hidden !important;
                }

                #home {
                    position: fixed;
                    width: 100%;
                    height: 100%;
                    animation: fade-in 3s forwards;
                }

                #bg-vid {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    z-index: 1;
                    min-height: 101vh;
                    min-width: 101vw;
                }

                #content {
                    position: absolute;
                    left: calc(50% - 440px);
                    width: 880px;
                    top: 0;
                    z-index: 10;
                    display: flex;
                    flex-flow: column;
                    justify-content: space-between;
                    height: 100%;
                    padding: 40px;
                    box-sizing: border-box;
                    color: #fff;
                }

                #content img {
                    height: 94px;
                    margin: 0 auto;
                    display: block;
                }

                #content #blurb {
                    text-align: center;
                }

                #content #title h1 {
                    font-size: 5em;
                    font-weight: 500;
                    line-height: 0.6em;
                    padding-bottom: 22px;
                    letter-spacing: 8px;
                    margin: 0;
                    user-select: none;
                }

                #content #subtext h2 {
                    font-weight: 300;
                    font-size: 1.3em;
                    user-select: none;
                }

                #content #launch {
                    margin: 40px auto;
                    background: transparent;
                    border: 2px solid white;
                    padding: 10px 20px;
                    color: white;
                    text-decoration: none;
                    display: inline-block;
                    user-select: none;
                }

                #video-cover {
                    z-index: 10;
                    position: absolute;
                    width: 100%;
                    height: 100%;
                }

                @keyframes fade-in {
                    from {opacity: 0}
                    to {opacity: 1}
                }

                @keyframes zoom-in {
                    from {transform: scale(0.9)}
                    to {transform: scale(1)}
                }

                @media screen and (max-width: 880px) {
                    #content {
                        width: 100%;
                        left: 0;
                    }
                }

                @media screen and (max-width: 600px) {
                    #content {
                        padding: 40px 20px;
                    }
                }
            `}</style>
            <video id="bg-vid" ref={videoMounted} data-src={video.url} type="video/mp4" poster={doc.data.video_poster.url} playsInline autoPlay loop muted />
            {/* <div id="video-ratio">
                <iframe
                    id="bg-vid"
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media;"
                    title="YouTube video player"
                    width="100%"
                    height="100%"
                    src="https://youtube.com/embed/rBmXYYeLKT0?autoplay=1&controls=0&showinfo=0&autohide=1&background=1&mute=1&loop=1"
                ></iframe>
            </div> */}
            <div id="video-cover"></div>
            <div id="content">
                <img id="logo" src={doc.data.header.url} alt={doc.data.header.alt ? doc.data.header.alt : "tessa crespo"} />
                <div id="blurb">
                    <div id="title">{doc.data.title ? RichText.render(doc.data.title, linkResolver) : 'tessa crespo'}</div>
                    <div id="subtext">{doc.data.subtitle ? RichText.render(doc.data.subtitle, linkResolver) : ''}</div>{console.log(doc.data.button_link)}
                    <Link href={linkResolver(doc.data.button_link)}><a id="launch">{doc.data.button_text ? doc.data.button_text : 'story time'}</a></Link>
                </div>
                <Social />
            </div>
        </div>
    )
}

Home.getInitialProps = async ctx => {
    const req = ctx.req;
    const home = await Client(req).getSingle('home');
    const video = await storageFetch({ req, prefix: 'home-video', type: 'video/mp4', sort: 'updated' });
    console.log({ video })
    return {
        doc: home,
        video: video[0]
    }
}

export default Home;