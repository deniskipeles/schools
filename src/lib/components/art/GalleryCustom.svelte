<script>
  import { getPbImageUrl } from "$lib/tools";
  import classNames from "classnames";
  export let items = [];
  $: divClass = classNames("grid", $$props.class);
  function init(node) {
    if (getComputedStyle(node).gap === "normal") node.style.gap = "inherit";
  }
</script>

<div {...$$restProps} class={divClass} use:init>
  {#each items as item}
    <slot {item}>
      <div class="relative">
        <img
          src={getPbImageUrl(item, item?.photos[0], "200x0")}
          alt={item?.alt}
          class="h-auto w-full rounded-lg cursor-pointer"
        />
        <div
          class="absolute text-center bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2"
        >
          {item.caption}
        </div>
      </div>
    </slot>
  {:else}
    <slot />
  {/each}
</div>
