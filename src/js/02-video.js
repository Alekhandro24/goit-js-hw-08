import VimeoPlayer from '@vimeo/player';
import lodashThrottle from 'lodash.throttle';

const VIMEO_PLAYER_STORAGE_KEY = 'videoplayer-current-time';

const iframe = document.querySelector('iframe');
const player = new VimeoPlayer(iframe);

player.on('timeupdate', lodashThrottle(onTimeUpdate, 1000));

function onTimeUpdate(e) {
  const playbackPosition = e.seconds;
  localStorage.setItem(VIMEO_PLAYER_STORAGE_KEY, playbackPosition);
}

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

player
  .setCurrentTime(localStorage.getItem(VIMEO_PLAYER_STORAGE_KEY))
  .then(function (seconds) {
    // seconds = the actual time that the player seeked to
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });
