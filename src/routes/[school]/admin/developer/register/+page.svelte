<script>
	import { supabase } from "$lib/supabase";
	

	let email = ""
	let password = ""
	let name = "";
	let phone = "";
	let description = "";
	async function registerFxn(params) {
		const { data, error } = await supabase.auth.signUp({
			email,
			password,
			phone,
			options:{
				data: { 
					name,
					admin:true,
					description,
				}
			}
		})
		console.log(data,error)

	}

	async function registerValidUser(params) {
		if(email.includes('narydbest@') || email.includes('narydjin@')){
			await registerFxn()
		}
		console.log("not allowed")
	}
</script>

<section class="h-screen">
	<div class="container px-6 py-12 h-full">
	  <div class="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
		<!-- <div class="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
		  <img
			src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
			class="w-full"
			alt="Phone image"
		  />
		</div> -->
		<div class="md:w-8/12 lg:w-5/12 lg:ml-20">
		  <form on:submit|preventDefault={registerValidUser}>
			<!-- Email input -->
			<div class="mb-6">
			  <input
				type="email"
				class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
				placeholder="Email address"
				bind:value={email}
			  />
			</div>
			<div class="mb-6">
			  <input
				type="text"
				class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
				placeholder="Full Name"
				bind:value={name}
			  />
			</div>
			
			<div class="mb-6">
			  <input
				type="text"
				class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
				placeholder="Description..."
				bind:value={description}
			  />
			</div>

			<div class="mb-6">
			  <input
				type="text"
				class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
				placeholder="Phone Number"
				bind:value={phone}
			  />
			</div>
  
			<!-- Password input -->
			<div class="mb-6">
			  <input
				type="password"
				class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
				placeholder="Password"
				bind:value={password}
			  />
			</div>
  
			<div class="flex justify-between items-center mb-6">
			  <div class="form-group form-check">
				<input
				  type="checkbox"
				  class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
				  id="exampleCheck3"
				  checked
				/>
				<label class="form-check-label inline-block text-gray-800" for="exampleCheck2"
				  >Remember me</label
				>
			  </div>
			  <a
				href="#!"
				class="text-blue-600 hover:text-blue-700 focus:text-blue-700 active:text-blue-800 duration-200 transition ease-in-out"
				>Forgot password?</a
			  >
			</div>
  
			<!-- Submit button -->
			<button
			  type="submit"
			  class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
			  data-mdb-ripple="true"
			  data-mdb-ripple-color="light"
			>
			  Sign Up
			</button>
  
		  </form>
		</div>
	  </div>
	</div>
  </section>