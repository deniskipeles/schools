import type { ListResult, Record } from "pocketbase";
import { writable, type Writable } from "svelte/store";



const data = {
  "caption": "What a day.",
  "artist": "",
  "album_id": "",
  "private": 'true',
  "images": []
};
export const input_images = writable(data);


export const input_album = writable('#MyDay');

export const open_model = writable(false);

export const img_to_view_url = writable('');
export const img_to_view_data = writable({});
