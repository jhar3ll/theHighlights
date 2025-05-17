import "./AdminSetlists.css";
import React, { useEffect, useRef, useState } from 'react'
import { AWS_Services, Icons, Library } from "../../lib/library";
import AddSetlist from "../AddSetlist/AddSetlist";
import { Event, Setlist } from "../../models";
import { SetlistAPI } from "../../api/SetlistAPI";
import { EventsAPI } from "../../api/EventsAPI";
import { SetlistWithEvent } from "../../data/types";
import { getSongLabel } from "../../util/getSongLabel";
const { DataStore } = AWS_Services;
const { AddIcon, ClearIcon, EditIcon, VisibilityIcon } = Icons;
const { dayjs, Dialog, Fab, IconButton } = Library;

const AdminSetlist = () => {
  const availableEvents = useRef<Event[]>([]);
  const currentSetlist = useRef<Setlist|null>(null);
  const [completedSongs, setCompletedSongs] = useState<number[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [setlists, setSetlists] = useState<SetlistWithEvent[]|null>(null);
  const [singleSetlist, setSingleSetlist] = useState<SetlistWithEvent|null>(null);

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
        setSetlists(setlistsWithSongsAndEvents as any)
      }
    }

    getAllSetlists();
  },[]);

  function getEventDateTime(eventDateTime: string){
    return dayjs(eventDateTime).format("MM/DD/YY");
  }

  function handleDialogClose(){
    currentSetlist.current = null;
    setDialogOpen(false);
  }

  function handleSongToggle(index: number){
    const completedSongsCopy = [...completedSongs];
    
    if (completedSongs.includes(index)){
      const songIndex = completedSongsCopy.findIndex(i => i === index);
      completedSongsCopy.splice(songIndex, 1);
    } else completedSongsCopy.push(index);
    
    setCompletedSongs(completedSongsCopy);  
  }

  function handleViewSetlist(setlist: Setlist){
    currentSetlist.current = setlist;
    setDialogOpen(true);
  }
  
  return (
    <div className="adminSetlistsMain">
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <AddSetlist availableEvents={availableEvents.current} setlistToEdit={currentSetlist.current}/>
      </Dialog>

      <div className='adminSetlistsHeader'>
        <h1>Highlights Setlists</h1>
        <Fab color="primary" onClick={() => setDialogOpen(true)} size="large"><AddIcon /></Fab>
      </div>

      {singleSetlist ? 
        <div>
            <IconButton onClick={() => setSingleSetlist(null)}><ClearIcon htmlColor="white" fontSize="large"/></IconButton>
            <div className="singleSetlistHeader">
              <span>Setlist: <strong>{singleSetlist.title}</strong></span>
              <span>Event: <strong>{singleSetlist.event.title}</strong></span>
            </div>
            <div>
              <h3>Set #{singleSetlist.setNumber}</h3>
              <ul className="singleSetlistItemContainer">
                {singleSetlist.songs.map((song, index) => 
                  <li 
                    className="singleSetlistItem" 
                    key={index} 
                    onClick={() => handleSongToggle(index)}
                    style={{textDecorationLine: completedSongs.includes(index) ? "line-through" : ""}}
                  >
                    <span>{getSongLabel(song)}</span>
                  </li>
                )}
              </ul>
            </div>
        </div>
        :
        <table className='allSetlistsTableContainer'>
          <thead>
            <tr>
              <th />
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
                <tr key={index}>
                  <td>
                    <div>
                      <IconButton onClick={() => setSingleSetlist(setlist)}><VisibilityIcon fontSize="large" htmlColor="lightblue"/></IconButton>
                      <IconButton onClick={() => handleViewSetlist(setlist)}><EditIcon fontSize="large" htmlColor="lightblue"/></IconButton>
                    </div>
                  </td>
                  <td>{setlist.title}</td>
                  {<td>{setlist.event.title} | {getEventDateTime(setlist.event.dateTime)}</td>}
                  <td>{setlist.setNumber || "-"}</td>
                  <td>{setlist.songs.length}</td>
                  <td>{setlist.addedBy}</td>
                </tr>
              )})
            }
          </tbody>
        </table>
      }
    </div>
  )
}

export default AdminSetlist