import React from "react";
import tb  from '../../asset/image/test1.png'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from "react-router-dom";
import InfoIcon from '@mui/icons-material/Info';

const ClassifiedItem2 = ()=>{
    return(
        <>
         <Link to='/classified-detail'>
           <div className="classified_itemLayout2">
             <div className="classified_item_img">
                 <img src={tb} alt="" />
             </div>
             <div className="item_content">
                <div className="post_title">
                   Adila Sofa Chair (Marina Plata sefu)
                </div>
                <div className="post_bottom">
                 <div className="post_amount">
                    20,000 Tk
                 </div>
                 <div className="cart_icon">
                     {/* <ShoppingCartIcon/> */}
                     <InfoIcon/>
                 </div>
             </div>
             </div>
          </div>
         </Link>
        </>
    )
}
 
export default ClassifiedItem2