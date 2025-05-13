import awsmobile from "../aws-exports";
import { AWS_Services } from "../lib/library";
import { LazySong, Song, UserSongs } from "../models";
const { DataStore } = AWS_Services;
const { aws_user_pools_id } = awsmobile;

//create new userSongsModel
async function createUserSongsModel() {
    try {
        const userSongsModel = await DataStore.save(new UserSongs({ userPoolId: aws_user_pools_id, songs: [] }));
        console.log("createUserSongsModel() SUCCESS: ", userSongsModel);
        return userSongsModel;
    } catch (error) {
        console.log("createUserSongsModel() ERROR: ", error);
        throw new Error("Unable to create userSongs Model");
    }
}

//update user songs model
async function updateUserSongs(updatedSongs :Song[]):Promise<{result: "SUCCESS"|"FAIL", userSongsOutput?: UserSongs}|undefined> {
    try {
        let userSongsModel = await getUserSongsModel();
        if (!userSongsModel) throw new Error("No user songs model found");
        const userSongsOutput = await DataStore.save(UserSongs.copyOf(userSongsModel, updated => {
            updated.songs = updatedSongs
        }));
        console.log("updateUserSongs() SUCCESS: ", userSongsOutput)
        return { result: "SUCCESS", userSongsOutput };
    } catch (error) {
        console.log("updateUserSongs() error: ", error);
        return { result: "FAIL" };
    }   
}

//get user songs model
async function getUserSongsModel() {
    try {
        const userSongs = await DataStore.query(UserSongs, u => u.userPoolId.eq(aws_user_pools_id));
        if (userSongs.length) return userSongs[0];
    } catch (error) {
        console.log("getUserSongsModel() ERROR: ", error);
    }
}

//get user songs
async function getUserSongsList() {
    try {
        const userSongModel = await getUserSongsModel();
        if (userSongModel) return userSongModel.songs;
        else {
            await createUserSongsModel();
            return [] as LazySong[];
        }
    } catch (error) {
        console.log("getUserSongsList() ERROR: ", error);
    }
}
export const SongsAPI = {
    createUserSongsModel,
    getUserSongsList,
    updateUserSongs
};