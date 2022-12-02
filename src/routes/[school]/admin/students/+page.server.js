import { dev } from '$app/environment';
import { CONSTANTS } from '$lib/CONSTANTS';
import { supabase } from '$lib/supabase';
import { getServerSession } from '@supabase/auth-helpers-sveltekit';

export const csr = dev;

/** @type {import('./$types').PageServerLoad} */
export async function load(event) {

		
	let { data: students, error } = await supabase
		.from('students')
		.select(`
			id,
			name,
			admission,
			date_of_birth,
			admitted_on,
			complete_on,
			location(
				name
			),
			student_class(
				complete_on,
				since,
				complete,
				class(
					name,
					class_type(
						name
					)
				)
			)
		`)
		.eq('school_id',CONSTANTS.school)


	return {
		students,
		error,
		session: await getServerSession(event),
	};
}
