// localization
var selectedEle = document.getElementById('selectedLng');
var optionsEle = document.getElementById('lngSelectDropDown');
var availableLngs = [];

// create select options based on project languages
if (typeof locizify !== 'undefined') {
  locizify.getLanguages(function(err, lngs) {
    availableLngs = Object.keys(lngs || {});
    availableLngs.forEach(function(l) {
      var lng = lngs[l];
      if (lng.translated.production < 0.9) return;
      var optEle = document.createElement('LI');
      var aEle = document.createElement('A')
      aEle.setAttribute('href', '/?lng=' + l);
      aEle.innerHTML = lng.nativeName;
      optEle.appendChild(aEle);
      if (optionsEle) optionsEle.appendChild(optEle);
    });

    updateSelect();
  });

  function updateSelect() {
    var selected;
    locizify.i18next.languages.forEach(function(l) {
      if (!selected && availableLngs.indexOf(l) > -1) selected = l;
    });

    if (selectedEle) selectedEle.innerHTML= selected || 'en';
  }

  locizify.i18next.on('languageChanged', function(lng) {
    updateSelect();
  });
}


(function($) {
    "use strict"; // Start of use strict

    $(document).ready(function() {
      if (!window.location.hash) return;
      setTimeout(function () {
        var offset = $(window.location.hash).offset();
        if (!offset) return;
        $('html, body').stop().animate({
            scrollTop: (offset.top - 50)
        }, 1250, 'easeInOutExpo');
      }, 1000);
    });

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $(document).on('click', 'a.page-scroll', function(event) {
        var $anchor = $(this);
        var offset = $($anchor.attr('href')).offset();
        if (!offset) return;
        $('html, body').stop().animate({
            scrollTop: (offset.top - 50)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 100
    });

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a.closeOnClick').click(function() {
        $('.navbar-toggle:visible').click();
    });

    // Offset for Main Navigation
    if (window.bindAffix !== false) {
      $('#mainNav').affix({
          offset: {
              top: 50
          }
      })
    }

})(jQuery); // End of use strict
