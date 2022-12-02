import { dev } from '$app/environment';
import { supabase } from '$lib/supabase';

export const csr = dev;

/** @type {import('./$types').PageServerLoad} */
export async function load(event) {

	let { data: users, error } = await supabase
		.from('users')
		.select("*")
		// Filters
		.eq('more->admin', true)
	return{
		users,
		error
	}
}
