// "use client";

// import { Calendar, momentLocalizer } from 'react-big-calendar'
// import moment from 'moment'
// import { calendarEvents } from '@/lib/data';
// import 'react-big-calendar/lib/css/react-big-calendar.css';

// const localizer = momentLocalizer(moment)
// const BigCalender=()=>{
//     const [View, setView] = useState<Views>("Views.work_week");
// const BigCalender = () => (
//   <div>
//     <Calendar
//       localizer={localizer}
//       events={calendarEvents}
//       startAccessor="start"
//       endAccessor="end"
//       style={{ height: 500 }}
//       views={["work_week", "day", ]}
//       view='work_week'
//     />
//   </div>
// );
// // };
// export default BigCalender;
// "use client";

// import { useState } from "react";
// import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
// import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import { calendarEvents } from "@/lib/data";

// const localizer = momentLocalizer(moment);

// const BigCalendar = () => {
//   const [view, setView] = useState<View>(Views.WORK_WEEK);

//   const handleOnChangeView = (SelectedView: View) => {

//  setView(SelectedView);
//   };

//   return (

//       <Calendar
//         localizer={localizer}
//         events={calendarEvents}
//         startAccessor="start"
//         endAccessor="end"
//         style={{ height: 500 }}
//         views={["work_week", "day"]}
//         view={view}
//         onView={handleOnChangeView}
//         min={new Date(2025, 0, 1, 8, 0)} 
//   max={new Date(2025, 0, 1, 18, 0)}
//       />

//   );
// };

// "use client";

// import { useState } from "react";
// import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
// import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import { calendarEvents } from "@/lib/data";

// const localizer = momentLocalizer(moment);

// const BigCalendar = () => {
//   const [view, setView] = useState<View>(Views.WORK_WEEK);

//   const handleOnChangeView = (selectedView: View) => {
//     setView(selectedView);
//   };

//   return (
//     <div className="bg-white p-4 rounded shadow-md">
//       <Calendar
//         localizer={localizer}
//         events={calendarEvents}
//         startAccessor="start"
//         endAccessor="end"
//         style={{ height: 600 }}
//         views={["work_week", "day"]}
//         view={view}
//         onView={handleOnChangeView}
//         min={new Date(2025, 7, 13, 7, 0)}   // Show from 7:00 AM
//         max={new Date(2025, 7, 13, 18, 0)}  // Show until 6:00 PM
//         components={{
//           event: ({ event }) => <span className="text-sm">{event.title}</span>,
//         }}
//       />
//     </div>
//   );
// };

// export default BigCalendar;
// "use client";

// import { useState } from "react";
// import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
// import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import { calendarEvents } from "@/lib/data";

// const localizer = momentLocalizer(moment);

// const BigCalendar = () => {
//   const [view, setView] = useState<View>(Views.WORK_WEEK);

//   return (
//     <div className="p-4 bg-white rounded shadow-md">
//       <Calendar
//         localizer={localizer}
//         events={calendarEvents}
//         startAccessor="start"
//         endAccessor="end"
//         style={{ height: 600 }}
//         view={view}
//         views={["work_week", "day"]}
//         onView={(v) => setView(v)}
//         min={new Date(2025, 7, 12, 7, 0)}
//         max={new Date(2025, 7, 12, 18, 0)}
//         defaultDate={new Date(2025, 7, 12)}
//         components={{
//           event: ({ event }) => (
//             <span className="text-xs font-medium text-white">{event.title}</span>
//           ),
//         }}
//         eventPropGetter={() => ({
//           style: {
//             backgroundColor: "#3B82F6",
//             color: "white",
//             borderRadius: "6px",
//             paddingLeft: "8px",
//           },
//         })}
//       />
//     </div>
//   );
// };

// export default BigCalendar;
"use client";

import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";

const localizer = momentLocalizer(moment);

const BigCalendar = ({
  data,
}: {
  data: { title: string; start: Date; end: Date }[];
}) => {
  const [view, setView] = useState<View>(Views.WORK_WEEK);

  const handleOnChangeView = (selectedView: View) => {
    setView(selectedView);
  };

  return (
    <Calendar
      localizer={localizer}
      events={data}
      startAccessor="start"
      endAccessor="end"
      views={["work_week", "day"]}
      view={view}
      style={{ height: "98%" }}
      onView={handleOnChangeView}
      min={new Date(2025, 1, 0, 8, 0, 0)}
      max={new Date(2025, 1, 0, 17, 0, 0)}
    />
  );
};

export default BigCalendar;