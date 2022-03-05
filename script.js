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
  let hasVoted = localStorage.getItem("photo vote");

  const oldPhotosContainer = document.querySelector("#photos_container");

  if (oldPhotosContainer !== null) {
    oldPhotosContainer.remove();
  }

  const photosContainer = document.createElement("div");
  photosContainer.setAttribute("id", "photos_container");

  const { paradePhotos } = data;

  paradePhotos.map((photoInfo, index) => {
    const { name, srcUrl, altText, votes } = photoInfo;

    const photoContainer = document.createElement("div");
    photoContainer.setAttribute("class", "photo_container");

    const photoName = document.createElement("p");
    photoName.setAttribute("class", "photo_name");
    photoName.innerHTML = name;

    const image = document.createElement("img");
    image.setAttribute("class", "photo");
    image.setAttribute("src", srcUrl);
    image.setAttribute("alt", altText);

    const voteContainer = document.createElement("div");
    voteContainer.setAttribute("class", "vote_btn_container");

    const voteBtn = document.createElement("button");
    console.log(voteBtn.innerHTML);
    voteBtn.setAttribute("id", `${index}`);
    voteBtn.setAttribute("class", "btn btn-primary");

    if (!hasVoted) {
      voteBtn.addEventListener("click", castVote);
      voteBtn.innerHTML = "Vote";
    } else {
      voteBtn.innerHTML = `Votes: ${votes}, Total Votes: ${totalVotes}`;
      voteBtn.disabled = true;
    }

    voteContainer.appendChild(voteBtn);

    photoContainer.appendChild(photoName);
    photoContainer.appendChild(image);
    photoContainer.appendChild(voteContainer);

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
  localStorage.setItem("photo vote", "voted");
  const id = evt.target.id;

  dbRef
    .child("paradePhotos")
    .child(id)
    .get()
    .then((snapshot) => {
      if (snapshot.exists()) {
        const photoInfo = snapshot.val();
        updateVote(photoInfo, id);
      } else {
        throw Error("No data available");
      }
    })
    .catch((error) => {
      throw Error(error);
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
