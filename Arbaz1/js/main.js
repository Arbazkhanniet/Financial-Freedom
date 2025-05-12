/**
 * Main JavaScript file for PrintWave - Common functionality across all pages
 */

$(document).ready(function() {
  // Navbar scroll effect
  $(window).scroll(function() {
    if ($(window).scrollTop() > 50) {
      $('#mainNav').addClass('scrolled');
    } else {
      $('#mainNav').removeClass('scrolled');
    }
  });

  // Check initial scroll position
  if ($(window).scrollTop() > 50) {
    $('#mainNav').addClass('scrolled');
  }

  // Smooth scrolling for anchor links
  $('a.nav-link[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 70)
        }, 1000, 'easeInOutExpo');
        return false;
      }
    }
  });

  // Initialize Bootstrap tooltips
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
  });

  // Initialize Bootstrap popovers
  var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
  var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl)
  });

  // Add animation to elements when they become visible
  function animateOnScroll() {
    $('.animate-on-scroll').each(function() {
      var elementPosition = $(this).offset().top;
      var topOfWindow = $(window).scrollTop();
      var windowHeight = $(window).height();
      
      if (elementPosition < topOfWindow + windowHeight - 100) {
        var animationClass = $(this).data('animation');
        $(this).addClass('animate__' + animationClass);
      }
    });
  }

  // Run animation function on scroll
  $(window).scroll(function() {
    animateOnScroll();
  });

  // Run animation function on load
  animateOnScroll();
});

/**
 * Smooth scroll effect for browsers that don't support CSS smooth scrolling
 */
(function() {
  // Add easeInOutExpo easing function if jQuery UI is not available
  if (typeof $.easing['easeInOutExpo'] === 'undefined') {
    $.easing.easeInOutExpo = function(x, t, b, c, d) {
      if (t==0) return b;
      if (t==d) return b+c;
      if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
      return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
    };
  }
})();