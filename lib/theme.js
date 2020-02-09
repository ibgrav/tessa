export default (isDark) => {
    if (isDark) return {
        font: {
            primary: '#fef9f7',
            link: '#78b2de',
            active: '#c58c8c'
        },
        bg: {
            primary: '#333'
        }
    }
    else return {
        font: {
            primary: '#333',
            link: '#78b2de',
            active: '#c58c8c'
        },
        bg: {
            primary: '#fef9f7'
        }
    }
}