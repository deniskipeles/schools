import { pb } from "$lib/pocketbase";
import { serializeNonPOJOs } from "$lib/tools";
import type { Admin, Record } from "pocketbase";

export const loadAlbums = async (url: URL) => {
    // const filter = `company_id = "${company?.id}"`;
    let items_per_page = url.searchParams.get("items_per_page") ?? 30;
    items_per_page = Number(items_per_page);
    let page = url.searchParams.get("page") ?? 1;
    page = Number(page);
    // fetch a paginated records list
    let resultList = await pb
        .collection("albums")
        .getList(page, items_per_page, {
            // filter,
            sort: "-created",
            expand: "artist",
        });
    resultList = serializeNonPOJOs(resultList);
    return resultList;
};

export const loadViewAlbums = async (url: URL) => {
    const filter = `photos_count != "null"`;
    let items_per_page = url.searchParams.get("items_per_page") ?? 30;
    items_per_page = Number(items_per_page);
    let page = url.searchParams.get("page") ?? 1;
    page = Number(page);
    // fetch a paginated records list
    let resultList = await pb
        .collection("view_albums")
        .getList(page, items_per_page, {
            filter,
            sort: "-created",
            expand: "artist",
        });
    resultList = serializeNonPOJOs(resultList);
    return resultList;
};

export const loadArtistAlbums = async (artist: Record | Admin | null) => {
    const filter = `artist = "${artist?.id}"`;
    // fetch a paginated records list
    let resultList = await pb
        .collection("albums")
        .getList(1, 100, {
            // filter,
            sort: "-created",
            expand: "artist",
        });
    resultList = serializeNonPOJOs(resultList);
    return resultList;
};

export const createAlbum = async (data: any) => {
    let record = await pb.collection("albums").create(data);
    record = serializeNonPOJOs(record);
    return record;
};

export const updateAlbum = async (id: string, data: any) => {
    let record = await pb.collection("albums").update(id, data);
    record = serializeNonPOJOs(record);
    return record;
};


export const loadSingleAlbum = async (album_id: string,url:URL) => {
    const filter = `album_id = "${album_id}"`;
  let items_per_page = url.searchParams.get("items_per_page") ?? 30;
  items_per_page = Number(items_per_page);
  let page = url.searchParams.get("page") ?? 1;
  page = Number(page);
  // fetch a paginated records list
  let resultList = await pb
    .collection("arts")
    .getList(page, items_per_page, {
      filter,
      sort: "-created",
      expand: "artist",
    });
  resultList = serializeNonPOJOs(resultList);
  return resultList;
};
