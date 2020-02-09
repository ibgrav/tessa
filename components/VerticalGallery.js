const VerticalGallery = ({ children, images, numberOfColumns, clickable }) => {
    const oneSection = Math.floor(images.length / numberOfColumns) - (children.length ? 1 : 0);
    const arrs = [];

    for (let i = 0; i < numberOfColumns; i++) {
        if (i === 0) arrs.push(images.slice(0, oneSection));
        else if (i === numberOfColumns - 1) arrs.push(images.slice(oneSection * i, images.length));
        else arrs.push(images.slice(oneSection, oneSection * (i + 1)));
    }

    const PhotoColumn = ({ arr, isFirst }) => (
        <div className="column">
            {isFirst && children && children}
            {arr.map(({ image }, index) => (
                clickable ? <a key={index} href={image.url}><img className="clickable" src={image.url} alt={image.alt ? image.alt : ''} /></a>
                    : <img key={index} src={image.url} alt={image.alt ? image.alt : ''} />
            ))}
        </div>
    )

    return (
        <div className="photos">
            <style global jsx>{`
                .photos {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-between;
                }

                .column {
                    flex: calc(100% / ${numberOfColumns});
                    max-width: calc((100% / ${numberOfColumns}) - 15px);
                    box-sizing: border-box;
                }

                .photos img {
                    margin: 15px 0;
                    vertical-align: middle;
                    width: 100%;
                    transition: transform 1000ms;
                }

                .photos img.clickable:hover {
                    transform: scale(1.02);
                    cursor: pointer;
                }

                @media screen and (max-width: 800px) {
                    .column {
                        flex: 100%;
                        max-width: 100%;
                        padding: 0;
                    }
                    .photos img {
                        margin: 10px 0;
                    }
                }
            `}</style>
            {arrs.map((arr, i) => <PhotoColumn key={i} arr={arr} isFirst={i === 0} />)}
        </div>
    )
}

export default VerticalGallery;