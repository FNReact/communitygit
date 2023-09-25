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
  const theme = useTheme();
  const { name, logo, slug } = row;
  const [openMenu, setOpenMenuActions] = useState(null);
  const [loaderVisible, setLoaderVisible] = useState(null);

  const {userDetails, msDetails} = useContext(UserContext)
  const [loaderEffect, setLoaderEffect] = useState(false)
  const token = sessionStorage.getItem('token');

  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };


  // handle replay 
  const handleReplay = (row, status) =>{
    setLoaderVisible(true)
    let data = new FormData();
    data.append('user_id', userDetails.id);
    data.append('microsite_id', msDetails.id);
    data.append('name', userDetails?.profile?.name );
    data.append('email', userDetails?.email);
    data.append('status', status);
    data.append('report_to', 'admin');
     var config = {
        method: 'post',
        url: `${reportUrl}/${row.uuid}`,
        headers: { 
          'Authorization': `Bearer ${token}`, 
        },
        data : data
      };
    axios.request(config)
    .then((response) => {
    
      setLoaderVisible(false)
      setTimeout(()=>{
        naviagte('/report-admin/details', {state:{row:row}})
      },[1500])
      // notifySuccess();
    })
    .catch((error) => {
      setLoaderVisible(false)
      notifyError('Something went wrong.')
    });


    naviagte('/report-admin/details', {state:{row:row}})
  }





  return (
    <TableRow hover>
      <TableCell >{row?.name}</TableCell>
      <TableCell className="cursorPointer" onClick={(e)=> handleReplay(row,2)}>{row?.subject}</TableCell>
      <TableCell>{new Date(row?.created_at).toLocaleDateString()}</TableCell>
      <TableCell>
        {row?.status ===0 && <Typography style={{ color: "#326df5" }}>New</Typography>}
        {row?.status ===1 && <Typography style={{ color: "#f59432" }}>Replied</Typography>}
        {row?.status ===2 && <Typography style={{ color: "#f53232" }}>Opened</Typography>}
      </TableCell>
      <TableCell>
       <Button variant="contained" onClick={(e)=> handleReplay(row, 2)}>Replay</Button>
        <DeleteForeverIcon onClick={(e)=> onDeleteRow()} className="cursorPointer" sx={{ml:5}} style={{ color: "red" }} />

      </TableCell>
    </TableRow>
  );
}
