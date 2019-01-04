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
  }
});

  btnSubmit.addEventListener('click', function(){
    var title = titleText.value;
    var body = bodyText.value;

    var articleData = {
      title: title,
      body: body,
      uid: userId,
      date_edited: firebase.database.ServerValue.TIMESTAMP
    };

    var key = firebase.database().ref('posts').push().key;
    var updates = {};
    updates['posts/' + key] = articleData;

    return firebase.database().ref().update(updates)
    .then(function(){
      alert('Added ' + title);
    })
    .catch(function(error) {
      console.log(error);
      alert(error.message)
    });
  });

});
