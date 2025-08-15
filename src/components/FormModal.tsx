
// "use client";
// import dynamic from "next/dynamic";
// import { useState, Dispatch, SetStateAction, useEffect } from "react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { useFormState } from "react-dom";
// import { toast } from "react-toastify";

// // 🔒 Restrict to only known table types
// type TableType =
//   | "subject"
//   | "class"
//   | "teacher"
//   | "student"
//   | "exam"
//   | "parent"
//   | "lesson"
//   | "assignment"
//   | "result"
//   | "attendance"
//   | "event"
//   | "announcement";

// type FormContainerProps = {
//   table: TableType;
//   type: "create" | "update" | "delete";
//   data?: any;
//   id?: string | number;
// };

// const TeacherForm = dynamic(() => import("./forms/TeacherForm"), {
//   loading: () => <h1>Loading...</h1>,
// });
// const StudentForm = dynamic(() => import("./forms/StudentForm"), {
//   loading: () => <h1>Loading...</h1>,
// });
// const SubjectForm = dynamic(() => import("./forms/SubjectForm"), {
//   loading: () => <h1>Loading...</h1>,
// });
// const ClassForm = dynamic(() => import("./forms/ClassForm"), {
//   loading: () => <h1>Loading...</h1>,
// });
// const ExamForm = dynamic(() => import("./forms/ExamForm"), {
//   loading: () => <h1>Loading...</h1>,
// });
// // Dummy delete actions (replace with actual ones)
// import {
//   deleteClass,
//   deleteExam,
//   deleteStudent,
//   deleteSubject,
//    deleteTeacher,
//   // deleteStudent,
// } from "@/lib/actions";


// // 🔧 Map table name to delete function
// const deleteActionMap: Record<TableType, any> = {
//   subject: deleteSubject,
//   class: deleteClass,
//   teacher: deleteTeacher,
//   student: deleteStudent,
//   exam: deleteExam,
//   parent: deleteSubject,
//   lesson: deleteSubject,
//   assignment: deleteSubject,
//   result: deleteSubject,
//   attendance: deleteSubject,
//   event: deleteSubject,
//   announcement: deleteSubject,
// };

// // 🔧 Map table name to form renderer
// const forms: {
//   [key in TableType]?: (
//     setOpen: Dispatch<SetStateAction<boolean>>,
//     type: "create" | "update",
//     data?: any,
//     relatedData?: any
//   ) => JSX.Element;
// } = {
//   subject: (setOpen, type, data,relatedData) => (
//     <SubjectForm type={type} data={data} setOpen={setOpen} relatedData={relatedData} />
//   ),
//    class: (setOpen, type, data, relatedData) => (
//     <ClassForm
//       type={type}
//       data={data}
//       setOpen={setOpen}
//       relatedData={relatedData}
//     />
//   ),
//   teacher: (setOpen, type, data,relatedData) => (
//     <TeacherForm type={type} data={data}  setOpen={setOpen}
//       relatedData={relatedData}/>
//   ),
//   student: (setOpen, type, data,relatedData) => (
//     <StudentForm type={type} data={data}setOpen={setOpen}
//     relatedData={relatedData}/>
//   ),

//   exam: (setOpen, type, data, relatedData) => (
//     <ExamForm
//       type={type}
//       data={data}
//       setOpen={setOpen}
//       relatedData={relatedData}
//     />
//     // TODO OTHER LIST ITEMS
//   ),
//   // Add other forms here
// };


// const FormModal = ({
//   table,
//   type,
//   data,
//   id,
//   relatedData,
// }: FormContainerProps & { relatedData?: any }) => {
//   const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
//   const bgColor =
//     type === "create"
//       ? "bg-lamaYellow"
//       : type === "update"
//       ? "bg-lamaSky"
//       : "bg-lamaPurple";

//   const [open, setOpen] = useState(false);

//   const Form = () => {
//     const deleteAction = deleteActionMap[table];

//     const [state, formAction] = useFormState(deleteAction, {
//       success: false,
//       error: false,
//     });

//     const router = useRouter();

//     useEffect(() => {
//       if (state.success) {
//         toast(`${table} has been deleted!`);
//         setOpen(false);
//         router.refresh();
//       }
//     }, [state, router]);

//     return type === "delete" && id ? (
//       <form action={formAction} className="p-4 flex flex-col gap-4">
//         <input type="text" name="id" value={id} hidden readOnly />
//         <span className="text-center font-medium">
//           All data will be lost. Are you sure you want to delete this {table}?
//         </span>
//         <button className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center">
//           Delete
//         </button>
//       </form>
//     ) : type === "create" || type === "update" ? (
//       forms[table]
//         ? forms[table]!(setOpen, type, data, relatedData)
//         : <div className="text-center">No form available for {table}</div>
//     ) : (
//       "Form not found!"
//     );
//   };

