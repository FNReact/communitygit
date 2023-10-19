import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { TableRow, TableCell, Typography, MenuItem, Button, Box } from "@mui/material";

import Iconify from "../../Iconify/Iconify";
import TableMoreMenu from "../TableMoreMenu";
import { useNavigate } from "react-router-dom";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { UserContext } from "../../../utils/UserContext";
import { reportUrl } from "../../../api/Api";
import { notifyError } from "../../../utils/Toast";
import axios from "axios";
// ----------------------------------------------------------------------

MagazineContentTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};

export default function MagazineContentTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
  index
}) {
  const naviagte = useNavigate()

  
  const [openMenu, setOpenMenuActions] = useState(null);

  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };


  return (
    <TableRow hover>
      <TableCell >{row?.id}</TableCell>
      {/* <TableCell >{row?.author}</TableCell> */}
      <TableCell >{row?.title.length>30?<>{row?.title.slice(0,30)}...</>:row?.title}</TableCell>
      <TableCell>{row?.position}</TableCell>
      <TableCell>
        {row?.status ===true && <Typography style={{ color: "#326df5" }}>Published</Typography>}
        {row?.status ===false && <Typography style={{ color: "#f59432" }}>Unpublished</Typography>}
      </TableCell>
      {/* <TableCell>
       <Button variant="contained" onClick={(e)=> onEditRow()}>Edit</Button>
        <DeleteForeverIcon onClick={(e)=> onDeleteRow()} className="cursorPointer" sx={{ml:5}} style={{ color: "red" }} />

      </TableCell> */}
      <TableCell>
      <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              <MenuItem
                onClick={() => {
                  onEditRow();
                  handleCloseMenu();
                }}
              >
                <Iconify icon={"eva:edit-fill"} />
                Edit
              </MenuItem>
              
              <MenuItem
                onClick={() => {
                  onDeleteRow();
                  handleCloseMenu();
                }}
                sx={{ color: "error.main" }}
              >
                <Iconify icon={"eva:trash-2-outline"} />
                Delete
              </MenuItem>
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
}
