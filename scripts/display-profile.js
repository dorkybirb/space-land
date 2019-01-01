$(document).ready(function(){

    //------------ User auth BEGIN
    const txtUserdA = document.getElementById('txtUserdA');
    const txtUserEmail = document.getElementById('txtUserEmail');
    const txtUserExp = document.getElementById('txtUserExp');
    const txtUserCoins = document.getElementById('txtUserCoins');
    const btnLogout = document.getElementById('btnLogout');

    //Add a realtime listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if(firebaseUser) { //user is logged in
        console.log(firebaseUser); //display user details
        console.log('logged in user visited profile');
        btnLogout.classList.remove('hide');

        //create user profile if not already created
        var user = firebase.auth().currentUser;
        var currentUID = firebase.auth().currentUser.uid;
        // if (user.coins == null) {
        //   writeInitialUserData(currentUID, 'user00', user.email);
        // }

        //displays user info
        return firebase.database().ref('/users/' + currentUID).once('value').then(function(snapshot) {
          txtUserdA.innerHTML = snapshot.val().dAaccount;
          txtUserEmail.innerHTML = snapshot.val().email;
          txtUserExp.innerHTML = snapshot.val().userExp;
          txtUserCoins.innerHTML = snapshot.val().coins;
        });

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
    // function writeInitialUserData(userId, dAacc, email) {
    //   var database = firebase.database();
    //   firebase.database().ref('users/' + userId).set({
    //     dAaccount: dAacc,
    //     email: email,
    //     userExp: 0,
    //     coins: 0
    //   });
    // }
    // Reading and writing data to DB END ------------

});
