$(document).ready(function(){

  // postsRef = firebase.database().ref('post/');
  // var postsRef = postListRef.push();
  // newPostRef.set({
  //   // ...
  // });

  //Vars
  const titleText = document.getElementById('titleText');
  const bodyText = document.getElementById('bodyText');
  const btnSubmit = document.getElementById('btnSubmit');

  firebase.auth().onAuthStateChanged(function(user) {
  if (!user) {
    // No user is signed in.
    //Redirect to home pg.
    window.location.replace("index.html");
  }
});

  btnSubmit.addEventListener('click', function(){
    var title = titleText.value;
    var body = bodyText.value;

    var articleData = {
      title: title,
      body: body,
      uid: firebase.auth().currentUser.uid,
      date: firebase.database.ServerValue.TIMESTAMP
    };

    var key = firebase.database().ref('posts').push().key;
    var updates = {};
    updates['posts/' + key] = articleData;

    return firebase.database().ref().update(updates)
    .then(function(){
      console.log('Added: ' + title);
    })
    .catch(function(error) {
      console.log(error);
    });
  });

});
