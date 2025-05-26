import { AWS_Services } from "../lib/library";
import { Event } from "../models";
import { EventCreateFormInputValues } from "../ui-components/EventCreateForm";
const { DataStore, Predicates, SortDirection } = AWS_Services;

//get all events
async function listEvents() {
    try {
        const allEvents = await DataStore.query(Event, Predicates.ALL, {
            sort: (event) => event.dateTime(SortDirection.ASCENDING)
        })
        //console.log("all events: ", allEvents);
        return allEvents;
    } catch (error) {
        console.log("listEvents() ERROR: ", error);
    }
}

//create new event
async function createEvent({addedBy, address, dateTime, title}: EventCreateFormInputValues): Promise<{result: "SUCCESS"|"FAIL", eventOutput: Event}|undefined> {
    if (!addedBy || !dateTime || !title) throw new Error("All fields are required.");
    try {
        const eventOutput = await DataStore.save(new Event({ addedBy, address, dateTime, title}));
        console.log("create new event SUCCESS: ", eventOutput);
        return { result: "SUCCESS", eventOutput };
    } catch (error) {
        console.log("createEvent() error: ", error);
    }    
}

//get event by id
async function getEvent(eventId: string): Promise<Event|undefined> {
    try {
        const event = await DataStore.query(Event, eventId);
        if (!event) throw new Error("Unable to retrieve event with id: " + eventId);
        return event;
    } catch (error) {
        console.log("getEventById() error: ", error);
    }
}

//delete event
async function deleteEvent(event:Event):Promise<"SUCCESS"|"FAIL"|undefined> {
    try {
        const eventOutput = await DataStore.delete(Event, s => s.id.eq(event.id));
        console.log("delete event SUCCESS: ", eventOutput);
        return "SUCCESS";
    } catch (error) {
        console.log("deleteEvent() error: ", error);
    }   
}

//update event
async function updateEvent(event: Event): Promise<{result: "SUCCESS"|"FAIL", eventOutput: Event}|undefined> {
    const { addedBy, address, dateTime, title } = event;
    try {
        const original = await DataStore.query(Event, event.id);
        if (!original) throw new Error("Unable to retrieve original event with id: " + event.id);
        const eventOutput = await DataStore.save(
            Event.copyOf(original, updated => {
                updated.addedBy = addedBy
                updated.address = address
                updated.dateTime = dateTime
                updated.title = title
        }));
        console.log("update event SUCCESS: ", eventOutput);
        return { result: "SUCCESS", eventOutput };
    } catch (error) {
        console.log("createEvent() error: ", error);
    }    
}

export const EventsAPI = {
    createEvent,
    deleteEvent,
    getEvent,
    listEvents,
    updateEvent
};