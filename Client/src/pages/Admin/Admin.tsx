import "./Admin.css";
import React, { useState } from 'react'
import '@aws-amplify/ui-react/styles.css';
import { User } from "../../data/types";
import { AWS_Services } from "../../lib/library";
const { Authenticator, signOut } = AWS_Services;

const Admin = ({ currentUser }: { currentUser: User|null }) => {
    if (!currentUser) return <Authenticator hideSignUp />
    
  return (
    <div>
        <h2>Welcome to the admin page!</h2>
    </div>
  )
}

export default Admin;