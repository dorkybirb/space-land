$(document).ready(function(){

  //------------ Sign up script BEGIN
  //initialize vars
  const signupForm = document.getElementById('signupForm');
  const txtdA = document.getElementById('txtdA');
  const txtEmail = document.getElementById('txtEmail');
  const txtPassword = document.getElementById('txtPassword');
  const btnSignup = document.getElementById('btnSignup');

  // Displays sign up form is user is not logged in
  firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser) { //user is logged in
      signupForm.classList.add('hide');
    } else { //user is logged out
      console.log('logged out');
      signupForm.classList.remove('hide');
    }
  });

  //Add signup event
  btnSignup.addEventListener('click', e => {
    const dA = txtdA.value;
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    //Sign up
    const promise = auth.createUserWithEmailAndPassword(email, pass)
     .then(function success(data){
       //creates a user profile w/ dA, coins, exp fields
         var uid = data.user.uid; //undefined
         writeInitialUserData(uid, dA, email);
         console.log('testpad begin');
         console.log('UID: ' + uid);
         console.log('dA: ' + dA);
         console.log('testpad end');
        //Redirects user to home pg
        // window.location.replace("index.html");

        //  var displayName = userData.displayName;
        //  var email = userData.email;
        //  var emailVerified = userData.emailVerified;
        //  var photoURL = userData.photoURL;
        //  var isAnonymous = userData.isAnonymous;
        //  var providerData = userData.providerData;

     }).catch(function failure(error) {
         var errorCode = error.code;
         var errorMessage = error.message;
         console.log('ERROR in creating profile: ' + errorCode + " " + errorMessage);
     });
  });
  // Sign up script END ------------

  //------------ Reading and writing data to DB BEGIN
  function writeInitialUserData(userId, dAacc, email) {
    var database = firebase.database();
    firebase.database().ref('users/' + userId).set({
      dAaccount: dAacc,
      email: email,
      userExp: 0,
      coins: 0
    });
  }
  // Reading and writing data to DB END ------------

});
