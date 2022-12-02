<script>
  import { goto } from "$app/navigation";


  import { CONSTANTS } from "$lib/CONSTANTS";

  import { ButtonGroup, Button } from 'flowbite-svelte';
  
  const handleClick = (path)=> {
		goto(path,{replaceState:true})
	}
</script>





<div class="text-center">
  <ButtonGroup>
    <Button on:click={()=>handleClick(`/${CONSTANTS.school}/admin/students`)}>Students</Button>
    <Button on:click={()=>handleClick(`/${CONSTANTS.school}/admin/teachers`)}>Teachers</Button>
    <Button>Parents</Button>
  </ButtonGroup>
  <slot/>
</div>

