import Social from './Social';
import theme from './theme';

export default ({ children, isHome }) => {
    const { font, bg } = theme();

    return (
        <div id="layout">
            <style jsx>{`
                #header {
                    width: 1400px;
                    margin: 60px auto;
                }
            `}</style>

            <div id="header">header</div>
            <div id="container">{children}</div>
            <div id="footer"><Social color="black" /></div>
        </div>
    )
}