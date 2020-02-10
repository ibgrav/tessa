const ImageGallery = ({ children, images, numberOfColumns, clickable, isVertical }) => {
    const oneSection = images && Math.floor(images.length / numberOfColumns) - (children && children.length ? 1 : 0) || 0;
    const imageArrays = [];

    console.log({images})

    if (isVertical) {
        for (let i = 0; i < numberOfColumns; i++) {
            if (i === 0) imageArrays.push(images.slice(0, oneSection));
            else if (i === numberOfColumns - 1) imageArrays.push(images.slice(oneSection * i, images.length));
            else imageArrays.push(images.slice(oneSection, oneSection * (i + 1)));
        }
    } else {
        // let imageSet = [];
        // images.forEach((image, index) => {
        //     if (children && children.length && index === 0) imageArrays.push([image]);
        //     else if (imageSet.length === 2) {
        //         imageArrays.push(imageSet);
        //         imageSet = [image];
        //     } else if (image.is_wide) imageArrays.push([image]);
        //     else imageSet.push(image);
        // });
        imageArrays.push(images);
    }

    console.log({ imageArrays })

    const VerticalColumn = ({ arr, isFirst }) => (
        <div className="column">
            {isFirst && children && children}
            {arr.map(({ image }, index) => (
                clickable ? <a key={index} href={image.url}><img className="clickable" src={image.url} alt={image.alt ? image.alt : ''} /></a>
                    : <img key={index} src={image.url} alt={image.alt ? image.alt : ''} />
            ))}
        </div>
    )

    const HorizontalColumn = ({ arr, isFirst }) => (
        <div className="row">
            {isFirst && children && <div className="row-child">{children}</div>}
            {arr.map(({ image, wide }, index) => (
                clickable ? <a className={`row-child ${wide ? wide : ''}`} key={index} href={image.url}><img className="clickable" src={image.url} alt={image.alt ? image.alt : ''} /></a>
                    : <img className={`row-child ${wide ? 'wide' : ''}`} key={index} src={image.url} alt={image.alt ? image.alt : ''} />
            ))}
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
            {imageArrays.map((arr, i) => (
                isVertical ? <VerticalColumn key={i} arr={arr} isFirst={i === 0} />
                    : <HorizontalColumn key={i} arr={arr} isFirst={i === 0} />
            ))}
        </div>
    )
}

export default ImageGallery;