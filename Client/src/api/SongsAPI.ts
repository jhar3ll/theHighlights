import { AWS_Services } from "../lib/library";
import { Song } from "../models";
import { SongCreateFormInputValues } from "../ui-components/SongCreateForm";
const { DataStore, Predicates, SortDirection } = AWS_Services;

//create new song
async function createSong({addedBy, album, artist, title}: SongCreateFormInputValues): Promise<{result: "SUCCESS"|"FAIL", songOutput: Song}|undefined> {
    if (!addedBy || !album || !artist || !title) throw new Error("All fields are required.");
    try {
        const songOutput = await DataStore.save(new Song({ addedBy, album, artist, title}));
        console.log("create new song SUCCESS: ", songOutput);
        return { result: "SUCCESS", songOutput };
    } catch (error) {
        console.log("createSong() error: ", error);
    }    
}

//delete song
async function deleteSong(song:Song):Promise<"SUCCESS"|"FAIL"|undefined> {
    try {
        const songOutput = await DataStore.delete(Song, s => s.id.eq(song.id));
        console.log("delete song SUCCESS: ", songOutput);
        return "SUCCESS";
    } catch (error) {
        console.log("deleteSong() error: ", error);
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
async function updateSong(song: Song): Promise<{result: "SUCCESS"|"FAIL", songOutput: Song}|undefined> {
    const { addedBy, album, artist, title } = song;
    try {
        const original = await DataStore.query(Song, song.id);
        if (!original) throw new Error("Unable to retrieve original song with id: " + song.id);
        const songOutput = await DataStore.save(
            Song.copyOf(original, updated => {
                updated.addedBy = addedBy
                updated.album = album
                updated.artist = artist
                updated.title = title
        }));
        console.log("update song SUCCESS: ", songOutput);
        return { result: "SUCCESS", songOutput };
    } catch (error) {
        console.log("createSong() error: ", error);
    }    
}


export const SongsAPI = {
    createSong,
    deleteSong,
    listSongs,
    updateSong
};