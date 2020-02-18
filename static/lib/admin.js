'use strict';

const registerUrl = 'https://api.censorreact.intygrate.com/v1/register';
const loginUrl = 'https://api.censorreact.intygrate.com/v1/login';

define('admin/plugins/censorreact', ['settings'], function(Settings) {
  const genericErrMsg = 'Unable to confirm your registration. If the problem persist, please contact us at https://intygrate.com/contactus';
  const ACP = {};

  // Show registration page
  function showRegistration() {
    $('#register').attr('disabled', true);
    $('div.login').removeClass('active');
    $('div#registration-section').addClass('active');
    $('div#confirmation-section').removeClass('active');
  }

  // Show confirm registration page
  function showConfirmRegistration() {
    $('div#registeration-section').removeClass('active');
    $('div#confirmation-section').addClass('active');
    $('#nav-section').hide();
  }

  // Show login page
  function showLogin() {
    $('div.registration').removeClass('active');
    $('div.login').addClass('active');
  }

  // Toggle Fetch API Key page
  function showFetchKey({ status = true }) {
    if (status) {
      $('#refetchKey').attr('disabled', true);
      $('div.fetchkey').addClass('active');
    } else {
      $('#refetchKey').attr('disabled', false);
      $('div.fetchkey').removeClass('active');
      $('#fetchPassword').val('');
    }
  }

  // Helper alert widget with default values
  function showAlert({ type = 'warning', title = 'system error', message = genericErrMsg}) {
    app.alert({ type, title, message });
  }

  ACP.init = function() {
    const email = $('input#email').val() || '';
    const step = $('input#step').val() || '';

    // Empty email indicates user has not attempted to login/register
    if (email === '') {
      showRegistration();
    } else if (step === 'confirm') {
      showConfirmRegistration();
    } else if (step === 'login') {
      showLogin();
      $('#nav-section').hide();
    }

    // Fetch API Key
    $('#refetchKey').on('click', function(event) {
      event.preventDefault();
      showFetchKey({});
    });

    // Cancel fetching API Key
    $('#cancelFetchKey').on('click', function(event) {
      event.preventDefault();
      showFetchKey({ status: false });
    });

    // Confirm fetching API Key
    $('#confirmFetchKey').on('click', function(event) {
      event.preventDefault();
      const password = $('#fetchPassword').val() || '';
      const email = $('#email').val();

      $.ajax({
        url: loginUrl,
        data: JSON.stringify({
          email,
          password: password.trim(),
          tnc: 'true',
          referrer: 'nodebb'
        }),
        type: 'POST',
        success: function(response) {
          showFetchKey({ status: false });

          if (response.data && response.data.key) {
            $('#key').val(response.data.key);

            Settings.save('censorreact', $('.censorreact-settings'), function(error,response) {
              location.reload(true);
            });
          }
        },
        error: function(xhr) {
          if (xhr.responseText) {
            const resp = JSON.parse(xhr.responseText);
            if (resp.data === 'generic_error') {
              resp['message'] = genericErrMsg;
            }
            showAlert({ title: 'Get Key Failed', message: resp.message });
          } else {
            showAlert({});
          }
        }
      });
    });

    // User login flow
    $('#login').on('click', function(event) {
      event.preventDefault();
      const password = $('#loginPassword').val() || '';
      const email = $('#loginEmail').val() || '';

      $.ajax({
        url: loginUrl,
        data: JSON.stringify({
          email: email.trim(),
          password: password.trim(),
          referrer: 'nodebb'
        }),
        type: 'POST',
        success: function(response) {
          if (response.data && response.data.key) {
            $('#key').val(response.data.key);
            $('#email').val(email.trim());
            $('#step').val('');

            Settings.save('censorreact', $('.censorreact-settings'), function(error,response) {
              location.reload(true);
            });
          }
        },
        error: function(xhr) {
          if (xhr.responseText) {
            const resp = JSON.parse(xhr.responseText);
            if (resp && resp.data === 'generic_error') {
              resp['message'] = genericErrMsg;
            }
            showAlert({ title: 'Login Failed', message: resp.message });
          } else {
            showAlert({});
          }
        }
      });
    });

    // handle tab navigation clicks
    $('li.nav-item').on('click', function(event) {
      $('li.nav-item').removeClass('active');
      $(this).addClass('active');

      if ($(this).attr('data-id') === 'register') {
        showRegistration();
      } else {
        showLogin();
      }
    });

    // tnc check
    $('#crAcceptTnc').on('change', function(event) {
      $('#crAcceptTnc').val(this.checked);
      $('#register').attr('disabled', !this.checked);
    });

    // user registration
    $('#register').on('click', function(event) {
      event.preventDefault();
      var email = $('#regEmail').val() || '';
      var password = $('#regPassword').val() || '';
      var confPassword = $('#confRegPassword').val() || '';

      if (password.trim() !== confPassword.trim()) {
        showAlert({
          title: 'Registration Failed',
          message: 'Your password and confirm password does not match.'
        });
        return;
      }

      $.ajax({
        url: registerUrl,
        data: JSON.stringify({
          email: email.trim(),
          password: password.trim(),
          referrer: 'nodebb',
          tnc: ['true', 'on'].includes($('#crAcceptTnc').val()) ? 'true' : 'false'
        }),
        type: 'POST',
        success: function(response) {
          $('#email').val(email.trim());
          $('#step').val('confirm');
          $('#tnc').val('true');

          Settings.save('censorreact', $('.censorreact-settings'), function(error, response) {
            location.reload(true);
          });
        },
        error: function(xhr) {
          if (xhr.responseText) {
            const resp = JSON.parse(xhr.responseText);
            if (resp.data === 'generic_error') {
              resp['message'] = genericErrMsg;
            }

            showAlert({
              title: 'Registration Failed',
              message: resp.message
            });
          } else {
            showAlert({});
          }
        }
      });
    });

    // Check to toggle confirm button status
    $('#confirmationCode').on('keyup', function() {
      $('#confirm').attr('disabled', $('#confirmationCode').val().trim().length <= 0);
    });

    // Handle resend confirmation code
    $('#resendCode').on('click', function(event) {
      event.preventDefault();
      const email = $('#email').val() || '';

      // Prevent clicking resend code button again
      $('#resendCode').attr('disabled', true);

      $.ajax({
        url: registerUrl,
        data: JSON.stringify({
          tnc: 'true',
          email: email.trim(),
          resendCode: true
        }),
        type: 'POST',
        success: function(response) {
          $('#resendCode').attr('disabled', false);

          if (response.data && response.data === 'code_resent') {
            showAlert({
              type: 'success',
              title: 'Resend Confirmation Code',
              message: response.message
            });
          }
        },
        error: function(xhr) {
          $('#resendCode').attr('disabled', false);

          if (xhr.responseText) {
            const resp = JSON.parse(xhr.responseText);
            if (resp.data === 'generic_error') {
              resp['message'] = genericErrMsg;
            } else if (resp.data === 'already_confirmed') {
              showLogin();
              $('#nav-section').hide();
            }
            showAlert({ message: resp.message });
          } else {
            showAlert();
          }
        }
      });
    });

    // Handle confirm user registration
    $('#confirm').on('click', function(event) {
      event.preventDefault();
      const email = $('#email').val() || '';
      const code  = $('#confirmationCode').val() || '';

      // Prevent updating when request has been triggered
      $('#confirm').attr('disabled', true);
      $('#confirmationCode').attr('disabled', true);

      $.ajax({
        url: registerUrl,
        data: JSON.stringify({
          tnc: 'true',
          email: email.trim(),
          referrer: 'nodebb',
          confirmationCode: code.trim()
        }),
        type: 'POST',
        success: function(response) {
          if (response.data && response.data === 'success') {
            $('#step').val('login');

            Settings.save('censorreact', $('.censorreact-settings'), function(error, response) {
              location.reload(true);
            });
          }
        },
        error: function(xhr) {
          if (xhr.responseText) {
            const resp = JSON.parse(xhr.responseText);
            if (resp.data === 'generic_error') {
              resp['message'] = genericErrMsg;
            } else if (resp.data === 'already_confirmed') {
              showLogin();
              $('#nav-section').hide();
            }
            showAlert({ message: resp.message });
          } else {
            showAlert();
          }

          $('#confirm').attr('disabled', false);
          $('#confirmationCode').val('').attr('disabled', false);
        }
      });
    });
  }

  return ACP;
});
