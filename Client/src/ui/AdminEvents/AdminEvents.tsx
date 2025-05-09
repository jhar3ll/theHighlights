import React, { useState } from 'react'
import { Library } from '../../lib/library';
const { AdapterDayjs, DateCalendar, dayjs, LocalizationProvider} = Library;

const AdminEvents = () => {
  const [calendarDate, setCalendarDate] = useState(dayjs(new Date()));
const [highlightedDays, setHighlightedDays] = React.useState([1, 2, 15]);
  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar 
          onChange={(newValue) => setCalendarDate(dayjs(newValue))} 
          value={calendarDate} 
          slots={{
            day: { ComponentHere}
          }}
          slotProps={{
            day: { componentPropsHere } 
          }}
          sx={{bgcolor: "white", color: "black"}}
        />
      </LocalizationProvider>
    </div>
  )
}

export default AdminEvents;