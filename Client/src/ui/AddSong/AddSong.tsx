import "./AddSong.css";
import React, { useContext, useState } from 'react'
import { Library } from '../../lib/library';
import { SongsAPI } from "../../api/SongsAPI";
import { AdminContext } from "../../contexts/contexts";
import { capitalizeWords } from "../../util/capitalizeWords";
import { Song } from "../../models";
import Confirmation from "../Confirmation/Confirmation";
const { Button, TextField } = Library;

type newSongType = {
    album: string
    artist: string
    title: string
}

const AddSong = ({ songToEdit }: {songToEdit: Song|null}) => {
    const initialSet = songToEdit ? {album: songToEdit.album, artist: songToEdit.artist, title: songToEdit.title} : {album: "", artist: "", title: ""};
    const { currentUser, setAlertMessage } = useContext(AdminContext) || {};
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [songInfo, setSongInfo] = useState<newSongType>(initialSet);
    const isFieldEmpty = Object.values(songInfo).some(field => !field);


    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.currentTarget;
        setSongInfo(prevState => ({ ...prevState, [name]: capitalizeWords(value) }));
    }

    async function handleDelete() {
        if (!songToEdit) return;
        const deleteResult = await SongsAPI.deleteSong(songToEdit);
        if (deleteResult && deleteResult === "SUCCESS") 
            setAlertMessage && setAlertMessage({
                duration: 2500, 
                message: `Successfully deleted song ${songToEdit.artist} - ${songToEdit.title}`,
                open: true,
                severity: "success"
        });
    }

    async function handleSubmit() {
        let newSongResult;
        const { album, artist, title } = songInfo;
        if (!currentUser) return setAlertMessage && setAlertMessage({duration: 2500, message: "Unable to retrieve user", severity: "error"});
        const addedBy = currentUser.name;

        if (songToEdit){
            newSongResult = await SongsAPI.updateSong({...songToEdit, addedBy, album, artist, title});
        } else {
            newSongResult = await SongsAPI.createSong({ addedBy: currentUser.name, album, artist, title });
        }
        if (newSongResult && newSongResult.result === "SUCCESS"){
            setAlertMessage && setAlertMessage({
                duration: 2500, 
                message: `Successfully ${songToEdit ? "updated": "added new"} song ${newSongResult.songOutput.artist} - ${newSongResult.songOutput.title}`,
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