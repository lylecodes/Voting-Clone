const loadVariable = (src, type) => {
  const script = document.createElement("script");
  script.src = src;
  document.head.append(script);

  if (type === "apiKey") return script.FIREBASE_API_KEY;
  throw Error("Variable type is undefined");
};

const apiKey = loadVariable("variables.js", "apiKey");

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: "voting-b90b3.firebaseapp.com",
  databaseURL: "https://voting-b90b3-default-rtdb.firebaseio.com",
  projectId: "voting-b90b3",
  storageBucket: "voting-b90b3.appspot.com",
  messagingSenderId: "505804863400",
  appId: "1:505804863400:web:ef4e6304954821df704f9d",
  measurementId: "G-DY9N2MBC3F",
};
firebase.initializeApp(firebaseConfig);

const dbRef = firebase.database().ref();

dbRef.on("value", (snapshot) => {
  if (snapshot.exists()) {
    const data = snapshot.val();
    const totalVotes = getVoteTotals(data);
    loadParadePhotos(data, totalVotes);
  } else {
    throw Error("Error loading photos");
  }
});

const loadParadePhotos = (data, totalVotes) => {
  const photosContainer = document.createElement("div");
  photosContainer.setAttribute("id", "photos_container");

  const { paradePhotos } = data;

  paradePhotos.map((photoInfo, index) => {
    const { name, srcUrl, altText, votes } = photoInfo;
    console.log(votes);

    const photoContainer = document.createElement("div");
    photoContainer.setAttribute("class", "photo");

    const photoName = document.createElement("p");
    photoName.setAttribute("class", "photo_name");
    photoName.innerHTML = name;

    const image = document.createElement("img");
    image.setAttribute("class", "photo");
    image.setAttribute("src", srcUrl);
    image.setAttribute("alt", altText);

    const voteBtn = document.createElement("button");
    voteBtn.setAttribute("id", `${index}`);
    voteBtn.setAttribute("class", "btn btn-primary");
    voteBtn.addEventListener("click", castVote);
    voteBtn.innerHTML = `Votes: ${votes}, Total Votes: ${totalVotes}`;
    console.log(voteBtn.innerHTML);

    photoContainer.appendChild(photoName);
    photoContainer.appendChild(image);
    photoContainer.appendChild(voteBtn);

    photosContainer.appendChild(photoContainer);
  });

  document.querySelector("#container").appendChild(photosContainer);
};

const getVoteTotals = (data) => {
  let totalVotes = 0;
  const { paradePhotos } = data;

  paradePhotos.map((photo) => {
    totalVotes += photo.votes;
  });
  return totalVotes;
};

const castVote = (evt) => {
  const id = evt.target.id;
  console.log(id);
  dbRef
    .child("paradePhotos")
    .child(id)
    .get()
    .then((snapshot) => {
      if (snapshot.exists()) {
        const photoInfo = snapshot.val();
        updateVote(photoInfo, id);
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

const updateVote = (data, photoId) => {
  const { id, name, srcUrl, altText, votes } = data;
  firebase
    .database()
    .ref("paradePhotos/" + photoId)
    .set({
      id: id,
      name: name,
      srcUrl: srcUrl,
      altText: altText,
      votes: votes + 1,
    });
};
