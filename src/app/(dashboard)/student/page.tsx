

// import EventCalendar from "@/components/EventCalendar";
// import Announcements from "@/components/Announcements";
// import BigCalender from "@/components/BigCalender";

// const studentPage = () => {
//   return (
//     <div className="p-4 gap-4 flex flex-col md:flex-row">
//       <div className="w-full lg:w-2/3 ">
//       <div className="h-full bg-white rounded-md p-4">
//         <h1 className="text-xl font-semibold">SCHEDULE(#)</h1>
//         <BigCalender />
//         </div>
//         </div>
//       <div className="w-full lg:w-1/3 flex flex-col gap-8">
//       <EventCalendar />
     
//         <Announcements />
//         </div>
//     </div>
//   );
// }
// export default studentPage;

import Announcements from "@/components/Announcements";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import BigCalendar from "@/components/BigCalender";
import EventCalendar from "@/components/EventCalendar";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

const StudentPage = async () => {
  const { userId } = await auth();

  const classItem = await prisma.class.findMany({
    where: {
      students: { some: { id: userId! } },
    },
  });

  console.log(classItem);
  return (
    <div className="p-4 flex gap-4 flex-col xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        <div className="h-full bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">Schedule (4A)</h1>
          <BigCalendarContainer type="classId" id={classItem[0].id} />
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <EventCalendar />
        <Announcements />
      </div>
    </div>
  );
};

export default StudentPage;