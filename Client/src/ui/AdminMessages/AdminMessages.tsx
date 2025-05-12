import "./AdminMessages.css";
import React, { useEffect, useRef, useState } from 'react'
import { Message } from "../../models";
import { MessageAPI } from "../../api/MessageAPI";
import { Library } from "../../lib/library";
import ViewMessage from "../ViewMessage/ViewMessage";
const { dayjs, Dialog } = Library;

const AdminMessages = () => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]|null>(null);
    const currentMessage = useRef<Message|null>(null);

    useEffect(() => {
        async function getAllMessages() {
            const allMessages = await MessageAPI.listMessages();
            allMessages && setMessages(allMessages);
        }

        getAllMessages();
    },[]);

    function getMessageDescription(message: string){
        if (message.length > 49) return message.slice(0,50) + "...";
        else return message;
    }

    function getMessageTimestamp(timestamp: string|null|undefined){
        if (!timestamp) return "-";
        else return dayjs(timestamp).format("MM/DD/YYYY hh:mm A");
    }

    function handleCloseDialog(){
        currentMessage.current = null;
        setDialogOpen(false);
    }

    function handleViewMessage(message: Message){
        currentMessage.current = message;
        setDialogOpen(true);
    }

    return (
        <div className="messagesMain">
            <Dialog open={dialogOpen} onClose={handleCloseDialog}>
                <ViewMessage message={currentMessage.current}/>
            </Dialog>
            <h1>Messages</h1>
            <table className='allMessagesTableContainer'>
                <thead>
                <tr>
                    <th>Subject</th>
                    <th>Message</th>
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

export default AdminMessages;