import React from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const localizer = BigCalendar.momentLocalizer(moment)

const events = [
  {
    id: 0,
    title: 'All Day Event very long title',
    allDay: true,
    start: new Date(2019, 4, 10),
    end: new Date(2019, 4, 11),
  },
]

const Makeup = () => (
  <div className="container">
    Makeup
    <div>
      <BigCalendar
        localizer={localizer}
        events={events}
        defaultDate={new Date(2019, 4, 1)}
        startAccessor="startDate"
        endAccessor="endDate"
      />
    </div>
  </div>
)

export default Makeup
