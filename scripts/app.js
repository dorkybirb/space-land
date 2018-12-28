$(document).ready(function(){

  console.log("doc is ready!"); //checks if this is right

  // (function() {
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyBPubz7qBtFbRowcHDmEgnhc-hSYZw4af0",
      authDomain: "space-land.firebaseapp.com",
      databaseURL: "https://space-land.firebaseio.com",
      projectId: "space-land",
      storageBucket: "space-land.appspot.com",
      messagingSenderId: "384163793922"
    };
    firebase.initializeApp(config);

    //Get elements
    const txtEmail = document.getElementById('txtEmail');
    const txtPassword = document.getElementById('txtPassword');
    const btnLogin = document.getElementById('btnLogin');
    const btnSignup = document.getElementById('btnSignup');
    const btnLogout = document.getElementById('btnLogout');

    //Add login event
    //Note: e => is a callback function: a function that is to be executed after
    //another function has finished executing
    btnLogin.addEventListener('click', e => {

      //Get email and pass
      const email = txtEmail.value;
      const pass = txtPassword.value;
      const auth = firebase.auth();
      //Log in
      console.log("log in script is running!"); //checks if this is right
      const promise = auth.signInWithEmailAndPassword(email, pass);
      promise.catch(e => console.log(e.message));
    });

    //Add signup event
    btnSignup.addEventListener('click', e => {

      //Get email and pass
      const email = txtEmail.value;
      const pass = txtPassword.value;
      const auth = firebase.auth();
      //Sign up
      console.log("sign up script is running!"); //checks if this is right
      const promise = auth.createUserWithEmailAndPassword(email, pass);
      promise.catch(e => console.log(e.message));
    });

    //Add a realtime listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if(firebaseUser) { //user is logged in
        console.log(firebaseUser); //display user details
        btnLogout.classList.remove('hide');
        btnLogin.classList.add('hide');
        btnSignup.classList.add('hide');
      } else { //user is logged out
        console.log('not logged in');
        btnLogout.classList.add('hide');
        btnLogin.classList.remove('hide');
        btnSignup.classList.remove('hide');
      }
    });

    //Adds logout functionality to logout button
    btnLogout.addEventListener('click', e => {
      firebase.auth().signOut();
    });

    btnSignup.classList.add('hide');
  // });

});
