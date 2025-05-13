import "./AddSong.css";
import React, { useContext, useState } from 'react'
import { Library } from '../../lib/library';
import { SongsAPI } from "../../api/SongsAPI";
import { AdminContext } from "../../contexts/contexts";
import { capitalizeWords } from "../../util/capitalizeWords";
import { Song } from "../../models";
import Confirmation from "../Confirmation/Confirmation";
const { Button, TextField } = Library;

const AddSong = ({ songToEdit, userSongs }: {songToEdit: Song|null, userSongs: Song[]}) => {
    const { currentUser, setAlertMessage } = useContext(AdminContext) || {};
    const initialSet = songToEdit ? 
        {addedBy: songToEdit.addedBy, album: songToEdit.album, artist: songToEdit.artist,  title: songToEdit.title} : 
        {addedBy: currentUser ? currentUser.name : "default", album: "", artist: "", title: ""};
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [songInfo, setSongInfo] = useState<Song>(initialSet);
    const isFieldEmpty = Object.values(songInfo).some(value => !value);
    
    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.currentTarget;
        setSongInfo(prevState => ({ ...prevState, [name]: capitalizeWords(value) }));
    }

    async function handleDelete() {
        if (!songToEdit) return;
        //update userSongs Model
    
        // if (deleteResult && deleteResult === "SUCCESS") 
        //     setAlertMessage && setAlertMessage({
        //         duration: 2500, 
        //         message: `Successfully deleted song ${songToEdit.artist} - ${songToEdit.title}`,
        //         open: true,
        //         severity: "success"
        // });
    }

    async function handleSubmit() {
        let newSongResult;
        if (!currentUser) return setAlertMessage && setAlertMessage({duration: 2500, message: "Unable to retrieve user", severity: "error"});
        const updatedSongs = [...userSongs];
        
        if (songToEdit){
            const thisSongIndex = updatedSongs.findIndex(song => (song.artist === songToEdit.artist) && (song.title === songToEdit.title));
            updatedSongs[thisSongIndex] = {...songToEdit};
            newSongResult = await SongsAPI.updateUserSongs(updatedSongs);
        } else {
            updatedSongs.push(songInfo)
            newSongResult = await SongsAPI.updateUserSongs(updatedSongs);
        }
        if (newSongResult && newSongResult.result === "SUCCESS"){
            setAlertMessage && setAlertMessage({
                duration: 2500, 
                message: `Successfully ${songToEdit ? "updated": "added new"} song ${songInfo.artist} - ${songInfo.title}`,
                open: true,
                severity: "success"
            });
        }
    }

    return (
        <div className='addSongMain'>
            <Confirmation 
                confirmFunction={async () => await handleDelete()}
                message={<span className="confirmDeleteText">Delete <strong>{songToEdit?.artist} - {songToEdit?.title}</strong> ? </span>}
                open={confirmOpen}
                setOpen={setConfirmOpen}
            />
            <h2>{songToEdit ? "Update Song" : "Add New Song"}</h2>
            <TextField 
                label="Artist"
                name='artist'
                onChange={handleChange}
                required
                value={songInfo.artist}
            />
            <TextField 
                label="Title"
                name='title'
                onChange={handleChange}
                required
                value={songInfo.title}
            />
             <TextField 
                label="Album"
                name='album'
                onChange={handleChange}
                required
                value={songInfo.album}
            />
            <div className="addSongButtonsContainer" style={{justifyContent: songToEdit ? "space-between" : "center"}}>
                {songToEdit && 
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

export default AddSong;