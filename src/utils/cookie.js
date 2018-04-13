function getCookie(name) {
  var cookies = document.cookie;
  var cookiesStart = cookies.indexOf(name);
  if (cookiesStart < 0)
    return "";
  else {
    var cookiesSlice = cookies.substring(cookiesStart)
    var cookieString = cookiesSlice.indexOf(";") < 0 ? cookiesSlice : cookiesSlice.substring(0, cookiesSlice.indexOf(";"))
    return unescape(cookieString.split("="))
  }
};

function setCookie(key, value, expiredTime) {
  let exdate = new Date();
  exdate.setMilliseconds(exdate.getMilliseconds() + expiredTime)
  document.cookie = key + "=" + escape(value) + ((expiredTime == null) ? "" : ";expires=" + exdate.toGMTString()) + ";path=/"
};

function removeCookie(key) {
  let exdate = new Date();
  exdate.setTime(exdate.getTime() - 1);
  var cval = getCookie(key)
  document.cookie = key + "=" + cval + ";expires=" + exdate.toGMTString() + ";path=/"
};

export {
  getCookie,
  setCookie,
  removeCookie
}
