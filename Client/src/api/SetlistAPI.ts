import { LazySetlistSong, Setlist } from "../models";
import { AWS_Services } from "../lib/library";
const { DataStore, Predicates, SortDirection } = AWS_Services;

async function createSetlist(addedBy: string, setlistEventId: string, SetlistSongs: LazySetlistSong[]): Promise<{result: "SUCCESS"|"FAIL", setlistOutput?: Setlist}>{
    try {
        const setlistOutput = await DataStore.save(new Setlist({ addedBy, eventID, Songs }));
        return {result: "SUCCESS", setlistOutput };
    } catch (error) {
        console.log("createSetlist() ERROR: ", error);
        return {result: "FAIL"};
    }
}

async function listSetlists() {
    try {
        const allSetlists = await DataStore.query(Setlist, Predicates.ALL, {
            sort: setlist => setlist.createdAt(SortDirection.DESCENDING)
        });
        return allSetlists;
    } catch (error) {
        console.log("listSetlists() ERROR: ", error);
    }
}

export const SetlistAPI = {
    createSetlist,
    listSetlists
}