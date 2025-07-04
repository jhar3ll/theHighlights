import { Library } from "../lib/library";
/**
     * Returns x raised to the n-th power.
     *
     * @param {string} day date in string format 12/12/1999 or 1999-12-12
     * @param {string} time time in string format with 2 digits for the hour and 2 for the minutes separated by a colon like 12:00
     * @return {Date} formatted date from params in ISO format
     */
export function convertDateTime(day: string, time: string): Date{
    const [hours, minutes] = time.split(':').map(Number);
    const date = new Date(day);
    date.setHours(hours);
    date.setMinutes(minutes);
    return date;
}

export function convertAmPmToIso(date: string, hour: string, minutes: string, type: "AM"|"PM"){
    const hourNum = Number(hour);
    const realHour = type === "PM" && hourNum < 12 ? 12 + hourNum : hourNum;
    return Library.dayjs(date).set("hour", realHour).set("minutes", Number(minutes)).toISOString();
}