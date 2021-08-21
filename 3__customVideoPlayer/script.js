'use strict';

const video = document.querySelector('.video');
const playBtn = document.querySelector('.play i');
const stropBtn = document.querySelector('.stop');
const progressBar = document.querySelector('.progress');
const timeStamp = document.querySelector('.timestamp');

//play & pause

const toggleVideoStatus = () => {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
};

const updatePlayIcon = () => {
    if (video.paused) {
        playBtn.className = 'fa fa-play fa-2x';
    } else {
        playBtn.className = 'fa fa-pause fa-2x';
    }
};

//update progressBar & timestamp
const updateProgressBar = () => {
    progressBar.value = (video.currentTime / video.duration) * 100;

    //get minutes
    let mins = Math.floor(video.currentTime / 60);
    if (mins < 10) {
        mins = `0${String(mins)}`;
    }

    //get seconds
    let secs = Math.floor(video.currentTime % 60);
    if (secs < 10) {
        secs = `0${String(secs)}`;
    }

    timeStamp.textContent = `${mins}:${secs}`;
};

//set vieo time to progressBar
const setVideoProgressBar = () => {
    video.currentTime = parseInt((progressBar.value * video.duration) / 100);
};

//stop video
const stopVideo = () => {
    video.pause();
    video.currentTime = 0;
};

//Event listeners
video.addEventListener('click', toggleVideoStatus);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('timeupdate', updateProgressBar);

playBtn.addEventListener('click', toggleVideoStatus);
stropBtn.addEventListener('click', stopVideo);

progressBar.addEventListener('change', setVideoProgressBar);
