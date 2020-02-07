import { useCallback } from 'react';

import Social from '../components/Social';

export default () => {
    const videoMounted = useCallback((vid) => {
        console.log({ vid })
        if (vid) vid.play();
    });

    return (
        <div id="home">
            <style jsx>{`
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
                        min-height: 100vh;
                        min-width: 100vw;
                        margin-top: -1px;
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
                        animation: zoom-in 1s forwards;
                    }

                    #content img {
                        height: 94px;
                        margin: 0 auto;
                        display: block;
                    }

                    #content #blurb {
                        text-align: center;
                    }

                    #content #title {
                        font-size: 5em;
                        font-weight: 500;
                        line-height: 0.6em;
                        padding-bottom: 22px;
                        letter-spacing: 8px;
                        margin: 0;
                    }

                    #content #subtext {
                        font-weight: 300;
                        font-size: 1.3em;
                    }

                    #content #launch {
                        margin: 40px auto;
                        background: transparent;
                        border: 2px solid white;
                        padding: 10px 20px;
                        color: white;
                        text-decoration: none;
                        display: inline-block;
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
            <video id="bg-vid" ref={videoMounted} src="/pleasure_360.mp4" type="video/mp4" autoPlay loop muted poster="/poster.png" />
            <div id="content">
                <img id="logo" src="home-logo.png" />
                <div id="blurb">
                    <h1 id="title">tessa crespo</h1>
                    <div id="subtext">architecture, graphic design, motion graphics, data visualization, film work</div>
                    <a id="launch" href="/story/academic">story time</a>
                </div>
                <Social />
            </div>
        </div>
    )
}
