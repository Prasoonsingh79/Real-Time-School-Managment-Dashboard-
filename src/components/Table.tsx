import React from "react";

const Table= ({
    columns,
    renderRows,
    data,
}: {
columns: {headers: string, accessor: string, className?: string}[];
 renderRows: (item: any) => React.ReactNode;
 data: any[];
})=> {
  return (
    <table className='w-full mt-4'>
        <thead>
            <tr className="text-left text-sm bg-gray-400 bg-opacity-20 text-gray-700 font-semibold">
                {columns.map((col)=>(
                    <th key={col.accessor} className={col.className}>{col.headers}</th>))}
            </tr>

        </thead>
        <tbody>{data.map((item)=>renderRows(item))}</tbody>
    </table>
  )
}

export default Table;