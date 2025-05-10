import "./CalendarEvents.css";
import React, { SetStateAction, useEffect, useState } from 'react'
import { Library, PickersDayProps, PickerValidDate } from '../../lib/library';
import { Event } from '../../models';
import { EventsAPI } from '../../api/EventsAPI';
const { AdapterDayjs, DateCalendar, dayjs, LocalizationProvider, PickersDay } = Library;

type CalendarEventsType = {
    onClick: (event: Event) => void;
    setCurrentDate: React.Dispatch<SetStateAction<string>>
}

const EventDay = (props: PickersDayProps & { highlightedDays?: number[] }) => {
    // console.log(props.day.date())
    const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;
    const isSelected = !outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) >= 0;
    return (
        <div className="eventDayContainer">
            <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
            {isSelected && <div />}
        </div>
    )
}

const CalendarEvents = ({ onClick, setCurrentDate }: CalendarEventsType) => {
    const [calendarDate, setCalendarDate] = useState(dayjs(new Date()));
    const [currentMonth, setCurrentMonth] = useState<Number>(calendarDate.month());
    const [currentYear, setCurrentYear] = useState<Number>(calendarDate.year());
    const [events, setEvents] = useState<Event[]|null>(null);
    const [highlightedDays, setHighlightedDays] = useState<Number[]>([]);
    
    useEffect(() => {
        async function getAllEvents() {
            const allEvents = await EventsAPI.listEvents();
            allEvents && setEvents(allEvents);
            setCurrentDate(calendarDate.format("MMM D YYYY"))
        }
        getAllEvents();
    },[calendarDate, setCurrentDate])

    useEffect(() => {
        function getMonthEvents(){
            if (!events) return [];
            let currentEventDays:Number[] = [];
            [...events].forEach(event => {
                const [eventMonth, eventDay, eventYear] = new Date(event.dateTime).toLocaleDateString().split("/");
                if ((Number(eventMonth) - 1 === currentMonth) && (Number(eventYear) === currentYear)) currentEventDays.push(Number(eventDay));
            });
            setHighlightedDays(currentEventDays)
        }

        getMonthEvents();
    },[currentMonth, currentYear, events])

    function handleCalendarChange(date: PickerValidDate){
        setCurrentMonth(date.month());
        setCurrentYear(date.year());
    }
    
    
    return (
        <div className="calendarEventsMain">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar 
                    onChange={(newValue) => setCalendarDate(dayjs(newValue))} 
                    onMonthChange={handleCalendarChange}
                    onYearChange={handleCalendarChange}
                    value={calendarDate} 
                    slots={{ day: EventDay }}
                    slotProps={{ day: { highlightedDays } as any }}
                    sx={{bgcolor: "white", color: "black"}}
                />
            </LocalizationProvider>
            
            <table className='calendarEventsTableContainer'>
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Date & Time</th>
                    <th>Address</th>
                    <th>Added By</th>
                </tr>
                </thead>
                <tbody>
                    {events && events.map((event, index) => {
                    const dateTime = event.dateTime ? dayjs(event.dateTime) : dayjs(new Date());
                    return (
                        <tr key={index} onClick={() => onClick(event)}>
                            <td>{event.title}</td>
                            <td>{dateTime.format("MMM D YYYY | h:mm A")}</td>
                            <td>{event.addedBy}</td>
                            <td>{event.addedBy}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    )
}

export default CalendarEvents;