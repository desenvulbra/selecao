function onSuccess(googleUser) {
       console.log('onSuccess!');
	   document.location.href = '/curso';
    }

    function onCustomSuccess(googleUser) {
       console.log('onCustomSignIn!');
	   document.location.href = '/curso';
	   
    }

    function signOut() {
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
        console.log('User signed out.');
		document.location.href = '/index';
      });
    }

    function onLoad() {
      gapi.signin2.render('custom_signin_button', {
        'onsuccess': onCustomSuccess
      });
    }