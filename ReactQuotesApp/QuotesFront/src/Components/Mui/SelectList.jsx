import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export const SelectList = ({ onColorChange }) => {
  const [color, setColor] = useState("");

  const theme = createTheme({
    components: {
      MuiMenuItem: {
        styleOverrides: {
          root: {
            color: "white",
            "&.Mui-selected": {
              backgroundColor: "#A6C2F0",
              color: "black",
              fontWeight: "bold",
            },
          },
        },
      },
    },
  });

  const lightenColor = (color, percent) => {
    const num = parseInt(color.replace("#", ""), 16),
      amt = Math.round(2.55 * percent),
      R = (num >> 16) + amt,
      B = ((num >> 8) & 0x00ff) + amt,
      G = (num & 0x0000ff) + amt;
    return (
      "#" +
      (
        0x1000000 +
        (R < 255 ? R : 255) * 0x10000 +
        (B < 255 ? B : 255) * 0x100 +
        (G < 255 ? G : 255)
      )
        .toString(16)
        .slice(1)
    );
  };

  const handleChange = (event) => {
    setColor(event.target.value);
    onColorChange(event.target.value);
  };
  return (
    <ThemeProvider theme={theme}>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Color</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={color}
          label="Color"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em style={{ color: "black" }}>None</em>
          </MenuItem>
          <MenuItem
            sx={{
              backgroundColor: "#1B4C9C",
              "&:hover": {
                backgroundColor: lightenColor("#1B4C9C", 15),
              },
            }}
            value={"Blue"}
          >
            Blue
          </MenuItem>
          <MenuItem
            sx={{
              backgroundColor: "#4CAF50",
              "&:hover": {
                backgroundColor: lightenColor("#4CAF50", 15),
              },
            }}
            value={"Green"}
          >
            Green
          </MenuItem>
          <MenuItem
            sx={{
              backgroundColor: "#F44336",
              "&:hover": {
                backgroundColor: lightenColor("#F44336", 15),
              },
            }}
            value={"Red"}
          >
            Red
          </MenuItem>
          <MenuItem
            sx={{
              backgroundColor: "#FFEB3B",
              color: "black",
              "&:hover": {
                backgroundColor: lightenColor("#FFEB3B", 15),
              },
            }}
            value={"Yellow"}
          >
            Yellow
          </MenuItem>{" "}
          <MenuItem
            sx={{
              backgroundColor: "#9C27B0",
              "&:hover": {
                backgroundColor: lightenColor("#9C27B0", 15),
              },
            }}
            value={"Purple"}
          >
            Purple
          </MenuItem>
        </Select>
        <FormHelperText>Choose a color for your note</FormHelperText>
      </FormControl>
    </ThemeProvider>
  );
};
