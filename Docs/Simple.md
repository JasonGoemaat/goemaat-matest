# Simple (goemaat-ma-simple)

To add this web app I followed this video: https://www.youtube.com/watch?v=q5J5ho7YUhA

* Go to firebase console
* Go to 'goemaat-multiple-apps' (created already)
* Click gear at the top and 'Project settings'
* Click 'Add app' button
* gave it a nickname 'simple' and picked 'goemaat-ma-simple' as app
* Clicked to add hosting (copy javascript)
* Created 'simple' folder, 'simple/public' folder, index.html
* In 'index.html', used '!' key to scaffold simple page
* Added script copied from firebase console to a script tag

> Note: I used the CDN version of the script here.  This is kinda cool, using `type="module"`
which I haven't used before.  Anyway, I followed [the link](https://firebase.google.com/docs/web/setup#available-libraries)
in the comment and added 'Authentication' and 'Cloud Firestore'

Unfortunately that page didn't have the links to cdn, it assumed you are using node and npm.
I guessed (looking at the video for names) and picked these:

```js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";
```

Ok, another neat thing.  I created an `app.js` file and used the 'defer' attribute.  Never seen
that before...

```html
<script src="app.js" defer></script>
```

> ***Dang, a lot different from video*** - now it seems they have 'getAuth' instead of auth for example...
Change from Firebase 8 to Firebase 9 I guess...

## Target

So I change the target:

```
firebase target:apply hosting simple goemaat-ma-simple
```

    Project Console: https://console.firebase.google.com/project/goemaat-multiple-apps/overview
    Hosting URL: https://goemaat-ma-simple.firebaseapp.com
    Hosting URL: https://goemaat-multiple-apps.firebaseapp.com
    Hosting URL: https://goemaat-ma-admin-area.firebaseapp.com

