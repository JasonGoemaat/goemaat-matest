import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js";

console.log('loading module app.js');

let myApp = function(app, getAuth) {
  console.log('app.js - init()');
  console.log('app (returned by initializeApp):', app);
  console.log('getAuth:', getAuth);

  const whenSignedIn = document.getElementById('whenSignedIn');
  const whenSignedOut = document.getElementById('whenSignedOut');
  const signInBtn = document.getElementById('signInBtn');
  const signOutBtn = document.getElementById('signOutBtn');
  const userDetails = document.getElementById('userDetails');

  //--------------------------------------------------------------------------------
  // Authentication
  //--------------------------------------------------------------------------------

  const auth = getAuth();
  const provider = new  GoogleAuthProvider();

  signInBtn.addEventListener('click', () => signInWithPopup(auth, provider)
    .then(result => console.log('auth result:', result))
    .catch(error => console.log('auth error:', error)));

  signOutBtn.addEventListener('click', () => auth.SignOut());
}

export { myApp };
