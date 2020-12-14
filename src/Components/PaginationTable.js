import React,{useMemo} from 'react'
import { usePagination, useSortBy, useTable } from 'react-table'
import mock_data from './Mock-Data.json'
import {COLUMNS} from './columns'
import './Table.css'

export const PaginationTable=()=>
{
    const columns=useMemo(() => COLUMNS, [])
    const data=useMemo(() => mock_data, [])
    const
    {getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        state,
        setPageSize,
        prepareRow
    }= useTable(
        {
            columns,
            data
        },usePagination)
        const {pageIndex, pageSize}=state
    return(
  <>
        <table {...getTableProps}>
            <thead >
                {
                    headerGroups.map(headerGroup =>(
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {
                                headerGroup.headers.map((column) =>(
                                    <th {...column.getHeaderProps()}>

                                        {
                                            column.render('Header')
                                        }
                                    </th>
                                ))
                            }
                    
                    </tr>  
                    ))
                }
            </thead>
            <tbody {...getTableBodyProps}>
                {
                    page.map(row => {
                        prepareRow(row)
                        return(
                            <tr {...row.getRowProps()}>
                                {
                                    row.cells.map((cell)=>
                                    {
                                        return <td {...cell.getCellProps()}>

                                            {
                                                cell.render('Cell')
                                            }
                                        </td>
                                    })
                                }
                </tr>

                        )
                    })
                }
                
            </tbody>
            
        </table>
        <div>
            <span>
                Page{ ' '}
                <strong>
                    {pageIndex + 1} of {pageOptions.length}
                </strong>{' '}
            </span>
            <select value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
                {[10,20].map(pageSize => (
                    <option key={pageSize} value={pageSize}>
                        {pageSize}
                    </option>
                    
                ))}
            </select>
            <button onClick={()=> previousPage()} disabled={!canPreviousPage}>Previous</button>
            <button onClick={()=>nextPage()} disabled={!canNextPage}>Next</button>
        </div>
        </>
    )
}