//   return (
//     <>
//       <button
//         className={`${size} flex items-center justify-center rounded-full ${bgColor}`}
//         onClick={() => setOpen(true)}
//       >
//         <Image src={`/${type}.png`} alt="" width={16} height={16} />
//       </button>
//       {open && (
//         <div className="w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
//           <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
//             <Form />
//             <div
//               className="absolute top-4 right-4 cursor-pointer"
//               onClick={() => setOpen(false)}
//             >
//               <Image src="/close.png" alt="" width={14} height={14} />
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default FormModal;


// "use client";
// import dynamic from "next/dynamic";
// import { useState, Dispatch, SetStateAction, useEffect } from "react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { useActionState } from "react"; // ✅ Updated import
// import { toast } from "react-toastify";

// // 🔒 Restrict to only known table types
// type TableType =
//   | "subject"
//   | "class"
//   | "teacher"
//   | "student"
//   | "exam"
//   | "parent"
//   | "lesson"
//   | "assignment"
//   | "result"
//   | "attendance"
//   | "event"
//   | "announcement";

// type FormContainerProps = {
//   table: TableType;
//   type: "create" | "update" | "delete";
//   data?: any;
//   id?: string | number;
// };

// const TeacherForm = dynamic(() => import("./forms/TeacherForm"), {
//   loading: () => <h1>Loading...</h1>,
// });
// const StudentForm = dynamic(() => import("./forms/StudentForm"), {
//   loading: () => <h1>Loading...</h1>,
// });
// const SubjectForm = dynamic(() => import("./forms/SubjectForm"), {
//   loading: () => <h1>Loading...</h1>,
// });
// const ClassForm = dynamic(() => import("./forms/ClassForm"), {
//   loading: () => <h1>Loading...</h1>,
// });
// const ExamForm = dynamic(() => import("./forms/ExamForm"), {
//   loading: () => <h1>Loading...</h1>,
// });

// // Dummy delete actions (replace with actual ones)
// import {
//   deleteClass,
//   deleteExam,
//   deleteStudent,
//   deleteSubject,
//   deleteTeacher,
// } from "@/lib/actions";

// // 🔧 Map table name to delete function
// const deleteActionMap: Record<TableType, any> = {
//   subject: deleteSubject,
//   class: deleteClass,
//   teacher: deleteTeacher,
//   student: deleteStudent,
//   exam: deleteExam,
//   parent: deleteSubject,
//   lesson: deleteSubject,
//   assignment: deleteSubject,
//   result: deleteSubject,
//   attendance: deleteSubject,
//   event: deleteSubject,
//   announcement: deleteSubject,
// };

// // 🔧 Map table name to form renderer
// const forms: {
//   [key in TableType]?: (
//     setOpen: Dispatch<SetStateAction<boolean>>,
//     type: "create" | "update",
//     data?: any,
//     relatedData?: any
//   ) => JSX.Element;
// } = {
//   subject: (setOpen, type, data, relatedData) => (
//     <SubjectForm type={type} data={data} setOpen={setOpen} relatedData={relatedData} />
//   ),
//   class: (setOpen, type, data, relatedData) => (
//     <ClassForm type={type} data={data} setOpen={setOpen} relatedData={relatedData} />
//   ),
//   teacher: (setOpen, type, data, relatedData) => (
//     <TeacherForm type={type} data={data} setOpen={setOpen} relatedData={relatedData} />
//   ),
//   student: (setOpen, type, data, relatedData) => (
//     <StudentForm type={type} data={data} setOpen={setOpen} relatedData={relatedData} />
//   ),
//   exam: (setOpen, type, data, relatedData) => (
//     <ExamForm type={type} data={data} setOpen={setOpen} relatedData={relatedData} />
//   ),
// };

// const FormModal = ({
//   table,
//   type,
//   data,
//   id,
//   relatedData,
// }: FormContainerProps & { relatedData?: any }) => {
//   const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
//   const bgColor =
//     type === "create"
//       ? "bg-lamaYellow"
//       : type === "update"
//       ? "bg-lamaSky"
//       : "bg-lamaPurple";

//   const [open, setOpen] = useState(false);

//   const Form = () => {
//     const deleteAction = deleteActionMap[table];

//     // ✅ Updated from useFormState → useActionState
//     const [state, formAction] = useActionState(deleteAction, {
//       success: false,
//       error: false,
//     });

//     const router = useRouter();

//     useEffect(() => {
//       if (state.success) {
//         toast(`${table} has been deleted!`);
//         setOpen(false);
//         router.refresh();
//       }
//     }, [state, router, table]);

//     return type === "delete" && id ? (
//       <form action={formAction} className="p-4 flex flex-col gap-4">
//         <input type="text" name="id" value={id} hidden readOnly />
//         <span className="text-center font-medium">
//           All data will be lost. Are you sure you want to delete this {table}?
//         </span>
//         <button className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center">
//           Delete
//         </button>
//       </form>
//     ) : type === "create" || type === "update" ? (
//       forms[table]
//         ? forms[table]!(setOpen, type, data, relatedData)
//         : <div className="text-center">No form available for {table}</div>
//     ) : (
//       "Form not found!"
//     );
//   };

