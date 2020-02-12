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
                if (image.image) image = { ...image.image, ...image };
                return clickable ? <a key={index} href={image.url}><img className="clickable" src={image.url} alt={image.alt ? image.alt : 'image'} /></a>
                    : <img key={index} src={image.url} alt={image.alt ? image.alt : 'image'} />
            })}
        </div>
    )

    const HorizontalColumn = ({ arr, isFirst }) => (
        <div className="row">
            {isFirst && children && <div className="row-child children">{children}</div>}
            {arr.map((image, index) => {
                if (image.image) image = { ...image.image, ...image };
                if (image && image.url) {
                    const wide = image.wide;
                    return clickable ? <a className={`row-child ${wide ? wide : ''}`} key={index} href={image.url}><img className="clickable" src={image.url} alt={image.alt ? image.alt : image.name} /></a>
                        : <img className={`row-child ${wide ? 'wide' : ''}`} key={index} src={image.url} alt={image.alt ? image.alt : image.name} />
                } else return null;
            })}
        </div>
    )

    return (
        <div className="image-gallery">
            <style global jsx>{`
                .image-gallery .column {
                    flex: calc(100% / ${numberOfColumns});
                    max-width: calc((100% / ${numberOfColumns}) - 15px);
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