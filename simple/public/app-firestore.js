import { getFirestore, collection, query, where, onSnapshot, serverTimestamp, addDoc } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js";

const createThingBtn = document.getElementById('createThing');
const thingsList = document.getElementById('thingsList');

export function initAppFirestore() {
  const db = getFirestore();
  let user;
  let unsubscribe;

  getAuth().onAuthStateChanged(newUser => {
    user = newUser;
    console.log('app-firestore auth changed:', user);
    if (user) {
      // if logged in, listen to query on things collection
      let q = query(collection(db, 'things'), where('uid', '==', user.uid));
      unsubscribe = onSnapshot(q, snapshot => {
        const items = snapshot.docs.map(doc =>  `<li>${ doc.data().name }</li>`);
        thingsList.innerHTML = items.join('');
      });
    } else {
      if (unsubscribe) {
        unsubscribe();
        unsubscribe = null;
      }
      thingsList.innerHTML = '';
    }
  });

  createThingBtn.addEventListener('click', () => {
    console.log('createThingBtn.click:', user);
    if (user) {
      addDoc(collection(db, 'things'), {
        uid: user.uid,
        name: Faker.Company.companyName(),
        createdAt: serverTimestamp()
      })
      .then(docRef => {
        console.log('added thing with id', docRef.id);
        console.log('docRef:', docRef);
      });
    }
  })

  return fs;
}