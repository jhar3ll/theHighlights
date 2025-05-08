import "./AdminSongs.css";
import React, { useEffect, useState } from 'react'
import { Song } from '../../models';
import { SongsAPI } from '../../api/SongsAPI';
import { Icons, Library } from "../../lib/library";
import AddSong from "../AddSong/AddSong";
const { AddIcon } = Icons;
const { Dialog, Fab } = Library;

const AdminSongs = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [songs, setSongs] = useState<Song[]>([]);

  useEffect(() => {
    async function getAllSongs() {
      if (!songs.length){
        const allSongs = await SongsAPI.listSongs();
        allSongs && setSongs(allSongs);
      }
    }

    getAllSongs();
  },[songs])

  return (
    <div className='adminSongsMain'>
      <Dialog onClose={() => setDialogOpen(false)} open={dialogOpen}>
        <AddSong />
      </Dialog>
      
      <Fab color="primary" onClick={() => setDialogOpen(true)} size="large"><AddIcon /></Fab>
      <table className='adminSongListTable'>
        <caption>{songs.length} songs</caption>
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
          <tr key={index}>
            <td>{song.artist}</td>
            <td>{song.title}</td>
            <td>{song.album}</td>
            <td>{song.addedBy || "-"}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}

export default AdminSongs;