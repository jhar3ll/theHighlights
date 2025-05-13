import { ContactInfo, Event, LazySong, Setlist } from "../models";
import { AlertMessageProps } from "../ui/AlertMessage/AlertMessage";

export type AdminContextType = {
    currentUser: User
    setAlertMessage: React.Dispatch<React.SetStateAction<AlertMessageProps>>
}

export type ServiceContextType = {
    currentUser: User|null
    setCurrentUser: React.Dispatch<React.SetStateAction<User|null>>
}

export type newSetlistType = {
    addedBy: string
    eventID: string
    setNumber: number
    songs: LazySong[]
    title: string
}

export type MessageInput = {
  contactInfo: ContactInfo
  description: string
  title: string
}

export type SetlistWithEvent = Setlist & {
    event: Event
    songs: Song[]
}

export type Song = {
    artist: string;
    id: number;
    title: string;
}

export type tipInfoType = {
    amount: number|string;
    email: string;
    message: string;
    name: string;
}

export type User = {
    email: string;
    name: string;
    userId: string;
}