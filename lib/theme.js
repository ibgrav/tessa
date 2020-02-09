export default (isDark) => {
    if (isDark) return {
        font: {
            primary: '#fef9f7'
        },
        bg: {
            primary: '#333'
        }
    }
    else return {
        font: {
            primary: '#333'
        },
        bg: {
            primary: '#fef9f7'
        }
    }
}