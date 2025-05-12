import "./Admin.css";
import '@aws-amplify/ui-react/styles.css';
import { CSSProperties, useState } from 'react'
import { User } from "../../data/types";
import { AWS_Services, Icons, Library } from "../../lib/library";
import AdminTips from "../../ui/AdminTips/AdminTips";
import AdminSongs from "../../ui/AdminSongs/AdminSongs";
import AdminEvents from "../../ui/AdminEvents/AdminEvents";
import AlertMessage, { AlertMessageProps } from "../../ui/AlertMessage/AlertMessage";
import { AdminContext } from "../../contexts/contexts";
import AdminMessages from "../../ui/AdminMessages/AdminMessages";
import AdminSetlists from "../../ui/AdminSetlists/AdminSetlists";
const { Authenticator } = AWS_Services;
const { EventIcon, LibraryMusicIcon, MessageIcon, MonetizationOnIcon, QueueMusicIcon } = Icons;
const { IconButton } = Library;

const Admin = ({ currentUser }: { currentUser: User|null }) => {
  const [alertMessage, setAlertMessage] = useState<AlertMessageProps>({duration: 2500, message: "", open: false, severity: "success"});
  const [currentPage, setCurrentPage] = useState(0);
  
  function getCurrentPage(index: number):CSSProperties{
    return {color: index === currentPage ? "blue" : ""};
  }
  
  const CurrentComponent = () => {
    const componentsMap:{[key:number]:React.JSX.Element} = {
      0: <AdminTips />,
      1: <AdminSongs />,
      2: <AdminEvents />,
      3: <AdminMessages />,
      4: <AdminSetlists />
    };
    return componentsMap[currentPage];
  }

  if (!currentUser) return <Authenticator />;
  return (
    <div className="adminMain">
      <div className="adminNavigationPanelContainer">
        <IconButton onClick={() => setCurrentPage(0)} style={getCurrentPage(0)}> 
          <MonetizationOnIcon /> 
          <span>Tips</span>
        </IconButton> 
        <IconButton onClick={() => setCurrentPage(1)} style={getCurrentPage(1)}> 
          <LibraryMusicIcon /> 
          <span>Songs</span>
        </IconButton>
        <IconButton onClick={() => setCurrentPage(2)} style={getCurrentPage(2)}> 
          <EventIcon /> 
          <span>Events</span>
        </IconButton> 
        <IconButton onClick={() => setCurrentPage(3)} style={getCurrentPage(3)}> 
          <MessageIcon /> 
          <span>Messages</span>
        </IconButton> 
        <IconButton onClick={() => setCurrentPage(4)} style={getCurrentPage(4)}> 
          <QueueMusicIcon /> 
          <span>Setlists</span>
        </IconButton> 
      </div>

      <AdminContext.Provider value={{ currentUser, setAlertMessage}}>
        <CurrentComponent />
      </AdminContext.Provider>

      <AlertMessage {...alertMessage} setShowAlert={setAlertMessage} />
    </div>
  )
}

export default Admin;