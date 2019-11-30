# firebase-error

[Live demo](https://fir-error-c4072.firebaseapp.com)

#### To use your own firebase project:

1.  Clone this repo.
2. Install dependencies:
```
npm i
```

3. Deploy to firebase:

```
firebase deploy --project YOUR_PROJECT_ID
```

Then you can optionally change the firebase auth email action handler:

1. Open your project in the Firebase console.
2. Go to the Email Templates page in the Auth section.
3. In any of the Email Types entries, click the pencil icon to edit the email template.
4. Click customize action URL, and enter:

```
https://YOUR-PROJECT-ID.firebaseapp.com/authAction.html
```

This makes it easier to obtain oobCodes, but is not necessary.
