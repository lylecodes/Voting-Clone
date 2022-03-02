const firebaseConfig = {
  apiKey: "AIzaSyBgwEswyNa4R3jXmk8JnoaEdD7KMJ2F2QM",
  authDomain: "voting-b90b3.firebaseapp.com",
  databaseURL: "https://voting-b90b3-default-rtdb.firebaseio.com",
  projectId: "voting-b90b3",
  storageBucket: "voting-b90b3.appspot.com",
  messagingSenderId: "505804863400",
  appId: "1:505804863400:web:ef4e6304954821df704f9d",
  measurementId: "G-DY9N2MBC3F",
};
firebase.initializeApp(firebaseConfig);

// const testRef = dbRef.child("test");
// console.log(testRef);

const dbRef = firebase.database().ref();
dbRef
  .child("users")
  .get()
  .then((snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val());
    } else {
      console.log("No data available");
    }
  })
  .catch((error) => {
    console.error(error);
  });

// const votingRef = firebase.database().ref("users");
// var votingRef = firebase.database().ref();
// const testRef = votingRef.child("users");
// console.log(testRef);
// votingRef.on("value", (snapshot) => {
//   const data = snapshot.val();
//   console.log(data);
// });
