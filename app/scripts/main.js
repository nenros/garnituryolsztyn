"use strict";

var addEvent = function(el, eventType, handler) {
  if (el.addEventListener) { // DOM Level 2 browsers
    el.addEventListener(eventType, handler, false);
  } else if (el.attachEvent) { // IE <= 8
    el.attachEvent('on' + eventType, handler);
  } else { // ancient browsers
    el['on' + eventType] = handler;
  }
};

var menuCollapse = function(){
  if (document.body.clientWidth < 480 ){
    document.getElementById("menuList").classList.toggle("collapsed");

  }
};

var removeCollapse = function(){
  if (document.body.clientWidth > 480 ){
    document.getElementById("menuList").classList.remove("collapsed");

  }
};

var hideMenu = function(){
  if (document.body.clientWidth < 480 ){
    document.getElementById("menuList").classList.remove("collapsed");

  }
};
var addMenuListeners = function(){
  var items = document.getElementById("menuList").getElementsByTagName("li")
  for(var i = 0; i < items.length; i++){
    addEvent(items[i],"click", hideMenu)
  }
};

var nextImage = function(){
  var items = document.getElementById("slider").getElementsByTagName("li")
  var first_with_class = false;
  for(var i= 0; i < items.length; i++){
    if(items[i].classList.contains('active') && (first_with_class == false)){
      items[i].classList.remove('active')
      var temp = items[i]

      items[items.length] = temp
      items[i+3].classList.add('active')
      break
    }
  }
}
var prevImage = function(){
  var items = document.getElementById("slider").getElementsByTagName("li")
  console.log(items)
}

var menuTitle = document.getElementById("menuCollapse");

var nextImageButton = document.getElementById("next");
var prevImageButton = document.getElementById("prev");

addEvent(menuTitle, 'click', menuCollapse);
addEvent(window, 'resize', removeCollapse);
addEvent(document, "DOMContentLoaded", addMenuListeners);
addEvent(nextImageButton, 'click', nextImage);
addEvent(prevImageButton, 'click', prevImage);


