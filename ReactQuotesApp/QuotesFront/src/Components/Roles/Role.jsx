import React, { useState } from "react";
import { motion } from "framer-motion";
import "./Role.css";
import { Divider } from "@mui/material";

export const Role = ({ role }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <motion.div
      className="mainRoleDiv"
      onClick={toggleOpen}
      initial={false}
      animate={{ height: isOpen ? "auto" : "fit-content" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <p className="roleParagraph">Role : {role.roleName}</p>
      <motion.div
        className="hiddenPart"
        initial={false}
        animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? "auto" : 0 }}
        transition={{ duration: 0.3 }}
        style={{ overflow: isOpen ? "visible" : "hidden" }}
      >
        <Divider
          sx={{ backgroundColor: "gray", height: "1px", width: "200px" }}
        />
        <p className="accessParagraph">Access : {role.access}</p>
        <p className="usersParagraph">Users Count - {role.userCount}</p>
      </motion.div>
    </motion.div>
  );
};
