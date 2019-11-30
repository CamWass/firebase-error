/**
 * Create a user.
 */
function createUser() {
  const resultElement = document.querySelector(".create-result");
  // Clear any existing result message.
  resultElement.textContent = "";

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (email.length < 4) {
    resultElement.textContent = "Please enter an email address.";
    return;
  }
  if (password.length < 4) {
    resultElement.textContent = "Please enter a password.";
    return;
  }

  // Create user with email and pass.
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(result => {
      // Successfully created user.
      resultElement.textContent = JSON.stringify(result, null, "  ");
    })
    .catch(error => {
      // An error occurred while trying to create user.
      console.error(error);
      resultElement.textContent = JSON.stringify(error, null, "  ");
    });
}

function disableUser() {
  const resultElement = document.querySelector(".disable-result");

  // Clear any existing result message.
  resultElement.textContent = "";

  // If there is no signed in user, abort.
  if (!firebase.auth().currentUser) {
    resultElement.textContent = "No user signed in";
    return;
  }

  // Call cloud function to disable user. Auth idToken will be sent automatically.
  firebase
    .functions()
    .httpsCallable("disableUser")()
    .then(() => {
      // Successfully disabled user.
      resultElement.textContent = "Success";
    })
    .catch(error => {
      // An error occurred while trying to disable user.
      console.error(error);
      resultElement.textContent = JSON.stringify(error, null, "  ");
    });
}

function sendPasswordReset() {
  const resultElement = document.querySelector(".send-result");

  // Clear any existing result message.
  resultElement.textContent = "";

  const email = firebase.auth().currentUser.email;

  firebase
    .auth()
    .sendPasswordResetEmail(email)
    .then(() => {
      // Successfully sent password reset email.
      resultElement.textContent = "Password Reset Email Sent!";
    })
    .catch(error => {
      // An error occurred while trying to send password reset email.
      console.error(error);
      resultElement.textContent = JSON.stringify(error, null, "  ");
    });
}

function resetPasswordThruCode() {
  const resultElement = document.querySelector(".reset-result");

  // Clear any existing result message.
  resultElement.textContent = "";

  // oobCode from email.
  const code = document.getElementById("oobCode").value;
  // New password for user
  const newPassword = "qwerty123";

  firebase
    .auth()
    .confirmPasswordReset(code, newPassword)
    .then(() => {
      // Successfully reset user's password.
      resultElement.textContent = "Password reset successful!";
    })
    .catch(error => {
      // An error occurred while trying to reset the user's password.
      console.error(error);
      resultElement.textContent = JSON.stringify(error, null, "  ");
    });
}

function signOut() {
  firebase
    .auth()
    .signOut()
    .catch(error => console.error(error));
}

/**
 * initApp handles setting up UI event listeners and registering Firebase auth listeners:
 *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
 *    out, and that is where we update the UI.
 */
function initApp() {
  // Listening for auth state changes.

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      // User is signed in.

      document.getElementById("sign-in-status").textContent = "Signed in";
      document.getElementById("account-details").textContent = JSON.stringify(
        user,
        null,
        "  "
      );
    } else {
      // User is signed out.

      document.getElementById("sign-in-status").textContent = "Signed out";
      document.getElementById("account-details").textContent = "null";
    }
  });

  document
    .getElementById("create-user")
    .addEventListener("click", createUser, false);
  document
    .getElementById("disable-user")
    .addEventListener("click", disableUser, false);
  document
    .getElementById("send-password-reset")
    .addEventListener("click", sendPasswordReset, false);
  document
    .getElementById("reset-password")
    .addEventListener("click", resetPasswordThruCode, false);
  document.getElementById("sign-out").addEventListener("click", signOut, false);

  // Display firebase SDK version.
  document.querySelector(".SDK-version").textContent = firebase.SDK_VERSION;
}

window.onload = function() {
  initApp();
};
