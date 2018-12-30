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
    firebase.auth().onAuthStateChanged(user => {
      if(user) { //user is logged in
        console.log(user); //display user details
        console.log('logged in user visited profile');
        btnLogout.classList.remove('hide');

        var currentUID = firebase.auth().currentUser.uid;
        if (user.coins != null)
          writeInitialUserData(currentUID, 'm2u', user.email);

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
