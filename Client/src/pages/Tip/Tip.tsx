import "./Tip.css";
import React, { useEffect, useState } from 'react';
import { Icons, Library } from "../../lib/library";
import Pay from "../../ui/Pay/Pay";
import { tipInfoType } from "../../data/types";
import { SongsAPI } from "../../api/SongsAPI";
import { Song } from "../../models";

const { Button, FormControlLabel, Radio, RadioGroup, TextField } = Library;
const { AttachMoneyIcon, LibraryMusicIcon } = Icons;

const Tip = () => {
  const defaultTipInfo = { name: "", amount: 0, message: "", email: "" };
  const [searchValue, setSearchValue] = useState<string>("");
  const [selection, setSelection] = useState<"tip"|"request"|null>(null);
  const [songList, setSongList] = useState<Song[]>([]);
  const [songSelection, setSongSelection] = useState<Song | null>(null);
  const [songSelectionConfirmed, setSongSelectionConfirmed] = useState<boolean>(false);
  const [readyToPay, setReadyToPay] = useState<boolean>(false);
  const [tipInfo, setTipInfo] = useState<tipInfoType>(defaultTipInfo);
  const submitDisabled = !checkReadyForSubmit();

  useEffect(() => {
    async function getAllSongsUser() {
      if (!songList.length){
        const allSongs = await SongsAPI.getUserSongsList();
        allSongs && setSongList(allSongs);
      }
    }

    getAllSongsUser();
  },[songList])

  function checkReadyForSubmit() {
    if (selection === "tip") return !!tipInfo.name && Number(tipInfo.amount) > 0;
    else if (selection === "request") return (songSelectionConfirmed && tipInfo.name && Number(tipInfo.amount) > 0)  || (!!songSelection && !songSelectionConfirmed);
    return false;
  }

  function handleCancel(){
    if (readyToPay) {
      setReadyToPay(false);
    } else if (songSelectionConfirmed) {
      setSongSelectionConfirmed(false);
    } else {
      setSelection(null);
      setSongSelection(null);
      setSongSelectionConfirmed(false);
      setTipInfo(defaultTipInfo);
    }
  }

  function handleFloatConversion(){
    if (tipInfo.amount === "") return;
    const float = parseFloat(Math.abs(Number(tipInfo.amount)).toString()).toFixed(2);
    setTipInfo(prevState => ({ ...prevState, amount: float}));
  }

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.currentTarget;
    setSearchValue(value);
    const filteredSongs = songList.filter(song => song.title.toLowerCase().includes(value.toLowerCase()) || song.artist.toLowerCase().includes(value.toLowerCase()));
    setSongList(filteredSongs);
  }

  function handleSelection(event: React.MouseEvent<HTMLButtonElement>) {
    const { name } = event.currentTarget;
    setSelection(name as "tip"|"request");
  }

  function handleSongSelection(event: React.ChangeEvent<HTMLInputElement>) {
    const songIndex = songList.findIndex(song => song.id === Number(event.target.value));
    if (!songIndex) return;
    setSongSelection(songList[songIndex]);
  }

  function handleSubmit(){
    if (selection === "request") {
      if (!songSelectionConfirmed) return setSongSelectionConfirmed(true);
    }
    setReadyToPay(true);
  }

  function handleTip(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.currentTarget;
    setTipInfo(prevState => ({ ...prevState, [name]: value }));
  }

  return (
    <div className="tipMainContainer">
      <div className='tipMainButtonsContainer' style={{ display: selection ? "none" : "" }}>
        <Button className='tipButton' name="tip" onClick={handleSelection} variant="contained" color="success" size="large" startIcon={<AttachMoneyIcon />}>
          Tip The Band
        </Button>
        <Button className='requestButton' name="request" onClick={handleSelection} variant="contained" color="primary" size="large" startIcon={<LibraryMusicIcon />}>
          Request A Song
        </Button>
      </div>

      <div className="tipContainer">
      </div>

      <div className="requestContainer" style={{ display: !songSelectionConfirmed && selection === "request" ? "" : "none" }}>
        <h2>The Highlights Songs:</h2>
        <div className="songSearchContainer">
          <TextField 
            className="songSearch" 
            label="Search" 
            onChange={handleSearch}
            size="small"  
            style={{
              backgroundColor: "whitesmoke",
              borderRadius: "5px",
              width: "100%",
            }}
            value={searchValue}
            variant="filled" 
          />
        </div>
        <div className="songListContainer">
          <RadioGroup className="songSelectionRadioGroup" value={songSelection && songSelection.id} onChange={handleSongSelection}>
            {songList.map((song, index) => (
              <FormControlLabel 
                className="songSelectionRadio"
                key={index} 
                value={song.id} 
                control={<Radio style={{color: "white"}}/>} label={`${song.artist} - ${song.title}`} 
              />
            ))}
          </RadioGroup>
        </div>
      </div>

      <div className="confirmRequestContainer" style={{ display: selection === "tip" && !readyToPay ? "" : songSelectionConfirmed && !readyToPay ? "" : "none" }}>
        <div className="confirmRequestHeader">
          <h2>{selection === "request" ? "Confirm Your Request: " : "Tipper Information: "}</h2>
          {selection === "request" && <h3>{songSelection?.artist} - {songSelection?.title}</h3>}
        </div>
        <div className="tipInfoFormContainer">
          <TextField
            className="tipName"
            label="Your Name"
            name="name"
            onChange={handleTip}
            required
            size="small"
            style={{ backgroundColor: "whitesmoke", borderRadius: "5px", width: "70%" }}
            type="text"
            variant="filled"
            value={tipInfo.name}
          />
          <TextField 
            className="tipAmount" 
            label="Tip Amount" 
            name="amount"
            onBlur={handleFloatConversion}
            onFocus={() => {if(tipInfo.amount === 0) setTipInfo(prevState => ({ ...prevState, amount: "" }))}}
            onChange={handleTip}
            required
            size="small" 
            slotProps={{ htmlInput: {min: 0}, input: { startAdornment: <AttachMoneyIcon style={{marginTop: "15px"}}/> } }}
            style={{ backgroundColor: "whitesmoke", borderRadius: "5px", width: "100%" }} 
            type="number"
            variant="filled" 
            value={tipInfo.amount}
          />
          <div className="tipEmailContainer">
            <TextField
              className="tipEmail"
              label="Email (Optional)"
              name="email"
              onChange={handleTip}
              size="small"
              style={{ backgroundColor: "whitesmoke", borderRadius: "5px", width: "100%" }}
              type="text"
              variant="filled"
              value={tipInfo.email}
              />
            <span className="tipEmailHelperText">Enter your email if you would like a receipt</span>
          </div>
           <div className="tipEmailContainer">
            <TextField
              className="tipMessage"
              label="Message (Optional)"
              multiline
              name="message"
              onChange={handleTip}
              rows={3}
              size="small"
              style={{ backgroundColor: "whitesmoke", borderRadius: "5px", width: "80%" }}
              variant="filled"
              value={tipInfo.message}
            />
            <span className="tipEmailHelperText">Leave the band a nice message!</span>
          </div>
        </div>
      </div>

      {readyToPay && <Pay handleCancel={handleCancel} tipInfo={tipInfo} songSelection={songSelection} />}

      <div className="submitButtonsContainer" style={{ display: !!selection && !readyToPay ? "" : "none" }}>
        <Button className='cancelButton' name="cancel" variant="contained" color="error" size="large" onClick={handleCancel}>
          {readyToPay || songSelectionConfirmed ? "Back" : "Cancel"}
        </Button> 
        <Button 
          className='submitButton' 
          color="success" 
          disabled={submitDisabled}
          name="submit" 
          onClick={handleSubmit}
          variant="contained"
          size="large" 
          style={{ cursor: submitDisabled ? "not-allowed" : "pointer" }}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

export default Tip;