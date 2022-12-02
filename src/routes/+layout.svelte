<script>
	import "../app.postcss";
    import Footer from "$lib/Footer.svelte";
    import Header from "$lib/Header.svelte";
    import { school } from "$lib/store/school";
    import { user } from "$lib/store/user";
    import { supabase } from "$lib/supabase";

    /** @type {import('./$types').PageData} */
    export let data;
    // console.log(data.session)
    school.set(data.school)
    supabase.auth.onAuthStateChange((_,session)=>{
        user.set(session?.user ?? null)
        // console.log(session)
    })
</script>
  


<Header school={data.school}/>
<!-- <main class="container mx-auto py-32 px-8 lg:pl-80 pr-8 dark:text-white "> -->
	<div class="mx-auto">
        <slot></slot>

    </div>
<Footer/>

<svelte:head>
    <title>{data.school}</title>
    <meta name="description" content="Kenyan Primary schools">
</svelte:head>