import "./AdminSetlists.css";
import React, { useEffect, useRef, useState } from 'react'
import { AWS_Services, Icons, Library } from "../../lib/library";
import AddSetlist from "../AddSetlist/AddSetlist";
import { Event, Setlist } from "../../models";
import { SetlistAPI } from "../../api/SetlistAPI";
import { EventsAPI } from "../../api/EventsAPI";
import { SetlistWithEvent } from "../../data/types";
const { DataStore } = AWS_Services;
const { AddIcon } = Icons;
const { dayjs, Dialog, Fab } = Library;

const AdminSetlist = () => {
  const availableEvents = useRef<Event[]>([]);
  const currentSetlist = useRef<Setlist|null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [setlists, setSetlists] = useState<SetlistWithEvent[]|null>(null);

  useEffect(() => {
    async function getSetlistsWithEvents(modelSetlists: Setlist[]){
      return await Promise.all(modelSetlists.map(async (setlist: Setlist) => {
        const setlistEvent = await DataStore.query(Event, e => e.id.eq(setlist.eventID));
        return { ...setlist, event: setlistEvent[0] };
        })
      );
    }
    
    async function getAllSetlists() {
      const allSetlists = await SetlistAPI.listSetlists();
      availableEvents.current = await EventsAPI.listEvents() || [];
      if (allSetlists){
        const setlistsWithSongsAndEvents = await getSetlistsWithEvents(allSetlists);
        console.log(setlistsWithSongsAndEvents)
        setSetlists(setlistsWithSongsAndEvents as any)
      }
    }

    getAllSetlists();
  },[]);

  function getEventDateTime(eventDateTime: string){
    return dayjs(eventDateTime).format("MM/DD/YY");
  }

  function handleViewSetlist(setlist: Setlist){
    currentSetlist.current = setlist;
    setDialogOpen(true);
  }
  
  return (
    <div className="adminSetlistsMain">
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <AddSetlist availableEvents={availableEvents.current} setlistToEdit={currentSetlist.current}/>
      </Dialog>

      <div className='adminSetlistsHeader'>
        <h1>Highlights Setlists</h1>
        <Fab color="primary" onClick={() => setDialogOpen(true)} size="large"><AddIcon /></Fab>
      </div>

      <table className='allSetlistsTableContainer'>
          <thead>
          <tr>
              <th>Title</th>
              <th>Event</th>
              <th>Set #</th>
              <th># Of Songs</th>
              <th>Added By</th>
          </tr>
          </thead>
          <tbody>
            {setlists && setlists.map((setlist, index) => {
              return (
                <tr key={index} onClick={() => handleViewSetlist(setlist)}>
                    <td>{setlist.title}</td>
                    {<td>{setlist.event.title} | {getEventDateTime(setlist.event.dateTime)}</td>}
                    <td>{setlist.setNumber || "-"}</td>
                    <td>{123}</td>
                    <td>{setlist.addedBy}</td>
                </tr>
              )})
            }
          </tbody>
      </table>
    </div>
  )
}

export default AdminSetlist