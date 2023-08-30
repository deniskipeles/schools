import { pb } from '$lib/pocketbase';
import { serializeNonPOJOs } from '$lib/tools';
import type { Record } from 'pocketbase';

export async function loadPersonnel(company: Record) {
    const filter = `company_id ?~ "${company?.id}"`
    // fetch a paginated records list
    let resultList = await pb.collection('retrieve_workers').getList(1, 50, {
        filter,
    });
    resultList = serializeNonPOJOs(resultList);
    return resultList;
}


export const loadArtists = async (url: URL) => {
    // const filter = `company_id = "${company?.id}"`;
    let items_per_page = url.searchParams.get("items_per_page") ?? 30;
    items_per_page = Number(items_per_page);
    let page = url.searchParams.get("page") ?? 1;
    page = Number(page);
    // fetch a paginated records list
    let resultList = await pb
      .collection("view_artists")
      .getList(page, items_per_page, {
        // filter,
        sort: "-created",
      });
    resultList = serializeNonPOJOs(resultList);
    return resultList;
  };
