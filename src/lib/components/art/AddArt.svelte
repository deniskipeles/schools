<script lang="ts">
  import { input_album, input_images } from "$lib/stores";
  import {
    Button,
    Card,
    CloseButton,
    Drawer,
    Fileupload,
    Helper,
    Input,
    Label,
    Spinner,
    Radio,
  } from "flowbite-svelte";

  import { sineIn } from "svelte/easing";
  import ErrorComp from "../ErrorComp.svelte";
  import { previewFiles, setObjectFormData } from "$lib/tools";
  import type { Admin, ListResult, Record } from "pocketbase";
  import GalleryPage from "../GalleryPage.svelte";
  import AlbumSvelteSelect from "../inputs/AlbumSvelteSelect.svelte";
  // import Selecte from "svelecte";

  export let data: {
    arts: ListResult<Record> | null;
    list_albums: Record[];
    user: Record | Admin | null;
    company: Record;
    error: any;
  };
  export let updateData: Function;
  let transitionParams = {
    x: -320,
    duration: 200,
    easing: sineIn,
  };

  let hidden = true;
  let loading = false;
  let created = false;
  let addError: any = null;

  let fileInput: any;
  async function addProductData() {
    loading = true;
    addError = "";
    created = false;

    const formData = setObjectFormData($input_images);
    files.forEach((file) => {
      formData.append("photos", file);
    });

    const response = await fetch("/api/arts", {
      method: "POST",
      body: formData,
    });
    const res = await response.json();
    if (res?.success) {
      if (data?.arts) {
        data.arts.items = [res?.data, ...data?.arts?.items];
        updateData(data);
      }
      loading = false;
      addError = null;
      created = true;
      const replaceDT = {
        caption: "What a day.",
        artist: "",
        album_id: "",
        private: "true",
        images: [],
      };
      input_images.set(replaceDT);
      files = [];
      images = [];
    } else {
      loading = false;
      addError = res?.error;
      created = false;
    }
  }

  let files: File[] = [];
  let images: { src: string }[] = [];

  async function handleFileInputChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files) {
      files = files.concat(Array.from(inputElement.files));
      const previewUrls = await previewFiles(files);
      images = previewUrls.map((url) => ({ src: url }));
    }
  }

  function removeImage(index: number) {
    images = images.filter((_, i) => i !== index);
    files = files.filter((_, i) => i !== index);
  }
  let album_value = $input_images?.album_id;
  function itemChange(params: string) {
    album_value = params;
    input_images?.update((vals) => {
      vals.album_id = params;
      return vals;
    });
  }
</script>

<Button on:click={() => (hidden = false)} pill={true}>Add Art</Button>
<Drawer transitionType="fly" {transitionParams} bind:hidden id="sidebar1">
  <div class="flex items-center">
    <h5
      id="drawer-label"
      class="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400"
    >
      <svg
        class="w-5 h-5 mr-2"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        ><path
          fill-rule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clip-rule="evenodd"
        /></svg
      >ADD ART
    </h5>
    <CloseButton
      on:click={() => (hidden = true)}
      class="mb-4 dark:text-white"
    />
  </div>
  <p class="mb-6 text-sm text-gray-500 dark:text-gray-400">
    All the fields are required.
  </p>

  <AlbumSvelteSelect
    {itemChange}
    items={data?.list_albums}
    value={album_value}
    user={data?.user}
  />
  <p class="mb-4 font-semibold text-gray-900 dark:text-white">
    <Label for="name" class="mb-2">Caption:</Label>
    <Input bind:value={$input_images.caption} placeholder="Master Image" />
  </p>
  <p class="mb-4 font-semibold text-gray-900 dark:text-white">
    <Label for="with_helper" class="pb-2"
      >Upload Product's Cover Images For Easier Recognition.</Label
    >

    <!-- else content here -->
    <Fileupload
      bind:this={fileInput}
      id="with_helper"
      class="mb-2"
      multiple
      on:change={handleFileInputChange}
      required
    />

    <Helper>JPEG,PNG OR SVG (MAX. 2MB).{files?.length}</Helper>
    <!-- <Gallery class="gap-2 grid-cols-2" items={images} /> -->
    <GalleryPage {images} {removeImage} />
  </p>
  <Card>
    <p class="mb-4 font-semibold text-gray-800 dark:text-white">Private:</p>
    <div class="flex gap-4">
      <Radio bind:group={$input_images.private} value={"true"}>Yes</Radio>
      <Radio bind:group={$input_images.private} value={"false"}>No</Radio>
    </div>
  </Card>
  <div class="mb-6 space-y-10">
    <div class="block mb-2" />
    {#if loading}
      <Button class="text-center w-full"><Spinner />Adding Art...</Button>
    {:else}
      <Button class="text-center w-full" on:click={addProductData}
        >Add This Art</Button
      >
    {/if}
    {#if addError}
      <ErrorComp error={addError} />
    {/if}
    {#if created}
      <p class="text-success-500 font-thin text-lg">
        The Art Is Added Successfully
      </p>
    {/if}
  </div>
</Drawer>
