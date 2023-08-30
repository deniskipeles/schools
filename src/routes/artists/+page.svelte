<script lang="ts">
  import { Avatar, Breadcrumb, BreadcrumbItem, Card } from "flowbite-svelte";
  import type { Admin, ListResult, Record } from "pocketbase";
  import GalleryItem from "$lib/components/art/GalleryItem.svelte";
  import ErrorComp from "$lib/components/ErrorComp.svelte";
  import { getPbImageUrl } from "$lib/tools";
  /** @type {import('./$types').PageData} */
  export let data: {
    artists: ListResult<Record> | null;
    user: Record | Admin | null;
    company: Record;
    error: any;
  };
  function updateData(dt: any) {
    data = dt;
  }
</script>

<Breadcrumb class="pt-20 py-8">
  <BreadcrumbItem href="/" home>Home</BreadcrumbItem>
</Breadcrumb>

{#if data?.artists?.items}
  <!-- content here -->
  <div class="gap-4 grid-cols-2 grid">
    {#each data?.artists?.items as artist (artist.id)}
      <Card>
        <Avatar
          size="xl"
          src={getPbImageUrl(artist, artist?.avatar, undefined)}
        />
        <p class="font-medium text-base">{artist?.name}</p>
        <p class="font-medium text-base">{artist?.username}</p>
        <!-- <img src= alt=""> -->
        <p class="font-medium text-base">{artist?.photos_count} Photos</p>
        <p class="font-medium text-base">{artist?.albums_count} Albums</p>
      </Card>
    {/each}
  </div>
  <!-- <GalleryCustom class="gap-4 grid-cols-2" items={data?.artists?.items}/> -->
{:else}
  <!-- else content here -->
  <ErrorComp error={data?.error} />
{/if}
