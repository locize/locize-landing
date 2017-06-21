// localization
var selectedEle = document.getElementById('selectedLng');
var optionsEle = document.getElementById('lngSelectDropDown');
var availableLngs = [];

// create select options based on project languages
if (locizify) {
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
        $('html, body').stop().animate({
            scrollTop: ($(window.location.hash).offset().top - 50)
        }, 1250, 'easeInOutExpo');
      }, 1000);
    });

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $(document).on('click', 'a.page-scroll', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 50)
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

    // particles
    window.initParticle = function() {
      particlesJS("particles-js", {
        "particles": {
          "number": {
            "value": 20,
            "density": {
              "enable": false,
              "value_area": 800
            }
          },
          "color": {
            "value": "#2196f3"
          },
          "shape": {
            "type": "polygon",
            "stroke": {
              "width": 0,
              "color": "#000"
            },
            "polygon": {
              "nb_sides": 6
            },
            "image": {
              "src": "img/github.svg",
              "width": 100,
              "height": 100
            }
          },
          "opacity": {
            "value": 0.09620472365193136,
            "random": true,
            "anim": {
              "enable": false,
              "speed": 1,
              "opacity_min": 0.1,
              "sync": false
            }
          },
          "size": {
            "value": 120.2559045649142,
            "random": false,
            "anim": {
              "enable": true,
              "speed": 10,
              "size_min": 40,
              "sync": false
            }
          },
          "line_linked": {
            "enable": false,
            "distance": 200,
            "color": "#ffffff",
            "opacity": 1,
            "width": 2
          },
          "move": {
            "enable": true,
            "speed": 1,
            "direction": "none",
            "random": true,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
              "enable": false,
              "rotateX": 600,
              "rotateY": 1200
            }
          }
        },
        "interactivity": {
          "detect_on": "canvas",
          "events": {
            "onhover": {
              "enable": false,
              "mode": "grab"
            },
            "onclick": {
              "enable": false,
              "mode": "push"
            },
            "resize": true
          },
          "modes": {
            "grab": {
              "distance": 400,
              "line_linked": {
                "opacity": 1
              }
            },
            "bubble": {
              "distance": 400,
              "size": 40,
              "duration": 2,
              "opacity": 8,
              "speed": 3
            },
            "repulse": {
              "distance": 200,
              "duration": 0.4
            },
            "push": {
              "particles_nb": 4
            },
            "remove": {
              "particles_nb": 2
            }
          }
        },
        "retina_detect": true
      });
    };

})(jQuery); // End of use strict
