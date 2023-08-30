import {  loadSingleAlbum } from '$lib/server';
import { serializeNonPOJOs } from '$lib/tools';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals,params, url }) {
  let { pb, ...rest } = locals
  try {
    const arts = await loadSingleAlbum(params?.album_id,url)
    // console.log(arts)
    return {
      ...rest,
      arts,
      error: null
    };
  } catch (error) {
    return {
      ...rest,
      arts: null,
      error: serializeNonPOJOs(error)
    };
  }
}
