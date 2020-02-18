<style type="text/css">
  div.registration, div.login, div.fetchkey {
		display: none;
	}
  div.registration.active, div.login.active, div.fetchkey.active {
    display: inline-block;
    text-align: left;
    margin: 0 auto;
    width: 80%;
	}
  #content.container{
    max-width: 600px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    margin: 250px auto 100px auto;
  }
  .page-admin-censorreact{
    background: rgb(32,116,57);
    background: -moz-linear-gradient(90deg, rgba(32,116,57,1) 0%, rgba(149,193,60,1) 100%);
    background: -webkit-linear-gradient(90deg, rgba(32,116,57,1) 0%, rgba(149,193,60,1) 100%);
    background: linear-gradient(90deg, rgba(32,116,57,1) 0%, rgba(149,193,60,1) 100%);
  }
  .censorreact-settings-page{
    position: relative;
    background-color: #ffffff;
    padding: 50px 20px 30px 20px;
    text-align: center;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
  .censorreact-btn{
    padding: 10px 50px;
    width: 100%;
    margin: 30px 0;
    border: 1px solid rgb(32,116,57);
    background-color: transparent;
    color: rgb(32,116,57);
    cursor: pointer;
    font-weight: 500;
    border-radius: 5px;
    text-transform: uppercase;
  }
  div#censorreact-header{
    position: absolute;
    top: 200px;
    left: 0;
    right: 0;
    background-color: #ffffff;
  }
  #censorreact-logo-div img {
    width: 250px;
    padding: 10px;
    margin-left: 100px;
  }
  #censorreact-login-btn{
    display: inline-block;
    margin:0;
    text-indent: 0;
    list-style-type: none;
    background-color: #cccccc;
    border: none;
    padding: 23px 50px;
    font-size: 2em;
    font-weight: 400;
    color: #f6f6f6!important;
    cursor: pointer;
    position: relative;
    z-index: 2;
    flex: 1 1 200px;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
  }
  #censorreact-login-btn.active{
    background-color: #ffffff!important;
    color: rgb(32,116,57)!important;
    font-size: 3em!important;
    padding: 10px 50px;
  }
  #censorreact-register-btn{
    display: inline-block;
    margin:0;
    text-indent: 0;
    list-style-type: none;
    background-color: #cccccc;
    border: none;
    padding: 23px 50px;
    font-size: 2em;
    font-weight: 400;
    color: #f6f6f6!important;
    cursor: pointer;
    position: relative;
    z-index: 2;
    flex: 1 1 200px;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
  }
  #censorreact-register-btn.active{
    background-color: #ffffff!important;
    color: rgb(32,116,57)!important;
    font-size: 3em!important;
    padding: 10px 50px;
  }
  #nav-section{
    background-color: transparent;
    position: absolute;
    left: 0;
    right: 0;
    top: -97px;
    width: 100%;
  }
  #login-signup-nav{
    display: flex;
    align-items: center;
  }
  .nav-tabs>li.active>a, .nav-tabs>li.active>a:focus{
    box-shadow: none!important;
    color: rgb(32,116,57)!important;
    padding: 0!important;
  }
  .nav-tabs>li>a:focus:hover, .nav-tabs>li>a:hover {
    background-color: transparent;
    box-shadow: none;
    color: unset;
    padding: 0!important;
  }
  .nav-tabs>li>a:focus, .nav-tabs>li>a {
    display: inline-block;
    list-style-type: none;
    border: none;
    color: #f6f6f6!important;
    cursor: pointer;
    box-shadow: none!important;
    padding: 0!important;
  }
  #confirmation-title{
    background-color: #ffffff;
    position: absolute;
    left: 0;
    right: 0;
    top: -97px;
    width: 100%;
    color: rgb(32,116,57);
    font-weight: 400;
    font-size: 3em;
    text-align: center;
    padding: 10px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  #confirmation-title p{
    margin:0;
    padding: 20px;
  }
  #user-info-title{
    background-color: #ffffff;
    position: absolute;
    left: 0;
    right: 0;
    top: -97px;
    width: 100%;
    color: rgb(32,116,57);
    font-weight: 400;
    font-size: 3em;
    text-align: center;
    padding: 10px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  #user-info-title p{
    margin:0;
    padding: 20px;
  }
  #confirmationCode{
    display: inline-block;
    width: 60%;
    margin-right: 38px;
  }
  #resendCode{
    width: 30%;
    padding: 5px;
  }
</style>
<div id='censorreact-header'>
  <div id='censorreact-logo-div'>
    <img src="/plugins/nodebb-plugin-censorreact/images/censorREACT-logo.png" alt="censorREACT">
  </div>
</div>