//   return (
//     <>
//       <button
//         className={`${size} flex items-center justify-center rounded-full ${bgColor}`}
//         onClick={() => setOpen(true)}
//       >
//         <Image src={`/${type}.png`} alt="" width={16} height={16} />
//       </button>
//       {open && (
//         <div className="w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
//           <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
//             <Form />
//             <div
//               className="absolute top-4 right-4 cursor-pointer"
//               onClick={() => setOpen(false)}
//             >
//               <Image src="/close.png" alt="" width={14} height={14} />
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default FormModal;


"use client";
import dynamic from "next/dynamic";
import { useState, Dispatch, SetStateAction, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom"; // ✅ useFormState for React 18
import { toast } from "react-toastify";

type TableType =
  | "subject"
  | "class"
  | "teacher"
  | "student"
  | "exam"
  | "parent"
  | "lesson"
  | "assignment"
  | "result"
  | "attendance"
  | "event"
  | "announcement";

type FormContainerProps = {
  table: TableType;
  type: "create" | "update" | "delete";
  data?: any;
  id?: string | number;
};

const TeacherForm = dynamic(() => import("./forms/TeacherForm"), {
  loading: () => <h1>Loading...</h1>,
});
const StudentForm = dynamic(() => import("./forms/StudentForm"), {
  loading: () => <h1>Loading...</h1>,
});
const SubjectForm = dynamic(() => import("./forms/SubjectForm"), {
  loading: () => <h1>Loading...</h1>,
});
const ClassForm = dynamic(() => import("./forms/ClassForm"), {
  loading: () => <h1>Loading...</h1>,
});
const ExamForm = dynamic(() => import("./forms/ExamForm"), {
  loading: () => <h1>Loading...</h1>,
});

import {
  deleteClass,
  deleteExam,
  deleteStudent,
  deleteSubject,
  deleteTeacher,
} from "@/lib/actions";

const deleteActionMap: Record<TableType, any> = {
  subject: deleteSubject,
  class: deleteClass,
  teacher: deleteTeacher,
  student: deleteStudent,
  exam: deleteExam,
  parent: deleteSubject,
  lesson: deleteSubject,
  assignment: deleteSubject,
  result: deleteSubject,
  attendance: deleteSubject,
  event: deleteSubject,
  announcement: deleteSubject,
};

const forms: {
  [key in TableType]?: (
    setOpen: Dispatch<SetStateAction<boolean>>,
    type: "create" | "update",
    data?: any,
    relatedData?: any
  ) => JSX.Element;
} = {
  subject: (setOpen, type, data, relatedData) => (
    <SubjectForm type={type} data={data} setOpen={setOpen} relatedData={relatedData} />
  ),
  class: (setOpen, type, data, relatedData) => (
    <ClassForm type={type} data={data} setOpen={setOpen} relatedData={relatedData} />
  ),
  teacher: (setOpen, type, data, relatedData) => (
    <TeacherForm type={type} data={data} setOpen={setOpen} relatedData={relatedData} />
  ),
  student: (setOpen, type, data, relatedData) => (
    <StudentForm type={type} data={data} setOpen={setOpen} relatedData={relatedData} />
  ),
  exam: (setOpen, type, data, relatedData) => (
    <ExamForm type={type} data={data} setOpen={setOpen} relatedData={relatedData} />
  ),
};

const FormModal = ({
  table,
  type,
  data,
  id,
  relatedData,
}: FormContainerProps & { relatedData?: any }) => {
  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgColor =
    type === "create"
      ? "bg-lamaYellow"
      : type === "update"
      ? "bg-lamaSky"
      : "bg-lamaPurple";

  const [open, setOpen] = useState(false);

  const Form = () => {
    const deleteAction = deleteActionMap[table];

    // ✅ Compatible with Next.js 14 + React 18
    const [state, formAction] = useFormState(deleteAction, {
      success: false,
      error: false,
    });

    const router = useRouter();

    useEffect(() => {
      if (state.success) {
        toast(`${table} has been deleted!`);
        setOpen(false);
        router.refresh();
      }
    }, [state, router, table]);

    return type === "delete" && id ? (
      <form action={formAction} className="p-4 flex flex-col gap-4">
        <input type="text" name="id" value={id} hidden readOnly />
        <span className="text-center font-medium">
          All data will be lost. Are you sure you want to delete this {table}?
        </span>
        <button className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center">
          Delete
        </button>
      </form>
    ) : type === "create" || type === "update" ? (
      forms[table]
        ? forms[table]!(setOpen, type, data, relatedData)
        : <div className="text-center">No form available for {table}</div>
    ) : (
      "Form not found!"
    );
  };

  return (
    <>
      <button
        className={`${size} flex items-center justify-center rounded-full ${bgColor}`}
        onClick={() => setOpen(true)}
      >
        <Image src={`/${type}.png`} alt="" width={16} height={16} />
      </button>
      {open && (
        <div className="w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
            <Form />
            <div
              className="absolute top-4 right-4 cursor-pointer"
              onClick={() => setOpen(false)}
            >
              <Image src="/close.png" alt="" width={14} height={14} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormModal;
