const song = document.getElementById("song");
const playBtn = document.querySelector(".player-inner");
const nextBtn = document.querySelector(".play-forward");
const prevBtn = document.querySelector(".play-back");
const durationTime = document.querySelector(".duration");
const remainingTime = document.querySelector(".remaining");
const rangeBar = document.querySelector(".range");
const musicName = document.querySelector(".music-name");
const musicThumbnail = document.querySelector(".music-thumb");
const musicImage = document.querySelector(".music-thumb img");
const playRepeat = document.querySelector(".play-repeat");

let isPlaying = true;
let indexSong = 0;
let isRepeat = false;
// const musics = ["holo.mp3", "summer.mp3", "spark.mp3", "home.mp3"];
const musics = [
  {
    id: 1,
    title: "Holo",
    file: "holo.mp3",
    image:
      "https://images.unsplash.com/photo-1614624532983-4ce03382d63d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1931&q=80",
  },
  {
    id: 2,
    title: "Summer",
    file: "summer.mp3",
    image:
      "https://images.unsplash.com/photo-1616763355548-1b606f439f86?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  },
  {
    id: 3,
    title: "Spark",
    file: "spark.mp3",
    image:"data:image/jpeg;base64,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",
  },
  {
    id: 4,
    title: "Home",
    file: "home.mp3",
    image: "beatles",
  },
  {
    id: 5,
    title: "Thái Bình mồ hôi rơi-Sơn Tùng MTP",
    file: "ThaiBinhMoHoiRoi.mp3",
    image: "music",
  }
];
/**
 * Music
 * id: 1
 * title: Holo
 * file: holo.mp3
 * image: unsplash
 */

let timer;
let repeatCount = 0;
playRepeat.addEventListener("click", function () {
  if (isRepeat) {
    isRepeat = false;
    playRepeat.removeAttribute("style");
  } else {
    isRepeat = true;
    playRepeat.style.color = "#ffb86c";
  }
});


nextBtn.addEventListener("click", function () {
  changeSong(1);
});
prevBtn.addEventListener("click", function () {
  changeSong(-1);
});
song.addEventListener("ended", handleEndedSong);
function handleEndedSong() {
  repeatCount++;
  if (isRepeat && repeatCount === 1) {
    // handle repeat song
    isPlaying = true;
    playPause();
  } else {
    changeSong(1);
  }
}
function changeSong(dir) {
  if (dir === 1) {
    // next song
    indexSong++;
    if (indexSong >= musics.length) {
      indexSong = 0;
    }
    isPlaying = true;
  } else if (dir === -1) {
    // prev song
    indexSong--;
    if (indexSong < 0) {
      indexSong = musics.length - 1;
    }
    isPlaying = true;
  }
  init(indexSong);
   //song.setAttribute("src", `./music/${musics[indexSong].file}`);
  playPause();
}
playBtn.addEventListener("click", playPause);
function playPause() {
  if (isPlaying) {
    musicThumbnail.classList.add("is-playing");
    song.play();
    playBtn.innerHTML = `<ion-icon name="pause-circle"></ion-icon>`;
    isPlaying = false;
    timer = setInterval(displayTimer, 500);
  } else {
    musicThumbnail.classList.remove("is-playing");
    song.pause();
    playBtn.innerHTML = `<ion-icon name="play"></ion-icon>`;
    isPlaying = true;
    clearInterval(timer);
  }
}
function displayTimer() {
  const { duration, currentTime } = song;
  rangeBar.max = duration;
  rangeBar.value = currentTime;
  remainingTime.textContent = formatTimer(currentTime);
  if (!duration) {
    durationTime.textContent = "00:00";
  } else {
    durationTime.textContent = formatTimer(duration);
  }
}
function formatTimer(number) {
  const minutes = Math.floor(number / 60);
  const seconds = Math.floor(number - minutes * 60);
  return `${minutes < 10 ? "0" + minutes : minutes}:${
    seconds < 10 ? "0" + seconds : seconds
  }`;
}
rangeBar.addEventListener("change", handleChangeBar);
function handleChangeBar() {
  song.currentTime = rangeBar.value;
}
function init(indexSong) {
  song.setAttribute("src", `./music/${musics[indexSong].file}`);
  musicImage.setAttribute("src", musics[indexSong].image);
  musicName.textContent = musics[indexSong].title;
}
displayTimer();
init(indexSong);


const handleSearch =  function() {
  const searchInput = document.getElementById('search-input');
  const searchQuery = searchInput.value;
  const searchRs = document.getElementById("search-results");

  let found = -1;
  musics.forEach(music => {
    if (searchQuery.toUpperCase() === music.title.toUpperCase()) {
      init(music.id-1);
      searchRs.innerHTML = "Đã tìm thấy bài hát mời bạn thưởng thức <3"
      found = 1;
    }
  });
  if (found == "-1") {

    searchRs.innerHTML = "Không tìm thấy bài hát. Vui lòng tìm kiếm lại tên bài hát";

  }
};