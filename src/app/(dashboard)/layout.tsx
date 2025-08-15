// import Image from 'next/image';
// import Link from 'next/link';
// // Update the import path below if your Menu component is located elsewhere
// import Menu from '@/components/Menu';

// export default function DashboardLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return(
//      <div className="h-screen flex">
//     <div className="w-[14%] md:-[8%] lg:w-[16%] xl:w-[14%] bg-red-200 p-4">

// <Link href="/" className='flex items-center justify-center gap-2 lg:justify-start'>
// <Image src="/logo.png" alt="logo" width={32} height={32}  />
// <span className='hidden lg:block'>SchoolLema</span>
//   </Link>
//   <Menu/>
//     </div>
//     <div className="w-[86%] md:w-[92%] lg:w-[84%] xlw-[86%] bg-blue-200">
// r
//     </div>
//   </div>
//   );
// import Image from 'next/image';
// import Link from 'next/link';
// import Menu from '@/components/Menu';
// import Navbar from '@/components/Navbar';

// export default function DashboardLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <div className="h-screen flex">
//       <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] bg-red-200 p-4">
//         <Link href="/" className="flex items-center justify-center gap-2 lg:justify-start">
//           <Image src="/logo.png" alt="logo" width={32} height={32} />
//           <span className="hidden lg:block">SchoolLema</span>
//         </Link>
//         <Menu />
//       </div>
//       <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#F7F8FA] overflow-scroll  ">
//         <Navbar/>
//         {children}
//       </div>
//     </div>
//   );
// }
import Image from 'next/image';
import Link from 'next/link';
import Menu from '@/components/Menu';
import Navbar from '@/components/Navbar';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex overflow-hidden">
      {/* Sidebar - scrollable when needed */}
      <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] bg-gray-200 p-4 overflow-y-auto h-full">
        <Link href="/" className="flex items-center justify-center gap-2 lg:justify-start mb-4">
          <Image src="/logo.png" alt="logo" width={32} height={32} />
          <span className="hidden lg:block font-bold">SchoolLema</span>
        </Link>
        <Menu />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden bg-[#F7F8FA] ">
        <Navbar />
        <div className="flex-1 overflow-y-auto px-4">
          {children}
        </div>
      </div>
    </div>
  );
}
