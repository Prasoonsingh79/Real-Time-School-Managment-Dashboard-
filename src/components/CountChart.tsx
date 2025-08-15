
// "use client";
// import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts';
// import Image from 'next/image';
// const data = [
//   {
//     name: 'Total',
//     count:186,
//     fill: '#8884d8',
//   },
//   {
//    name: 'boys',
//     count:53,
//     fill: '#8884d8',
//   },
//   {
//     name: 'girls',
//     count:77,
//     fill: '#82ca9d',
//   },
//   {
    
//     name: 'mixed',
//     count:97,
//     fill: '#ffc658',
//   },

// ];

// const style = {
//   top: '50%',
//   right: 0,
//   transform: 'translate(0, -50%)',
//   lineHeight: '24px',
// };



// const CountChart = () => {
//   return (
//     <div className='bg-white rounded-xl w-full h-full p-4 flex flex-col gap-4'>
//         <div className='flex items-center justify-between '>
//             <h1 className='text-lg font-semibold'>Students</h1>
//             <Image src="/moreDark.png" alt="" width={20} height={20} />

//         </div>
//         <div className='relative w-full h-[75%]'>
//             <ResponsiveContainer >
//         <RadialBarChart cx="50%" cy="50%" innerRadius="50%" outerRadius="100%" barSize={25} data={data}>
//           <RadialBar
            
//             label={{ position: 'insideStart', fill: '#fff' }}
//             background
        
//             dataKey="count"
//           />
//           {/* <Legend iconSize={10} layout="vertical" verticalAlign="middle"  /> */}
//         </RadialBarChart>
//       </ResponsiveContainer>
//       <Image src="/maleFemale.png" alt="" width={50} height={50} className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' />
//         </div>
//         <div className='flex justify-center gap-16'>
//             <div className='flex flex-col items-center gap-2'>
//               <div className='w-5 h-5 bg-lamaSky rounded-full'/>
//               <h1 className='font-bold'>1,234</h1>
//               <h2 className='text-xs text-pink-300'>Boys (90%)</h2>
//             </div>
//             <div className='flex flex-col items-center gap-2'>
//               <div className='w-5 h-5 bg-lamaGreen rounded-full'/>
//               <h1 className='font-bold'>1,234</h1>
//               <h2 className='text-xs text-pink-300'>Girls (10%)</h2>
//             </div>
//         </div>
//     </div>
//   )
// }

// export default CountChart

"use client";
import Image from "next/image";
import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
} from "recharts";


const CountChart = ({ boys, girls }: { boys: number; girls: number }) => {
  const data = [
    {
      name: "Total",
      count: boys+girls,
      fill: "white",
    },
    {
      name: "Girls",
      count: girls,
      fill: "#FAE27C",
    },
    {
      name: "Boys",
      count: boys,
      fill: "#C3EBFA",
    },
  ];
  return (
    <div className="relative w-full h-[75%]">
      <ResponsiveContainer>
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="40%"
          outerRadius="100%"
          barSize={32}
          data={data}
        >
          <RadialBar background dataKey="count" />
        </RadialBarChart>
      </ResponsiveContainer>
      <Image
        src="/maleFemale.png"
        alt=""
        width={50}
        height={50}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  );
};

export default CountChart;