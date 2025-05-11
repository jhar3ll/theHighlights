import "./AddEvent.css";
import React, { useContext, useEffect, useState } from 'react'
import { Library } from '../../lib/library';
import { AdminContext } from "../../contexts/contexts";
import { capitalizeWords } from "../../util/capitalizeWords";
import { Event } from "../../models";
import Confirmation from "../Confirmation/Confirmation";
import { EventsAPI } from "../../api/EventsAPI";
import { times } from "../../data/times";
import { convertAmPmToIso } from "../../util/convertDateTIme";
const { Button, dayjs, MenuItem, TextField } = Library;

type newEventType = {
    address?: string|null
    dateTime: string
    title: string
}

const AddEvent = ({ eventToEdit, selectedDate }: {eventToEdit: Event|null, selectedDate: string}) => {
    const initialSet = eventToEdit ? {address: eventToEdit.address, dateTime: selectedDate, title: eventToEdit.title} : {address: "", dateTime: selectedDate, title: ""};
    const { currentUser, setAlertMessage } = useContext(AdminContext) || {};
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [eventInfo, setEventInfo] = useState<newEventType>(initialSet);
    const [eventTime, setEventTime] = useState({time1: "", time2: "", time3: ""});
    const isFieldEmpty = (Object.entries(eventInfo).some(([key, value]) => key !== "address" && !value)) || (eventInfo.dateTime.length < 24);

    useEffect(() => {
      const { time1, time2, time3 } = eventTime;
      if (time1 && time2 && time3){
        const formattedDateTime = convertAmPmToIso(selectedDate, time1, time2, time3 === "AM" || time3 === "PM" ? time3 : "AM");
        setEventInfo(prevState => ({ ...prevState, dateTime: formattedDateTime }));
      }
    },[eventTime, selectedDate])

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
      const { name, value } = event.currentTarget;
      setEventInfo(prevState => ({ ...prevState, [name]: capitalizeWords(value) }));
    }

    function handleDateChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
      const { name, value } = event.target;
      setEventTime(prevState => ({ ...prevState, [name]: value }));
    }

    async function handleDelete() {
      if (!eventToEdit) return;
      const deleteResult = await EventsAPI.deleteEvent(eventToEdit);
      if (deleteResult && deleteResult === "SUCCESS") 
          setAlertMessage && setAlertMessage({
            duration: 2500, 
            message: `Successfully deleted event ${eventToEdit.title} - ${selectedDate}`,
            open: true,
            severity: "success"
      });
    }

    async function handleSubmit() {
        let newEventResult;
        const { address, dateTime, title } = eventInfo;
        if (!currentUser) return setAlertMessage && setAlertMessage({duration: 2500, message: "Unable to retrieve user", severity: "error"});
        const addedBy = currentUser.name;

        if (eventToEdit){
            newEventResult = await EventsAPI.updateEvent({...eventToEdit, addedBy, address, dateTime, title});
        } else {
            newEventResult = await EventsAPI.createEvent({ addedBy: currentUser.name, address, dateTime, title });
        }
        if (newEventResult && newEventResult.result === "SUCCESS"){
          const newDateTime = dayjs(newEventResult.eventOutput.dateTime).format("MM/DD/YYYY hh:mm A");
            setAlertMessage && setAlertMessage({
                duration: 2500, 
                message: `Successfully ${eventToEdit ? "updated": "added new"} event ${newEventResult.eventOutput.title} - ${newDateTime}`,
                open: true,
                severity: "success"
            });
        }
    }
    
    return (
        <div className='addEventMain'>
            <Confirmation 
                confirmFunction={async () => await handleDelete()}
                message={<span className="confirmDeleteText">Delete <strong>{eventToEdit?.title} - {dayjs(eventToEdit?.dateTime).format("MM/DD/YYYY hh:mm A")}</strong> ? </span>}
                open={confirmOpen}
                setOpen={setConfirmOpen}
            />
            <h2>{eventToEdit ? "Update Event" : "Add New Event"}</h2>
            <TextField 
                label="Title"
                name='title'
                onChange={handleChange}
                required
                value={eventInfo.title}
            />
            <TextField 
                label="Address"
                name='address'
                helperText="optional"
                onChange={handleChange}
                value={eventInfo.address}
            />
            <TextField 
                label="Date"
                name='date'
                disabled
                helperText="Use the calendar to change event date"
                required
                value={selectedDate}
            />
            <div className="eventTimeSelectContainer">
              <TextField 
                className="eventTime1"
                label="HH"
                name='time1'
                onChange={handleDateChange}
                required
                select
                value={eventTime.time1}
              > 
              {times.num1.map(time => 
                <MenuItem key={time} value={time}>{time}</MenuItem>
              )}
              </TextField>
              <TextField
                className="eventTime2" 
                label="MM"
                name='time2'
                onChange={handleDateChange}
                required
                select
                value={eventTime.time2}
              > 
              {times.num2.map(time => 
                <MenuItem key={time} value={time}>{time}</MenuItem>
              )}
              </TextField>
              <TextField
                className="eventTime3" 
                label="AM/PM"
                name='time3'
                onChange={handleDateChange}
                required
                select
                value={eventTime.time3}
              > 
                <MenuItem value={"A<"}>AM</MenuItem>
                <MenuItem value={"PM"}>PM</MenuItem>
              </TextField>
            </div>
            <div className="addEventButtonsContainer" style={{justifyContent: eventToEdit ? "space-between" : "center"}}>
                {eventToEdit && 
                    <Button 
                        color="error"
                        onClick={() => setConfirmOpen(true)} 
                        variant="contained"
                    >delete</Button>
                }
                <Button 
                    disabled={isFieldEmpty} 
                    onClick={handleSubmit} 
                    style={{cursor: isFieldEmpty ? "not-allowed" : "pointer", pointerEvents: "all"}}
                    variant="contained"
                >submit</Button>
            </div>
        </div>
    )
}

export default AddEvent;