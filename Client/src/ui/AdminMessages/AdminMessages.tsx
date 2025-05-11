import { MessageAPI } from "../../api/MessageAPI";
import { Message } from "../../models";
import "./AdminMessages.css";
import React, { useEffect, useState } from 'react'

const AdminMessages = () => {
    const [messages, setMessages] = useState<Message[]|null>(null);

    useEffect(() => {
        async function getAllMessages() {
            const allMessages = await MessageAPI.listMessages();
            allMessages && setMessages(allMessages);
        }

        getAllMessages();
    },[])

    return (
        <div>
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
                        <tr key={index}>
                           <td>{message.title}</td>
                           <td>{message.description}</td>
                           <td>{message.createdAt || "-"}</td>
                           <td>{message.contactInfo.name}</td>
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