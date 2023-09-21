import React, { Fragment, useContext, useEffect, useState } from "react";
import classifiedBG  from '../../asset/image/page.png'
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Grid, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import ClassifiedItem from "./ClassifiedItem";
import { ClassifiedCategoryUrl, classifiedUrl } from "../../api/Api";
import axios from "axios";
import { ClassifiedCategoryEffect, ClassifiedItemsEffect } from "../PageLoadEffects";
import { UserContext } from "../../utils/UserContext";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";

const ClassifiedBody = ({visitor}) => {
  const {msDetails,userDetails} = useContext(UserContext);
  const [classifiedCategory, setClassifiedCategory] = useState(null);
  const [classifiedItem, setClassifiedItemm]  = useState(null);
  const [inputValue, setInputValue] =  useState(null)
  const navigate = useNavigate();


  // Get all categories from api
    const getAllClassifiedCategory = () =>{
      let config = {
        method: 'get',
        url: ClassifiedCategoryUrl,
      };
        axios.request(config)
        .then((res)=>{
          setClassifiedCategory(res.data.data);
        })
    }
    useEffect(()=>{
      getAllClassifiedCategory();
    },[])

//Get all classified  items
const getAllClassifiedItems = ()=>{
   let config = {
      method: 'get',
      url: `${classifiedUrl}?microsite_id=${msDetails.id}`,
    };
    
    axios.request(config)
    .then((response) => {
      setClassifiedItemm(response.data.data)
    })
}
useEffect(()=>{
   getAllClassifiedItems();
},[])

// Search activity
    //handle input
    const handleInput = (e) =>{
      setInputValue(e.target.value);
      if(inputValue ===null){
        getAllClassifiedItems();
      }
  }

  // handle search method
  const handleSearch = (e, name) =>{
    e.preventDefault();
    var config;
    if(name){
        config = {
          method: 'get',
          url: `${classifiedUrl}?microsite_id=${msDetails.id}&category=${name}`,
      };
    }else{
      config = {
        method: 'get',
        url: `${classifiedUrl}?microsite_id=${msDetails.id}&keyword=${inputValue}`,
    };
    }
      axios.request(config)
      .then((response) => {
          setClassifiedItemm(response.data.data);
          setInputValue(null);
      })
     
  }

  // handle category filter
  const handleCategoryFilter = (name) =>{
    handleSearch(name)
  }

  return (
    <Fragment>
       <Tooltip title="Back">
            <div className="backArrow" onClick={(e)=>{navigate(-1)}}>
               <ArrowBackIcon/>
            </div> 
        </Tooltip>
      {visitor ===true &&  <div className="classified_top_section">
         <div className="classified_top_img">
            <img src={classifiedBG} alt=""/>
            <div className="classified_top_imgOverly">
               <div className="overly_conetnt">
                  <h4>Classified</h4>
                  <div className="classified_search">
                     <form onSubmit={(e)=> handleSearch(e,'')} >
                        <div className="searchBar">
                            <input type="text" placeholder="Search your item.." className="form_control" onChange={(e)=>handleInput(e)} />
                            <i><FontAwesomeIcon icon={faSearch} onClick={(e)=>handleSearch(e,'')} /></i>
                        </div>
                     </form>
                     {/* <div className="search_hint">
                        Popular search : <span> Mobile </span> <span> Laptop </span> <span> Table </span> <span>Router</span> <span> Conditionar </span>
                     </div> */}
                  </div>
               </div>
            </div>
         </div>
       </div>}
      
      {visitor ===true &&  <div className="classified_cetegory_list">
        <div className="classified_heading">
          <div className="section_name">
            List of Classifieds
          </div>
          <div className="classiffied_add_btn">
              <Link to='/classified-create'>
                  <Button variant="contained" color="success">
                     Add Your Post
                  </Button>
              </Link>
          </div>
        </div>
        {/* {classifiedCategory===null && ClassifiedCategoryEffect()} */}
        {/* onClick={(e)=> handleCategoryFilter(data.name)} */}
         {/* <Grid container spacing={2}>
           {classifiedCategory !==null && classifiedCategory.length>0 && classifiedCategory.map((data,key)=>{
            return(
              <Grid item xs={2} key={data.uuid}>
                <div className="list_category_item">
                    <div className="list_item_content">
                        <div className="category_img">
                            <img src={class3} alt="" />
                        </div>
                        <div className="categoryName"  >{data.name}</div>
                      
                    </div>
                </div>
              </Grid>
            )
           })
           }
         </Grid> */}
       </div>}
       
       {visitor ===false &&
          <div className="section_headear">
          <h4>My Classified</h4>
          <div className="btns_row">
            <Link to='/orderList'>
              <div className="Btn_one">
                My Purchases
              </div>
            </Link>
            <Link to='/classified-create'>
              <div className="Btn_two">
                 Add Classified
              </div>
            </Link>
            </div>
         </div> 

       } 
       {classifiedItem ===null && ClassifiedItemsEffect()}
       {classifiedItem !==null && classifiedItem.length===0 && <> <div className="placeholder_text"> No classified post to see ... </div> </>}
       <div className="classified_item_list">
          <Grid container spacing={2}>
            {classifiedItem && classifiedItem.length>0 && classifiedItem.map((data,key)=>{
              if(visitor===false){
                if(data.user.id ===userDetails.id){
                  return(
                    <Grid item lg={4}  md={6} sm={6} xs={6} key={data.uuid}>
                      <ClassifiedItem data={data} creater={true} getAllClassifiedItems={getAllClassifiedItems}/>
                   </Grid>
                   )
                }
              }else{
                if(data.user.id ===userDetails.id){
                  return(
                    <Grid item lg={4}  md={6} sm={6} xs={6} key={data.uuid}>
                      <ClassifiedItem data={data} creater={true} getAllClassifiedItems={getAllClassifiedItems}/>
                   </Grid>
                   )
                }else{
                  return(
                    <Grid item lg={4}  md={6} sm={6} xs={6} key={data.uuid}>
                      <ClassifiedItem data={data} creater={false} getAllClassifiedItems={getAllClassifiedItems}/>
                   </Grid>
                   )
                }
              }
             
            })}
          </Grid>
       </div>
    </Fragment>
  );
};

export default ClassifiedBody;
