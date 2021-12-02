const form = document.querySelector('.lyrics__form');
const search = document.getElementById('search');
const result = document.querySelector('.lyrics__container');
const songContainer = document.querySelector('.lyrics__text');

const apiURL = 'https://api.lyrics.ovh';

const showData = (data) => {
    result.innerHTML = '';
    resultContent = `
    <ul>
      ${data.data
          .map(
              (song) => `<li>
                <span><strong>${song.artist.name}</strong> - ${song.title}</span>
                <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
                </li>`
          )
          .join('')}
    </ul>
  `;
    result.appendChild(songContainer);
    songContainer.innerHTML = 'Lyrics will be displayed here...';

    result.insertAdjacentHTML('afterbegin', resultContent);
};

const searchSongs = async (term) => {
    try {
        const res = await fetch(`${apiURL}/suggest/${term}`);
        const data = await res.json();
        showData(data);
    } catch (error) {
        console.log(error.message);
    }
};

const getLyrics = async (artist, songTitle) => {
    try {
        const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
        const data = await res.json();

        if (data.error) {
            songContainer.innerHTML = data.error;
        } else {
            const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');

            resultSong = `
            <h2><strong>${artist}</strong> - ${songTitle}</h2>
            <span>${lyrics}</span>
        `;

            songContainer.innerHTML = '';
            songContainer.insertAdjacentHTML('afterbegin', resultSong);
        }
    } catch (error) {
        console.log(error);
    }
};

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const searchTerm = search.value.trim();

    if (!searchTerm) {
        alert('Please type in a search term');
    } else {
        searchSongs(searchTerm);
    }
});

result.addEventListener('click', (event) => {
    const clickedEl = event.target;

    if (clickedEl.tagName === 'BUTTON') {
        const artist = clickedEl.getAttribute('data-artist');
        const songTitle = clickedEl.getAttribute('data-songtitle');

        getLyrics(artist, songTitle);
    }
});
