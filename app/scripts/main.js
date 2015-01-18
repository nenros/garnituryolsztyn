'use strict';

var itemsToShow = 0;
var sliderInterval;

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
    document.getElementById('menuList').classList.toggle('collapsed');

  }
};

var removeCollapse = function(){
  if (document.body.clientWidth > 480 ){
    document.getElementById('menuList').classList.remove('collapsed');

  }
};

var hideMenu = function(){
  if (document.body.clientWidth < 480 ){
    document.getElementById('menuList').classList.remove('collapsed');

  }
};
var addMenuListeners = function(){
  var items = document.getElementById('menuList').getElementsByTagName('li');
  for(var i = 0; i < items.length; i++){
    addEvent(items[i],'click', hideMenu);
  }
};

var nextImage = function(){
  var slider = document.getElementById('slides');
  var slides = slider.getElementsByTagName('li');
  var el = slides[0];
  el.classList.remove('active');
  el.parentNode.appendChild(el);
  slides[itemsToShow - 1].classList.add('active');
};

var prevImage = function(){
  var slider = document.getElementById('slides');
  var slides = slider.getElementsByTagName('li');
  var el = slides[slides.length - 1];
  slides[itemsToShow - 1].classList.remove('active');
  el = slider.insertBefore(el, slides[0]);
  el.classList.add('active');
};

var sliderItems = function(){
  var slider = document.getElementById('slides');
  var slides = slider.getElementsByTagName('li');
  var width = slider.offsetWidth;
 if (document.body.clientWidth  <= 480) {
   slides.forEach(function(slide){
     slide.classList.remove('active');
   });
   return;
 }
  var newItemsToShow = Math.round(width / 300);
  if (newItemsToShow !== itemsToShow){
    slider.classList.remove('item-'+itemsToShow);
    slider.classList.add('item-'+newItemsToShow);
    for(var i =0; i < slides.length; i++){
      if(i < newItemsToShow) {
      slides[i].classList.add('active');
    } else {
      slides[i].classList.remove('active');
    }
    }

    itemsToShow = newItemsToShow;
  }
};

var menuTitle = document.getElementById('menuCollapse');

var nextImageButton = document.getElementById('next');
var prevImageButton = document.getElementById('prev');
var slider = document.getElementById('slider');

addEvent(menuTitle, 'click', menuCollapse);
addEvent(window, 'resize', removeCollapse);
addEvent(window, 'resize', sliderItems);
addEvent(document, 'DOMContentLoaded', addMenuListeners);
addEvent(document, 'DOMContentLoaded', sliderItems);
addEvent(nextImageButton, 'click', nextImage);
addEvent(prevImageButton, 'click', prevImage);

addEvent(slider, 'mouseover', function(){
  clearInterval(sliderInterval);
});

addEvent(slider, 'mouseout', function(){
  sliderInterval = setInterval(nextImage, 3000);
});
