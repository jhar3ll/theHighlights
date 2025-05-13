import "./SelectSongs.css";
import React, { useContext, useEffect, useState } from 'react';
import { Library } from "../../lib/library";
import { LazySong, Setlist, Song } from "../../models";
import { SongsAPI } from "../../api/SongsAPI";
import { newSetlistType } from "../../data/types";
import { capitalizeWords } from "../../util/capitalizeWords";
import { AdminContext } from "../../contexts/contexts";
import { SetlistAPI } from "../../api/SetlistAPI";

const { Button, Checkbox, CircularProgress, FormControl, FormControlLabel, FormGroup } = Library;

type SelectSongsProps = {
    handleCloseDialog: React.Dispatch<React.SetStateAction<boolean>>
    setlistInfo: newSetlistType
    setlistToEdit: Setlist|null
}

const SelectSongs = ({ handleCloseDialog, setlistInfo, setlistToEdit }:SelectSongsProps) => {
    const [availableSongs, setAvailableSongs] = useState<Song[]>([]);
    const { currentUser, setAlertMessage } = useContext(AdminContext) || {};
    const [loading, setLoading] = useState(true);
    const [selectedSongs, setSelectedSongs] = useState<{[key:string]:LazySong|null}>({});

    useEffect(() => {
        async function getAllSongs() {
            const allSongs = await SongsAPI.getUserSongsList();
            allSongs && setAvailableSongs(allSongs);
            setLoading(false);
        }
        getAllSongs();
    },[]);

    function handleChange(event: React.ChangeEvent<HTMLInputElement>){
        const { value } = JSON.parse(event.target.value);
        const label = `${value.artist} - ${value.title}`;
        setSelectedSongs(prevState => ({...prevState, [label]: prevState[label] ? null : value}));
    };

    async function handleSubmit() {
        let newSetlistResult;
        const songs: LazySong[] = Object.values(selectedSongs).filter((s): s is LazySong => s !== null);
        const { eventID, setNumber, title } = setlistInfo;
        if (!currentUser) return setAlertMessage && setAlertMessage({duration: 2500, message: "Unable to retrieve user", severity: "error"});
        const addedBy = currentUser ? currentUser.name : "";
    
        if (setlistToEdit){
            newSetlistResult = await SetlistAPI.updateSetlist({...setlistToEdit, addedBy, eventID, setNumber, songs, title});
        } else {
            newSetlistResult = await SetlistAPI.createSetlist({ addedBy, eventID, setNumber, songs, title });
        }
       
        if (newSetlistResult && newSetlistResult.result === "SUCCESS"){
          setAlertMessage && setAlertMessage({
              duration: 2500, 
              message: `Successfully ${setlistToEdit ? "updated": "added new"} setlist ${newSetlistResult.setlistOutput?.title}`,
              open: true,
              severity: "success"
          });
        }
    }

    return (
        <div>
            {loading ? <CircularProgress /> :
                <div className="availableSongsContainer">
                    <FormControl>
                        <h3>Select Songs For Setlist "{capitalizeWords(setlistInfo.title)}" (Set #{setlistInfo.setNumber})</h3>
                        <FormGroup>
                            <div className="availableSongsListContainer">
                                {availableSongs.map((song, index) => {
                                    const label = `${song.artist} - ${song.title}`;
                                    return (
                                        <FormControlLabel 
                                            key={index} 
                                            control={ <Checkbox checked={!!selectedSongs[label]} onChange={handleChange} value={label}/>} 
                                            label={label} 
                                        />
                                    )
                                })}
                            </div>
                        </FormGroup>
                    </FormControl>
                </div>    
            }
            <div className="selectSongsButtonsContainer">
                <Button color="warning" onClick={() => handleCloseDialog(false)} size="large" variant="contained">Back</Button>
                <Button onClick={handleSubmit} size="large" variant="contained">Done</Button>
            </div>
        </div>
    )
}

export default SelectSongs
