import { useState, useEffect, useCallback, useContext } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
// @mui
import {
  Box,
  Card,
  Table,
  Button,
  Switch,
  Tooltip,
  TableBody,
  Container,
  IconButton,
  TableContainer,
  TablePagination,
  FormControlLabel,
  Backdrop,
} from "@mui/material";

import { ReactSession } from "react-client-session";

import axios from "axios";
import Swal from "sweetalert2";
import TableToolbar from "../table/TableToolbar";
import { TableEmptyRows, TableHeadCustom, TableNoData, TableSelectedActions, TableSkeleton } from "../table";
import MyAdminBugTableRow from "../table/MyAdminBugTableRow/MyAdminBugTableRow";
import useTable, { emptyRows, getComparator } from "../../hooks/useTable";
import Iconify from "../Iconify/Iconify";
import { notifyError, notifySuccess } from "../../utils/Toast";
import useIsMountedRef from "../../hooks/useIsMountedRef";
import { UserContext } from "../../utils/UserContext";
import { reportUrl } from "../../api/Api";
import MainLoader from "../PageLoadEffects/MainLoader";
import { ToastContainer } from "react-toastify";


// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "name", label: "Name", align: "left" },
  { id: "Subject", label: "Subject", align: "left" },
  { id: "Date", label: "Date", align: "left" },
  { id: "status", label: "Status", align: "left" },
  { id: "replay", label: "Replay", align: "left" },
  { id: "" },
];

// ----------------------------------------------------------------------

