// import { pb } from "$lib/pocketbase";
import { loadCompany } from "./base";
import { loadArtists, loadPersonnel } from "./artist";
import { createArt, loadArts, updateArt, loadSingleArt, loadFirtsArt } from "./art";
import { createAlbum, loadAlbums, loadArtistAlbums, loadSingleAlbum, loadViewAlbums, updateAlbum } from "./albums";

export {
    loadCompany,
    loadPersonnel,
    createArt,
    loadArts,
    updateArt,
    loadSingleArt,
    loadAlbums, 
    loadSingleAlbum,
    createAlbum, 
    loadArtistAlbums,
    updateAlbum,
    loadFirtsArt,
    loadViewAlbums,
    loadArtists,
}
