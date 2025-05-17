import { AWS_Services } from "../lib/library";
import { Tip } from "../models";
const { DataStore, Predicates, SortDirection } = AWS_Services;

//get all Tips
async function listTips() {
    try {
        return await DataStore.query(Tip, Predicates.ALL, {
            sort: s => s.createdAt(SortDirection.DESCENDING)
        });
    } catch (error) {
        console.log("listTips() error: ", error);
    }
}

export const TipsAPI = {
    listTips
};