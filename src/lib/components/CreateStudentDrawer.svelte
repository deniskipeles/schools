<script>
  import { CONSTANTS } from '$lib/CONSTANTS';
  import { supabase } from '$lib/supabase';
  import { error } from '@sveltejs/kit';
   import { Drawer, Button, CloseButton, Label, Input, Textarea } from 'flowbite-svelte'
   import { sineIn } from 'svelte/easing';
  import AutoCompleteList from './AutoCompleteList.svelte';
 
   let hidden4 = true;

   let location_id = null;
   let name = "";
   let admission = "";
   let admitted_on = "2014-01-01";
   let complete_on = "2024-01-01";
   let school_id = CONSTANTS.school;
   let date_of_birth = "2010-01-01";
   let class_ = '';

   let transitionParams = {
     x: -320,
     duration: 200,
     easing: sineIn
   };
    /* FILTERING countres DATA BASED ON INPUT */	
    let filteredCountries = [];
    $: countries = []
    $: location_ids = []



   async function fetchUsers() {
     
    let { data: location, error } = await supabase
      .from('location')
      .select('id,name')
      // Filters
      // .eq('more->school', CONSTANTS.school)
      // console.log(users)
      if(location){
        location_ids = location
        countries = location.map(item=>item.name)
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
  // console.log(location_ids)
  const user = location_ids.find(item=>item.name == inputValue)
  location_id=user.id
  // console.log(location_id)
	filteredCountries = [];
	hiLiteIndex = null;
	document.querySelector('#country-input').focus();
}	

// const submitValues = async() => {
// 	if (location_id) {
//     let { data: checkTeacher, error:checkError } = await supabase
//       .from('students')
//       .select("*")
//       // Filters
//       .eq('school_id', CONSTANTS.school)
//       .eq('admission', admission)
//       .limit(1)
//       .single()
//       // console.log(checkTeacher)
//     if(checkTeacher){
//       alert('student admission taken')
//         //  console.log('update',teacher)
//     }else{
//         const { data:student, error:studentError } = await supabase
//           .from('students')
//           .insert([{ 
//             admission,
//             school_id,
//             name,
//             complete_on,
//             location_id,
//             admitted_on,
//             date_of_birth
//           }])
//           hidden4 = true

//           console.log(student,studentError)
//     }
// 	} else {
// 		alert("You didn't pick Teacher Email.")
// 	}
// }

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









import axios from "axios";
import { onMount } from "svelte";
import { school } from '$lib/store/school';
export let token;

onMount(async()=>{
    let { data, error } = await supabase
      .from('schools')
      .select("*")
      // Filters
      .eq('id', CONSTANTS.school)
      .limit(1)
      .single()
      if (data) {
        school.set(data)
        
      }
  })





const submitValues = async() => {
  let dataToPost = {
    "email":`${admission.toLocaleLowerCase()}@student.${$school.unique_name}.ac.ke`,
    "password":$school.name,
    "more":{
      "name":name,
      "school":$school.name,
      "school_id":$school.id,
      "student":true,
      "class":class_,
      "admission": admission,
      "admitted_on": admitted_on,
      "complete_on" :complete_on,
      "active":true
    }
  }

  const config = {
    headers:{
      // 'Content-Type':'application/json',
      // 'Access-Control-Allow-Origin':'*',
      // 'Access-Control-Allow-Methods':'POST,PATCH,OPTIONS',
      "Authorization": `Bearer ${token}`
    }
  };
  const url = "https://yuqlqgxhlezwkjuljofo.functions.supabase.co/create_student"
  axios.post(url,dataToPost, config)
    .then(async({data})=>{
        console.log(data?.data?.user);
        const { 
          data:student, 
          error:studentError 
        } = await supabase
          .from('students')
          .insert([{ 
            admission,
            school_id,
            name,
            complete_on,
            location_id,
            admitted_on,
            date_of_birth,
            user_id:data?.data?.user?.id
          }])
          hidden4 = true
        })
    .catch((err)=>{
      console.log(err)
    })
}
 </script>
 




 <svelte:window on:keydown={navigateList} />

 <div class="text-center">
   <Button on:click={async() => {
    await fetchUsers();
    (hidden4 = false)}}>Add Student</Button>
 </div>
 <Drawer transitionType="fly" {transitionParams} bind:hidden={hidden4} id='sidebar4'>
   <div class='flex items-center'>
     <h5 id="drawer-label" class="inline-flex items-center mb-6 text-base font-semibold text-gray-500 uppercase dark:text-gray-400"><svg class="w-5 h-5 mr-2" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
      New Student </h5>
     <CloseButton on:click={() => (hidden4 = true)} class='mb-4 dark:text-white'/>
   </div>
    <form on:submit|preventDefault={submitValues} class="mb-6">
     <div class="mb-6">
       <Label for='country-input' class='block mb-2'>Student Home Location</Label>
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
       <Label for="name" class="mb-2">Student Name</Label>
       <Input id='name' name='name' required type='text' bind:value={name} />
     </div>
     <!-- <div class="mb-6">
       <Label for="class" class="mb-2">Class</Label>
       <Input id='class' name='class' required type='text' bind:value={class_} />
     </div> -->
     <div class="mb-6">
       <Label for="admitted_on" class="mb-2">Admitted On</Label>
       <Input id='admitted_on' name='admitted_on' required type='date' bind:value={admitted_on} />
     </div>
     <div class="mb-6">
      <Label for="complete_on" class="mb-2">To Complete On</Label>
       <Input id='complete_on' name='complete_on' required type='date' bind:value={complete_on} />
     </div>
     <div class="mb-6">
      <Label for="date_of_birth" class="mb-2">Date Of Birth</Label>
       <Input id='date_of_birth' name='date_of_birth' required type='date' bind:value={date_of_birth} />
     </div>
     <div class="mb-6">
      <Label for="teacher-no" class="mb-2">Student Admission</Label>
       <Input id='teacher-no' name='teacher-no' required type='text' bind:value={admission} />
     </div>
       <Button type="submit" class="w-full"><svg class="w-5 h-5 mr-2" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg> 
        Add Student
      </Button>
    </form>
 </Drawer>