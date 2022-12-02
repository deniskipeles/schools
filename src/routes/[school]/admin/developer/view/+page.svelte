<script>
	import AddAdmin from "$lib/components/AddAdmin.svelte";
	import AdminCard from "$lib/components/AdminCard.svelte";
    
    /** @type {import('./$types').PageData} */
	export let data;
    $: users = data.users

</script>


<ul class="flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400">
    <li class="mr-2">
        <AddAdmin/>
    </li>
    <li class="mr-2">
        <AddAdmin/>
    </li>
    <li class="mr-2">
        <a href="#" class="inline-block py-3 px-4 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white">Tab 3</a>
    </li>
    <li class="mr-2">
        <a href="#" class="inline-block py-3 px-4 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white">Tab 4</a>
    </li>
    <li>
        <a class="inline-block py-3 px-4 text-gray-400 cursor-not-allowed dark:text-gray-500">Tab 5</a>
    </li>
</ul>


<div class="grid gap-4 grid-cols-2">
    {#each users as user}
         <!-- content here -->
         <div>
             <AdminCard {user}/>
         </div>
    {/each}
  </div>