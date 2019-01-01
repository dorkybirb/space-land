$(document).ready(function(){

    //------------ Realtime db demo BEGIN
    var bigFish = document.getElementById('bigFish');
    //create a db ref and create a child location to the text location
    var dbRef = firebase.database().ref().child('text');
    //synchronize changes using the 'on' function
    dbRef.on('value', snap => bigFish.innerText = snap.val());
    // Realtime db demo END ------------

    //------------ User auth BEGIN
    //Get elements
    const linkProfile = document.getElementById('linkProfile');
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

      //Modifying the auth persistence
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(function() {
          // Existing and future Auth states are now persisted in the current
          // session only. Closing the window would clear any existing state even
          // if a user forgets to sign out.
          // ...
          // New sign-in will be persisted with session persistence.

          const promise = auth.signInWithEmailAndPassword(email, pass); //log in
          promise.catch(e => console.log(e.message));
        })
        .catch(function(error) {
          // Handle Errors here.
          // console.log(error.code);
          console.log(error.message);
        });

    });

    // //Add signup event
    // btnSignup.addEventListener('click', e => {
    //   //Get email and pass
    //   const email = txtEmail.value;
    //   const pass = txtPassword.value;
    //   const auth = firebase.auth();
    //   //Sign up
    //   const promise = auth.createUserWithEmailAndPassword(email, pass);
    //   promise.catch(e => console.log(e.message));
    // });

    //Add a realtime listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if(firebaseUser) { //user is logged in
        console.log(firebaseUser); //display user details
        btnLogout.classList.remove('hide');
        linkProfile.classList.remove('hide');
        btnLogin.classList.add('hide');
        btnSignup.classList.add('hide');
        txtEmail.classList.add('hide');
        txtPassword.classList.add('hide');
      } else { //user is logged out
        console.log('logged out');
        btnLogout.classList.add('hide');
        linkProfile.classList.add('hide');
        btnLogin.classList.remove('hide');
        btnSignup.classList.remove('hide');
        txtEmail.classList.remove('hide');
        txtPassword.classList.remove('hide');
      }
    });

    //Adds logout functionality to logout button
    btnLogout.addEventListener('click', e => {
      firebase.auth().signOut();
    });
    // User auth END ------------

    //------------ Reading and writing data to DB BEGIN
    function writeUserData(userId, dAacc, email) {
    // Get a reference to the database service
    var database = firebase.database();

    // function writeUserData(userId, dAacc, email) {
      firebase.database().ref('users/' + userId).set({
        dAaccount: dAacc,
        email: email,
        userExp: 0,
        coins: 0
      });
    }
    // Reading and writing data to DB END ------------

});
