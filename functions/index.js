const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.disableUser = functions.https.onCall((data, context) => {
  // Checking that the user is authenticated.
  if (!context.auth) {
    // Throwing an HttpsError so that the client gets the error details.
    throw new functions.https.HttpsError("unauthenticated", "Unauthenticated");
  }

  const uid = context.auth.uid;

  return admin.auth().updateUser(uid, {
    disabled: true
  });
});
