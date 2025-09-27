<script>
  import favicon from '$lib/assets/favicon.svg';
  import MainMenu from '$lib/components/MainMenu.svelte';
  export let data;
  let { options } = data;
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<MainMenu {options} />

<slot />
