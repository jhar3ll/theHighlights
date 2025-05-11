import "./Contact.css";
import { Library } from "../../lib/library";
import React, { useState } from "react";
import { ContactInfo } from "../../models";
import { MessageInput } from "../../data/types";
import { MessageAPI } from "../../api/MessageAPI";
import AlertMessage, { AlertMessageProps } from "../../ui/AlertMessage/AlertMessage";
const { Button, TextField } = Library;


const Contact = () => {
  const [alertMessage, setAlertMessage] = useState<AlertMessageProps>({duration: 2500, message: "", open: false, severity: "success"});
  const [contactFormInfo, setContactFormInfo] = useState<ContactInfo>({name: "", email: "", phoneNumber: ""});
  const [messageInfo, setMessageInfo] = useState<MessageInput>({contactInfo: contactFormInfo, description: "", title: ""});
  const [sendComplete, setSendComplete] = useState(false);
  const isFieldEmpty = Object.values(contactFormInfo).concat([messageInfo.description, messageInfo.title]).some(value => !value);
  
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.currentTarget;
    if (name === "description" || name === "title")
      setMessageInfo(prevState => ({ ...prevState, [name]: value }));
    else 
      setContactFormInfo(prevState => ({ ...prevState, [name]: value }));
  }

  async function handleSubmit() {
    const { description, title } = messageInfo;
    const newMessageResult = await MessageAPI.createMessage({contactInfo: contactFormInfo, description, title});

    if (newMessageResult && newMessageResult.result === "SUCCESS"){
      setSendComplete(true);
    }
  }

  return (
    <div className="contactUsMain">
      <AlertMessage {...alertMessage} setShowAlert={setAlertMessage} />
      <h1>Contact Us!</h1>

      {sendComplete ?
        <div className="sendCompleteContainer">
          <h3>Thank you!</h3>
          <span>Your message has been successfully sent.</span>
          <span>We will be in touch with you as soon as possible. </span>
          <span>Have a great day!</span>
        </div>
        :
        <div className='contactUsFormContainer'>
          <h3>Complete the form:</h3>

          <TextField 
            className="contactUsName"
            label="Name"
            name="name"
            onChange={handleChange}
            required
            value={contactFormInfo.name}
          />

          <TextField 
            className="contactUsEmail"
            label="Email"
            name="email"
            onChange={handleChange}
            required
            value={contactFormInfo.email}
          />

          <TextField 
            className="contactUsPhone"
            label="Phone #"
            name="phoneNumber"
            onChange={handleChange}
            required
            value={contactFormInfo.phoneNumber}
          />

          <TextField 
            className="contactUsTitle"
            label="Subject"
            name="title"
            onChange={handleChange}
            required
            value={messageInfo.title}
          />

          <TextField 
            className="contactUsDescription"
            label="Message"
            multiline
            name="description"
            onChange={handleChange}
            required
            rows={3}
            value={messageInfo.description}
          />
          <Button 
            disabled={isFieldEmpty} 
            color="primary"
            onClick={handleSubmit} 
            style={{cursor: isFieldEmpty ? "not-allowed" : "pointer", pointerEvents: "all"}}
            variant="contained"
          >submit</Button>
        </div>
      }
    </div>
  )
}

export default Contact;