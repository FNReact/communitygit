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

MagazineMenuTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};

export default function MagazineMenuTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
  index
}) {
  const naviagte = useNavigate()

  const {userDetails, msDetails} = useContext(UserContext)
  const [loaderEffect, setLoaderEffect] = useState(false)
  const token = sessionStorage.getItem('token');

  return (
    <TableRow hover>
      <TableCell >{row?.name}</TableCell>
      <TableCell className="cursorPointer">{row?.type}</TableCell>
      <TableCell>{row?.position}</TableCell>
      <TableCell>
        {row?.status ==='1' && <Typography style={{ color: "#326df5" }}>Active</Typography>}
        {row?.status ==='0' && <Typography style={{ color: "#f59432" }}>Deactive</Typography>}
      </TableCell>
      <TableCell>
       <Button variant="contained" onClick={(e)=> onEditRow()}>Edit</Button>
        <DeleteForeverIcon onClick={(e)=> onDeleteRow()} className="cursorPointer" sx={{ml:5}} style={{ color: "red" }} />

      </TableCell>
    </TableRow>
  );
}
