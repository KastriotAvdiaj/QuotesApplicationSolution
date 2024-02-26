import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

export const DataTable = ({ items, whatItem }) => {
  const columnConfigs = {
    books: [
      { field: "id", headerName: "ID", width: 90 },
      { field: "title", headerName: "Title", width: 200 },
      { field: "author", headerName: "Author", width: 200 },
      {
        field: "description",
        headerName: "Description",
        width: 550,
        renderCell: (params) => (
          <div
            style={{
              overflow: "hidden",
              whiteSpace: "normal",
            }}
            title={params.value}
          >
            {params.value}
          </div>
        ),
      },

      {
        field: "image",
        headerName: "Image",
        width: 200,
        renderCell: (params) => (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              width: "100%",
            }}
          >
            <img
              src={params.value}
              alt=""
              style={{
                maxHeight: "70px",
                maxWidth: "50px",
                boxShadow:
                  "1px 1px 28px rgba(5, 5, 5, 0.12), 0 1px 28px rgba(0, 0, 0, 0.30)",
              }}
            />
          </div>
        ),
      },
    ],

    quotes: [
      { field: "id", headerName: "ID", width: 90 },
      {
        field: "quote",
        headerName: "Quote",
        width: 550,
        // Adding custom rendering for the cell
        renderCell: (params) => (
          <div
            style={{
              overflow: "hidden",
              whiteSpace: "normal",
            }}
            title={params.value}
          >
            {params.value}
          </div>
        ),
      },
      { field: "author", headerName: "Author", width: 400 },
    ],
  };

  const mapItemsToRows = (items, itemType) => {
    switch (itemType) {
      case "books":
        return items.map((item) => ({
          id: item.id,
          title: item.title,
          author: item.author,
          description: item.description,
          image: item.imageBase64.startsWith("data:image")
            ? item.imageBase64
            : `data:image/jpeg;base64,${item.imageBase64}`,
        }));
      case "quotes":
        return items.map((item) => ({
          id: item.id,
          quote: item.description,
          author: item.authorName,
        }));
      default:
        return [];
    }
  };

  const rows = mapItemsToRows(items, whatItem);
  const columns = columnConfigs[whatItem] || [];

  return (
    <div
      style={{
        height: "700px",
        width: "80%",
        backgroundColor: "white",
        borderRadius: "0.2rem",
      }}
    >
      <DataGrid
        sx={{
          cursor: "pointer",
          fontSize: "1rem",
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#000000",
            color: "#fff",
          },
          "& .MuiDataGrid-cell": {
            borderRight: "1px solid #ccc", // Customize vertical cell borders
          },
          "& .MuiDataGrid-row": {
            "&:nth-of-type(odd)": {
              backgroundColor: "#E7E5E5",
            },
          },
          "& .MuiDataGrid-sortIcon": {
            color: "#fff", // Change sorting icon color
          },
          "& .MuiDataGrid-menuIcon svg": {
            fill: "#fff", // Change the color of the menu (three dots) icon
          },
          "& .MuiDataGrid-virtualScrollerRenderZone": {
            "& .MuiDataGrid-row": {
              borderBottom: "1px solid #ccc", // Customize horizontal row borders
            },
          },
        }}
        rows={rows}
        rowHeight={80}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 8 },
          },
        }}
        pageSizeOptions={[8, 12, 14]}
        checkboxSelection
      />
    </div>
  );
};
