export const debounce = (func, wait, immediate) => {
    var timeout;
    return function () {
        var context = this,
            args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    }
}

export const absoluteUrl = (req, localhostAddress) => {
    if (localhostAddress === void 0) {
        localhostAddress = 'localhost:3000'
    }
    var host = (req ? req.headers.host : window.location.host) || localhostAddress
    var protocol = /^localhost(:\d+)?$/.test(host) ? 'http:' : 'https:'
    if (
        req &&
        req.headers['x-forwarded-host'] &&
        typeof req.headers['x-forwarded-host'] === 'string'
    ) {
        host = req.headers['x-forwarded-host']
    }
    if (
        req &&
        req.headers['x-forwarded-proto'] &&
        typeof req.headers['x-forwarded-proto'] === 'string'
    ) {
        protocol = req.headers['x-forwarded-proto'] + ':'
    }
    return {
        protocol: protocol,
        host: host,
        origin: protocol + '//' + host,
    }
}

function addQuery(obj) {
    let query = '';
    if (obj[Object.keys(obj)[0]]) {
        const key = Object.keys(obj)[0];
        query = `&${key}=${obj[key]}`;
    }
    return query;
}

export const storageFetch = async ({ req, prefix, delimiter, type, sort, desc }) => {
    const { origin } = absoluteUrl(req, 'localhost:3000');
    const url = `${origin}/api/storage?prefix=${prefix}${addQuery({ delimiter })}${addQuery({ type })}${addQuery({ sort })}${addQuery({ desc })}`;
    console.log({ storageFetch: url });
    const request = await fetch(url);
    const data = request.json();
    return data;
}

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

export const fadeInOnScrollListener = (el) => {
    if (!window.fadeInElements) window.fadeInElements = [];
    if (el && document.body.contains(el) && window.fadeInElements.indexOf(el) === -1) {
        window.fadeInElements.push(el);

        const triggerAnimateIn = (ev, elOverwrite) => {
            console.log({ elOverwrite });
            const element = elOverwrite || el;
            if (element && document.body.contains(element)) {
                const placement = element.getBoundingClientRect();
                const trigger = window.innerHeight * 0.9;

                if (!element.classList.contains('animate-in') && placement.top < trigger) {
                    element.classList.add('animate-in');
                }
            }
        }

        const checkElementArray = () => {
            window.fadeInElements && window.fadeInElements.forEach(element => {
                console.log({ element })
                triggerAnimateIn(null, element);
            });
        }

        console.log(document.readyState);
        if (document.readyState == "complete") checkElementArray();
        else document.addEventListener("DOMContentLoaded", checkElementArray);
        window.addEventListener('scroll', debounce(triggerAnimateIn, 100));
    }
}