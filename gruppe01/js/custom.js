/* Navigation und Footer Import */
/* Navigation*/

var link = document.querySelector('#navigationimport');
var navigation = link.import;
var el = navigation.querySelector('#navigation');
document.querySelector("#navigation").appendChild(el.cloneNode(true));

/* Footer */
//var link2 = document.querySelector('link[rel="import"]');

var link2 = document.querySelector('#footerimport');
var footer = link2.import;
var el2 = footer.querySelector('#footer');
document.querySelector("#footer").appendChild(el2.cloneNode(true));



/* run global firebase */
var config = {
    projectId: "guellemarkt24",
    apiKey: "AIzaSyCQq3A6vse8pUbvUfUnQyvd7VSrGGAs6Ok",
    databaseURL: "https://guellemarkt24.firebaseio.com",
    authDomain: "guellemarkt24.firebaseapp.com",
};

/*global firebasetools*/
firebasetools.initialize(config);

/* checking user status and enable/disable login, register, logout btns */
firebase.auth().onAuthStateChanged(userAbfrage);

function userAbfrage(user) {
    if (user) {
        console.log("User with email >" + user.email + "< is signed in.");
        document.getElementById("profile_btn").removeAttribute("hidden");
        document.getElementById("logout_btn").removeAttribute("hidden");
        document.getElementById("register_btn").setAttribute("hidden", "true");
        document.getElementById("login_btn").setAttribute("hidden", "true");
    }
    else {
        console.log("No user signed in.");
        document.getElementById("profile_btn").setAttribute("hidden", "true");
        document.getElementById("logout_btn").setAttribute("hidden", "true");
        document.getElementById("register_btn").removeAttribute("hidden");
        document.getElementById("login_btn").removeAttribute("hidden");
    }
}

/* logout function triggerd by klicking on logout_btn */
function logout() {
    firebase.auth().signOut().then(function() {
        console.log("User successfully signed out.");
    }).catch(handleError);
}


/* This is called if something goes wrong when logging in or logging out.
 * For example if the user's password is wrong. */
function handleError(error) {
    console.error(error.code + ": " + error.message);
}
