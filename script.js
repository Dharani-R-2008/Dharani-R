/* =========================================
   VETRI MUSIC APP
========================================= */


const songs = [

    {
        title: "Midnight Drive",
        artist: "Vetri Beats",
        image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=500&q=80",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },

    {
        title: "Dreams",
        artist: "A.R. Beats",
        image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=500&q=80",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    },

    {
        title: "Night Vibes",
        artist: "Vetri Music",
        image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=500&q=80",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    },

    {
        title: "Ocean Eyes",
        artist: "Dream Sounds",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=500&q=80",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
    },

    {
        title: "Golden Hour",
        artist: "Vibe Studio",
        image: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=500&q=80",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
    }

];


const artists = [

    {
        name: "Vetri Beats",
        image: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=400&q=80"
    },

    {
        name: "Dream Music",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
    },

    {
        name: "A.R. Beats",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80"
    },

    {
        name: "Night Studio",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80"
    },

    {
        name: "Vibe Factory",
        image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80"
    }

];


let currentSongIndex = 0;

let audio = new Audio();

let isPlaying = false;


/* =========================================
   ELEMENTS
========================================= */

const content = document.getElementById("content");

const playerTitle = document.getElementById("playerTitle");

const playerArtist = document.getElementById("playerArtist");

const playerImage = document.getElementById("playerImage");

const playPause = document.getElementById("playPause");

const progress = document.getElementById("progress");

const currentTime = document.getElementById("currentTime");

const duration = document.getElementById("duration");

const volume = document.getElementById("volume");

const searchInput = document.getElementById("searchInput");


/* =========================================
   HOME PAGE
========================================= */

function showHome() {

    content.innerHTML = `

        <div class="hero">

            <div class="hero-text">

                <h1>Good evening 👋</h1>

                <p>
                    Discover your favourite songs,
                    artists and playlists on Vetri Music.
                </p>

                <button class="hero-button" id="exploreBtn">
                    Explore Music
                </button>

            </div>

        </div>


        <section class="section">

            <div class="section-header">

                <h2>Trending Songs</h2>

                <button class="show-all">
                    Show all
                </button>

            </div>

            <div class="cards">

                ${songs.map((song, index) => `

                    <div class="card" data-index="${index}">

                        <img
                            class="card-image"
                            src="${song.image}"
                        >

                        <button
                            class="play-card"
                            data-index="${index}"
                        >
                            <i class="fa-solid fa-play"></i>
                        </button>

                        <h3>${song.title}</h3>

                        <p>${song.artist}</p>

                    </div>

                `).join("")}

            </div>

        </section>



        <section class="section">

            <div class="section-header">

                <h2>Popular Artists</h2>

                <button class="show-all">
                    Show all
                </button>

            </div>


            <div class="cards">

                ${artists.map(artist => `

                    <div class="artist-card">

                        <img
                            class="artist-image"
                            src="${artist.image}"
                        >

                        <h3>${artist.name}</h3>

                        <p>Artist</p>

                    </div>

                `).join("")}

            </div>

        </section>

    `;


    addSongEvents();

}


/* =========================================
   SEARCH PAGE
========================================= */

function showSearch() {

    content.innerHTML = `

        <div class="search-page">

            <h1>Search</h1>

            <input
                class="big-search"
                id="pageSearch"
                placeholder="Search for songs or artists..."
            >

            <section class="section">

                <div class="section-header">

                    <h2>Popular Songs</h2>

                </div>

                <div
                    class="cards"
                    id="searchResults"
                >

                    ${renderSongs(songs)}

                </div>

            </section>

        </div>

    `;


    const pageSearch = document.getElementById("pageSearch");

    pageSearch.addEventListener("input", () => {

        const value = pageSearch.value.toLowerCase();

        const filtered = songs.filter(song =>
            song.title.toLowerCase().includes(value) ||
            song.artist.toLowerCase().includes(value)
        );

        document.getElementById("searchResults").innerHTML =
            renderSongs(filtered);

        addSongEvents();

    });

}


/* =========================================
   LIBRARY PAGE
========================================= */

function showLibrary() {

    content.innerHTML = `

        <div class="library-page">

            <h1>Your Library</h1>

            <div class="library-buttons">

                <button>
                    All
                </button>

                <button>
                    Playlists
                </button>

                <button>
                    Artists
                </button>

                <button>
                    Albums
                </button>

            </div>


            <section class="section">

                <div class="section-header">

                    <h2>Your Songs</h2>

                </div>

                <div class="cards">

                    ${renderSongs(songs)}

                </div>

            </section>

        </div>

    `;


    addSongEvents();

}


/* =========================================
   RENDER SONGS
========================================= */

function renderSongs(songList) {

    return songList.map(song => {

        const index = songs.indexOf(song);

        return `

            <div class="card" data-index="${index}">

                <img
                    class="card-image"
                    src="${song.image}"
                >

                <button
                    class="play-card"
                    data-index="${index}"
                >
                    <i class="fa-solid fa-play"></i>
                </button>

                <h3>${song.title}</h3>

                <p>${song.artist}</p>

            </div>

        `;

    }).join("");

}


/* =========================================
   SONG EVENTS
========================================= */

function addSongEvents() {

    document.querySelectorAll(".play-card").forEach(button => {

        button.addEventListener("click", (event) => {

            event.stopPropagation();

            const index = Number(
                button.dataset.index
            );

            loadSong(index);

            playSong();

        });

    });


    document.querySelectorAll(".card").forEach(card => {

        card.addEventListener("dblclick", () => {

            const index = Number(
                card.dataset.index
            );

            loadSong(index);

            playSong();

        });

    });

}


/* =========================================
   LOAD SONG
========================================= */

function loadSong(index) {

    currentSongIndex = index;

    const song = songs[index];

    playerTitle.textContent = song.title;

    playerArtist.textContent = song.artist;

    playerImage.src = song.image;

    audio.src = song.audio;

    progress.value = 0;

}


/* =========================================
   PLAY SONG
========================================= */

function playSong() {

    audio.play()
        .then(() => {

            isPlaying = true;

            playPause.innerHTML =
                '<i class="fa-solid fa-pause"></i>';

        })
        .catch(() => {

            alert(
                "Audio could not be played. Please try again."
            );

        });

}


/* =========================================
   PAUSE SONG
========================================= */

function pauseSong() {

    audio.pause();

    isPlaying = false;

    playPause.innerHTML =
        '<i class="fa-solid fa-play"></i>';

}


/* =========================================
   PLAY / PAUSE BUTTON
========================================= */

playPause.addEventListener("click", () => {

    if (!audio.src) {

        loadSong(0);

    }


    if (isPlaying) {

        pauseSong();

    } else {

        playSong();

    }

});


/* =========================================
   NEXT
========================================= */

document.getElementById("nextBtn")
    .addEventListener("click", () => {

        currentSongIndex++;

        if (currentSongIndex >= songs.length) {
            currentSongIndex = 0;
        }

        loadSong(currentSongIndex);

        playSong();

    });


/* =========================================
   PREVIOUS
========================================= */

document.getElementById("previousBtn")
    .addEventListener("click", () => {

        currentSongIndex--;

        if (currentSongIndex < 0) {
            currentSongIndex = songs.length - 1;
        }

        loadSong(currentSongIndex);

        playSong();

    });


/* =========================================
   AUDIO PROGRESS
========================================= */

audio.addEventListener("timeupdate", () => {

    if (!audio.duration) return;

    const percent =
        (audio.currentTime / audio.duration) * 100;

    progress.value = percent;

    currentTime.textContent =
        formatTime(audio.currentTime);

    duration.textContent =
        formatTime(audio.duration);

});


progress.addEventListener("input", () => {

    if (!audio.duration) return;

    audio.currentTime =
        (progress.value / 100) * audio.duration;

});


/* =========================================
   VOLUME
========================================= */

volume.addEventListener("input", () => {

    audio.volume = volume.value;

});


/* =========================================
   AUTO NEXT
========================================= */

audio.addEventListener("ended", () => {

    currentSongIndex++;

    if (currentSongIndex >= songs.length) {
        currentSongIndex = 0;
    }

    loadSong(currentSongIndex);

    playSong();

});


/* =========================================
   TIME FORMAT
========================================= */

function formatTime(seconds) {

    if (isNaN(seconds)) {
        return "0:00";
    }

    const minutes =
        Math.floor(seconds / 60);

    const secs =
        Math.floor(seconds % 60);

    return `${minutes}:${secs
        .toString()
        .padStart(2, "0")}`;

}


/* =========================================
   SIDEBAR NAVIGATION
========================================= */

document.querySelectorAll(".nav-btn")
    .forEach(button => {

        button.addEventListener("click", () => {

            document
                .querySelectorAll(".nav-btn")
                .forEach(btn =>
                    btn.classList.remove("active")
                );

            button.classList.add("active");


            const page =
                button.dataset.page;


            if (page === "home") {

                showHome();

            }

            else if (page === "search") {

                showSearch();

            }

            else if (page === "library") {

                showLibrary();

            }

        });

    });


/* =========================================
   TOP SEARCH
========================================= */

searchInput.addEventListener("input", () => {

    const value =
        searchInput.value.toLowerCase().trim();

    if (value === "") {

        showHome();

        return;

    }


    const filtered =
        songs.filter(song =>
            song.title.toLowerCase().includes(value) ||
            song.artist.toLowerCase().includes(value)
        );


    content.innerHTML = `

        <div class="search-page">

            <h1>Search results</h1>

            <div class="cards">

                ${renderSongs(filtered)}

            </div>

        </div>

    `;


    addSongEvents();

});


/* =========================================
   EXPLORE BUTTON
========================================= */

document.addEventListener("click", event => {

    if (event.target.id === "exploreBtn") {

        document
            .querySelector('[data-page="search"]')
            .click();

    }

});


/* =========================================
   ADD PLAYLIST
========================================= */

document.getElementById("addPlaylist")
    .addEventListener("click", () => {

        const name =
            prompt("Enter playlist name:");

        if (!name) return;

        alert(
            `"${name}" playlist created successfully!`
        );

    });


/* =========================================
   START APP
========================================= */

showHome();

audio.volume = 0.7;

    }

});
