import "./SelectSongs.css";
import React, { useContext, useEffect, useState } from 'react';
import { Icons, Library } from "../../lib/library";
import { LazySong, Setlist, Song } from "../../models";
import { SongsAPI } from "../../api/SongsAPI";
import { newSetlistType } from "../../data/types";
import { capitalizeWords } from "../../util/capitalizeWords";
import { AdminContext } from "../../contexts/contexts";
import { SetlistAPI } from "../../api/SetlistAPI";
import { getSongLabel } from "../../util/getSongLabel";

const { Button, Checkbox, CircularProgress, FormControl, FormControlLabel, FormGroup, IconButton, Reorder, useDragControls } = Library;
const { DragHandleIcon } = Icons;

type SelectSongsProps = {
    handleCloseDialog: React.Dispatch<React.SetStateAction<boolean>>
    setlistInfo: newSetlistType
    setlistToEdit: Setlist|null
}

const SelectSongs = ({ handleCloseDialog, setlistInfo, setlistToEdit }:SelectSongsProps) => {
    const [availableSongs, setAvailableSongs] = useState<Song[]>([]);
    const controls = useDragControls();
    const { currentUser, setAlertMessage } = useContext(AdminContext) || {};
    const [loading, setLoading] = useState(true);
    const [selectedSongs, setSelectedSongs] = useState<Song[]>([]);
    const selectedSongsMap = selectedSongs.map(song => getSongLabel(song));

    useEffect(() => {
        async function getAllSongs() {
            const allSongs = await SongsAPI.getUserSongsList();
            if (!allSongs) return;
            setAvailableSongs(allSongs);
            setLoading(false);
        }

        function checkEditingSelectedSongs(){
            if (!setlistToEdit) return;
            setSelectedSongs(setlistToEdit.songs);
        }

        getAllSongs();
        checkEditingSelectedSongs();
    },[setlistToEdit]);

    function handleChange(event: React.ChangeEvent<HTMLInputElement>){
        const song = JSON.parse(event.target.value);
        const songLabel = getSongLabel(song);
        if (!song) return;
        setSelectedSongs(prevState => {
            if (selectedSongsMap.includes(songLabel)) {
                return prevState.filter(s => getSongLabel(s) !== songLabel);
            } else {
                return [...prevState, song];
            }
        });
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
                                    const label = getSongLabel(song);
                                    return (
                                        <div className="availableSongsListItem">
                                            <FormControlLabel 
                                                key={index} 
                                                control={ <Checkbox checked={selectedSongsMap.includes(label)} onChange={handleChange} value={JSON.stringify(song)}/>} 
                                                label
                                            />
                                            <span>{label}</span>
                                        </div>
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
