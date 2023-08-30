<script>
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { pb } from "$lib/pocketbase";
  import { img_to_view_data, img_to_view_url, open_model } from "$lib/stores";
  import { serializeNonPOJOs } from "$lib/tools";
  import ImageModal from "./ImageModal.svelte";

  export let imageUrl;
  export let caption;
  export let image;
  export let key;
  export let updateData;

  async function removeImage() {
    try {
      const photos = [];
      photos.push(image?.photos[key]);
      // console.log(image?.id,photos);
      let record = await pb.collection("arts").update(image?.id, {
        "photos-": photos,
      });
      record = serializeNonPOJOs(record);
      await updateData(record);
    } catch (error) {
      console.log(error);
    }
  }

  function openModal() {
    if (
      image?.photos?.length > 1 &&
      !$page.url?.pathname?.startsWith("/arts/")
    ) {
      goto(`/arts/${image?.id}`, { replaceState: false });
    } else {
      let img = image?.photos
        ? pb.files.getUrl(image, image?.photos[key], {
            //   thumb: "100x100",
          })
        : "/images/img1.jpg";
      img_to_view_url.set(img);
      open_model.set(true);
      img_to_view_data.set(image);
    }
  }

  function closeModal() {
    img_to_view_url.set("");
    open_model.set(false);
    img_to_view_data.set({});
  }
</script>

<div class="relative">
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <img
    src={imageUrl}
    alt={caption}
    on:click={openModal}
    class="cursor-pointer h-auto w-full rounded-lg"
  />
  {#if $page?.url?.pathname?.startsWith("/arts/")}
    <!-- content here -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="remove-button" on:click={removeImage}>X</div>
  {/if}
  <div
    class="absolute bottom-0 bg-black bg-opacity-50 w-full p-2 text-white text-center"
  >
    {caption}
  </div>
  <ImageModal {closeModal} />
</div>

<style>
  .remove-button {
    position: absolute;
    top: 5px;
    right: 5px;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    padding: 4px;
    border-radius: 50%;
    font-size: 16px;
    cursor: pointer;
  }

  .remove-button:hover {
    background-color: rgb(241, 52, 52);
  }
</style>
