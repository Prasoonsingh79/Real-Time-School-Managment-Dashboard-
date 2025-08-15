// "use client";
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import Image from 'next/image';
// const data = [
//     {
//         name: 'jan',
//         income: 4000,
//         expense: 2400,
//         amt: 2400,
//     },
//     {
//         name: 'Feb',
//         income: 3000,
//         expense: 1398,
//         amt: 2210,
//     },
//     {
//         name: 'Mar',
//         income: 2000,
//         expense: 9800,
//         amt: 2290,
//     },
//     {
//         name: 'Apr',
//         income: 2780,
//         expense: 3908,
//         amt: 2000,
//     },
//     {
//         name: 'May',
//         income: 1890,
//         expense: 4800,
//         amt: 2181,
//     },
//     {
//         name: 'Jun',
//         income: 2390,
//         expense: 3800,
//         amt: 2500,
//     },
//     {
//         name: 'Jul',
//         income: 3490,
//         expense: 4300,
//         amt: 2100,
//     },
// ];

// const FinanceChart = () => {
//     return (
//         <div className=''>
//             <div className='flex items-center justify-between'>
//                 <h1 className='text-lg font-semibold'>Finance</h1>
//                 <Image src="/moreDark.png" alt="" width={20} height={20} />
//             </div>
//             <ResponsiveContainer width="100%" height="90%">
//         <LineChart
//           width={500}
//           height={300}
//           data={data}
//           margin={{
//             top: 5,
//             right: 30,
//             left: 20,
//             bottom: 5,
//           }}
//         >
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="name" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
//           <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
//         </LineChart>
//       </ResponsiveContainer>
//         </div>
//     )
// }

// export default FinanceChart

'use client';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Image from 'next/image';

const data = [
  { name: 'Jan', income: 4000, expense: 2400, amt: 2400 },
  { name: 'Feb', income: 3000, expense: 1398, amt: 2210 },
  { name: 'Mar', income: 2000, expense: 9800, amt: 2290 },
  { name: 'Apr', income: 2780, expense: 3908, amt: 2000 },
  { name: 'May', income: 1890, expense: 4800, amt: 2181 },
  { name: 'Jun', income: 2390, expense: 3800, amt: 2500 },
  { name: 'Jul', income: 3490, expense: 4300, amt: 2100 },
];

const FinanceChart = () => {
  return (
    <div className='p-4 bg-white rounded-lg shadow-md'>
      <div className='flex items-center justify-between mb-4'>
        <h1 className='text-lg font-semibold'>Finance</h1>
        <Image src="/moreDark.png" alt="Options" width={20} height={20} />
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis tickLine={false} tickMargin={20} tick={{ fill: "#d1d5bd" }}/>
          <Tooltip />
          <Legend  align='center' verticalAlign='top' wrapperStyle={{paddingTop:"10px", paddingBottom:"30px"}}/>
          <Line type="monotone" dataKey="income" stroke="#4ade80" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="expense" stroke="#f87171" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FinanceChart;
