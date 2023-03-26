const default_cookie_exp = 365
      
function setCookie(cookieName, cookieValue, nDays) {
    console.log(name)    
    var today = new Date();
    var expire = new Date();

    if (!nDays) 
        nDays=default_cookie_exp;

    expire.setTime(today.getTime() + 3600000*24*nDays);
     document.cookie = cookieName+"="+escape(cookieValue) + ";expires="+expire.toGMTString();
    return false
}

function getCookie(name) {
  console.log(name)
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

function setCookies(selectors,trigger){
      trigger.forEach((elem) => {
          elem.addEventListener("change", () => { 
          for (const cookieName of selectors){
            var cookieValue = document.getElementById(cookieName)
            setCookie(cookieName, cookieValue.checked)
          }
            })      
      });
}
