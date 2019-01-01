$(document).ready(function(){

    //Vars
    const plusCoin = document.getElementById('plusCoin');
    const plusExp = document.getElementById('plusExp');
    const plusRandom = document.getElementById('plusRandom');
    const spaceMessage = document.getElementById('spaceMessage');

  firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser) { //user is logged in
      spaceMessage.innerHTML = "You've launched to space!";
    } else { //user is logged out
      console.log('logged out');
      spaceMessage.innerHTML = "Please log in.";
    }
  });

  //when 'grab a coin' button is pressed
  plusCoin.addEventListener('click', e => {
    var uid = firebase.auth().currentUser.uid;
    giveCoinsToUser(1, uid);
  });

  //when 'earn 10 exp' button is pressed
  plusExp.addEventListener('click', e => {
    var uid = firebase.auth().currentUser.uid;
    giveExpToUser(10, uid);
  });

  //when 'earn 10 exp' button is pressed
  plusRandom.addEventListener('click', e => {
    var uid = firebase.auth().currentUser.uid;
    giveRandCoinsToUser(0, 20, uid);
  });

  function giveCoinsToUser(coinAmt, userId) {
    return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
      var numCoins = snapshot.val().coins;
      var newNumCoins = numCoins + coinAmt;
      firebase.database().ref('users/' + userId).update({
        coins: newNumCoins
      });
      console.log('gave '+coinAmt+' coins!');
    });
  }

  //Gives user a random amt of coins
  function giveRandCoinsToUser(min, max, userId) {
    return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
      var numCoins = snapshot.val().coins;
      var coinAmt = getRandomInt(min, max);
      var newNumCoins = numCoins + coinAmt;
      firebase.database().ref('users/' + userId).update({
        coins: newNumCoins
      });
      console.log('gave '+coinAmt+' coins!');
    });
  }

  function giveExpToUser(expAmt, userId) {
    return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
      var expVal = snapshot.val().userExp;
      var newExpVal = expVal + expAmt;
      firebase.database().ref('users/' + userId).update({
        userExp: newExpVal
      });
      console.log('gave '+expAmt+' exp!');
    });
  }

  function getRandomInt(min, max) { // [min, max] both inclusive
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

});
