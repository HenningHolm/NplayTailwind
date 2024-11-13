<script lang="ts">
  import TailwindCss from './lib/TailwindCSS.svelte';
  import UpperPlayground from './lib/UpperPlayground.svelte';
  import LowerPlayground from './lib/LowerPlayground.svelte';
  let expandLower = false;

</script>
<TailwindCss/>

<main class="h-screen grid {expandLower ? 'grid-rows-[7fr_5fr]' : 'grid-rows-[9fr_3fr]'}">
  <UpperPlayground/>
  <LowerPlayground/>
</main>


