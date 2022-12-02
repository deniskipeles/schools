<script>
  import { CONSTANTS } from '$lib/CONSTANTS';
  import { postData } from '$lib/fetcher';
  import { school } from '$lib/store/school';
  import { supabase } from '$lib/supabase';
   import { Drawer, Button, CloseButton, Label, Input, Textarea } from 'flowbite-svelte'
  import { onMount } from 'svelte';
   import { sineIn } from 'svelte/easing';
  import axios from "axios";

  export let token;
 
   let hidden4 = true;

   let position = "Teacher";
   let name = null;
   let user_id = null;
   let teacher_no = '';
   let phone = '';
   let school_id = CONSTANTS.school;
   let teacher_since = "2010-01-01";
   let teacher_type = "TSC";

   let transitionParams = {
     x: -320,
     duration: 200,
     easing: sineIn
   };
	

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
    "email":`${teacher_no.toLocaleLowerCase()}@teacher.${$school.unique_name}.ac.ke`,
    "phone":phone,
    "password":$school.name,
    "more":{
      "name":name,
      "school":$school.name,
      "school_id":$school.id,
      "teacher":true,
      "position":position,
      "teacher_no": teacher_no,
      "teacher_since": teacher_since,
      "teacher_type" :teacher_type,
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
  axios.post('https://yuqlqgxhlezwkjuljofo.functions.supabase.co/school_admin',dataToPost, config)
    .then(async({data})=>{
        console.log(data?.data?.user);
        const { 
          data:teacher, 
          error:teacherError 
        } = await supabase
            .from('teachers')
            .insert([{ 
              teacher_no,
              name,
              position,
              teacher_since,
              teacher_type,
              school_id:$school.id,
              user_id:data?.data?.user?.id
            }])
            hidden4 = true
        })
    .catch((err)=>{
      console.log(err)
    })
}
 </script>
 




 <div class="text-center">
   <Button on:click={async() => {(hidden4 = false)}}>Add Teacher</Button>
 </div>
 <Drawer transitionType="fly" {transitionParams} bind:hidden={hidden4} id='sidebar4'>
   <div class='flex items-center'>
     <h5 id="drawer-label" class="inline-flex items-center mb-6 text-base font-semibold text-gray-500 uppercase dark:text-gray-400"><svg class="w-5 h-5 mr-2" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
      New Teacher </h5>
     <CloseButton on:click={() => (hidden4 = true)} class='mb-4 dark:text-white'/>
   </div>
    <form on:submit|preventDefault={submitValues} class="mb-6">
     <!-- <div class="mb-6">
       <Label for='country-input' class='block mb-2'>Teacheer Email</Label>
       <Input id="country-input" 
        type="text" 
        placeholder="Search Teachers Email" 
        bind:this={searchInput}
        bind:value={inputValue} 
        on:input={filterCountries} />
     </div> -->

     <div class="mb-6">
       <Label for="name" class="mb-2">Name</Label>
       <Input id='name' name='name' required type='text' bind:value={name} />
     </div>
     <div class="mb-6">
       <Label for="position" class="mb-2">Position</Label>
       <Input id='position' name='position' required type='text' bind:value={position} />
     </div>
     <div class="mb-6">
       <Label for="phone" class="mb-2">Phone</Label>
       <Input id='phone' name='phone' required type='text' bind:value={phone} />
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