import { AWS_Services } from "../lib/library";
import { Tip } from "../models";
const { DataStore } = AWS_Services;

//get all Tips
async function listTips() {
    try {
        return await DataStore.query(Tip);
    } catch (error) {
        console.log("listTips() error: ", error);
    }
}

export const TipsAPI = {
    listTips
};