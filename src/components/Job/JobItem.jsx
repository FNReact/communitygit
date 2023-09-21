import { faBan, faChartSimple, faEdit, faEllipsisVertical, faGlobe, faGraduationCap, faLevelUpAlt, faLocation, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import  Logo  from '../../asset/image/0000111.png'
import { allJobsUrl, baseUrl } from "../../api/Api";
import { UserContext } from "../../utils/UserContext";
import Swal from "sweetalert2";
import axios from "axios";
import { notifyError, notifySuccess } from "../../utils/Toast";
import { ToastContainer } from "react-toastify";
import { Avatar, Grid, IconButton } from "@mui/material";
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import parser from 'html-react-parser';
import WorkIcon from '@mui/icons-material/Work';
import LanguageIcon from '@mui/icons-material/Language';

const JobItem = ({job,getAllJobs})=>{
    const navigate = useNavigate();
    const {userDetails} = useContext(UserContext);

    const token = sessionStorage.getItem('token');
    const URL = window.location.href;
    const pageName = URL.split('/').pop();

    // Delete job by user
    const handleDeleteJob = (uuid)=>{
        Swal.fire({
            heightAuto: false,
            backdrop: false,
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete it!",
          }).then((result) => {
            if (result.isConfirmed) {
              let config = {
                method: "delete",
                url: `${allJobsUrl}/${uuid}`,
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              };
              axios 
                .request(config)
                .then((response) => {
                  notifySuccess();
                  getAllJobs();
                })
                .catch((err)=>{
                  if (err?.response) {
                    notifyError(err?.response?.data?.message)
                  }else{
                    notifyError('Something went wrong!.')
                  }
                })
            }
          });  
    }

    // Edit my job 
    const handleEditJob = (uuid) =>{
        navigate('/my-job', {state:{uuid:uuid}})
    }


    const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

    return(
          <Fragment>
              <div className="job_item_info">
                 <div className="job_item_info_top">
                      {job && job.company_logo !==null && <div className="company_logo" onClick={(e)=>{navigate('/job-details',{state:{uuid:job.uuid}})}}>
                          {job  && <img src={`${baseUrl}/${job.company_logo}`}  alt={job.job_title}/>}
                      </div>}
                      
                      <div className="job_item_infoTop_right">
                          {job && <h4 onClick={(e)=>{navigate('/job-details',{state:{uuid:job.uuid}})}}>{job.job_title}</h4>}
                          <ul>
                            {job && <li> <WorkIcon/> {job.company_name}</li>}
                            {job && <li className="workType"> <LanguageIcon/> {job.work_type}</li>}
                            {/* {job && <li className="postedTime"> <AccessTimeIcon/>  {job.publish_date}</li>} */}
                          </ul>
                      </div>
                 </div>
                 <div className="job_item_info_middle" onClick={(e)=>{navigate('/job-details',{state:{uuid:job.uuid}})}}>
                     {/* {job && <p>({job.job_designation})</p>} */}
                     {job?.job_description && <p>{parser(job?.job_description?.slice(0,170))} ...</p>}
                 </div>
                 <div className="job_fotter" onClick={(e)=>{navigate('/job-details',{state:{uuid:job.uuid}})}}>
                   <ul>
                      {job && <li><i><FontAwesomeIcon icon={faChartSimple}/></i> {job.experience_level}</li>}
                      {job && <li><i><FontAwesomeIcon icon={faLocation}/></i> {job.location}</li>}
                   </ul>
                   <div className="dead-line">
                      {job && <span> <i className="fa-solid fa-location-dot"></i>  Deadline : {job.application_deadline}</span> }
                    </div>
                 </div>

                  {job && pageName !=='job' && job.user.id === userDetails.id &&  
                      <div>
                          <div className="job_info_btn">
                                <Avatar sx={{ width: 30, height: 30 }}
                                   ref={anchorRef}
                                   id="composition-button"
                                   aria-controls={open ? 'composition-menu' : undefined}
                                   aria-expanded={open ? 'true' : undefined}
                                   aria-haspopup="true"
                                   onClick={handleToggle}
                                >
                                  <MoreVertIcon/>
                               </Avatar>
                          </div>
                         <Popper
                            open={open}
                            anchorEl={anchorRef.current}
                            role={undefined}
                            placement="bottom-start"
                            transition
                            disablePortal
                          >
                            {({ TransitionProps, placement }) => (
                              <Grow
                                {...TransitionProps}
                                style={{
                                  transformOrigin:
                                    placement === 'bottom-start' ? 'left top' : 'left bottom',
                                }}
                              >
                                <Paper>
                                  <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList
                                      autoFocusItem={open}
                                      id="composition-menu"
                                      aria-labelledby="composition-button"
                                      onKeyDown={handleListKeyDown}>
                                      <MenuItem onClick={(e) =>{handleClose(e); handleEditJob(job.uuid)}}> <FontAwesomeIcon icon={faEdit}/> Edit Job Post</MenuItem>
                                      <MenuItem onClick={(e) =>{handleClose(e); handleDeleteJob(job.uuid)}}> <FontAwesomeIcon icon={faTrash} /> Delete Job Post</MenuItem>
                                    </MenuList>
                                  </ClickAwayListener>
                                </Paper>
                              </Grow>
                            )}
                          </Popper>
                      </div>
                   }
              </div>
                   
            <ToastContainer />
       </Fragment>
    )
}

export default JobItem