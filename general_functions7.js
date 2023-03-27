const default_cookie_exp = 365
      
function setCookie(cookieName, cookieValue, nDays) {
    var today = new Date();
    var expire = new Date();

    if (!nDays) 
        nDays=default_cookie_exp;

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

function count_inputs(block_ID) {
	var counter = 0
	var check_block = $("#"+block_ID+" :input"); 
  for (element of check_block ) {
      if (element.type == "checkbox" || element.type == "radio") {
          if(element.checked) { 
              counter = counter + 1}
      } else if (element.type == "text" || element.type == "number" ||  element.type == "select" ||  element.type == "email" || element.type == "select-one" ||  element.type == "textarea" ) {
          if(element.value.length > 0){
              counter = counter + 1
          }    
      }
  }
	return counter 
}

