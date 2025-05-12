/**
 * JavaScript for Contact Page
 */

$(document).ready(function() {
  // Contact methods animation
  $('.contact-method').each(function(i) {
    var method = $(this);
    setTimeout(function() {
      method.addClass('animate__animated animate__fadeInLeft');
    }, i * 200);
  });

  // FAQ accordion animation
  $('.accordion-item').each(function(i) {
    var item = $(this);
    setTimeout(function() {
      item.addClass('animate__animated animate__fadeInUp');
    }, i * 100);
  });

  // Map container fade in
  $('.map-container').addClass('animate__animated animate__fadeIn');
});