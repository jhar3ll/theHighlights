import "./AddSong.css";
import React, { useContext, useState } from 'react'
import { Library } from '../../lib/library';
import { SongsAPI } from "../../api/SongsAPI";
import { AdminContext } from "../../contexts/contexts";
import { capitalizeWords } from "../../util/capitalizeWords";
const { Button, TextField } = Library;

type newSongType = {
    album: string
    artist: string
    title: string
}

const initialSet = {album: "", artist: "", title: ""};

const AddSong = () => {
    const { currentUser, setAlertMessage } = useContext(AdminContext) || {};
    const [songInfo, setSongInfo] = useState<newSongType>(initialSet);
    const isFieldEmpty = Object.values(songInfo).some(field => !field);

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.currentTarget;
        setSongInfo(prevState => ({ ...prevState, [name]: capitalizeWords(value) }));
    }

    async function handleSubmit() {
        const { album, artist, title } = songInfo;
        if (!currentUser) return setAlertMessage && setAlertMessage({duration: 2500, message: "Unable to retrieve user", severity: "error"});
        const newSongResult = await SongsAPI.createSong({ addedBy: currentUser.name, album, artist, title });
        if (newSongResult && newSongResult.result === "SUCCESS"){
            setAlertMessage && setAlertMessage({
                duration: 2500, 
                message: `Successfully added new song ${newSongResult.newSong.artist} - ${newSongResult.newSong.title}`,
                open: true,
                severity: "success"
            });
        }
    }

    return (
        <div className='addSongMain'>
            <h2>Add New Song</h2>
            <TextField 
                label="Artist"
                name='artist'
                onChange={handleChange}
                required
                value={songInfo.artist}
            />
            <TextField 
                label="Album"
                name='album'
                onChange={handleChange}
                required
                value={songInfo.album}
            />
            <TextField 
                label="Title"
                name='title'
                onChange={handleChange}
                required
                value={songInfo.title}
            />
            <Button 
                disabled={isFieldEmpty} 
                onClick={handleSubmit} 
                style={{cursor: isFieldEmpty ? "not-allowed" : "pointer", pointerEvents: "all"}}
                variant="contained"
            >submit</Button>
        </div>
    )
}

export default AddSong;