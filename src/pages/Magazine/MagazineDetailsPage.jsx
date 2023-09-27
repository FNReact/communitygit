import React, { Fragment, useState } from "react";
import { Grid, Tooltip } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import ban1 from "../../asset/image/test4.jpg";

const MagazineDetailsPage = () => {
  const navigate = useNavigate();

  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={4} lg={3}></Grid>
        <Grid item xs={12} sm={12} md={8} lg={9}>
          <div className="content_body">
            <Tooltip title="Back">
              <div className="backArrow" onClick={(e) => navigate(-1)}>
                <ArrowBackIcon/>
              </div>
            </Tooltip>
            <div className="magazine_details">
              <Grid container spacing={2}>
                <Grid item xs={8}>
                  <div className="magazine_details_wrapper">
                    <div className="magzine_img">
                      <img src={ban1} alt="" />
                    </div>
                    <div className="content_title">
                      The Title Will be Here ..
                    </div>
                    <div className="content_text">
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Amet, aperiam? Lorem ipsum dolor sit, amet
                        consectetur adipisicing elit. Est doloribus, dolore
                        sapiente distinctio unde illo repellendus laboriosam
                        nisi et iste deserunt. Harum provident eos, quod ipsum
                        id natus mollitia minus, ab odit beatae esse sapiente 
                        atque doloremque voluptatem alias totam ea rem? Facere
                        numquam quae, sint quo assumenda itaque adipisci dolorum
                        dolore nam est voluptatem, at illum voluptate culpa
                        eaque alias esse ab, molestias excepturi distinctio in
                        hic? Repellat, dicta nam beatae nulla, saepe mollitia
                        inventore impedit incidunt eligendi voluptate excepturi
                        temporibus necessitatibus consequuntur magnam dolorum
                        dolores sunt autem veritatis veniam obcaecati suscipit
                        itaque doloribus! Ducimus fugit fuga repellat dolorem?
                      </p>

                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Deserunt voluptatem cum accusamus quos ipsa quod
                        cupiditate.
                      </p>

                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Expedita laboriosam error quasi ipsum soluta illo
                        blanditiis voluptas ducimus, laudantium voluptatibus
                        modi quo nihil ipsa odit, maiores cupiditate doloremque
                        eos suscipit magni fuga ad ab nemo? Reprehenderit
                        deserunt magni repellat corporis.
                      </p>

                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Impedit explicabo placeat facere ipsam temporibus
                        aspernatur ullam distinctio veritatis aliquam quos
                        architecto nam repellendus dicta, corrupti sed numquam
                        veniam rem pariatur est? Suscipit hic ducimus, eveniet
                        maxime omnis odio numquam quos, rem sed debitis sit
                        nesciunt? Ipsa, saepe nulla esse omnis nihil vero
                        adipisci incidunt doloribus maiores non assumenda
                        tempora ullam ab, corporis doloremque iste optio unde?
                        Laboriosam rerum dolores quam aut quasi doloribus
                        reiciendis saepe voluptatem debitis repellat, facere
                        magni id. Illum aut sapiente similique minima molestias
                        placeat sint hic consequuntur autem deserunt laudantium
                        accusantium esse recusandae, neque dolorem sequi
                        possimus dolorum voluptatem reiciendis illo officia quam
                        numquam. Esse.
                      </p>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={4}>
                  <div className="magzine_subItem_wrapper">
                    <div className="magzine_subItem">
                      <div className="magzine_subItem_img">
                        <img src={ban1} alt="" />
                      </div>
                      <div className="magzine_subItem_text">
                        <h4>
                          Lorem ipsum dolor sit, amet consectetur adipisicing
                          elit.
                        </h4>
                      </div>
                    </div>
                    <div className="magzine_subItem">
                      <div className="magzine_subItem_img">
                        <img src={ban1} alt="" />
                      </div>
                      <div className="magzine_subItem_text">
                        <h4>
                          Lorem ipsum dolor sit, amet consectetur adipisicing
                          elit.
                        </h4>
                      </div>
                    </div>
                    <div className="magzine_subItem">
                      <div className="magzine_subItem_img">
                        <img src={ban1} alt=""/>
                      </div>
                      <div className="magzine_subItem_text">
                        <h4>
                          Lorem ipsum dolor sit, amet consectetur adipisicing
                          elit.
                        </h4>
                      </div>
                    </div>
                    <div className="magzine_subItem">
                      <div className="magzine_subItem_img">
                        <img src={ban1} alt=""/>
                      </div>
                      <div className="magzine_subItem_text">
                        <h4>
                          Lorem ipsum dolor sit, amet consectetur adipisicing
                          elit.
                        </h4>
                      </div>
                    </div>
                    <div className="magzine_subItem">
                      <div className="magzine_subItem_img">
                        <img src={ban1} alt="" />
                      </div>
                      <div className="magzine_subItem_text">
                        <h4>
                          Lorem ipsum dolor sit, amet consectetur adipisicing
                          elit.
                        </h4>
                      </div>
                    </div>
                    <div className="magzine_subItem">
                      <div className="magzine_subItem_img">
                        <img src={ban1} alt="" />
                      </div>
                      <div className="magzine_subItem_text">
                        <h4>
                          Lorem ipsum dolor sit, amet consectetur adipisicing
                          elit.
                        </h4>
                      </div>
                    </div>
                    <div className="magzine_subItem">
                      <div className="magzine_subItem_img">
                        <img src={ban1} alt="" />
                      </div>
                      <div className="magzine_subItem_text">
                        <h4>
                          Lorem ipsum dolor sit, amet consectetur adipisicing
                          elit.
                        </h4>
                      </div>
                    </div>
                    <div className="magzine_subItem">
                      <div className="magzine_subItem_img">
                        <img src={ban1} alt="" />
                      </div>
                      <div className="magzine_subItem_text">
                        <h4>
                          Lorem ipsum dolor sit, amet consectetur adipisicing
                          elit.
                        </h4>
                      </div>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </div>
          </div>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default MagazineDetailsPage;
