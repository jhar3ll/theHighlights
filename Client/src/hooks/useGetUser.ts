import { useEffect, useState} from 'react';
import { AWS_Services } from '../lib/library';
import { User } from '../data/types';
const { DataStore, fetchAuthSession, fetchUserAttributes, Hub } = AWS_Services;

type useGetUserProps = {
  setAuthOpen: (value: boolean) => void;
  setLoading: (value: boolean) => void;
};

const useGetUser = ({ setAuthOpen, setLoading }: useGetUserProps): [User|null, React.Dispatch<React.SetStateAction<User|null>>] => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
      //check if user is authorized on component mount
      async function checkUser(){
        setLoading(true);
        if (!currentUser)
          try {
            console.log('checking user...');
            await DataStore.start();
            const authorizedUser = await fetchUserAttributes();
            const { email, name, sub } = authorizedUser;
            if (!authorizedUser || !email || !name || !sub) return;
            
            const user: User = {userId: sub, email, name}; 
            const session = await fetchAuthSession();
            console.log(session);
            if (!(session.tokens?.accessToken.payload["cognito:groups"] as string[]).includes("highlights_admin_user_group")){ 
              return alert("Unauthorized!" + "You are not authorized to use this page. Please contact your administrator if you feel this is a mistake.");
            };
            setCurrentUser({ ...user });
          } catch (error) {
            const unAuthMessage = "UserUnAuthenticatedException: User needs to be authenticated to call this API.";
            if (String(error) !== unAuthMessage) console.log("Check user error: ", error);
          }
        
        setLoading(false);
      }
  
      //setup AWS Auth listener to listen for auth events(sign in/sign out, etc.)
      const authHub = Hub.listen("auth", async (data) => {
        if (data.payload.event === "signedIn"){
          console.log("user is signing in!");
          setAuthOpen(false);
        } else if (data.payload.event === "signedOut"){
          console.log("user is signing out!");
          await handleDataStore();
          setCurrentUser(null);
        }
        checkUser();
        setLoading(true);
      });
  
      checkUser();
      //unsubscribe from AWS Auth Listener on unmount
      return authHub;
  }, [currentUser, setCurrentUser, setLoading, setAuthOpen]);
    
  async function handleDataStore(){
    await DataStore.clear();
    let ready = false;
    while (!ready){
      try {
        await DataStore.start();
        ready = true;
      } catch (error) {
        console.log('not ready');
      }
    };
  }

  return [currentUser, setCurrentUser];
}

export default useGetUser;