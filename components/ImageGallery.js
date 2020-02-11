const ImageGallery = ({ children, images, numberOfColumns, clickable, isVertical }) => {
    const oneSection = images && Math.floor(images.length / numberOfColumns) - (children && children.length ? 1 : 0) || 0;
    const imageArrays = [];

    if (isVertical) {
        for (let i = 0; i < numberOfColumns; i++) {
            if (i === 0) imageArrays.push(images.slice(0, oneSection));
            else if (i === numberOfColumns - 1) imageArrays.push(images.slice(oneSection * i, images.length));
            else imageArrays.push(images.slice(oneSection, oneSection * (i + 1)));
        }
    } else imageArrays.push(images);

    const VerticalColumn = ({ arr, isFirst }) => (
        <div className="column">
            {isFirst && children && children}
            {arr.map((image, index) => {
                if (image.image) image = { ...image.image, wide: image.wide };
                return clickable ? <a key={index} href={image.url}><img className="clickable" src={image.url} alt={image.alt ? image.alt : 'image'} /></a>
                    : <img key={index} src={image.url} alt={image.alt ? image.alt : 'image'} />
            })}
        </div>
    )

    const HorizontalColumn = ({ arr, isFirst }) => (
        <div className="row">
            {isFirst && children && <div className="row-child children">{children}</div>}
            {arr.map((image, index) => {
                if (image.image) image = { ...image.image, wide: image.wide };
                if (image && image.url) {
                    const wide = image.wide;
                    return clickable ? <a className={`row-child ${wide ? wide : ''}`} key={index} href={image.url}><img className="clickable" src={image.url} alt={image.alt ? image.alt : image.name} /></a>
                        : <img className={`row-child ${wide ? 'wide' : ''}`} key={index} src={image.url} alt={image.alt ? image.alt : image.name} />
                } else return null;
            })}
        </div>
    )

    return (
        <div className="photos">
            <style global jsx>{`
                .photos, .row {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-between;
                }

                .column {
                    flex: calc(100% / ${numberOfColumns});
                    max-width: calc((100% / ${numberOfColumns}) - 15px);
                    box-sizing: border-box;
                }

                .row .row-child {
                    width: calc(50% - 15px);
                    align-self: flex-end;
                }

                .row .row-child.wide {
                    width: 100%;
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

                @media screen and (max-width: 1000px) {
                    .row .children {
                        width: 100%;
                    }
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
                    .row .row-child {
                        width: 100%;
                    }
                }
            `}</style>
            {imageArrays.map((arr, i) => (
                isVertical ? <VerticalColumn key={i} arr={arr} isFirst={i === 0} />
                    : <HorizontalColumn key={i} arr={arr} isFirst={i === 0} />
            ))}
        </div>
    )
}

export default ImageGallery;