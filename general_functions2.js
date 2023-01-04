const default_cookie_exp = 365
      
function setCookie(cookieName, cookieValue, nDays) {
 
    var today = new Date();
    var expire = new Date();

    if (!nDays) 
        nDays=default_cookie_exp;
  console.log('cookieName: ' + cookieName)
  console.log('cookieValue: ' + cookieValue)
  console.log('nDays: ' + nDays)
    expire.setTime(today.getTime() + 3600000*24*nDays);
     document.cookie = cookieName+"="+escape(cookieValue) + ";expires="+expire.toGMTString();
    return false
}

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) {
    var cookieValue = parts.pop().split(";").shift();
    try {
      return JSON.parse(decodeURIComponent(cookieValue));
    } catch(e) {
      return decodeURIComponent(cookieValue);
    }
  }
}
