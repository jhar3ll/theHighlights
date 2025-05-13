import { AWS_Services } from "../lib/library";
import { Setlist } from "../models";

import { newSetlistType } from "../data/types";
const { DataStore, Predicates, SortDirection } = AWS_Services;

async function createSetlist(setlistInfo: newSetlistType): Promise<{result: "SUCCESS"|"FAIL", setlistOutput?: Setlist}>{
    const { addedBy, eventID, setNumber, Songs, title } = setlistInfo;
    try {
        const songsArray = await Songs.toArray();
        const setlistOutput = await DataStore.save(new Setlist({ addedBy, eventID, setNumber, Songs: songsArray, title }));
        return {result: "SUCCESS", setlistOutput };
    } catch (error) {
        console.log("createSetlist() ERROR: ", error);
        return {result: "FAIL"};
    }
}

//delete setlist
async function deleteSetlist(setlist:Setlist):Promise<"SUCCESS"|"FAIL"|undefined> {
    try {
        const setlistOutput = await DataStore.delete(Setlist, s => s.id.eq(setlist.id));
        console.log("delete setlist SUCCESS: ", setlistOutput);
        return "SUCCESS";
    } catch (error) {
        console.log("deleteSetlist() error: ", error);
    }   
}

async function listSetlists() {
    try {
        const allSetlists = await DataStore.query(Setlist, Predicates.ALL, {
            sort: setlist => setlist.createdAt(SortDirection.DESCENDING)
        });
        console.log(allSetlists);
        return allSetlists;
    } catch (error) {
        console.log("listSetlists() ERROR: ", error);
    }
}

//update setlist
async function updateSetlist(setlist: Setlist): Promise<{result: "SUCCESS"|"FAIL", setlistOutput: Setlist}|undefined> {
    const { addedBy, eventID, setNumber, Songs, title } = setlist;
    try {
        const original = await DataStore.query(Setlist, setlist.id);
        if (!original) throw new Error("Unable to retrieve original setlist with id: " + setlist.id);
        const updatedSongs = await Songs.toArray();
        const setlistOutput = await DataStore.save(
            Setlist.copyOf(original, updated => {
                updated.addedBy = addedBy
                updated.eventID = eventID
                updated.setNumber = setNumber
                updated.Songs = updatedSongs
                updated.title = title
        }));
        console.log("update setlist SUCCESS: ", setlistOutput);
        return { result: "SUCCESS", setlistOutput };
    } catch (error) {
        console.log("createSetlist() error: ", error);
    }    
}

export const SetlistAPI = {
    createSetlist,
    deleteSetlist,
    listSetlists,
    updateSetlist
}