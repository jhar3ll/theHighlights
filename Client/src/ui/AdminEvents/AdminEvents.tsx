import "./AdminEvents.css"
import React, { useRef, useState } from 'react'
import CalendarEvents from '../CalendarEvents/CalendarEvents';
import { Icons, Library } from '../../lib/library';
import AddEvent from "../AddEvent/AddEvent";
import { Event } from "../../models";
const { AddIcon } = Icons;
const { Dialog, Fab } = Library;

const AdminEvents = () => {
  const [currentDate, setCurrentDate] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const eventToEdit = useRef<Event|null>(null);

  function handleDialogClose(){
    if (eventToEdit.current) eventToEdit.current = null;
    setDialogOpen(false);
  }

  function handleEditEvent(event: Event){
    eventToEdit.current = event;
    setDialogOpen(true);
  }

  return (
    <div className='adminEventsMain'>
      <Dialog onClose={handleDialogClose} open={dialogOpen}>
        <AddEvent eventToEdit={eventToEdit.current} selectedDate={currentDate} />
      </Dialog>

      <div className='adminEventsHeader'>
        <h1>Highlights Events</h1>
        <Fab color="primary" onClick={() => setDialogOpen(true)} size="large"><AddIcon /></Fab>
      </div>
      <CalendarEvents onClick={handleEditEvent} setCurrentDate={setCurrentDate}/>
    </div>
  )
}

export default AdminEvents;