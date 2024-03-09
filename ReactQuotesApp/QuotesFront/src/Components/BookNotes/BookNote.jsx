import React, { useState, useEffect } from "react";

export const BookNote = ({ note }) => {
  return (
    <div>
      <h3>{note.title}</h3>
      <p>{note.page}</p>
      <p style={{ backgroundColor: note.color }}>{note.note}</p>
    </div>
  );
};
