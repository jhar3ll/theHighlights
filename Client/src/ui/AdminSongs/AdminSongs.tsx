import "./AdminSongs.css";
import React, { useEffect, useRef, useState } from 'react'
import { Song } from '../../models';
import { SongsAPI } from '../../api/SongsAPI';
import { Icons, Library } from "../../lib/library";
import AddSong from "../AddSong/AddSong";
const { AddIcon } = Icons;
const { Dialog, Divider, Fab } = Library;

const AdminSongs = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [songs, setSongs] = useState<Song[]>([]);
  const songToEdit = useRef<Song|null>(null);

  useEffect(() => {
    async function getAllSongs() {
      if (!songs.length){
        const allSongs = await SongsAPI.listSongs();
        allSongs && setSongs(allSongs);
      }
    }

    getAllSongs();
  },[songs])
  
  function handleDialogClose(){
    if (songToEdit.current) songToEdit.current = null;
    setDialogOpen(false);
  }

  function handleEditSong(song: Song){
    songToEdit.current = song;
    setDialogOpen(true);
  }

  return (
    <div className='adminSongsMain'>
      <Dialog onClose={handleDialogClose} open={dialogOpen}>
        <AddSong songToEdit={songToEdit.current} />
      </Dialog>
      
      <div className="adminSongsSecondaryContainer">
        <div className="adminSongsHeader">
          <h2>{songs.length} songs</h2>
          <Fab color="primary" onClick={() => setDialogOpen(true)} size="large"><AddIcon /></Fab>
        </div>
    
        <Divider />
        <table className='adminSongsListTable'>
          <thead>
            <tr>
              <th>Artist</th>
              <th>Title</th>
              <th>Album</th>
              <th>Added By</th>
            </tr>
          </thead>
          <tbody>
          {songs.map((song, index) => (
            <tr key={index} onClick={() => handleEditSong(song)}>
              <td>{song.artist}</td>
              <td>{song.title}</td>
              <td>{song.album}</td>
              <td>{song.addedBy}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminSongs;