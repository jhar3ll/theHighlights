import "./ViewMessage.css";
import { Message } from "../../models";
import React from 'react';

const ViewMessage = ({ message }:{ message: Message|null }) => {
    if (!message) return null;
    return (
        <div className="viewMessageContainer">
            <h1>Message Info</h1>
            <div><strong>Subject:</strong> {message.title}</div>
            <div><strong>Message:</strong> <p>{message.description}</p></div>
            <div><strong>Email:</strong> {message.contactInfo.email}</div>
            <div><strong>Name:</strong> {message.contactInfo.name}</div>
            <div><strong>Phone #:</strong> {message.contactInfo.phoneNumber}</div>
        </div>
    )
}

export default ViewMessage
