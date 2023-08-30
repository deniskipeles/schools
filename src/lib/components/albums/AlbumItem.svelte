<script>
  import { goto } from "$app/navigation";

  
  export let imageUrl;
  export let album;

  function openModal() {
    goto(`/albums/${album?.id}`, { replaceState: false });
  }
</script>

<div class="relative">
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <img
    src={imageUrl}
    alt={`${album?.photos_count} images`}
    on:click={openModal}
    class="cursor-pointer h-auto w-full rounded-lg"
  />
  <div
    class="absolute bottom-0 bg-black bg-opacity-50 w-full p-2 text-white text-center"
  >
    <p>
      {album?.name}
    </p>
    <p>
      {album?.photos_count} images
    </p>
  </div>
</div>