export default function MyAdminBugList() {
  ReactSession.setStoreType("sessionStorage");
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable({
    defaultOrderBy: "createdAt",
  });

  const isMountedRef = useIsMountedRef();
  const navigate = useNavigate();
  const {msDetails,userDetails} = useContext(UserContext)
  const [filterName, setFilterName] = useState("");
  const token = sessionStorage.getItem('token');

  const [currentData, setCurrentData] = useState([])
  const [tableData, setTableData] = useState([]);
  const [lastPage, setLastPage] = useState(null)
  const [totalLength, setTotalLength] = useState(0)

  const [loadershow, setLoaderShow] = useState(false)
  const [scrollTop, setScrollTop] = useState(false)


  const loggedInUser = sessionStorage.getItem('loggedInUserInfo')
  var parseUserData;
  if(loggedInUser){
    parseUserData = JSON.parse(loggedInUser)
  }
    // get all contacts
    const getAllContacts = useCallback(async () => {
      setLoaderShow(true)
        var url;
        if(msDetails?.create_by ===parseUserData?.user_id || parseUserData?.user_type ==='admin' ){
            url = `${reportUrl}?microsite_id=${msDetails.id}&keyword=`;
        }else{
            url = `${reportUrl}?microsite_id=${msDetails.id}&user_id=${parseUserData?.user_id}&keyword=`;
        }
        try {
          const response = await axios.get(url);
          if (isMountedRef.current) {
            setTableData(response.data.data);
            setLastPage(response.data?.last_page)
            setTotalLength(response.data?.total)
            setLoaderShow(false)
          }
        } catch (err) {
          setLoaderShow(false)
          if (err?.response) {
            notifyError(err?.response?.data?.message)
          }else{
            notifyError('Something went wrong!.')
          }
        }
      }, [isMountedRef]);
    
      useEffect(() => {
        getAllContacts();
      }, [getAllContacts]);
    


  const handleFilterName = (filterName) => {
    setFilterName(filterName);
    setPage(0);
  };


  const handleDeleteRow = (uuid) => {
    const url = `${reportUrl}/${uuid}`;
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(url, { headers: { Authorization: `Bearer ${token}` } })
          .then((response) => {
            getAllContacts()
            notifySuccess()
          });
      }
    });
  };
  const dataFiltered = applySortFilter({
    tableData,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const denseHeight = dense ? 60 : 80;
  const isNotFound =(!dataFiltered.length && !!filterName) 

  useEffect(() => {
    if(scrollTop ===true){
      window.scrollTo(0, 0)
      setScrollTop(false)
    }
  }, [scrollTop])

     // for table pagination
     const handleChangePage = (event, newPage) => {
      setLoaderShow(true)
      setPage(newPage);
      const updatePage = newPage+1;
      if(updatePage <=lastPage){
        if(newPage>page){
          let config = {
            method: 'get',
            url: `${reportUrl}?microsite_id=${msDetails.id}&current_page=${updatePage}`,
            headers: { 
              'Authorization': `Bearer ${token}`, 
            }
          };
          
          axios.request(config)
          .then((response) => {
            setLoaderShow(false)
            const preData = tableData;
            const currentData = response.data.data;
            setCurrentData(currentData)
            const storeData = preData.concat(currentData)
            setTableData(storeData)
            setScrollTop(true)
          })
          .catch((err)=>{
            setLoaderShow(false)
            if (err?.response) {
              notifyError(err?.response?.data?.message)
              setScrollTop(true)
            }else{
              notifyError('Something went wrong!.')
              setScrollTop(true)
            }
          })
        }else{
          setLoaderShow(false)
          setTableData(tableData)
          setScrollTop(true)
          //  const storeData = tableData?.diff(currentData)
        //  if(storeData){
        //   setTableData(storeData)
        //  }
        }
      }else{
        setLoaderShow(false)
        setScrollTop(true)
        // notifyError('No more page to show!')
      }
    };

  return (
      <Container>
          <Backdrop open={loadershow} className="backdrop_contorller">
            <MainLoader />
        </Backdrop>
        <Card>
          <TableToolbar
            filterName={filterName}
            onFilterName={handleFilterName}
            placeholder={'Search message...'}
            addButtonFor={'admin'}
            path={'/report-admin/form'}
            />
            <TableContainer className="report_table">
              {selected.length > 0 && (
                <TableSelectedActions
                  dense={dense}
                  numSelected={selected.length}
                  rowCount={tableData.length}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      tableData.map((row) => row.id)
                    )
                  }
                  actions={
                    <Tooltip title="Delete">
                      <IconButton
                        color="primary"
                        // onClick={() => handleDeleteRows(selected)}
                      >
                        <Iconify icon={"eva:trash-2-outline"} />
                      </IconButton>
                    </Tooltip>
                  }
                />
              )}

              <Table size={dense ? "small" : "medium"}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={tableData.length}
                  onSort={onSort}
                />
                <TableBody>
                  {dataFiltered
                    ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    ?.map((row, index) =>
                      row ? (
                        <MyAdminBugTableRow
                          key={row.id}
                          row={row}
                          index={index}
                          selected={selected.includes(row.id)}
                          onSelectRow={() => onSelectRow(row.id)}
                          onDeleteRow={() => handleDeleteRow(row.uuid)}
                        //   onEditRow={() => handleEditRow(row)}
                        />
                      ) : (
                        !isNotFound && (
                          <TableSkeleton
                            key={index}
                            sx={{ height: denseHeight }}
                          />
                        )
                      )
                    )}
                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(page, rowsPerPage, tableData.length)}
                  />
                  <TableNoData isNotFound={isNotFound} />
                </TableBody>
              </Table>
            </TableContainer>
          <Box sx={{ position: "relative" }}>
          <TablePagination
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
              component="div"
              count={totalLength}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={onChangeRowsPerPage}
            />
            {/* <FormControlLabel
              control={<Switch checked={dense} onChange={onChangeDense} />}
              label="Dense"
              sx={{ px: 3, py: 1.5, top: 0, position: { md: "absolute" } }}
            /> */}
          </Box>
        </Card>
        <ToastContainer />
      </Container>
  );
}

// ----------------------------------------------------------------------

function applySortFilter({ tableData, comparator, filterName }) {
  const stabilizedThis = tableData?.map((el, index) => [el, index]);

  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  tableData = stabilizedThis?.map((el) => el[0]);

  if (filterName) {
    tableData = tableData.filter(
      (item) => item?.subject.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  return tableData;
}
