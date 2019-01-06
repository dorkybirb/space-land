$(document).ready(function(){
  var postsRef = firebase.database().ref('posts');
  postsRef.orderByChild("date").on("child_added", function(snapshot) {
    console.log("Title: " + snapshot.val().title + "\n" +
                snapshot.val().body + "\n" +
                "- by " + getUsernameFromUID(snapshot.val().uid) +
                " on " + getFormattedDate(new Date(snapshot.val().date)));
  });

});

function getUsernameFromUID(uid) {
  var username = "null";
  return firebase.database().ref('/users/' + uid).once('value').then(function(snapshot) {
    username = snapshot.val().dAaccount;
  });
  return username;
}

function getFormattedDate(date) {
  var year = date.getFullYear();

  var month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : '0' + month;

  var day = date.getDate().toString();
  day = day.length > 1 ? day : '0' + day;

  return month + '/' + day + '/' + year;
}
