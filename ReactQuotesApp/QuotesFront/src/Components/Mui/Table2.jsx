import React, { useState } from "react";
import { useTable, useSortBy, useGlobalFilter, usePagination } from "react-table";
import "./Table2.css";

const Table2 = ({ columns, data }) => {
  const [selectedRows, setSelectedRows] = useState([]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    setGlobalFilter,
    gotoPage,
    nextPage,
    previousPage,
    pageCount,
    canNextPage,
    canPreviousPage,
    pageOptions,
    pageSize,
    setPageSize
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 }, // start on the first page
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { globalFilter } = state;

  const toggleRowSelection = (id) => {
    setSelectedRows((prevSelectedRows) => {
      if (prevSelectedRows.includes(id)) {
        return prevSelectedRows.filter((rowId) => rowId !== id);
      } else {
        return [...prevSelectedRows, id];
      }
    });
  };

  const isRowSelected = (id) => {
    return selectedRows.includes(id);
  };

  return (
    <div className="table-container">
      <div className="searchbarAndActionButtonsWrapper">
        <input
          type="text"
          value={globalFilter || ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
        />
        <div className="actionButtonsWrapper">
          <button className="usersActionButtons">Create</button>
          <button className="usersActionButtons">Delete</button>
        </div>
      </div>
      <table {...getTableProps()} className="table table-bordered">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  if (isChecked) {
                    const allRowIds = page.map((row) => row.id);
                    setSelectedRows(allRowIds);
                  } else {
                    setSelectedRows([]);
                  }
                }}
                checked={
                  selectedRows.length === page.length && page.length !== 0
                }
              />
            </th>
            {headerGroups.map((headerGroup) => (
              <React.Fragment key={headerGroup.id}>
                {headerGroup.headers.map((column) => (
                  <th
                    key={column.id}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className={
                      column.isSorted
                        ? column.isSortedDesc
                          ? "sort-desc"
                          : "sort-asc"
                        : ""
                    }
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </React.Fragment>
            ))}
          </tr>
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            const isSelected = isRowSelected(row.id);
            return (
              <tr
                {...row.getRowProps()}
                key={row.id}
                className={isSelected ? "selected2" : ""}
              >
                <td>
                  <input
                    type="checkbox"
                    onChange={() => toggleRowSelection(row.id)}
                    checked={isRowSelected(row.id)}
                  />
                </td>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()} key={cell.column.id}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>{" "}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"}
        </button>{" "}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {">"}
        </button>{" "}
        <button
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          {">>"}
        </button>{" "}
        <span>
          Page{" "}
          <strong>
            {state.pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={state.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "50px" }}
          />
        </span>{" "}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
          className="optionUsers"
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize} className="optionUsers">
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Table2;