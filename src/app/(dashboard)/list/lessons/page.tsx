// import Image from "next/image";
// import Link from "next/link";
// import { lessonsData, parentsData, studentsData, subjectsData, teachersData } from "@/lib/data";
// import Table from "@/components/Table";
// import TableSearch from "@/components/TableSearch";
// import Pagination from "@/components/Pagination";
// import { role } from "@/lib/data";
// import { headers } from "next/headers";
// import { itemAxisPredicate } from "recharts/types/state/selectors/axisSelectors";
// import FormModal from "@/components/FormModal";
// import prisma from "@/lib/prisma";
// import { ITEM_PER_PAGE } from "@/lib/settings";
// import { Class, Lesson, Prisma, Subject, Teacher } from "@prisma/client";


// // type Lesson = {
// //   id: number;
// //   subject: string;
// //   class : string;
// // teacher: string;
  
  
// // };

// type LessonList = Lesson & { subject: Subject } & { class: Class } & {
//   teacher: Teacher;
// };


// const columns = [
//  {
//     headers: "Subject Name",
//     accessor: "name",

//   },
//   {
//     headers: "Class",
//     accessor: "class",
    
//   },{
//    headers: "Teacher",
//     accessor: "teacher",
//     className: "hidden md:table-cell",
//   },
  
//   {
//     headers:"Actions",
//     accessor: "actions",
//   }
// ]
// const renderRows = (item: LessonList) => (
  
//     <tr key={item.id} className="border-b border-gray-200 even:bg-gray-50 text-sm hover:bg-yellow-100">
//         <td className="flex items-center gap-4 p-4">{item.subject.name}</td>
//     <td>{item.class.name}</td>
//     <td className="hidden md:table-cell">
//       {item.teacher.name + " " + item.teacher.surname}
//     </td>
   
//       <td>
//         <div className="flex items-center gap-2">
          
//                         {role === "admin" && (
//                             <>
//                             <FormModal table="lesson" type="delete" id={item.id} />
//                             <FormModal table="lesson" type="update" id={item.id} />
//                             </>
//                           )}
//         </div>
//       </td>
//     </tr>
//   );



// const LessonsListPage =  async ({
//   searchParams,
// }: {
//   searchParams: { [key: string]: string | undefined };
// }) => {
//    const { page, ...queryParams } = searchParams;

//   const p = page ? parseInt(page) : 1;

//   // URL PARAMS CONDITION

//   const query: Prisma.LessonWhereInput = {};

//   if (queryParams) {
//     for (const [key, value] of Object.entries(queryParams)) {
//       if (value !== undefined) {
//         switch (key) {
//           case "classId":
//             query.classId = parseInt(value);
//             break;
//           case "teacherId":
//             query.teacherId = value;
//             break;
//           case "search":
//             query.OR = [
//               { subject: { name: { contains: value, mode: "insensitive" } } },
//               { teacher: { name: { contains: value, mode: "insensitive" } } },
//             ];
//             break;
//           default:
//             break;
//         }
//       }
//     }
//   }

//   const [data, count] = await prisma.$transaction([
//     prisma.lesson.findMany({
//       where: query,
//       include: {
//         subject: { select: { name: true } },
//         class: { select: { name: true } },
//         teacher: { select: { name: true, surname: true } },
//       },
//       take: ITEM_PER_PAGE,
//       skip: ITEM_PER_PAGE * (p - 1),
//     }),
//     prisma.lesson.count({ where: query }),
//   ]);




//   return (
//     <div className="bg-white p-4 rounded-md flex-1 m-4 mt-6">
//       <div className="flex items-center justify-between">
//         <h1 className="hidden md:block text-lg font-semibold">All Lessons</h1>
//         <div className="flex flex-col md:flex-row gap-4 items-center  w-full md:w-auto">
//           <TableSearch />
//           <div className="flex items-center gap-3 self-end">
//             <button className="w-8 h-8 flex items-center justify-center bg-lamaYellow rounded-full">
//               <Image src="/filter.png" alt="" width={14} height={14} />
//             </button>
//              <button className="w-8 h-8 flex items-center justify-center bg-lamaYellow rounded-full">
//               <Image src="/sort.png" alt="" width={14} height={14} />
//             </button>
//              {role=== "admin" && (<FormModal table="lesson" type="create"/>)}
            
