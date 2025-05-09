import { AWS_Services } from "../lib/library";
import { Event } from "../models";
const { DataStore, Predicates, SortDirection } = AWS_Services;

//get all events
async function listEvents() {
    try {
        const allEvents = await DataStore.query(Event, Predicates.ALL, {
            sort: (event) => event.dateTime(SortDirection.ASCENDING)
        })
        console.log("all events: ", allEvents);
        return allEvents;
    } catch (error) {
        console.log("listEvents() ERROR: ", error);
    }
}

export const EventsAPI = {
    listEvents
};