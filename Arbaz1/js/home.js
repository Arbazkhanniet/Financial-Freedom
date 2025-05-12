/**
 * JavaScript for Homepage
 */

$(document).ready(function() {
  // Product filtering functionality
  $('.product-filters .btn').click(function() {
    var filterValue = $(this).data('filter');
    
    // Update active button
    $('.product-filters .btn').removeClass('active');
    $(this).addClass('active');
    
    if (filterValue === 'all') {
      // Show all products
      $('.product-item').show();
    } else {
      // Hide all products
      $('.product-item').hide();
      // Show products matching the filter
      $('.product-item[data-category="' + filterValue + '"]').show();
    }
    
    // Animate the products being shown
    $('.product-item:visible').each(function(i) {
      var item = $(this);
      setTimeout(function() {
        item.addClass('animate__animated animate__fadeIn');
        setTimeout(function() {
          item.removeClass('animate__animated animate__fadeIn');
        }, 500);
      }, i * 100);
    });
  });

  // Product card hover effect
  $('.product-card').hover(
    function() {
      $(this).find('.card-img-top').css('transform', 'scale(1.05)');
    },
    function() {
      $(this).find('.card-img-top').css('transform', 'scale(1)');
    }
  );

  // Testimonial carousel settings
  $('#testimonialCarousel').carousel({
    interval: 5000,
    pause: 'hover'
  });

  // Service card animation
  $('.service-card').each(function(i) {
    var card = $(this);
    setTimeout(function() {
      card.addClass('animate__animated animate__fadeInUp');
    }, i * 200);
  });

  // Initialize product count
  updateProductCount();

  // Search functionality (if search is implemented)
  $('#searchProducts').on('keyup', function() {
    var value = $(this).val().toLowerCase();
    $('.product-item').filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
    updateProductCount();
  });

  /**
   * Update the count of visible products
   */
  function updateProductCount() {
    var count = $('.product-item:visible').length;
    $('#productCount').text(count);
  }
});