$(document).ready(function(){
  //------------ Firebase starter script BEGIN
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
    // Firebase starter script END ------------

    //------------ User auth BEGIN
    const txtUserEmail = document.getElementById('txtUserEmail');
    const btnLogout = document.getElementById('btnLogout');

    //Add a realtime listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if(firebaseUser) { //user is logged in
        console.log(firebaseUser); //display user details
        console.log('logged in user visited profile');
        btnLogout.classList.remove('hide');
      } else { //user is logged out
        console.log('logged out');
        // redirects user to the home pg
        window.location.replace("index.html");
      }
    });

    //Adds logout functionality to logout button
    btnLogout.addEventListener('click', e => {
      firebase.auth().signOut();
    });
    // User auth END ------------

});
