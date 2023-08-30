<script lang="ts">
  import AlbumItem from "$lib/components/albums/AlbumItem.svelte";
  import { Breadcrumb, BreadcrumbItem } from "flowbite-svelte";
  import type { Admin, ListResult, Record } from "pocketbase";
  import ErrorComp from "$lib/components/ErrorComp.svelte";
  import { getPbImageUrl } from "$lib/tools";

  /** @type {import('./$types').PageData} */
  export let data: {
    albums: ListResult<Record> | null;
    user: Record | Admin | null;
    company: Record;
    photo_object: Record[];
    error: any;
  };
  function getImageUrl(album: Record) {
    let obj = {
      ...album,
      ...data?.photo_object,
      id:album?.photo_id,
    };
    return getPbImageUrl(obj, album?.image, "200x0");
  }
</script>

<Breadcrumb class="pt-20 py-8">
  <BreadcrumbItem href="/" home>Home</BreadcrumbItem>
</Breadcrumb>

{#if data?.albums?.items}
  <!-- content here -->
  <div class="gap-4 grid-cols-2 grid">
    {#each data?.albums?.items as album (album.id)}
      <AlbumItem imageUrl={getImageUrl(album)} {album} />
    {/each}
  </div>
  <!-- <GalleryCustom class="gap-4 grid-cols-2" items={data?.albums?.items}/> -->
{:else}
  <!-- else content here -->
  <ErrorComp error={data?.error} />
{/if}
