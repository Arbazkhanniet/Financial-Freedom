/**
 * Form Validation and Google Sheets Integration for Contact Form
 */

$(document).ready(function() {
  // Form validation
  $('#contactForm').on('submit', function(e) {
    e.preventDefault();
    
    let isValid = true;
    const formData = {};
    
    // Reset previous validation
    $(this).find('.is-invalid').removeClass('is-invalid');
    
    // Validate required fields
    $(this).find('[required]').each(function() {
      if (!$(this).val().trim()) {
        $(this).addClass('is-invalid');
        isValid = false;
      } else {
        formData[$(this).attr('name')] = $(this).val().trim();
      }
    });
    
    // Email validation
    const emailField = $('#email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailField.val() && !emailRegex.test(emailField.val())) {
      emailField.addClass('is-invalid');
      isValid = false;
    }
    
    // If validation passes, submit the form
    if (isValid) {
      // Add non-required fields to formData
      formData.phone = $('#phone').val().trim();
      formData.subscribe = $('#subscribe').is(':checked') ? 'Yes' : 'No';
      formData.timestamp = new Date().toISOString();
      
      // Submit to Google Sheets
      submitToGoogleSheets(formData);
    }
  });
  
  /**
   * Submit form data to Google Sheets
   * @param {Object} formData - The form data to submit
   */
  function submitToGoogleSheets(formData) {
    // Show loading state
    const submitBtn = $('#contactForm button[type="submit"]');
    const originalText = submitBtn.text();
    submitBtn.prop('disabled', true).html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...');
    
    // Simulate API call (in a real implementation, this would be an actual AJAX call to the Google Apps Script)
    setTimeout(function() {
      // Simulate successful submission
      handleFormSuccess();
      
      // Reset button state
      submitBtn.prop('disabled', false).text(originalText);
    }, 2000);
  }
  
  /**
   * Handle successful form submission
   */
  function handleFormSuccess() {
    // Show success message
    $('.form-response-message')
      .removeClass('error')
      .addClass('success')
      .html('<strong>Thank you!</strong> Your message has been sent successfully. We\'ll get back to you shortly.')
      .slideDown();
    
    // Reset form
    $('#contactForm')[0].reset();
    
    // Hide success message after 5 seconds
    setTimeout(function() {
      $('.form-response-message').slideUp();
    }, 5000);
  }
  
  /**
   * Handle form submission error
   * @param {string} errorMessage - The error message to display
   */
  function handleFormError(errorMessage) {
    // Show error message
    $('.form-response-message')
      .removeClass('success')
      .addClass('error')
      .html('<strong>Error!</strong> ' + errorMessage)
      .slideDown();
    
    // Hide error message after 5 seconds
    setTimeout(function() {
      $('.form-response-message').slideUp();
    }, 5000);
  }
});

/**
 * Google Apps Script Code (to be deployed separately)
 *
 * Here's the code that would be deployed as a Google Apps Script Web App:
 *
 * function doPost(e) {
 *   try {
 *     // Parse the incoming data
 *     const data = JSON.parse(e.postData.contents);
 *     
 *     // Open the Google Sheet using its ID
 *     const sheet = SpreadsheetApp.openById('YOUR_SPREADSHEET_ID').getSheetByName('Contacts');
 *     
 *     // Append the data to the sheet
 *     sheet.appendRow([
 *       new Date(),      // Timestamp
 *       data.firstName,  // First Name
 *       data.lastName,   // Last Name
 *       data.email,      // Email
 *       data.phone,      // Phone
 *       data.subject,    // Subject
 *       data.message,    // Message
 *       data.subscribe   // Subscribe to newsletter
 *     ]);
 *     
 *     // Return success response
 *     return ContentService.createTextOutput(JSON.stringify({ 
 *       'result': 'success'
 *     })).setMimeType(ContentService.MimeType.JSON);
 *     
 *   } catch(error) {
 *     // Return error response
 *     return ContentService.createTextOutput(JSON.stringify({ 
 *       'result': 'error',
 *       'message': error.toString()
 *     })).setMimeType(ContentService.MimeType.JSON);
 *   }
 * }
 *
 * function doGet() {
 *   return HtmlService.createHtmlOutput('The Google Apps Script is running! This web app is designed to handle POST requests from your contact form.');
 * }
 */