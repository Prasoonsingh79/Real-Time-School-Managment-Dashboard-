
// "use client";

// import { useEffect, useState } from "react";
// import Calendar from "react-calendar";
// import 'react-calendar/dist/Calendar.css';
// import Image from "next/image";

// // Define types
// type ValuePiece = Date | null;
// type Value = ValuePiece | [ValuePiece, ValuePiece];

// // Sample events
// const events = [
//   {
//     id: 1,
//     title: "Event 1",
//     time: "12:00 PM",
//     description:
//       "Lorem Description for Event 1 -> It provides role-based access (Admin, Teacher, Student, and Parent) to manage and monitor essential functions in real-time.",
//   },
//   {
//     id: 2,
//     title: "Event 2",
//     time: "2:00 PM",
//     description: "Description for Event 2",
//   },
// ];

// const EventCalendar = () => {
//   const [value, setValue] = useState<Value>(new Date());
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     // Avoid hydration error
//     setMounted(true);
//   }, []);

//   if (!mounted) return null;

//   return (
//     <div className="bg-gray-300 rounded-md p-4">
//       <Calendar
//         onChange={(val) => setValue(val)}
//         value={value}
//       />
//       <div className="flex items-center justify-between">
//         <h1 className="text-xl font-semibold my-4">Events</h1>
//         <Image src="/moreDark.png" width={20} height={20} alt="More" />
//       </div>

//       <div className="flex flex-col gap-4">
//         {events.map((event) => (
//           <div
//             key={event.id}
//             className="bg-gray-400 p-5 rounded-md border-t-4 odd:border-t-blue-500 even:border-t-green-500"
//           >
//             <div className="flex items-center justify-between">
//               <h1 className="font-semibold text-gray-400">{event.title}</h1>
//               <span className="text-gray-300 text-xs">{event.time}</span>
//             </div>
//             <p className="text-white mt-2">{event.description}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default EventCalendar;

"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const EventCalendar = () => {
  const [value, onChange] = useState<Value>(new Date());

  const router = useRouter();

  useEffect(() => {
    if (value instanceof Date) {
      router.push(`?date=${value}`);
    }
  }, [value, router]);

  return <Calendar onChange={onChange} value={value} />;
};

export default EventCalendar;