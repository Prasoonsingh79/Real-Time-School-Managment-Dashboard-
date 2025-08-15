
import Image from "next/image";
import prisma from "@/lib/prisma";

type Props = {
  type: "admin" | "teacher" | "student" | "parent" | "staff";
};

const UserCard = async ({ type }: Props) => {
  let count = 0;

  switch (type) {
    case "admin":
      count = await prisma.admin.count();
      break;
    case "teacher":
      count = await prisma.teacher.count();
      break;
    case "student":
      count = await prisma.student.count();
      break;
    case "parent":
      count = await prisma.parent.count();
      break;
    case "staff":
      count = await prisma.admin.count(); // ✅ staff shows same as admin (2 admins)
      break;
    default:
      count = 0;
  }

  return (
    <div className="rounded-2xl odd:bg-lamaPurple even:bg-lamaYellow p-4 flex-1 min-w-[130px]">
      <div className="flex justify-between items-center">
        <span className="text-[10px] bg-white px-2 py-1 rounded-full text-green-600">
          2024/25
        </span>
        <Image src="/more.png" alt="More" width={20} height={20} />
      </div>
      <h1 className="text-2xl font-semibold my-4">{count}</h1>
      <h2 className="capitalize text-sm font-medium text-black">{type}</h2>
    </div>
  );
};

export default UserCard;
