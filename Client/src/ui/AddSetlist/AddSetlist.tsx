import "./AddSetlist.css";
import React, { useContext, useState } from 'react'
import { Event, Setlist } from '../../models';
import { AdminContext } from '../../contexts/contexts';
import { newSetlistType } from '../../data/types';
import { SetlistAPI } from '../../api/SetlistAPI';
import Confirmation from '../Confirmation/Confirmation';
import { Library } from '../../lib/library';
import SelectSongs from '../SelectSongs/SelectSongs';
const { Button, Dialog, MenuItem, TextField } = Library;

type AddSetlistProps = {
  availableEvents: Event[]
  setlistToEdit: Setlist|null
}

const AddSetlist = ({ availableEvents, setlistToEdit }: AddSetlistProps) => {
  const { currentUser, setAlertMessage } = useContext(AdminContext) || {};
  const initialSet = setlistToEdit ? 
    {addedBy: setlistToEdit.addedBy, eventID: setlistToEdit.eventID, setNumber: setlistToEdit.setNumber, songs: setlistToEdit.songs, title: setlistToEdit.title} : 
    {addedBy: currentUser?.name, eventID: "", setNumber: 1, Songs: [], title: ""} as any;

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [setlistInfo, setSetlistInfo] = useState<newSetlistType>(initialSet);
  const isFieldEmpty = Object.values(setlistInfo).some(field => !field);

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setSetlistInfo(prevState => ({ ...prevState, [name]: value }));
  }

  async function handleDelete() {
    if (!setlistToEdit) return;
    const deleteResult = await SetlistAPI.deleteSetlist(setlistToEdit);
    if (deleteResult && deleteResult === "SUCCESS") 
      setAlertMessage && setAlertMessage({
        duration: 2500, 
        message: `Successfully deleted setlist ${setlistToEdit.title}`,
        open: true,
        severity: "success"
    });
  }
  
  return (
    <div className='addSetlistMain'>
      <Confirmation 
        confirmFunction={async () => await handleDelete()}
        message={<span className="confirmDeleteText">Delete setlist <strong>{setlistToEdit?.title}</strong> ? </span>}
        open={confirmOpen}
        setOpen={setConfirmOpen}
      />
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <SelectSongs handleCloseDialog={setDialogOpen} setlistInfo={setlistInfo} setlistToEdit={setlistToEdit} />
      </Dialog>

      <h2>{setlistToEdit ? "Update Setlist" : "Add New Setlist"}</h2>

      {setlistToEdit && <h3>Songs: <span>{setlistInfo.songs.length}</span></h3>}
      
      <div className='addSetlistFormFieldsContainer'>
        <TextField
          label="Title"
          name='title'
          onChange={handleChange}
          required
          value={setlistInfo.title}
        />
        <TextField 
          label="Set #"
          name='setNumber'
          onChange={handleChange}
          required
          type='number'
          value={setlistInfo.setNumber}
        />
        <TextField 
          label="Event"
          name='eventID'
          onChange={handleChange}
          select
          value={setlistInfo.eventID}
        >
          {availableEvents.map((event, index) => 
            <MenuItem key={index} value={event.id}>{event.title}</MenuItem>
          )}
        </TextField>
      </div> 
      <div className="addSongButtonsContainer" style={{justifyContent: setlistToEdit ? "space-between" : "center"}}>
        {setlistToEdit && 
          <Button 
            color="error"
            onClick={() => setConfirmOpen(true)} 
            variant="contained"
          >delete</Button>
        }
        <Button 
          disabled={isFieldEmpty} 
          onClick={() => setDialogOpen(true)} 
          style={{cursor: isFieldEmpty ? "not-allowed" : "pointer", pointerEvents: "all"}}
          variant="contained"
        >next</Button>
      </div>
    </div>
  )
}

export default AddSetlist;