//           </div>
//         </div>
//       </div>
//       <Table columns={columns} renderRows={renderRows} data={data}/>
//       <Pagination page={p} count={count} />

//     </div>
//   );
// };

// export default LessonsListPage;

// import Image from "next/image";
// import Table from "@/components/Table";
// import TableSearch from "@/components/TableSearch";
// import Pagination from "@/components/Pagination";
// import FormModal from "@/components/FormModal";
// import prisma from "@/lib/prisma";
// import { ITEM_PER_PAGE } from "@/lib/settings";
// import { Class, Lesson, Prisma, Subject, Teacher } from "@prisma/client";
// import { getCurrentUserId } from "@/lib/utils"; // ✅ dynamic auth
// import FormContainer from "@/components/FormContainer";

// type LessonList = Lesson & {
//   subject: Subject;
//   class: Class;
//   teacher: Teacher;
// };

// const LessonsListPage = async ({
//   searchParams,
// }: {
//   searchParams: { [key: string]: string | undefined };
// }) => {
//   const { userId, role } = await getCurrentUserId(); // ✅ use dynamic user
//   const { page, ...queryParams } = searchParams;

//   const p = page ? parseInt(page) : 1;

//   const query: Prisma.LessonWhereInput = {};

//   if (queryParams) {
//     for (const [key, value] of Object.entries(queryParams)) {
//       if (value !== undefined) {
//         switch (key) {
//           case "classId":
//             query.classId = parseInt(value);
//             break;
//           case "teacherId":
//             query.teacherId = value;
//             break;
//           case "search":
//             query.OR = [
//               { subject: { name: { contains: value, mode: "insensitive" } } },
//               { teacher: { name: { contains: value, mode: "insensitive" } } },
//             ];
//             break;
//           default:
//             break;
//         }
//       }
//     }
//   }

//   // ✅ Role-based filtering
//   switch (role) {
//     case "teacher":
//       query.teacherId = userId!;
//       break;
//     case "student":
//       query.class = {
//         students: {
//           some: { id: userId! },
//         },
//       };
//       break;
//     case "parent":
//       query.class = {
//         students: {
//           some: {
//             parentId: userId!,
//           },
//         },
//       };
//       break;
//     case "admin":
//     default:
//       break; // admins see all
//   }

//   const [data, count] = await prisma.$transaction([
//     prisma.lesson.findMany({
//       where: query,
//       include: {
//         subject: { select: { name: true } },
//         class: { select: { name: true } },
//         teacher: { select: { name: true, surname: true } },
//       },
//       take: ITEM_PER_PAGE,
//       skip: ITEM_PER_PAGE * (p - 1),
//     }),
//     prisma.lesson.count({ where: query }),
//   ]);

//   // ✅ Dynamic columns
//   const columns = [
//     { headers: "Subject Name", accessor: "name" },
//     { headers: "Class", accessor: "class" },
//     {
//       headers: "Teacher",
//       accessor: "teacher",
//       className: "hidden md:table-cell",
//     },
//     ...(role === "admin" || role === "teacher"
//       ? [{ headers: "Actions", accessor: "actions" }]
//       : []),
//   ];

