export default class YouTube {
  constructor(elementHTML) {
    this.element = elementHTML;
    console.log(this.element);

    this.videoContainer = this.element.querySelector('.js-video');
    this.poster = this.element.querySelector('.js-poster');
    this.videoId = this.element.dataset.videoId;
    this.autoplay = 1; // Force autoplay to 1 so it plays automatically on load
    this.playerReady = false;

    YouTube.instances.push(this);

    if (this.videoId) {
      YouTube.loadScript();
    } else {
      console.error('Vous devez specifier un id');
    }
  }

  static loadScript() {
    if (!YouTube.scriptIsLoading) {
      YouTube.scriptIsLoading = true;

      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(script);
    }
  }

  init() {
    this.initPlayer = this.initPlayer.bind(this);
    this.initPlayer(); // Always initialize the player
  }

  initPlayer() {
    console.log(this.autoplay);
    this.player = new YT.Player(this.videoContainer, {
        height: '100%',
        width: '100%',
        videoId: this.videoId,
        playerVars: { rel: 0, autoplay: this.autoplay, mute: 1 }, // Mute the video
        events: {
            onReady: () => {
                this.playerReady = true;
                const observer = new IntersectionObserver(this.watch.bind(this), {
                    rootMargin: '0px 0px 0px 0px',
                });
                observer.observe(this.element);
                this.player.playVideo(); // Attempt to play video
            },
        onStateChange: (event) => {
          if (event.data == YT.PlayerState.PLAYING) {
            YouTube.pauseAll(this);
          } else if (event.data == YT.PlayerState.ENDED) {
            this.player.seekTo(0);
            this.player.pauseVideo();
          }
        },
      },
    });
  }

  watch(entries) {
    if (this.playerReady) {
      if (entries[0].isIntersecting) {
        this.player.playVideo();
      } else {
        this.player.pauseVideo();
      }
    }
  }

  static initAll() {
    document.documentElement.classList.add('is-video-ready');
    for (let i = 0; i < YouTube.instances.length; i++) {
      const instance = YouTube.instances[i];
      instance.init();
    }
  }

  static pauseAll(currentInstance) {
    for (let i = 0; i < YouTube.instances.length; i++) {
      const instance = YouTube.instances[i];
      if (instance.playerReady && instance !== currentInstance) {
        instance.player.pauseVideo();
      }
    }
  }
}

YouTube.instances = [];
window.onYouTubeIframeAPIReady = YouTube.initAll;