<div class='censorreact-settings-page'>

  <form role="form" class="censorreact-settings">
    <input type="hidden" name="email" id="email" value="{settings.email}" />
    <input type="hidden" name="key" id="key" value="{settings.key}" />
    <input type="hidden" name="tnc" id="tnc" value="{settings.tnc}" />
    <input type="hidden" name="step" id="step" value="{settings.step}" />
  </form>



  <!-- IF !settings.hasKey -->
    <div id="nav-section">
      <ul id='login-signup-nav' class="nav nav-tabs">
        <li id="censorreact-register-btn" class="nav-item active" data-id='register'>
          <a id="" class="nav-link" href="#">SIGN UP</a>
        </li>
        <li id="censorreact-login-btn" class="nav-item" data-id='login'>
          <a id="" class="nav-link" href="#">LOGIN</a>
        </li>
      </ul>
    </div>
    <div id="registration-section" class="registration">
      <div class="form-group row">
        <div>
          <label for="regEmail" class="col-form-label">Email</label>
        </div>
        <div>
          <input type="email" class="form-control" id="regEmail" name="regEmail" placeholder="Email" required="required">
        </div>
      </div>
      <div class="form-group row">
        <div>
          <label for="regPassword" class="col-form-label">Password</label>
        </div>
        <div>
          <input type="password" class="form-control" id="regPassword" name="regPassword" placeholder="Password" required="required">
        </div>
      </div>
      <div class="form-group row">
        <div>
          <label for="confRegPassword" class="col-form-label">Confirm Password</label>
        </div>
        <div>
          <input type="password" class="form-control" id="confRegPassword" name="confRegPassword" placeholder="Confirm Password" required="required">
        </div>
      </div>
      <div class="form-group form-check row">
        <div class="col-sm-12">
          <input type="checkbox" class="form-check-input" name="crAcceptTnc" id="crAcceptTnc">
          <label class="form-check-label" for="crAcceptTnc">I agree to the <a href="https://intygrate.com/terms-of-service" target="_blank">Intygrate Terms of Service</a></label>
        </div>
      </div>
      <div class="form-group row">
        <div class="col-sm-12">
          <button type="submit" id="register" class="censorreact-btn">Register</button>
        </div>
      </div>
    </div>

    <div id="confirmation-section" class="registration">
      <div id='confirmation-title'>
        <p>CONFIRMATION</p>
      </div>
      <p> An email has been sent to <b>{settings.email}</b> with a confirmation code. </p>
      <div class="form-group">
        <div>
          <label for="userEmail" class="col-form-label">Confirmation Code</label>
        </div>
        <div>
          <input type="text" class="form-control" id="confirmationCode" name="confirmationCode" placeholder="Confirmation Code" required="required">
          <button type="submit" id="resendCode" class="censorreact-btn">Resend Code</button>
        </div>
      </div>
      <div class="form-group">
        <div>
          <button type="submit" id="confirm" class="censorreact-btn">Confirm</button>
        </div>
      </div>
    </div>

    <div id="login-section" class="login">
      <div class="form-group row">
        <div>
          <label for="loginEmail" class="col-form-label">Email</label>
        </div>
        <div>
          <input type="email" class="form-control" id="loginEmail" name="loginEmail" placeholder="Email" required="required">
        </div>
      </div>
      <div class="form-group row" id="password-form-group">
        <div>
          <label for="loginPassword" class="col-form-label">Password</label>
        </div>
        <div>
          <input type="password" id="loginPassword" name="loginPassword" class="form-control" placeholder="Password" required="required">
        </div>
      </div>
      <div class="form-group row">
        <div class="col-sm-12">
          <button type="submit" id="login" class="censorreact-btn">Login</button>
        </div>
      </div>
    </div>
  <!-- ENDIF !settings.hasKey -->

  <!-- IF settings.hasKey -->
    <div id='user-info-title'>
        <p>Your API Details</p>
    </div>
    <div class="form-group row">
      <div>
        <label class="col-form-label">Email</label>
      </div>
      <div>{settings.email}</div>
    </div>

    <div class="form-group row">
      <div>
        <label class="col-form-label">Your API Key</label>
      </div>
      <div>
        <span>{settings.key}</span>
        <button id="refetchKey" class="btn btn-link">Retrieve Key</button>
      </div>
    </div>

    <div class="fetchkey">
      <div class="form-group row" id="password-form-group">
        <div>
          <label for="fetchPassword" class="col-form-label">Password</label>
        </div>
        <div>
          <input type="password" id="fetchPassword" name="fetchPassword" class="form-control" placeholder="Password" required="required">
        </div>
      </div>
      <div class="form-group row">
        <button type="submit" id="confirmFetchKey" class="censorreact-btn">Confirm Retrieve Key</button>
        <button type="submit" id="cancelFetchKey" class="censorreact-btn">Cancel</button>
      </div>
    </div>
    <!-- ENDIF settings.hasKey -->

  <p class="text-center"><a href="https://censorreact.intygrate.com" target="_blank">censorREACT Dashboard</a></p>

</div>