//   // ✅ Dynamic row rendering
//   const renderRows = (item: LessonList) => (
//     <tr
//       key={item.id}
//       className="border-b border-gray-200 even:bg-gray-50 text-sm hover:bg-yellow-100"
//     >
//       <td className="flex items-center gap-4 p-4">{item.subject.name}</td>
//       <td>{item.class.name}</td>
//       <td className="hidden md:table-cell">
//         {item.teacher.name + " " + item.teacher.surname}
//       </td>
//       {(role === "admin" || role === "teacher") && (
//         <td>
//           <div className="flex items-center gap-2">
//             <FormContainer table="lesson" type="delete" id={item.id} />
//             <FormContainer table="lesson" type="update" id={item.id} />
//           </div>
//         </td>
//       )}
//     </tr>
//   );

//   return (
//     <div className="bg-white p-4 rounded-md flex-1 m-4 mt-6">
//       <div className="flex items-center justify-between">
//         <h1 className="hidden md:block text-lg font-semibold">All Lessons</h1>
//         <div className="flex flex-col md:flex-row gap-4 items-center w-full md:w-auto">
//           <TableSearch />
//           <div className="flex items-center gap-3 self-end">
//             <button className="w-8 h-8 flex items-center justify-center bg-lamaYellow rounded-full">
//               <Image src="/filter.png" alt="" width={14} height={14} />
//             </button>
//             <button className="w-8 h-8 flex items-center justify-center bg-lamaYellow rounded-full">
//               <Image src="/sort.png" alt="" width={14} height={14} />
//             </button>
//             {(role === "admin" || role === "teacher") && (
//               <FormContainer table="lesson" type="create" />
//             )}
//           </div>
//         </div>
//       </div>

//       <Table columns={columns} renderRows={renderRows} data={data} />
//       <Pagination page={p} count={count} />
//     </div>
//   );
// };

// export default LessonsListPage;

import FormContainer from "@/components/FormContainer";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Class, Lesson, Prisma, Subject, Teacher } from "@prisma/client";
import Image from "next/image";
import { auth } from "@clerk/nextjs/server";
import { headers } from "next/headers";

type LessonList = Lesson & { subject: Subject } & { class: Class } & {
  teacher: Teacher;
};


const LessonListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {

const { sessionClaims } = await auth();
const role = (sessionClaims?.metadata as { role?: string })?.role;


const columns = [
  {
    headers: "Subject Name",
    accessor: "name",
  },
  {
    headers: "Class",
    accessor: "class",
  },
  {
    headers: "Teacher",
    accessor: "teacher",
    className: "hidden md:table-cell",
  },
  ...(role === "admin"
    ? [
        {
          headers: "Actions",
          accessor: "action",
        },
      ]
    : []),
];

const renderRow = (item: LessonList) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
  >
    <td className="flex items-center gap-4 p-4">{item.subject.name}</td>
    <td>{item.class.name}</td>
    <td className="hidden md:table-cell">
      {item.teacher.name + " " + item.teacher.surname}
    </td>
    <td>
      <div className="flex items-center gap-2">
        {role === "admin" && (
          <>
            <FormContainer table="lesson" type="update" data={item} />
            <FormContainer table="lesson" type="delete" id={item.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);

  const { page, ...queryParams } = searchParams;

  const p = page ? parseInt(page) : 1;

  // URL PARAMS CONDITION

  const query: Prisma.LessonWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "classId":
            query.classId = parseInt(value);
            break;
          case "teacherId":
            query.teacherId = value;
            break;
          case "search":
            query.OR = [
              { subject: { name: { contains: value, mode: "insensitive" } } },
              { teacher: { name: { contains: value, mode: "insensitive" } } },
            ];
            break;
          default:
            break;
        }
      }
    }
  }

  const [data, count] = await prisma.$transaction([
    prisma.lesson.findMany({
      where: query,
      include: {
        subject: { select: { name: true } },
        class: { select: { name: true } },
        teacher: { select: { name: true, surname: true } },
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.lesson.count({ where: query }),
  ]);

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Lessons</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && <FormContainer table="lesson" type="create" />}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRows={renderRow} data={data} />
      {/* PAGINATION */}
      <Pagination page={p} count={count} />
    </div>
  );
};

export default LessonListPage;