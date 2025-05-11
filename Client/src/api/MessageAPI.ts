import { MessageInput } from "../data/types";
import { AWS_Services } from "../lib/library";
import { Message } from "../models";
const { DataStore, Predicates, SortDirection } = AWS_Services;

//create new Message
async function createMessage(messageInfo: MessageInput):Promise<{result: "SUCCESS"|"FAIL", messageOutput: Message}|undefined> {
    const { contactInfo, description, title } = messageInfo;
    try {
        const messageOutput = await DataStore.save(new Message({contactInfo, description, title}));
        console.log("create new message SUCCESS: ", messageOutput);
        return { result: "SUCCESS", messageOutput };
    } catch (error) {
        console.log("create new message ERROR: ", error);
    }
}

//get all Messages
async function listMessages() {
    try {
        const allMessages = await DataStore.query(Message, Predicates.ALL, {
            sort: message => message.createdAt(SortDirection.DESCENDING)
        });
        return allMessages
    } catch (error) {
        console.log("listMessages() ERROR: ", error);
    }
}

export const MessageAPI = {
    createMessage,
    listMessages
}