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
