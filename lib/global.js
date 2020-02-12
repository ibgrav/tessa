let initialHeaderHeight = null;

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

export const getThemeFromMeta = (meta) => {
  return {
    text: {
      primary: meta.data.text_primary,
      secondary: meta.data.text_secondary
    },
    link: {
      primary: meta.data.link_primary,
      active: meta.data.link_active
    },
    background: {
      primary: meta.data.background_primary,
      secondary: meta.data.background_secontary
    }
  }
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

export const triggerStickyHeader = () => {
  const layout = document.querySelector('#layout');
  const header = document.querySelector('#layout .header');
  if (layout && header) {
    const scroll = window.pageYOffset;
    const hasSticky = layout.classList.contains('sticky');
    const menu = document.querySelector('#layout .mobile-tabs');

    if (!initialHeaderHeight) initialHeaderHeight = header.offsetHeight;

    if (scroll > initialHeaderHeight && !hasSticky) {
      layout.classList.add('sticky');
      menu.classList.remove('open');
    } else if (scroll < (initialHeaderHeight + 50) && hasSticky) {
      layout.classList.remove('sticky');
      menu.classList.remove('open');
    }
  }
}

export const setListeners = () => {
  window.addEventListener('scroll', debounce(triggerStickyHeader, 10));
}