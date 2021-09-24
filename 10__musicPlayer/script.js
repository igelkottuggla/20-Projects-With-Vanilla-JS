const musicContainer = document.querySelector('.music-container');
const playBtn = document.querySelector('.play');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

const audio = document.querySelector('.audio');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-container');
const title = document.querySelector('.title');
const cover = document.querySelector('.cover');
const currTime = document.querySelector('#currTime');
const durTime = document.querySelector('#durTime');

const songs = ['hey', 'summer', 'ukulele'];

let songIndex = 2;

const loadSong = (song) => {
    title.innerText = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `images/${song}.jpg`;
};

const pauseSong = () => {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    audio.pause();
};

const playSong = () => {
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
    audio.play();
};

const prevSong = () => {
    songIndex--;

    if (songIndex < 0) songIndex = songs.length - 1;
    loadSong(songs[songIndex]);
    playSong();
};

const nextSong = () => {
    songIndex++;

    if (songIndex > songs.length - 1) songIndex = 0;
    loadSong(songs[songIndex]);
    playSong();
};

const updateProgress = (event) => {
    const { duration, currentTime } = event.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
};

const setProgress = (event) => {
    const width = progressContainer.clientWidth;
    const clickX = event.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
};

loadSong(songs[songIndex]);

playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');

    if (isPlaying) pauseSong();
    else playSong();
});

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);

audio.addEventListener('ended', nextSong);
