import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyDJxR37CRZtWZ9JASNiJGmR0ZgLvPnZc90",
  authDomain: "bachelorarbeit-test.firebaseapp.com",
  databaseURL: "https://bachelorarbeit-test-default-rtdb.firebaseio.com",
  projectId: "bachelorarbeit-test",
  storageBucket: "bachelorarbeit-test.appspot.com",
  messagingSenderId: "661396793954",
  appId: "1:661396793954:web:f5ff62b6e48405222bbf3b",
  measurementId: "G-WRQ5KJQB6H",
};

var fire = firebase.initializeApp(firebaseConfig);
export default fire;
