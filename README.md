# Goemaat-MATest

Simple site testing hosting multiple sites in one firebase project.
This was created following [this tutorial](https://www.youtube.com/watch?v=2ayNDsqtjHs)
from Maksim Ivanov.

Both `admin-site` and `public-site` were created using npx:

```
npx create-creact-app public-site
npx create-creact-app admin-site
```

The pages were just modified to show which site is which.  I did `git init` in each
directory and pushed them to new github repos.  Then in the main directory I 
added them as submodules and pushed to my new repo here:

```
git submodule add git@github.com:JasonGoemaat/goemaat-matest-admin.git admin-site
git submodule add git@github.com:JasonGoemaat/goemaat-matest-public.git public-site
```

After building each from it's directory (`yarn build`), it created `build` subdirectories.

To update my firebase tools I had to do these:

* `npm i -g firebase-tools`
* `firebase logout`
* `firebase login`
* `firebase init`
  * make sure 'hosting' is selected and pick a site name for firebase, all else defaults I think

Then edited `firebase.json` manually to change `hosting` to an array and create 'targets' pointing
to our two sites:

```json
{
  "hosting": [
    {
      "target": "public",
      "public": "public-site/build"
    },
    {
      "target": "admin",
      "public": "admin-site/build"
    }
  ]
}
```

Then used commands to associate those targets to the original site (public) and a new site
I created in the firebase console under hosting for the project:

```
firebase target:apply hosting admin goemaat-ma-admin-area
firebase target:apply hosting public goemaat-multiple-apps

firebase target:apply hosting tournament goemaat-ma-tournament
```

