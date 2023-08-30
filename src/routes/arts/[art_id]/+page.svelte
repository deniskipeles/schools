<script lang="ts">
  import { Breadcrumb, BreadcrumbItem, Button } from "flowbite-svelte";
  import type { Admin, ListResult, Record } from "pocketbase";
  import GalleryItem from "$lib/components/art/GalleryItem.svelte";
  import ErrorComp from "$lib/components/ErrorComp.svelte";
  import { getPbImageUrl } from "$lib/tools";
  import AddArt from "$lib/components/art/AddArt.svelte";
  import { goto } from "$app/navigation";
  import AddMoreArt from "$lib/components/art/AddMoreArt.svelte";
  import { page } from "$app/stores";
  /** @type {import('./$types').PageData} */
  export let data: {
    arts: Record | null;
    user: Record | Admin | null;
    company: Record;
    error: any;
  };

  async function updateData(dt: any) {
    if (data?.arts) {
      data.arts = dt
    }
  }
  function goBack(dt: any) {
    history.back();
  }
</script>

<Breadcrumb class="pt-20 py-8">
  <BreadcrumbItem href="/" home>Home</BreadcrumbItem>
</Breadcrumb>
<Button pill on:click={goBack}>Go Back</Button>
<AddMoreArt {updateData} art_id={$page?.params?.art_id} />
<!-- <AddArt {updateData} {data} /> -->
{#if data?.arts}
  <!-- content here -->
  <div class="gap-4 grid-cols-2 grid">
    {#each data?.arts?.photos as image, key}
      <GalleryItem
        imageUrl={getPbImageUrl(data?.arts, image, "200x0")}
        caption={data?.arts?.caption}
        image={data?.arts}
        {key}
        {updateData}
      />
    {/each}
  </div>
  <!-- <GalleryCustom class="gap-4 grid-cols-2" items={data?.arts?.items}/> -->
{:else}
  <!-- else content here -->
  <ErrorComp error={data?.error} />
{/if}
