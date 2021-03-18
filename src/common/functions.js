export function appendClassName(className) {
  return className ? ` ${className}` : '';
}

export function getCookie() {
  const cookieList = document.cookie.split('; ');
  const cookie = {};
  cookieList.forEach((item) => {
    const [key, value] = item.split('=');
    cookie[key] = value;
  });
  return cookie;
}

export function setCookie(object) {
  Object.entries(object).forEach(([key, value]) => {
    document.cookie = `${key}=${value}`;
  });
}

export function deleteCookie(...names) {
  names.forEach((name) => (document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`));
}
