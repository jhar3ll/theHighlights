import { Song } from "../models";

export function getSongLabel(song: Song){
    return `${song.artist} - ${song.title}`;
}