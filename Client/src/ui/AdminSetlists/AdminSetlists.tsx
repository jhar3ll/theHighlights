import "./AdminSetlists.css";
import React, { useContext, useEffect, useRef, useState } from 'react'
import { AWS_Services, Icons, Library } from "../../lib/library";
import AddSetlist from "../AddSetlist/AddSetlist";
import { Event, Setlist, Song } from "../../models";
import { SetlistAPI } from "../../api/SetlistAPI";
import { EventsAPI } from "../../api/EventsAPI";
import { SetlistWithEvent } from "../../data/types";
import { getSongLabel } from "../../util/getSongLabel";
import { AdminContext } from "../../contexts/contexts";
const { DataStore } = AWS_Services;
const { AddIcon, ClearIcon, DragHandleIcon, EditIcon, VisibilityIcon } = Icons;
const { Button, dayjs, Dialog, Fab, IconButton, Reorder, useDragControls } = Library;

const AdminSetlist = () => {
  const { setAlertMessage } = useContext(AdminContext) || {};
  const controls = useDragControls();
  const availableEvents = useRef<Event[]>([]);
  const currentSetlist = useRef<Setlist|null>(null);
  const reordered = useRef(false);
  const [completedSongs, setCompletedSongs] = useState<number[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [setlists, setSetlists] = useState<SetlistWithEvent[]|null>(null);
  const [setlistSongs, setSetlistSongs] = useState<Song[]>([])
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

  function handleReorder(songs: Song[]){
    reordered.current = true;
    setSetlistSongs(songs);
  }

  function handleSetlist(setlist: SetlistWithEvent){
    currentSetlist.current = setlist;
    setSingleSetlist(setlist);
    setSetlistSongs(setlist.songs);
  }

  function handleSongToggle(index: number){
    const completedSongsCopy = [...completedSongs];
    if (completedSongs.includes(index)){
      const songIndex = completedSongsCopy.findIndex(i => i === index);
      completedSongsCopy.splice(songIndex, 1);
    } else completedSongsCopy.push(index);
    setCompletedSongs(completedSongsCopy);  
  }

  async function handleUpdateSetlist() {
    console.log(currentSetlist.current)
    if (!currentSetlist.current?.id) throw new Error("Setlist ID is missing.");
    
    const updateResult = await SetlistAPI.updateSetlist({
      ...currentSetlist.current,
      id: currentSetlist.current.id,
      songs: setlistSongs
    });
    if (updateResult && updateResult.result === "SUCCESS"){
      setAlertMessage && setAlertMessage({
        duration: 2500, 
        message: `Successfully updated setlist ${updateResult.setlistOutput?.title}`,
        open: true,
        severity: "success"
      });
    }
    setSingleSetlist(null);
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
        <div className="singleSetlistContainer">
          <IconButton onClick={() => setSingleSetlist(null)}><ClearIcon htmlColor="white" fontSize="large"/></IconButton>
          <div className="singleSetlistHeader">
            <span>Setlist: <strong>{singleSetlist.title}</strong></span>
            <span>Event: <strong>{singleSetlist.event.title}</strong></span>
          </div>
          <div>
            <h3>Set #{singleSetlist.setNumber}</h3>
            <Reorder.Group className="singleSetlistItemContainer" as="div" axis="y" onReorder={(songs) => handleReorder(songs)} values={setlistSongs}>
              {setlistSongs.map((song, index) => {
                const label = getSongLabel(song);
                return (
                  <Reorder.Item
                    className="singleSetlistItem"
                    dragControls={controls}
                    key={label} 
                    style={{textDecorationLine: completedSongs.includes(index) ? "line-through" : ""}}
                    value={song}
                  >
                  <span onClick={() => handleSongToggle(index)}>{getSongLabel(song)}</span>
                  <IconButton onPointerDown={(e) => { controls.start(e)}}><DragHandleIcon htmlColor="white" /></IconButton>
                </Reorder.Item>
                )}
              )}
            </Reorder.Group>
          </div>
          {reordered.current && <Button color="info" onClick={handleUpdateSetlist} variant="contained">Update</Button>}
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
                      <IconButton onClick={() => handleSetlist(setlist)}><VisibilityIcon fontSize="large" htmlColor="lightblue"/></IconButton>
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