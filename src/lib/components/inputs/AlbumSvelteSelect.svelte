<script lang="ts">
  import { pb } from "$lib/pocketbase";
  import { serializeNonPOJOs } from "$lib/tools";
  import { Label, Spinner } from "flowbite-svelte";
  import type { Admin, Record } from "pocketbase";
  import Select from "svelte-select";

  export let value: any;
  export let itemChange: Function;
  export let items: Record[];
  export let required = false;
  export let user: Record | Admin | null;

  let filterText = "";
  let error: any = null;
  let loading = false;

  
  function handleFilter(e: any) {
    // if (value?.find((i) => i.label === filterText)) return;
    if (e.detail.length === 0 && filterText.length > 0) {
      const prev = items.filter((i:any) => !i.created);
      items = [...prev, { value: null, label: filterText, created: true }];
    }
  }

  async function handleChange(e: any) {
    error = null;
    if (e?.detail?.created) {
      loading = true;

      const data = {
        album_name: e?.detail?.label,
        artist: user?.id,
      };
      try {
        let record = await pb.collection("albums").create(data);
        record = serializeNonPOJOs(record);
        itemChange(record?.id);
        value = record?.id;
        let label = record?.album_name;
        e.detail.value = value;
        e.detail.label = label;
        loading = false;
        items = items.map((i:any) => {
          if (i.created) {
            const val = {
              value,
              label,
            };
            return val;
          }
          return i;
        });
      } catch (error: any) {
        console.log(error?.data);
        loading = false;
        error = error?.message;
        items = items?.filter((obj:any) => !obj?.created);
      }
    }
    value = e?.detail?.value;
    itemChange(value);
  }
</script>

<Label class="space-y-2">
  <span>Subject Category:</span>
  <Select
    on:change={handleChange}
    on:filter={handleFilter}
    bind:value
    bind:filterText
    {items}
    {required}
  >
    <div slot="item" let:item>
      {item.created ? "Add new: " : ""}
      {item.label}
    </div>
  </Select>
  {#if error}
    <p class="text-xs font-thin font-body text-red-600">{error}</p>
  {/if}
  {#if loading}
    <div><Spinner />Adding...</div>
  {/if}
</Label>
