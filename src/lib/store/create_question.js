import { writable } from 'svelte/store';


export const answers = writable([]);
export const correct_answer = writable(0);
export const question = writable('');
export const class_ = writable(1);