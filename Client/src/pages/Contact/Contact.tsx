import "./Contact.css";
import { Library } from "../../lib/library";
import React, { useState } from "react";
import { ContactInfo } from "../../models";
const { Button, TextField } = Library;

type MessageInput = {
  contactInfo: ContactInfo
  description: string
  title: string
}
const Contact = () => {
  const [contactFormInfo, setContactFormInfo] = useState<ContactInfo>({name: "", email: "", phoneNumber: ""});
  const [messageInfo, setMessageInfo] = useState<MessageInput>({contactInfo: contactFormInfo, description: "", title: ""});
  const isFieldEmpty = Object.entries(contactFormInfo).some(([key, value]) => 
    (key === "name" && !value) || (key === "email" && contactFormInfo.phoneNumber) || 
    (key === "phoneNumber" && contactFormInfo.email) || !value
  );

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.currentTarget;
    if (name === "description" || name === "title")
      setMessageInfo(prevState => ({ ...prevState, [name]: value }));
    else 
      setContactFormInfo(prevState => ({ ...prevState, [name]: value }));
  }

  async function handleSubmit() {
    let newMessageResult;
    const { contactInfo, description, title } = messageInfo;
    if (!currentUser) return setAlertMessage && setAlertMessage({duration: 2500, message: "Unable to retrieve user", severity: "error"});
    const addedBy = currentUser.name;

    if (eventToEdit){
        newEventResult = await EventsAPI.updateEvent({...eventToEdit, addedBy, address, dateTime, title});
    } else {
        newEventResult = await EventsAPI.createEvent({ addedBy: currentUser.name, address, dateTime, title });
    }
    if (newEventResult && newEventResult.result === "SUCCESS"){
      const newDateTime = dayjs(newEventResult.eventOutput.dateTime).format("MM/DD/YYYY hh:mm A");
        setAlertMessage && setAlertMessage({
            duration: 2500, 
            message: `Successfully ${eventToEdit ? "updated": "added new"} event ${newEventResult.eventOutput.title} - ${newDateTime}`,
            open: true,
            severity: "success"
        });
    }
  }

  return (

    <div>
      <h1>Contact Us!</h1>

      <div className='contactUsFormContainer'>
        <h3>Complete the form:</h3>

        <TextField 
          label="Name"
          name="name"
          onChange={handleChange}
          required
          value={contactFormInfo.name}
        />

        <TextField 
          label="Email"
          name="email"
          onChange={handleChange}
          required={!contactFormInfo.phoneNumber}
          value={contactFormInfo.email}
        />

        <TextField 
          label="Phone #"
          name="phoneNumber"
          onChange={handleChange}
          required={!contactFormInfo.phoneNumber}
          value={contactFormInfo.phoneNumber}
        />

         <TextField 
          label="Subject"
          name="title"
          onChange={handleChange}
          required
          value={messageInfo.title}
        />

        <TextField 
          label="Message"
          name="description"
          onChange={handleChange}
          required
          value={messageInfo.description}
        />
        <Button 
          disabled={isFieldEmpty} 
          onClick={handleSubmit} 
          style={{cursor: isFieldEmpty ? "not-allowed" : "pointer", pointerEvents: "all"}}
          variant="contained"
        >submit</Button>
      </div>
    </div>
  )
}

export default Contact;