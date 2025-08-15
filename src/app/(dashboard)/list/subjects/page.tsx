
// export const dynamic = "force-dynamic";

// import Image from "next/image";
// import Link from "next/link";
// import { Prisma, Subject, Teacher } from "@prisma/client";
// import prisma from "@/lib/prisma";
// import Table from "@/components/Table";
// import TableSearch from "@/components/TableSearch";
// import Pagination from "@/components/Pagination";

// import { ITEM_PER_PAGE } from "@/lib/settings";
// import { getCurrentUserId } from "@/lib/utils"; // ✅ Import role/user info
// import FormContainer from "@/components/FormContainer";

// type SubjectList = Subject & {
//   teachers: Teacher[];
// };

// const columns = [
//   { headers: "Subject Name", accessor: "name" },
//   { headers: "Teachers", accessor: "teachers", className: "hidden md:table-cell" },
//   { headers: "Actions", accessor: "actions" },
// ];

// const SubjectListPage = async ({
//   searchParams,
// }: {
//   searchParams: { [key: string]: string | undefined };
// }) => {
//   const { userId, role } = await getCurrentUserId(); // ✅ Fetch role from Clerk
//   const { page, ...queryParams } = searchParams;
//   const p = page && !isNaN(Number(page)) ? parseInt(page) : 1;
//   const skip = (p - 1) * ITEM_PER_PAGE;

//   const query: Prisma.SubjectWhereInput = {};

//   for (const [key, value] of Object.entries(queryParams)) {
//     if (value !== undefined && key === "search") {
//       query.name = { contains: value, mode: "insensitive" };
//     }
//   }

//   const [data, count] = await prisma.$transaction([
//     prisma.subject.findMany({
//       where: query,
//       include: { teachers: true },
//       take: ITEM_PER_PAGE,
//       skip: skip,
//     }),
//     prisma.subject.count({ where: query }),
//   ]);

//   const renderRows = (item: SubjectList) => (
//     <tr key={item.id} className="border-b border-gray-200 even:bg-gray-50 text-sm hover:bg-yellow-100">
//       <td className="p-4 font-semibold">{item.name}</td>
//       <td className="hidden md:table-cell">
//         {item.teachers.map((teacher) => teacher.name).join(", ") || "—"}
//       </td>
//       <td>
//         <div className="flex items-center gap-2">
//           {role === "admin" && (
//             <>
//               <FormContainer table="subject" type="update" id={item.id} />
//               <FormContainer table="subject" type="delete" id={item.id} />
//             </>
//           )}
//         </div>
//       </td>
//     </tr>
//   );

//   return (
//     <div className="bg-white p-4 rounded-md flex-1 m-4 mt-6">
//       <div className="flex items-center justify-between">
//         <h1 className="hidden md:block text-lg font-semibold">All Subjects</h1>
//         <div className="flex flex-col md:flex-row gap-4 items-center w-full md:w-auto">
//           <TableSearch />
//           <div className="flex items-center gap-3 self-end">
//             <button className="w-8 h-8 flex items-center justify-center bg-lamaYellow rounded-full">
//               <Image src="/filter.png" alt="Filter" width={14} height={14} />
//             </button>
//             <button className="w-8 h-8 flex items-center justify-center bg-lamaYellow rounded-full">
//               <Image src="/sort.png" alt="Sort" width={14} height={14} />
//             </button>
//             {role === "admin" && <FormContainer table="subject" type="create" />}
//           </div>
//         </div>
//       </div>

//       <Table columns={columns} renderRows={renderRows} data={data} />
//       <Pagination page={p} count={count} />
//     </div>
//   );
// };

// export default SubjectListPage;




import FormContainer from "@/components/FormContainer";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Prisma, Subject, Teacher } from "@prisma/client";
import Image from "next/image";
import { auth } from "@clerk/nextjs/server";
import { headers } from "next/headers";

type SubjectList = Subject & { teachers: Teacher[] };

const SubjectListPage = async ({
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
      headers: "Teachers",
      accessor: "teachers",
      className: "hidden md:table-cell",
    },
    {
      headers: "Actions",
      accessor: "action",
    },
  ];

  const renderRow = (item: SubjectList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">{item.name}</td>
      <td className="hidden md:table-cell">
        {item.teachers.map((teacher) => teacher.name).join(",")}
      </td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormContainer table="subject" type="update" data={item} />
              <FormContainer table="subject" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  const { page, ...queryParams } = searchParams;

  const p = page ? parseInt(page) : 1;

  // URL PARAMS CONDITION

  const query: Prisma.SubjectWhereInput = {};

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
    prisma.subject.findMany({
      where: query,
      include: {
        teachers: true,
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.subject.count({ where: query }),
  ]);

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Subjects</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && (
              <FormContainer table="subject" type="create" />
            )}
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

export default SubjectListPage;