function onSuccess(googleUser) {
       console.log('onSuccess!');
    }

    function onCustomSuccess(googleUser) {
       console.log('onCustomSignIn!');
	   document.location = "cursos.html";
    }

    function signOut() {
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
        console.log('User signed out.');
      });
    }

    function onLoad() {
      gapi.signin2.render('custom_signin_button', {
        'onsuccess': onCustomSuccess
      });
    }