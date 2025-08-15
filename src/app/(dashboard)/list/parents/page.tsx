

// import Image from "next/image";
// import Link from "next/link";
// import { Parent, Prisma, Student } from "@prisma/client";
// import prisma from "@/lib/prisma";
// import Table from "@/components/Table";
// import Pagination from "@/components/Pagination";
// import TableSearch from "@/components/TableSearch";
// import FormModal from "@/components/FormModal";
// import { role } from "@/lib/data";
// import { ITEM_PER_PAGE } from "@/lib/settings";

// type ParentList = Parent & { students: Student[] };

// const columns = [
//   { headers: "Info", accessor: "info" },
//   {
//     headers: "Student Names",
//     accessor: "students",
//     className: "hidden md:table-cell",
//   },
//   {
//     headers: "Phone",
//     accessor: "phone",
//     className: "hidden lg:table-cell",
//   },
//   {
//     headers: "Address",
//     accessor: "address",
//     className: "hidden lg:table-cell",
//   },
//   {
//     headers: "Actions",
//     accessor: "actions",
//   },
// ];

// const renderRows = (item: ParentList) => (
//   <tr
//     key={item.id}
//     className="border-b border-gray-200 even:bg-gray-50 text-sm hover:bg-yellow-100"
//   >
//     <td className="flex items-center gap-2 p-4">
//       <div className="flex flex-col">
//         <h3 className="font-semibold">{item.name}</h3>
//         <p className="text-xs text-gray-500">{item?.email}</p>
//       </div>
//     </td>
//     <td className="hidden md:table-cell">
//       {item.students.map((student) => student.name).join(", ")}
//     </td>
//     <td className="hidden md:table-cell">{item.phone}</td>
//     <td className="hidden md:table-cell">{item.address}</td>
//     <td>
//       <div className="flex items-center gap-2">
//         <Link href={`/dashboard/list/parents/${item.id}`}></Link>
//         {role === "admin" && (
//           <>
//             <FormModal table="parent" type="delete" id={item.id} />
//             <FormModal table="parent" type="update" id={item.id} />
//           </>
//         )}
//       </div>
//     </td>
//   </tr>
// );

// const ParentListPage = async ({
//   searchParams,
// }: {
//   searchParams: { [key: string]: string | undefined };
// }) => {
//  const page = searchParams?.page;
// const p = page && !isNaN(Number(page)) ? parseInt(page) : 1;
// const skip = (p - 1) * ITEM_PER_PAGE;


//   const queryParams = Object.entries(searchParams || {}).reduce((acc, [key, value]) => {
//     if (key !== "page") acc[key] = value;
//     return acc;
//   }, {} as { [key: string]: string | undefined });

//   const query: Prisma.ParentWhereInput = {};

//   for (const [key, value] of Object.entries(queryParams)) {
//     if (value !== undefined && key === "search") {
//       query.name = { contains: value, mode: "insensitive" };
//     }
//   }

//   const [data, count] = await prisma.$transaction([
//   prisma.parent.findMany({
//     where: query,
//     include: { students: true },
//     take: ITEM_PER_PAGE,
//     skip: skip, // ✅ Always defined
//   }),
//   prisma.parent.count({ where: query }),
// ]);


//   return (
//     <div className="bg-white p-4 rounded-md flex-1 m-4 mt-6">
//       <div className="flex items-center justify-between">
//         <h1 className="hidden md:block text-lg font-semibold">All Parents</h1>
//         <div className="flex flex-col md:flex-row gap-4 items-center w-full md:w-auto">
//           <TableSearch />
//           <div className="flex items-center gap-3 self-end">
//             <button className="w-8 h-8 flex items-center justify-center bg-lamaYellow rounded-full">
//               <Image src="/filter.png" alt="Filter" width={14} height={14} />
//             </button>
//             <button className="w-8 h-8 flex items-center justify-center bg-lamaYellow rounded-full">
//               <Image src="/sort.png" alt="Sort" width={14} height={14} />
//             </button>
//             {role === "admin" && <FormModal table="parent" type="create" />}
//           </div>
//         </div>
//       </div>

//       <Table columns={columns} renderRows={renderRows} data={data} />
//       <Pagination page={p} count={count} />
//     </div>
//   );
// };

// export default ParentListPage;
 

import FormContainer from "@/components/FormContainer";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Parent, Prisma, Student } from "@prisma/client";
import Image from "next/image";

import { auth } from "@clerk/nextjs/server";
import { headers } from "next/headers";

type ParentList = Parent & { students: Student[] };

const ParentListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {

const { sessionClaims } = await auth();
const role = (sessionClaims?.metadata as { role?: string })?.role;


const columns = [
  {
    headers: "Info",
    accessor: "info",
  },
  {
    headers: "Student Names",
    accessor: "students",
    className: "hidden md:table-cell",
  },
  {
    headers: "Phone",
    accessor: "phone",
    className: "hidden lg:table-cell",
  },
  {
    headers: "Address",
    accessor: "address",
    className: "hidden lg:table-cell",
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

const renderRow = (item: ParentList) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
  >
    <td className="flex items-center gap-4 p-4">
      <div className="flex flex-col">
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-xs text-gray-500">{item?.email}</p>
      </div>
    </td>
    <td className="hidden md:table-cell">
      {item.students.map((student) => student.name).join(",")}
    </td>
    <td className="hidden md:table-cell">{item.phone}</td>
    <td className="hidden md:table-cell">{item.address}</td>
    <td>
      <div className="flex items-center gap-2">
        {role === "admin" && (
          <>
            <FormContainer table="parent" type="update" data={item} />
            <FormContainer table="parent" type="delete" id={item.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);

  const { page, ...queryParams } = searchParams;

  const p = page ? parseInt(page) : 1;

  // URL PARAMS CONDITION

  const query: Prisma.ParentWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "search":
            query.name = { contains: value, mode: "insensitive" };
            break;
          default:
            break;
        }
      }
    }
  }

  const [data, count] = await prisma.$transaction([
    prisma.parent.findMany({
      where: query,
      include: {
        students: true,
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.parent.count({ where: query }),
  ]);

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Parents</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && <FormContainer table="parent" type="create" />}
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

export default ParentListPage;