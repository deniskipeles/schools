<script lang="ts">
  import { Breadcrumb, BreadcrumbItem } from "flowbite-svelte";
  import type { Admin, ListResult, Record } from "pocketbase";
  import GalleryItem from "$lib/components/art/GalleryItem.svelte";
  import ErrorComp from "$lib/components/ErrorComp.svelte";
  import { getPbImageUrl } from "$lib/tools";
  import AddArt from "$lib/components/art/AddArt.svelte";
  /** @type {import('./$types').PageData} */
  export let data: {
    arts: ListResult<Record> | null;
    user: Record | Admin | null;
    company: Record;
    list_albums: Record[];
    error: any;
  };
  function updateData(dt: any) {
    data = dt;
  }
</script>

<Breadcrumb class="pt-20 py-8">
  <BreadcrumbItem href="/" home>Home</BreadcrumbItem>
</Breadcrumb>
<AddArt {updateData} {data} />
{#if data?.arts?.items}
  <!-- content here -->
  <div class="gap-4 grid-cols-2 grid">
    {#each data?.arts?.items as image (image.id)}
      <GalleryItem
        imageUrl={getPbImageUrl(image, image?.photos[0], "200x0")}
        caption={image.caption}
        {image}
        key={0}
        updateData={()=>{}}
      />
    {/each}
  </div>
  <!-- <GalleryCustom class="gap-4 grid-cols-2" items={data?.arts?.items}/> -->
{:else}
  <!-- else content here -->
  <ErrorComp error={data?.error} />
{/if}
