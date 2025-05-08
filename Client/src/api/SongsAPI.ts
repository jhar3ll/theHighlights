import { AWS_Services } from "../lib/library";
import { Song } from "../models";
const { DataStore, Predicates, SortDirection } = AWS_Services;

type newSongType = {
    addedBy: string
    album: string
    artist: string
    title: string
}
//create new song
async function createSong({addedBy, album, artist, title}: newSongType): Promise<{result: "SUCCESS"|"FAIL", newSong: Song}|undefined> {
    if (!addedBy || !album || !artist || !title) throw new Error("All fields are required.");
    try {
        const newSong = await DataStore.save(new Song({ addedBy, album, artist, title}));
        console.log("create new song SUCCESS: ", newSong);
        return { result: "SUCCESS", newSong };
    } catch (error) {
        console.log("createSong() error: ", error);
    }    
}

//get all songs
async function listSongs() {
    try {
        const songs = await DataStore.query(Song, Predicates.ALL, {
            sort: (song) => song.artist(SortDirection.ASCENDING).title(SortDirection.ASCENDING)
        });
        return songs;
    } catch (error) {
        console.log("listSongs() error: ", error);
    }
}

//update song
async function updateSong(song: Song): Promise<{result: "SUCCESS"|"FAIL", updatedSong: Song}|undefined> {
    const { addedBy, album, artist, title } = song;
    try {
        const original = await DataStore.query(Song, song.id);
        if (!original) throw new Error("Unable to retrieve original song with id: " + song.id);
        const updatedSong = await DataStore.save(
            Song.copyOf(original, updated => {
                updated.addedBy = addedBy
                updated.album = album
                updated.artist = artist
                updated.title = title
        }));
        console.log("update song SUCCESS: ", updatedSong);
        return { result: "SUCCESS", updatedSong };
    } catch (error) {
        console.log("createSong() error: ", error);
    }    
}


export const SongsAPI = {
    createSong,
    listSongs,
    updateSong
};