import "./Events.css";
import { useRef, useState } from 'react';
import CalendarEvents from "../../ui/CalendarEvents/CalendarEvents";
import { Library } from "../../lib/library";
import { Event } from "../../models";
import ViewEvent from "../../ui/ViewEvent/ViewEvent";
const { Dialog } = Library;

const Events = () => {
  const currentEvent = useRef<Event|null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  function handleCloseDialog(){
    setDialogOpen(false);
    currentEvent.current = null;
  }

  function handleSelectEvent(event: Event){
    currentEvent.current = event;
    setDialogOpen(true);
  }

  return (
    <div className="eventsPageMain">
      <Dialog open={dialogOpen} onClose={handleCloseDialog} fullScreen sx={{margin: "auto", height: "fit-content", width: "80%"}}>
        <ViewEvent currentEvent={currentEvent.current} />
      </Dialog>
      <h1>Upcoming Events</h1>

      <CalendarEvents fromPublicPage onClick={handleSelectEvent}/>
    </div>
  )
}

export default Events;