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

const paradePhotos = [
  {
    id: "photo_friends_who_love_love",
    name: "Friends who love LOVE",
    srcUrl:
      "https://images.scribblelive.com/2019/8/31/e4d80602-c0fc-4122-ab89-441e83ce962f.jpg",
    altText: "Friends who love LOVE 2019 Pride Parade photo",
  },
  {
    id: "photo_pride_colors_police_car",
    name: "Pride colors Police car",
    srcUrl:
      "https://images.scribblelive.com/2019/8/31/667911d7-2f7a-4de7-af46-bc61c2c163e3.jpg",
    altText: "Pride colors Police car 2019 Pride Parade photo",
  },
  {
    id: "photo_love_is_a_terrible_thing_to_hate",
    name: "Love Is a Terrible Thing to Hate",
    srcUrl:
      "https://images.scribblelive.com/2019/8/31/f9a08979-b783-47db-8cb3-ff8c86aa576f.jpg",
    altText: "Love Is a Terrible Thing to Hate 2019 Pride Parade photo",
  },
  {
    id: "photo_winston_and_greg",
    name: "Winston and Greg",
    srcUrl:
      "https://images.scribblelive.com/2019/8/31/b2842646-d731-4491-bfc8-e58d7662ab10.jpg",
    altText: "Winston and Greg 2019 Pride Parade photo",
  },
  {
    id: "photo_love_line",
    name: "Love line",
    srcUrl:
      "https://images.scribblelive.com/2019/8/31/12a02c0a-081d-4369-89a3-e1196e0d8154.jpg",
    altText: "Love line 2019 Pride Parade photo",
  },
  {
    id: "photo_the_future_is_equal",
    name: "THE FUTURE IS EQUAL",
    srcUrl:
      "https://images.scribblelive.com/2019/8/31/a9afe71f-a7ab-40ae-a087-5a85ac7b25d6.jpg",
    altText: "THE FUTURE IS EQUAL  2019 Pride Parade photo",
  },
];

const dbRef = firebase.database().ref();

dbRef.on("value", () => {
  loadParadePhotos(paradePhotos);
});

const loadParadePhotos = (photos) => {
  const photosContainer = document.createElement("div");
  photosContainer.setAttribute("id", "photos_container");

  photos.map((photo) => {
    const { id, name, srcUrl, altText } = photo;

    const photoContainer = document.createElement("div");
    photoContainer.setAttribute("class", "photo");

    const photoName = document.createElement("p");
    photoName.setAttribute("class", "photo_name");
    photoName.innerHTML = name;

    const image = document.createElement("img");
    image.setAttribute("class", "photo");
    image.setAttribute("src", srcUrl);
    image.setAttribute("alt", altText);

    photoContainer.appendChild(photoName);
    photoContainer.appendChild(image);

    photosContainer.appendChild(photoContainer);
  });

  document.querySelector("#container").appendChild(photosContainer);
};

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
