var siteMenu = document.querySelector('.site-menu');
if (siteMenu) {
  siteMenu.classList.remove('site-menu--nojs');
  var siteMenuToggle = siteMenu.querySelector('.site-menu__toggle');
  if (siteMenuToggle) {
    siteMenuToggle.addEventListener('click', function() {
      if (siteMenu.classList.contains('site-menu--closed')) {
        siteMenu.classList.remove('site-menu--closed');
        siteMenu.classList.add('site-menu--opened');
      } else {
        siteMenu.classList.add('site-menu--closed');
        siteMenu.classList.remove('site-menu--opened');
      }
    });
  }
}

var modal = document.querySelector('.modal');
var links = document.querySelectorAll('.product a, .featured-product a');
var overlay = document.querySelector('.overlay');
if (modal && links && overlay) {
  links.forEach(function(link) {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      modal.classList.remove('modal--hidden');
      overlay.classList.remove('overlay--hidden');
    });
  });

  overlay.addEventListener('click', function(event) {
    event.preventDefault();
    modal.classList.add('modal--hidden');
    overlay.classList.add('overlay--hidden');
  });
}
