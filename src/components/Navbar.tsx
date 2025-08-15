import { currentUser } from "@clerk/nextjs/server";

import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';

const Navbar = async () => {
  const user = await currentUser();
  return (
    <div className="flex items-center justify-between p-4 bg-white shadow-sm">
      <div className="hidden md:flex items-center">
        <Image src="/search.png" alt="Search" width={14} height={14} />
        <input
          type="text"
          placeholder="Search"
          className="border border-gray-300 rounded-full px-4 py-1 ml-2 focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="flex items-center gap-4">
        {/* Message Icon */}
        <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer">
          <Image src="/message.png" alt="Messages" width={20} height={20} />
        </div>
        {/* Notification Icon with badge */}
        <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer relative">
          <Image src="/announcement.png" alt="Notifications" width={20} height={20} />
          <div className="absolute bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center -top-1 -right-1">
            3
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-xs font-medium leading-3">prasoon</span>
          <span className="text-[10px] text-gray-600"> {user?.publicMetadata?.role as string}</span>
        </div>
        {/* <Image
          src="/avatar.png"
          alt="User Avatar"
          width={40}
          height={40}
          className="rounded-full cursor-pointer"
        /> */}
        <UserButton/>
      </div>
    </div>
  );
};

export default Navbar;
