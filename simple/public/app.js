import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js";
import { getFirestore, addDoc, collection, getDocs, connectFirestoreEmulator } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";

import { initAppFirestore } from './app-firestore.js';


console.log('loading module app.js');

let myApp = function(app) {
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

  signOutBtn.addEventListener('click', () => auth.signOut());

  auth.onAuthStateChanged(user => {
    window['user'] = user;
    if (user) {
      whenSignedIn.hidden = false;
      whenSignedOut.hidden = true;
      userDetails.innerHTML = `<h3>Hello ${user.displayName}!</h3><p>User ID: ${user.uid}</p>`;
    } else {
      whenSignedIn.hidden = true;
      whenSignedOut.hidden = false;
      userDetails.innerHTML = '';
    }
  });

  const db = getFirestore();
  window['db'] = db;
  window['fs'] = { addDoc, collection, getDocs };
  for (let key in window['fs']) {
    window[key] = window['fs'][key];
  }
  console.log('db:', db);

  initAppFirestore();
}

export { myApp };
