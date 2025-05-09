import "./CalendarEvents.css";
import React, { useEffect, useState } from 'react'
import { Library, PickersDayProps } from '../../lib/library';
import { Event } from '../../models';
import { EventsAPI } from '../../api/EventsAPI';
const { AdapterDayjs, Badge, DateCalendar, dayjs, LocalizationProvider, PickersDay } = Library;

const EventDay = (props: PickersDayProps & { highlightedDays?: number[] }) => {
    console.log(props.day.date())
    const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;
    const isSelected = !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) >= 0;
    return (
        <Badge
            badgeContent={isSelected ? "" : undefined}
            color='error'
            key={props.day.toString()}
            overlap="circular"
            variant={isSelected ? "dot" : "standard"}
        >
            <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
        </Badge>
    )
}

const CalendarEvents = () => {
    const [calendarDate, setCalendarDate] = useState(dayjs(new Date()));
    const [currentMonth, setCurrentMonth] = useState<Number>(calendarDate.month());
    const [currentYear, setCurrentYear] = useState<Number>(calendarDate.year());
    const [events, setEvents] = useState<Event[]|null>(null);
    const [highlightedDays, setHighlightedDays] = useState([1, 2, 15]);
    
    useEffect(() => {
        async function getAllEvents() {
            const allEvents = await EventsAPI.listEvents();
            allEvents && setEvents(allEvents);
        }
        getAllEvents();
    },[])
    
    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar 
                    onChange={(newValue) => setCalendarDate(dayjs(newValue))} 
                    onMonthChange={(date) => setCurrentMonth(date.month())}
                    onYearChange={(date) => setCurrentYear(date.year)}
                    value={calendarDate} 
                    slots={{ day: EventDay }}
                    slotProps={{ day: { highlightedDays } as any }}
                    sx={{bgcolor: "white", color: "black"}}
                />
            </LocalizationProvider>
            <div>
                <ul>
                    {events && events.map((event, index) => {
                        const dateTime = event.dateTime ? new Date(event.dateTime) : new Date();
                        return <li key={index}>{event.title} - {dateTime.toLocaleString()}</li>
                    })}
                </ul>
            </div>
        </div>
    )
}

export default CalendarEvents;