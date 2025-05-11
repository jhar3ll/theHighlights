import "./ViewEvent.css";
import React from 'react'
import { Event } from "../../models";
import { Library } from "../../lib/library";
const { dayjs } = Library;

const ViewEvent = ({ currentEvent }: {currentEvent: Event|null}) => {
    if (!currentEvent) return null;
    const [eventDate, eventTime, eventAmPm] = dayjs(currentEvent.dateTime).format("MM/DD/YYYY hh:mm A").split(" ")
    return (
        <div className="viewEventMain">
            <h1>{currentEvent.title} Details</h1>
            <div className="viewEventDetailsContainer">
                <span>Date: <strong>{eventDate}</strong></span>
                <span>Time: <strong>{eventTime + " " + eventAmPm}</strong></span>
                {currentEvent.address && <span>Where: <strong>{currentEvent.address}</strong></span>}
            </div>
        </div>
    )
}

export default ViewEvent
