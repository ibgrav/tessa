import { useState, useEffect } from 'react';
import { Client } from '../prismic-configuration';

import Link from 'next/link';
import Layout from '../components/Layout';

const Personal = ({ doc }) => {
    const [state, setState] = useState({
        photosMounted: false
    });

    useEffect(() => {
        if (!state.photosMounted) setState(state => ({ ...state, photosMounted: true }));
    }, []);

    const PhotoColumn = ({ arr }) => (
        <div className="column">
            {arr.map(({ image }, index) => (
                <a key={index} href={image.url}><img src={image.url} alt={image.alt ? image.alt : ''} /></a>
            ))}
        </div>
    )

    const PhotoGallery = () => {
        const photos = doc.data.images;
        const oneThird = Math.floor(photos.length / 3);
        const first = photos.slice(0, oneThird);
        const second = photos.slice(oneThird, oneThird * 2);
        const third = photos.slice(oneThird * 2, photos.length);

        return (
            <div id="photos">
                <PhotoColumn arr={first} />
                <PhotoColumn arr={second} />
                <PhotoColumn arr={third} />
            </div>
        )
    }

    return (
        <Layout>
            <style global jsx>{`
                #photos {
                    display: flex;
                    flex-wrap: wrap;
                }

                .column {
                    flex: calc(100% /3);
                    max-width: calc(100% /3);
                    padding: 0 15px;
                    box-sizing: border-box;
                }

                #photos img {
                    margin: 15px 0;
                    vertical-align: middle;
                    width: 100%;
                    transition: transform 1000ms;
                }

                #photos img:hover {
                    transform: scale(1.02);
                    cursor: pointer;
                }

                @media screen and (max-width: 800px) {
                    .column {
                        flex: 100%;
                        max-width: 100%;
                        padding: 0;
                    }
                    #photos img {
                        margin: 10px 0;
                    }
                }
            `}</style>
            <PhotoGallery />
        </Layout>
    );
}


Personal.getInitialProps = async ctx => {
    const req = ctx.req;
    const doc = await Client(req).getSingle('personal');
    return { doc }
}

export default Personal;