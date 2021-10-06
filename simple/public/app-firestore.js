import { getFirestore, collection, query, where, onSnapshot, serverTimestamp, addDoc } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js";


// firebaseApps previously initialized using initializeApp()
// connectFirestoreEmulator(getFirestore(), 'localhost', 8080);

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
      const doc = {
        uid: user.uid,
        // uid: 'imposter',
        name: Faker.Company.companyName(),
        createdAt: serverTimestamp()
      };

      addDoc(collection(db, 'things'), doc)
      .then(docRef => {
        console.log('added thing with id', docRef.id);
        console.log('docRef:', docRef);
        console.log('doc:', doc);
      });
    }
  })

  return fs;
}