export const getCookieValue = (cookieName) => {
    let cookieVal = null;
    const cookies = document.cookie.split("; ");

    cookies.forEach(cookie => {
        let vals = cookie.split('=');
        if (vals[0] === cookieName) cookieVal = vals[1]
    });

    return cookieVal;
}

export const deleteCookie = (cookieName) => {
    console.log('Deleting cookie: ', cookieName);
    document.cookie = `${cookieName};path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}

export const setCookie = (name, val) => {
    console.log('Setting cookie: ', name, '=', val);
    document.cookie = `${name}=${val};path=/;`;
}