import "./AdminSetlists.css";
import React, { useEffect, useState } from 'react'
import { Icons, Library } from "../../lib/library";
import AddSetlist from "../AddSetlist/AddSetlist";
import { Setlist } from "../../models";
import { SetlistAPI } from "../../api/SetlistAPI";
const { AddIcon } = Icons;
const { Dialog, Fab } = Library;

const AdminSetlist = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [setlists, setSetlists] = useState<Setlist[]|null>(null);

  useEffect(() => {
    async function getAllSetlists() {
      const allSetlists = await SetlistAPI.listSetlists();
      allSetlists && setSetlists(allSetlists);
    }

    getAllSetlists();
  },[]);

  return (
    <div className="adminSetlistsMain">
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <AddSetlist />
      </Dialog>

      <div className='adminSetlistsHeader'>
        <h1>Highlights Setlists</h1>
        <Fab color="primary" onClick={() => setDialogOpen(true)} size="large"><AddIcon /></Fab>
      </div>

      <table className='allSetlistsTableContainer'>
          <thead>
          <tr>
              <th>Title</th>
              <th>Sets</th>
              <th>Sent</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone #</th>
          </tr>
          </thead>
          <tbody>
              {messages && messages.map((message, index) => {
              return (
                  <tr key={index} onClick={() => handleViewMessage(message)}>
                      <td>{message.title}</td>
                      <td>{getMessageDescription(message.description)}</td>
                      <td>{getMessageTimestamp(message.createdAt)}</td>
                      <td>{message.contactInfo.name || "-"}</td>
                      <td>{message.contactInfo.email || "-"}</td>
                      <td>{message.contactInfo.phoneNumber || "-"}</td>
                  </tr>
              )
          })}
          </tbody>
      </table>
    </div>
  )
}

export default AdminSetlist