import Link from 'next/link';
import Layout from '../../components/Layout';

export default () => {

    const photos = [
        {
            src: '1.jpg'
        },
        {
            src: '2.jpg'
        },
        {
            src: '3.jpg'
        },
        {
            src: '4.jpg'
        },
        {
            src: '5.jpg'
        },
        {
            src: '6.jpg'
        },
        {
            src: '7.jpg'
        },
        {
            src: '8.jpg'
        },
        {
            src: '9.jpg'
        },
        {
            src: '10.jpg'
        },
        {
            src: '11.jpg'
        },
        {
            src: '12.jpg'
        },
        {
            src: '13.jpg'
        },
        {
            src: '14.jpg'
        },
        {
            src: '15.jpg'
        },
        {
            src: '16.jpg'
        }
    ];

    const PhotoColumn = ({ arr }) => (
        <div className="column">
            {arr.map((photo, index) => (
                <Link key={index} href={`../personal/${photo.src}`}><img src={`../personal/${photo.src}`} alt={photos.alt ? photos.alt : ''} /></Link>
            ))}
        </div>
    )

    const PhotoGallery = () => {
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
                        flex: 50%;
                        max-width: 50%;
                    }
                }

                @media screen and (max-width: 600px) {
                    .column {
                        flex: 100%;
                        max-width: 100%;
                    }
                }
            `}</style>
            <PhotoGallery />
        </Layout>
    );
}