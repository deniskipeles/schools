<script>
  import { CONSTANTS } from '$lib/CONSTANTS';
  import { supabase } from '$lib/supabase';
   import { Drawer, Button, CloseButton, Label, Input, Textarea } from 'flowbite-svelte'
   import { sineIn } from 'svelte/easing';
  import AutoCompleteList from './AutoCompleteList.svelte';
 
   let hidden4 = true;

   let position = "Teacher";
   let name = null;
   let user_id = null;
   let teacher_no = null;
   let school_id = CONSTANTS.school;
   let teacher_since = "2010-01-01";
   let teacher_type = "TSC";

   let transitionParams = {
     x: -320,
     duration: 200,
     easing: sineIn
   };
    /* FILTERING countres DATA BASED ON INPUT */	
    let filteredCountries = [];
    $: countries = []
    $: users_ids = []



   async function fetchUsers() {
     let { data: users, error } = await supabase
      .from('users')
      .select("id,email")
      // Filters
      .eq('more->school', CONSTANTS.school)
      // console.log(users)
      if(users){
        users_ids = users
        countries = users.map(item=>item.email)
      }
   }




  
// $: console.log(filteredCountries)	

const filterCountries = () => {
	let storageArr = []
	if (inputValue) {
		countries.forEach(country => {
			 if (country.toLowerCase().startsWith(inputValue.toLowerCase())) {
				 storageArr = [...storageArr, makeMatchBold(country)];
			 }
		});
	}
	filteredCountries = storageArr;
}	


/* HANDLING THE INPUT */
let searchInput; // use with bind:this to focus element
let inputValue = "";
	
$: if (!inputValue) {
	filteredCountries = [];
	hiLiteIndex = null;
}

const clearInput = () => {
	inputValue = "";	
	searchInput.focus();
}
	
const setInputVal = (countryName) => {
  inputValue = removeBold(countryName);
  // console.log(users_ids)
  const user = users_ids.find(item=>item.email == inputValue)
  user_id=user.id
  // console.log(user_id)
	filteredCountries = [];
	hiLiteIndex = null;
	document.querySelector('#country-input').focus();
}	

const submitValues = async() => {
	if (user_id) {
    let { data: checkTeacher, error:checkError } = await supabase
      .from('teachers')
      .select("*")
      // Filters
      .eq('school_id', CONSTANTS.school)
      .eq('user_id', user_id)
      .limit(1)
      .single()
      // console.log(checkTeacher)
    if(checkTeacher){
      const { data:teacher, error:teacherError } = await supabase
        .from('teachers')
        .update([{ 
          teacher_no,
          school_id,
          name,
          position,
          teacher_since,
          teacher_type,
          user_id
         }])
         .eq('school_id', CONSTANTS.school)
         .eq('user_id', user_id)

         hidden4 = true
        //  console.log('update',teacher)
    }else{
        const { data:teacher, error:teacherError } = await supabase
          .from('teachers')
          .insert([{ 
            teacher_no,
            school_id,
            name,
            position,
            teacher_since,
            teacher_type,
            user_id
          }])
          hidden4 = true

          // console.log("insert",teacher)
    }
	} else {
		alert("You didn't pick Teacher Email.")
	}
}

const makeMatchBold = (str) => {
	// replace part of (country name === inputValue) with strong tags
	let matched = str.substring(0, inputValue.length);
	let makeBold = `<strong>${matched}</strong>`;
	let boldedMatch = str.replace(matched, makeBold);
	return boldedMatch;
}

const removeBold = (str) => {
	//replace < and > all characters between
	return str.replace(/<(.)*?>/g, "");
	// return str.replace(/<(strong)>/g, "").replace(/<\/(strong)>/g, "");
}	
	

/* NAVIGATING OVER THE LIST OF COUNTRIES W HIGHLIGHTING */	
let hiLiteIndex = null;
//$: console.log(hiLiteIndex);	
$: hiLitedCountry = filteredCountries[hiLiteIndex]; 	
	
const navigateList = (e) => {
	if (e.key === "ArrowDown" && hiLiteIndex <= filteredCountries.length-1) {
		hiLiteIndex === null ? hiLiteIndex = 0 : hiLiteIndex += 1
	} else if (e.key === "ArrowUp" && hiLiteIndex !== null) {
		hiLiteIndex === 0 ? hiLiteIndex = filteredCountries.length-1 : hiLiteIndex -= 1
	} else if (e.key === "Enter") {
		setInputVal(filteredCountries[hiLiteIndex]);
	} else {
		return;
	}
}
 </script>
 




 <svelte:window on:keydown={navigateList} />

 <div class="text-center">
   <Button on:click={async() => {
    await fetchUsers();
    (hidden4 = false)}}>Add Teacher</Button>
 </div>
 <Drawer transitionType="fly" {transitionParams} bind:hidden={hidden4} id='sidebar4'>
   <div class='flex items-center'>
     <h5 id="drawer-label" class="inline-flex items-center mb-6 text-base font-semibold text-gray-500 uppercase dark:text-gray-400"><svg class="w-5 h-5 mr-2" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
      New Teacher </h5>
     <CloseButton on:click={() => (hidden4 = true)} class='mb-4 dark:text-white'/>
   </div>
    <form on:submit|preventDefault={submitValues} class="mb-6">
     <div class="mb-6">
       <Label for='country-input' class='block mb-2'>Teacheer Email</Label>
       <Input id="country-input" 
        type="text" 
        placeholder="Search Teachers Email" 
        bind:this={searchInput}
        bind:value={inputValue} 
        on:input={filterCountries} />
     </div>



     <!-- FILTERED LIST OF Users -->
    {#if filteredCountries.length > 0}
      <ul id="autocomplete-items-list">
        {#each filteredCountries as country, i}
          <AutoCompleteList itemLabel={country} highlighted={i === hiLiteIndex} on:click={() => setInputVal(country)} />
        {/each}			
      </ul>
    {/if}




     <div class="mb-6">
       <Label for="name" class="mb-2">Name</Label>
       <Input id='name' name='name' required type='text' bind:value={name} />
     </div>
     <div class="mb-6">
       <Label for="position" class="mb-2">Position</Label>
       <Input id='position' name='position' required type='text' bind:value={position} />
     </div>
     <div class="mb-6">
       <Label for="teacher_type" class="mb-2">Teacher Type</Label>
       <Input id='teacher_type' name='teacher_type' required type='text' bind:value={teacher_type} />
     </div>
     <div class="mb-6">
      <Label for="date" class="mb-2">Since</Label>
       <Input id='date' name='date' required type='date' bind:value={teacher_since} />
     </div>
     <div class="mb-6">
      <Label for="teacher-no" class="mb-2">Teacher Number</Label>
       <Input id='teacher-no' name='teacher-no' required type='text' bind:value={teacher_no} />
     </div>
       <Button type="submit" class="w-full"><svg class="w-5 h-5 mr-2" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg> Add Teacher</Button>
    </form>
 </Drawer>