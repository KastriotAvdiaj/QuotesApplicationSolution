import React, { useState, useEffect } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import "./Table2.css";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Alert from "@mui/material/Alert";
import { FaRankingStar } from "react-icons/fa6";

const Table2 = ({
  columns,
  data,
  handleNewUserForm,
  totalUsers,
  deleteSelectedUsers,
}) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const navigate = useNavigate();

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
    setPageSize,
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

  const [isAlertOpen, setAlertOpen] = useState(false);
  const handleEditUser = () => {
    if (selectedRows.length === 1) {
      const selectedUserId = selectedRows[0];
      navigate(`/admin/users/editUser/${selectedUserId}`);
    } else {
      setAlertOpen(true);
      setTimeout(() => setAlertOpen(false), 1500);
    }
  };

  useEffect(() => {
    if (isAlertOpen) {
      const timer = setTimeout(() => {
        setAlertOpen(false);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [isAlertOpen]);

  const isRowSelected = (id) => {
    return selectedRows.includes(id);
  };

  return (
    <div className="table-container">
      <div
        className={`alert-container ${
          isAlertOpen ? "alert-fade" : "alert-hidden"
        }`}
      >
        {isAlertOpen && (
          <Alert
            variant="filled"
            severity="warning"
            className={`alert-positioned`}
            sx={{ width: "80%", boxShadow: "-5px 8px 2px rgb(0,0,0,0.6)" }}
          >
            Select a User To Edit!
          </Alert>
        )}
      </div>

      <div className="searchbarAndActionButtonsWrapper">
        <input
          type="text"
          value={globalFilter || ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
        />
        <div className="actionButtonsWrapper">
          <NavLink to="/admin/roles">
            <button className="usersActionButtons role">
              Roles <FaRankingStar />
            </button>
          </NavLink>

          <button
            className="usersActionButtons"
            onClick={() => {
              handleNewUserForm();
            }}
          >
            Create
          </button>
          <button
            className="usersActionButtons"
            onClick={() => {
              deleteSelectedUsers(selectedRows);
            }}
          >
            Delete
          </button>
          <button className="usersActionButtons" onClick={handleEditUser}>
            Edit
          </button>
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
                    const allRowIds = data.map((row) => row.id);
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
            {headerGroups.map((headerGroup, index) => (
              <React.Fragment key={index}>
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
            const isSelected = isRowSelected(row.original.id);
            return (
              <tr
                {...row.getRowProps()}
                key={row.id}
                className={isSelected ? "selected2" : ""}
              >
                <td>
                  <input
                    type="checkbox"
                    onChange={() => toggleRowSelection(row.original.id)}
                    checked={isRowSelected(row.original.id)}
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
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>{" "}
        <span className="numberedPages">
          Page{" "}
          <strong className="numberedPages">
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
        <span>Total Users : {totalUsers} </span>
      </div>
    </div>
  );
};

export default Table2;
