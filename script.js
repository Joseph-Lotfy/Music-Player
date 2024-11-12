import lottieWeb from 'https://cdn.skypack.dev/lottie-web';

const playIconContainers = document.querySelectorAll('.play-icon');

// Store animations in a Map to control each individually without reloading
const animations = new Map();

playIconContainers.forEach((iconContainer) => {
    // Initialize and store the animation instance for each icon
    const animation = lottieWeb.loadAnimation({
        container: iconContainer,
        path: 'https://maxst.icons8.com/vue-static/landings/animated-icons/icons/pause/pause.json',
        renderer: 'svg',
        loop: false,
        autoplay: false,
        name: "Demo Animation",
    });

    animation.goToAndStop(14, true);
    iconContainer.dataset.state = 'play';
    animations.set(iconContainer, animation);

    iconContainer.addEventListener('click', (e) => {
        // Check if the clicked icon is in "play" state
        if (iconContainer.dataset.state === 'play') {
            // Reset all other "paused" icons to "play"
            playIconContainers.forEach((otherIcon) => {
                if (otherIcon !== iconContainer && otherIcon.dataset.state === 'pause') {
                    const otherAnimation = animations.get(otherIcon);
                    otherAnimation.playSegments([0, 14], true);
                    otherIcon.dataset.state = 'play';
                }
            });

            // Play the animation from "play" to "pause"
            animation.playSegments([14, 27], true);
            iconContainer.dataset.state = 'pause';
        } else {
            // Play the animation from "pause" to "play"
            animation.playSegments([0, 14], true);
            iconContainer.dataset.state = 'play';
        }
        
        // Update the cover information
        const song = e.target.closest('.song');
        const innerText = song.querySelector('.song-name').innerHTML;
        const innerArtist = song.querySelector('.song-artist').innerHTML;
        const innerImage = song.querySelector('.song-img').src;
        const TitleName = document.getElementById('cover-song-name');
        const ArtistName = document.getElementById('cover-song-artist');
        const CoverImage = document.getElementById('cover-song-image');
        const backgroundImg = document.getElementById('bg-image');
        TitleName.innerHTML = innerText;
        ArtistName.innerHTML = innerArtist;
        CoverImage.src= innerImage;
        backgroundImg.style.background = `linear-gradient(transparent, black 100%), url(${innerImage}) center / cover no-repeat`;
        backgroundImg.style.backgroundBlendMode = 'overlay';

    });
});
