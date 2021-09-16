function checkEnter(e){
    console.log({e})
    e = e || event;
    var txtArea = /textarea/i.test((e.target || e.srcElement).tagName);
    return txtArea || (e.keyCode || e.which || e.charCode || 0) !== 13;
}
if (document.querySelector("form")) {
    document.querySelector("form").onkeypress = checkEnter;
}