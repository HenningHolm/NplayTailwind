<script lang="ts">
  import { createEventDispatcher } from "svelte";

  let video;
  let isPlaying = false;
  let videoTime = 0;
  let dispatcher = createEventDispatcher();

  function togglePlay() {
    if (video.paused) {
      video.play();
      isPlaying = true;
    } else {
      video.pause();
      isPlaying = false;
    }
  }
  function checkVideoEvents() {
    videoTime = video.currentTime;
    dispatcher("videoEvent", { time: videoTime });
  }

</script>
<div class="video-container">


<video bind:this={video} on:click={togglePlay} on:timeupdate={checkVideoEvents} src="video/testVideo.mp4" width="640" height="360"></video>
</div>
<!-- <button class="btn-dark" on:click={togglePlay}>
  {isPlaying ? 'Pause' : 'Help?'}
</button> -->

<style>

.video-container {
    width: 190px; /* Eller en annen størrelse */
    height: 190px; /* Sørger for at høyde og bredde er like for en perfekt sirkel */
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    justify-content: center; /* Sentrerer videoen horisontalt */
    align-items: center; /* Sentrerer videoen vertikalt */
  }
  button{
    position: absolute;
    bottom: -25%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 8px;
  }

  video {
    width: auto; /* Juster disse verdiene for å passe innenfor containeren */
    height: 100%; /* Juster disse verdiene for å passe innenfor containeren */
    transform: translateX(-20px);
  }

</style>