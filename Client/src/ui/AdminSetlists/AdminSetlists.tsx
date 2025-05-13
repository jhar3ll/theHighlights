import "./AdminSetlists.css";
import React, { useEffect, useRef, useState } from 'react'
import { Icons, Library } from "../../lib/library";
import AddSetlist from "../AddSetlist/AddSetlist";
import { Event, Setlist } from "../../models";
import { SetlistAPI } from "../../api/SetlistAPI";
import { EventsAPI } from "../../api/EventsAPI";
const { AddIcon } = Icons;
const { Dialog, Fab } = Library;

const AdminSetlist = () => {
  const availableEvents = useRef<Event[]>([]);
  const currentSetlist = useRef(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [setlists, setSetlists] = useState<Setlist[]|null>(null);
  

  useEffect(() => {
    async function getAllSetlists() {
      const allSetlists = await SetlistAPI.listSetlists();
      availableEvents.current = await EventsAPI.listEvents() || [];
      allSetlists && setSetlists(allSetlists);
    }

    getAllSetlists();
  },[]);

  function handleViewSetlist(setlist: Setlist){
    console.log(setlist);
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
              <th>Event ID</th>
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
                    <td>{setlist.eventID}</td>
                    <td>{setlist.setNumber || "-"}</td>
                    <td>{"no. of songs here"}</td>
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