/**
 * JavaScript for About Page
 */

$(document).ready(function() {
  // Animate timeline items on scroll
  function animateTimelineItems() {
    $('.process-item').each(function() {
      var elementPosition = $(this).offset().top;
      var topOfWindow = $(window).scrollTop();
      var windowHeight = $(window).height();
      
      if (elementPosition < topOfWindow + windowHeight - 150) {
        if ($(this).hasClass('left')) {
          $(this).addClass('animate__animated animate__fadeInLeft');
        } else {
          $(this).addClass('animate__animated animate__fadeInRight');
        }
      }
    });
  }

  // Team member hover effect
  $('.team-member').hover(
    function() {
      $(this).find('.team-img img').css('transform', 'scale(1.05)');
    },
    function() {
      $(this).find('.team-img img').css('transform', 'scale(1)');
    }
  );

  // Values cards staggered animation
  $('.benefit-card').each(function(i) {
    var card = $(this);
    setTimeout(function() {
      card.addClass('animate__animated animate__fadeInUp');
    }, i * 200);
  });

  // Run animations on scroll
  $(window).scroll(function() {
    animateTimelineItems();
  });

  // Run animations on load
  animateTimelineItems();

  // Mission card hover effect
  $('.mission-card, .values-card').hover(
    function() {
      $(this).css('transform', 'translateY(-10px)');
    },
    function() {
      $(this).css('transform', 'translateY(0)');
    }
  );
});