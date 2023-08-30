import { pb } from "$lib/pocketbase";
import { serializeNonPOJOs } from "$lib/tools";
import type { Record } from "pocketbase";

export const loadArts = async (url: URL) => {
  // const filter = `company_id = "${company?.id}"`;
  let items_per_page = url.searchParams.get("items_per_page") ?? 30;
  items_per_page = Number(items_per_page);
  let page = url.searchParams.get("page") ?? 1;
  page = Number(page);
  // fetch a paginated records list
  let resultList = await pb
    .collection("arts")
    .getList(page, items_per_page, {
      // filter,
      sort: "-created",
      expand: "artist",
    });
  resultList = serializeNonPOJOs(resultList);
  return resultList;
};

export const createArt = async (data: any) => {
  let record = await pb.collection("arts").create(data);
  record = serializeNonPOJOs(record);
  return record;
};

export const updateArt = async (id: string, data: any) => {
  let record = await pb.collection("arts").update(id, data);
  record = serializeNonPOJOs(record);
  return record;
};

export const loadSingleArt = async (id: string) => {
  let record = await pb.collection("arts").getOne(id, {
    expand: "artist",
  });
  record = serializeNonPOJOs(record);
  return record;
};



export const loadFirtsArt = async () => {
  // or fetch only the first record that matches the specified filter
  let record = await pb.collection('arts').getFirstListItem('', {
    // expand: 'relField1,relField2.subRelField',
  });
  record = serializeNonPOJOs(record);
  return record;
};