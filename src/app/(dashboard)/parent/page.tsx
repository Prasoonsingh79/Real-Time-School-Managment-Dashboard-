
// import Announcements from "@/components/Announcements";
// import BigCalendarContainer from "@/components/BigCalendarContainer";
// import prisma from "@/lib/prisma";
// import { auth } from "@clerk/nextjs/server";


// const ParentPage = async () => {
//   const { userId } = await auth();
//   const currentUserId = userId;
  
//   const students = await prisma.student.findMany({
//     where: {
//       parentId: currentUserId!,
//     },
//   });

//   return (
//     <div className="flex-1 p-4 flex gap-4 flex-col xl:flex-row">
//       {/* LEFT */}
//       <div className="">
//         {students.map((student) => (
//           <div className="w-full xl:w-2/3" key={student.id}>
//             <div className="h-full bg-white p-4 rounded-md">
//               <h1 className="text-xl font-semibold">
//                 Schedule ({student.name + " " + student.surname})
//               </h1>
//               <BigCalendarContainer type="classId" id={student.classId} />
//             </div>
//           </div>
//         ))}
//       </div>
//       {/* RIGHT */}
//       <div className="w-full xl:w-1/3 flex flex-col gap-8">
//         <Announcements />
//       </div>
//     </div>
//   );
// };

// export default ParentPage;

import Announcements from "@/components/Announcements";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

const ParentPage = async () => {
  const { userId } = await auth();
  const currentUserId = userId;

  const students = await prisma.student.findMany({
    where: {
      parentId: currentUserId!,
    },
  });

  return (
    <div className="flex-1 p-4 flex flex-col xl:flex-row gap-6">
      {/* LEFT - Student Schedules */}
      <div className="w-full xl:w-2/3 flex flex-col gap-6">
        {students.map((student) => (
          <div
            key={student.id}
            className="bg-white p-4 rounded-md shadow-md"
          >
            <h2 className="text-lg font-semibold mb-2">
              Schedule ({student.name} {student.surname})
            </h2>
            <BigCalendarContainer type="classId" id={student.classId} />
          </div>
        ))}
      </div>

      {/* RIGHT - Announcements */}
      <div className="w-full xl:w-1/3 flex flex-col gap-6">
        <Announcements />
      </div>
    </div>
  );
};

export default ParentPage;
