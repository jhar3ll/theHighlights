import "./CalendarEvents.css";
import React, { SetStateAction, useEffect, useState } from 'react'
import { Library, PickersDayProps, PickerValidDate } from '../../lib/library';
import { Event } from '../../models';
import { EventsAPI } from '../../api/EventsAPI';
const { AdapterDayjs, DateCalendar, dayjs, LocalizationProvider, PickersDay } = Library;

type CalendarEventsType = {
    fromPublicPage?: boolean
    onClick: (event: Event) => void;
    setCurrentDate?: React.Dispatch<SetStateAction<string>>
}

const CalendarEvents = ({ fromPublicPage, onClick, setCurrentDate }: CalendarEventsType) => {
    const [calendarDate, setCalendarDate] = useState(dayjs(new Date()));
    const [currentMonth, setCurrentMonth] = useState<Number>(calendarDate.month());
    const [currentYear, setCurrentYear] = useState<Number>(calendarDate.year());
    const [events, setEvents] = useState<Event[]|null>(null);
    const [highlightedDays, setHighlightedDays] = useState<Number[]>([]);
    
    useEffect(() => {
        async function getAllEvents() {
            const allEvents = await EventsAPI.listEvents();
            allEvents && setEvents(allEvents);
            if (setCurrentDate) setCurrentDate(calendarDate.format("MMM D YYYY"))
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
    
    const EventDay = (props: PickersDayProps & { highlightedDays?: number[] }) => {
        const dateFormat = "MM/DD/YYYY";
        const today = dayjs().format(dateFormat);
        const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;
        const isSelected = !outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) >= 0;
        const dayFormatted = day.format(dateFormat);
        return (
            <div className="eventDayContainer">
                <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} style={{pointerEvents: fromPublicPage ? "none" : "all"}}/>
                {isSelected && 
                    <div 
                        className="eventDayActiveDot" 
                        style={{marginTop: (dayFormatted === today || calendarDate?.format(dateFormat) === dayFormatted) ? "5px" : "-5px" }}
                    />
                }
            </div>
        )
    }

    return (
        <div className="calendarEventsMain">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar 
                    readOnly={fromPublicPage}
                    onChange={(newValue) => !fromPublicPage && setCalendarDate(dayjs(newValue))} 
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
                            <td>{event.address || "-"}</td>
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