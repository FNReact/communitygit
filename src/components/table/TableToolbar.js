import PropTypes from 'prop-types';
// @mui
import { Tooltip, IconButton, Stack, InputAdornment, TextField } from '@mui/material';
import Iconify from '../Iconify/Iconify';
import { Navigate, useNavigate } from 'react-router-dom';


// ----------------------------------------------------------------------

TableToolbar.propTypes = {
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};

export default function TableToolbar({ filterName, onFilterName,placeholder, addButtonFor,path }) {
  const navigate = useNavigate()
  return (
    <Stack  direction="row" alignItems="center" justifyContent="space-between" sx={{ py: 2.5, px: 3 }}>
      <TextField
        value={filterName}
        onChange={(event) => onFilterName(event.target.value)}
        placeholder={placeholder}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon={'eva:search-fill'} sx={{ color: 'text.disabled', width: 20, height: 20 }} />
            </InputAdornment>
          ),
        }}
      />


      {addButtonFor ==='admin'
       && 
       <Tooltip title="Add new">
        <IconButton color="primary" onClick={(e)=>navigate(path)}>
          <Iconify icon={'ic:round-add'} />
        </IconButton>
      </Tooltip>
      }
      
    </Stack>
  );
}
