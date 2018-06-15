   /* customer.js, beinhaltet login/logout */
   /* global firebasetools */

   /* global firebase*/
   var config = {
      apiKey: "AIzaSyA1lqle0sqk_UG_LpU7RYU2_vCnzDmgn4M",
      authDomain: "apetito-meiningerhotel.firebaseapp.com",
      databaseURL: "https://apetito-meiningerhotel.firebaseio.com",
      projectId: "apetito-meiningerhotel",
      storageBucket: "apetito-meiningerhotel.appspot.com",
      messagingSenderId: "950686525212"
   };

   firebasetools.initialize(config);


   /* global firebase */


   /* This change listener calls the loginChanged() function 
    * whenever a user logs in or out */
   firebase.auth().onAuthStateChanged(loginChanged);


   function validate() {
      var usermail = document.getElementById("usermail").value;
      var password = document.getElementById("password").value;

      firebase.auth().signInWithEmailAndPassword(usermail, password).catch(handleError);

   }

   function loginChanged(user) {
      console.log(user);

      if (user) {
         console.log("Welcome " + user.email + "!");
         $('#popup').modal('hide');

      }


      else {

         $('#popup').modal({ backdrop: 'static' });

      }

   }

   function logout() {
      firebase.auth().signOut().then(function() {
         alert("You successfully signed out.");
         window.location = "https://www.apetito.de";
      }).catch(handleError);

   }

   /* This function fetches the information for a specific hotel
    * from the database and returns the object */
   function getHotelInfo(callback) {
      firebasetools.getContentItems("hotels", callback);
   }


   function handleError(error) {
      console.error(error.code + "wrong password or E-Mail" + error.message);
      alert("Insert wrong email or password!");
   }