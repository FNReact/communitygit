import React, { Fragment, useEffect} from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import HomePage from "../pages/HomePage";
import MemberPage from "../pages/MemberPages/MemberPage";
import ClassifiedPage from "../pages/ClassifiedPages/ClassifiedPage";
import JobPage from "../pages/JobPages/JobPage";
import NotificationPage from "../pages/NotificationPages/NotificationPage";
import MyJobListPage from "../pages/JobPages/MyJobListPage";
import JobItemDetailsPage from "../pages/JobPages/JobItemDetailsPage";
import NoticePage from "../pages/NoticePages/NoticePage";
import LoginPage from "../pages/AuthenticationPages/LoginPage";
import LoungeItemDetailPage from "../pages/LoungePages/LoungeItemDetailPage";
import PostPage from "../pages/UserPages/ProfilePage";
import PostPageOther from "../pages/UserPages/ProfilePageOther";
import RegisterPage from "../pages/AuthenticationPages/RegisterPage";
import CreatCommuinityFormPage from "../pages/AuthenticationPages/CreatCommuinityFormPage";
import Protected from "../utils/Protected";
import NotFoundPage from "../pages/404Pages/NotFoundPage";
import { UserContext } from "../utils/UserContext";
import TopNaviation from "../components/TopNavigation/TopNaviation";
import LeftSideBar from "../components/LeftSideBar/LeftSideBar";
// import TestPage from "../pages/TestPage";
import NotFoundComponent from "../components/404/404";
import AddMemberPage from "../pages/MemberPages/AddMemberPage";
import axios from "axios";
import { commonUserUrl, magazineMainUrl, micrositeDetailsUrl, userInfoUrl, userMicrositesUrl } from "../api/Api";
import MyJobCreatePage from "../pages/JobPages/MyJobCreatePage";
import { Container } from "@mui/material";
import ClassifiedCreatePage from "../pages/ClassifiedPages/ClassifiedCreatePage";
import ClassifiedItemDetailPage from "../pages/ClassifiedPages/ClassifiedItemDetailPage";
import MyClassifiedPage from "../pages/ClassifiedPages/MyClassifiedPage";
import ClassifiedOrderListPage from "../pages/ClassifiedPages/ClassifiedOrderListPage";
import SingleClassifiedOrderPage from "../pages/ClassifiedPages/SingleClassifiedOrderPage";
import GeneralLoginPage from "../pages/AuthenticationPages/GeneralLoginPage";
import UserCommunitiesSitesPage from "../pages/UserPages/UserCommunitiesSitesPage";
import ClassifiedOrderDetailPage from "../pages/ClassifiedPages/ClassifiedOrderDetailPage";
import CreatCommuinityEmailCheckPage from "../pages/AuthenticationPages/CreatCommuinityEmailCheckPage";
import CreatCommuinityLoginPage from "../pages/AuthenticationPages/CreatCommuinityLoginPage";
import CreatCommuinityRegisterPage from "../pages/AuthenticationPages/CreatCommuinityRegisterPage";
import ResourcePage from "../pages/ResourcePages/ResourcePage";
import ResourceDetailsPage from "../pages/ResourcePages/ResourceDetailsPage";
import ResourceCreatePage from "../pages/ResourcePages/ResourceCreatePage";
import MyResourcePage from "../pages/ResourcePages/MyResourcePage";
import LocalBusinessPage from "../pages/LocalBusinessPages/LocalBusinessPage";
import LocalBusinessDetailsPage from "../pages/LocalBusinessPages/LocalBusinessDetailsPage";
import LocalBusinessCreatePage from "../pages/LocalBusinessPages/LocalBusinessCreatePage";
import MyLocalBusinessPage from "../pages/LocalBusinessPages/MyLocalBusinessPage";
import EventPage from "../pages/EventPages/EventPage";
import EventCreatePage from "../pages/EventPages/EventCreatePage";
import EventDetailsPage from "../pages/EventPages/EventDetailsPage";
import MediaPage from "../pages/Media/MediaPage";
import MediaNestedPage from "../pages/Media/MediaNestedPage";
import EventInvitedPeoplePage from "../pages/EventPages/EventInvitedPeoplePage";
import CommunityPackegs from "../pages/AuthenticationPages/CommunityPackegs";
import ChatPage from "../pages/ChatPage";
import CommunitySetUpPage from "../pages/CommunitySetUp/CommunitySetUpPage";
import CommunityPtofileUpdatePage from "../pages/CommunitySetUp/CommunityPtofileUpdatePage";
import IcirclesLoginPage from "../pages/AuthenticationPages/IcirclesLoginPage";
import CommunityInfoPage from "../pages/CommunityInfoPage";
import MemberJoinPage from "../pages/MemberJoinPage/MemberJoinPage";
import InvitatonPage from "../pages/AuthenticationPages/InvitatonPage";
import chat from "../asset/image/Chat.png";
import InvitatonMemberPage from "../pages/AuthenticationPages/InvitatonMemberPage";
import DeveloperReportPage from "../pages/BugReports/DeveloperReportPage";
import AdminReportPage from "../pages/BugReports/AdminReportPage";
import AdminReportCreatePage from "../pages/BugReports/AdminReportCreatePage";
import AdminReportDetailsPage from "../pages/BugReports/AdminReportDetailsPage";
import EventBannrUpdatePage from "../pages/EventPages/EventBannrUpdatePage";
import ActivateAccountPage from "../pages/AuthenticationPages/ActivateAccountPage";
import CommunityInfoPublicPage from "../pages/CommunityInfoPublicPage";
import CommunityPtofileCompletePage from "../pages/CommunitySetUp/CommunityPtofileCompletePage";
import RegisterUserSearchPage from "../pages/AuthenticationPages/RegisterUserSearchPage";
import { notifyError } from "../utils/Toast";
import CompleteBannerAvatarPage from "../pages/CommunitySetUp/CompleteBannerAvatarPage";
import MatrimonialPage from "../pages/Matrimonial/MatrimonialPage";
import MagazinePage from "../pages/Magazine/MagazinePage";
import MagazineMenuPage from "../pages/Magazine/MagazineMenuPage";
import MagazineMenuCreatePage from "../pages/Magazine/MagazineMenuCreatePage";
import MagazineContentPage from "../pages/Magazine/MagazineContentPage";
import MagazineContentCreatePage from "../pages/Magazine/MagazineContentCreatePage";
import MagazineDetailsPage from "../pages/Magazine/MagazineDetailsPage";
import MagazineDemoPage from "../pages/Magazine/MagazineDemoPage";
import RepresentativePage from "../pages/RepresentativePage/RepresentativePage";
import RepresentativeDetailsPage from "../pages/RepresentativePage/RepresentativeDetailsPage";
import RepresentativeCreatePage from "../pages/RepresentativePage/RepresentativeCreatePage";
import MyRepresentativePage from "../pages/RepresentativePage/MyRepresentativePage";
import MagazineDetailsDemoPage from "../pages/Magazine/MagazineDetailsDemoPage";
import MagazineCatgoryPostsPage from "../pages/Magazine/MagazineCatgoryPostsPage";
import MagazineCategoryDetailsPage from "../pages/Magazine/MagazineCategoryDetailsPage";
import MagazineSeeAllPostsPage from "../pages/Magazine/MagazineSeeAllPostsPage";
import MatrimonyProfilePage from "../pages/Matrimonial/MatrimonyProfilePage";
import MatrimonyProfileCreatePage from "../pages/Matrimonial/MatrimonyProfileCreatePage";

const AppRouter = () => {
  const navigate=useNavigate();
  const userDetails = JSON.parse(sessionStorage.getItem("data"));
  const msDetails = JSON.parse(sessionStorage.getItem("msDetails"));
  const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUserInfo"));
  const magazine = JSON.parse(sessionStorage.getItem("magazine"));
  const url = window.location.href;
  const getUrl = window.location.href;
  const segNamae = getUrl.split("/").pop();
  const segName2 = getUrl.split("/")

    let params = new URLSearchParams(url);
    var token  = params.get("t");
    var uuid   = params.get("u");
      // function for microsite details
      const getMicrositeDetails = (getUuid, getToken)=>{
        let config = {
          method: 'get',
          url: `${micrositeDetailsUrl}/${getUuid}`,
        };
  
        axios.request(config)
        .then((response) => {
          sessionStorage.setItem('msDetails',JSON.stringify(response.data))
          if(getToken && getUuid){
            sessionStorage.setItem('token',getToken)
            getUserDetails(getToken,getUuid)
          }
          if(getUuid && getToken ===''){
            window.location.href = '/login';
          }
        })
      }
  
      // function for user details
      const getUserDetails = (getToken, getUuid) =>{
        let config = {
          method: 'get',
          url: userInfoUrl,
          headers: { 
            'Authorization': `Bearer ${token}`, 
          }
        };
        
        axios.request(config)
        .then((response) => {
          sessionStorage.setItem("token", getToken);
          sessionStorage.setItem("data", JSON.stringify(response.data));
          if(getToken && getToken){
            window.location.href = '/'
          }
          if(getUuid ==='' && segName2[3].match('createCommuinity') === null){
            window.location.href = '/commuinityList'
          }
          if(getUuid ==='' && segName2[3].match('createCommuinity') !== null){
            window.location.href = '/create'
          }
        })
      }

    // getUserDetails('1135|D5MPogmB0fr41T36qhlPmAKRxVdwQNd5cdxowlDm')
    //uuid and token finds
    if(token !==null && uuid !==null){
      getUserDetails(token,uuid);
      getMicrositeDetails(uuid,token);
    }
    //only uuid find
    if(uuid !==null && (token==='' || token===null)){
      getMicrositeDetails(uuid,'');
    }
    //only token
    if(token !==null && (uuid==='' || uuid ===null)){
      getUserDetails(token,'');
    }  


    useEffect(()=>{
      if(msDetails && userDetails && segNamae==='' ){
      let config = {
        method: 'get',
        url: `${commonUserUrl}/${userDetails?.id}/${msDetails?.id}`,
      };
      axios.request(config)
      .then((res) => {
        if(res?.data && res?.data?.status ===2){
          notifyError('You ware invited please accept invitation first')
          setTimeout(()=>{
            navigate('/community-info-public', {state:{uuid:msDetails.uuid, memberStatus:2, reload:true}})
          },2000)
        }
        if(res?.data && res?.data?.status ===3){
          notifyError('You are blocked on this community')
          setTimeout(()=>{
            navigate('/community-info-public', {state:{uuid:msDetails.uuid, memberStatus:3,reload:true}})
          },2000)
        }
        if(res?.data && res?.data?.status ===0){
          notifyError('Your joining status is pending...')
          setTimeout(()=>{
            navigate('/community-info-public', {state:{uuid:msDetails.uuid, memberStatus:0,reload:true}})
          },2000)
        }
      }).catch((e)=>  {
        notifyError('Your are not member of this comminity join first.')
          setTimeout(()=>{
            navigate('/community-info-public', {state:{uuid:msDetails.uuid, memberStatus:-1,reload:true}})
          },1500)
       })
    }
    },[])


    const getAllUserMicrosites = async() => {
      var ids = [];
      let config = {
        method: 'get',
        url: `${userMicrositesUrl}?type_id=9`,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      };
      await axios.request(config)
        .then((response) => {
        
          if(response?.data?.data.length>0){
            response?.data?.data.forEach(element => {
              if(element.status ===1){
                ids.push(element.microsites.id)
              }
            });
          }
          sessionStorage.setItem('user-ms-ids', JSON.stringify(ids))
        }).catch((e)=>{
          sessionStorage.setItem('user-ms-ids', JSON.stringify(ids))
        }
        )
    }

    useEffect(()=>{
      if(token){
        getAllUserMicrosites()
      }
    },[])


    // handle get main magazine datas
    const handleGetMainMagazine = ()=>{
      let config = {
        method: 'get',
        url: `${magazineMainUrl}/${msDetails.id}`,
      };

      axios.request(config)
      .then((response) => {
        sessionStorage.setItem("magazine", JSON.stringify(response.data));
      })
      .catch((error) => {
        // console.log(error);
      });

    }

    // useEffect(()=>{
    //   if(magazine ===null && msDetails?.id){
    //     handleGetMainMagazine()
    //   }else if(magazine?.microsite_info?.id !==msDetails?.id){
    //     handleGetMainMagazine()
    //   }
    // },[magazine])
    useEffect(()=>{
      if( msDetails?.id){
        handleGetMainMagazine()
      }
    },[])

    

  return (
    <Fragment>
      <UserContext.Provider value={{userDetails,msDetails,loggedInUser,magazine}}>
        {(userDetails 
          && msDetails 
          && segNamae !=='commuinityList' 
          && segNamae !=='login' 
          && segNamae !=='register' 
          && segNamae !=='home'
          && segNamae !=='community-info-public'
          && segNamae !=='register-user-search'
          && segNamae !=='community-packeges') ? <TopNaviation /> : ""}

        <Container>
          {(userDetails 
            && msDetails 
            && segNamae !=='commuinityList' 
            && segNamae !=='login' 
            && segNamae !=='register' 
            && segNamae !=='home' 
            && segNamae !=='community-info-public'
            && segNamae !=='complete-profile'
            && segNamae !=='register-user-search'
            && segNamae !=='newCommuinity'
            && segNamae !=='banner'
            && segNamae !=='avatar'
            && segNamae !=='community-packeges') ? <LeftSideBar /> : ""}

          {(userDetails 
            && msDetails 
            && segNamae !=='commuinityList' 
            && segNamae !=='login' 
            && segNamae !=='register' 
            && segNamae !=='home' 
            && segNamae !=='community-info-public'
            && segNamae !=='register-user-search'
            && segNamae !=='chat'
            && segNamae !=='community-packeges') ? <>
            <div className="chat_box_icon">
            <Link to="/chat">
              <div className="chat_button">
                <img src={chat} alt="" />
                <span>Chat</span>
              </div>
            </Link>
        </div></> : ""}
            
          <Routes>
            {/* Authentication Pages Routes */}
            <Route exact path="/"  element={<Protected Component={HomePage} />}/>
            <Route exact path="/login" element={<LoginPage />} />
            <Route exact path="/login-icircles" element={<IcirclesLoginPage />} />
            <Route exact path="/activate-account" element={<ActivateAccountPage />} />
            <Route exact path="/create" element={<CreatCommuinityEmailCheckPage/>}/>
            <Route exact path="/register" element={<RegisterPage />} />
            <Route exact path="/register-user-search" element={<RegisterUserSearchPage />} />
            <Route exact path="/invitation" element={<InvitatonPage />} />
            <Route exact path="/member-invitation" element={<InvitatonMemberPage />} />
            <Route exact path="/create/login" element={<CreatCommuinityLoginPage/>}/>
            <Route exact path="/create/newCommuinity" element={<CreatCommuinityFormPage/>}/>
            <Route exact path="/create/register" element={<CreatCommuinityRegisterPage/>}/>
            <Route exact path="/home" element={<GeneralLoginPage />} />
            <Route exact path="commuinityList" element={<UserCommunitiesSitesPage />} />
            <Route exact path="community-packeges" element={<CommunityPackegs />} />
           
            
            <Route exact path="/member-join" element={<MemberJoinPage />} />

            <Route exact path="/community-info" element={<Protected Component={CommunityInfoPage} />}/>
            <Route exact path="/community-info-public" element={<CommunityInfoPublicPage />} />



            {/* Reports Pages Routes */}
            <Route exact path="/report-developer" element={<Protected Component={DeveloperReportPage} />}/>
            <Route exact path="/report-admin" element={<Protected Component={AdminReportPage} />}/>
            <Route exact path="/report-admin/details" element={<Protected Component={AdminReportDetailsPage} />}/>
            <Route exact path="/report-admin/form" element={<Protected Component={AdminReportCreatePage } />}/>
           

            {/* Job Pages Routes */}
            <Route exact path="/job" element={<Protected Component={JobPage} />}/>
            <Route exact path="/my-job-list" element={<Protected Component={MyJobListPage} />}/>
            <Route exact path="/my-job" element={<Protected Component={MyJobCreatePage} />}/>
            <Route exact path="/job-details" element={<Protected Component={JobItemDetailsPage} />}/>

            {/* Classified Pages Routes */}
            <Route exact path="/classified-create" element={<Protected Component={ClassifiedCreatePage} />}/>
            <Route exact path="/classified-detail" element={<Protected Component={ClassifiedItemDetailPage} />}/>
            <Route exact path="/classified" element={<Protected Component={ClassifiedPage} />}/>
            <Route exact path="myClassified" element={<Protected Component={MyClassifiedPage} />}/>
            <Route exact path="/singleOrder" element={<Protected Component={SingleClassifiedOrderPage} />} />
            <Route exact path="/orderList" element={<Protected Component={ClassifiedOrderListPage} />} />
            <Route exact path="/orderDetails" element={<Protected Component={ClassifiedOrderDetailPage} />} />

            {/* Lounge Pages Routes */}
            <Route exact path="/loungeitemDetail" element={<Protected Component={LoungeItemDetailPage} />}/>
            <Route exact path="/community-profile" element={<Protected Component={PostPage} />}/>
            <Route exact path="/community-profile/update" element={<Protected Component={CommunityPtofileUpdatePage} />}/>
            <Route exact path="/complete-profile" element={<Protected Component={CommunityPtofileCompletePage} />}/>
            <Route exact path="/complete-profile/:name" element={<Protected Component={CompleteBannerAvatarPage} />}/>
            <Route exact path="/community-profile/other" element={<Protected Component={PostPageOther} />}/>

            {/* Member Pages Routes */}
            <Route exact path="/member" element={<Protected Component={MemberPage} />}/>
            <Route exact path="/add-member" element={<Protected Component={AddMemberPage} />}/>
           
            {/* Resource Pages Routes */}
            <Route exact path="/resource" element={<Protected Component={ResourcePage} />}/>
            <Route exact path="/resource-details" element={<Protected Component={ResourceDetailsPage} />}/>
            <Route exact path="/resource-create" element={<Protected Component={ResourceCreatePage} />}/>
            <Route exact path="/myResource" element={<Protected Component={MyResourcePage} />}/>

            {/* Representative Pages Routes */}
            <Route exact path="/local-representatives" element={<Protected Component={RepresentativePage} />}/>
            <Route exact path="/representative-details" element={<Protected Component={RepresentativeDetailsPage} />}/>
            <Route exact path="/representative-create" element={<Protected Component={RepresentativeCreatePage} />}/>
            <Route exact path="/my-representative" element={<Protected Component={MyRepresentativePage} />}/>

             {/* Local Business Pages Routes */}
            <Route exact path="/localBusiness" element={<Protected Component={LocalBusinessPage} />}/>
            <Route exact path="/localBusiness-details" element={<Protected Component={LocalBusinessDetailsPage} />}/>
            <Route exact path="/localBusiness-create" element={<Protected Component={LocalBusinessCreatePage} />}/>
            <Route exact path="/myLocalBusiness" element={<Protected Component={MyLocalBusinessPage} />}/>
            <Route exact path="/localBusiness" element={<Protected Component={LocalBusinessPage} />}/>

            {/* Matrimonial Pages Routes */}
            <Route exact path="/matrimonial" element={<Protected Component={MatrimonialPage} />}/>

            {/* Magazine Pages Routes */}
            <Route exact path="/magazine" element={<Protected Component={MagazinePage} />}/>
            <Route exact path="/magazine-see-all/:position" element={<Protected Component={MagazineSeeAllPostsPage} />}/>
            <Route exact path="/magazine-category-details" element={<Protected Component={MagazineCategoryDetailsPage} />}/>
            <Route exact path="/magazine-category-posts" element={<Protected Component={MagazineCatgoryPostsPage} />}/>
            <Route exact path="/magazine-demo" element={<Protected Component={MagazineDemoPage} />}/>
            <Route exact path="/magazine-menu" element={<Protected Component={MagazineMenuPage} />}/>
            <Route exact path="/magazine-menu-create" element={<Protected Component={MagazineMenuCreatePage} />}/>
            <Route exact path="/magazine-content" element={<Protected Component={MagazineContentPage} />}/>
            <Route exact path="/magazine-content-create" element={<Protected Component={MagazineContentCreatePage} />}/>
            <Route exact path="/magazine-details" element={<Protected Component={MagazineDetailsPage} />}/>
            <Route exact path="/magazine-details-demo" element={<Protected Component={MagazineDetailsDemoPage} />}/>

            {/* Matrimony pages route */}
            <Route exact path="/my-matrimony-profile" element={<Protected Component={MatrimonyProfilePage} />}/>
            <Route exact path="/my-matrimony-profile-create" element={<Protected Component={MatrimonyProfileCreatePage} />}/>

             
            {/* Event Pages Routes */}
            <Route exact path="/event" element={<Protected Component={EventPage} />}/>
            <Route exact path="/event-create" element={<Protected Component={EventCreatePage} />}/>
            <Route exact path="/event-detail" element={<Protected Component={EventDetailsPage} />}/>
            <Route exact path="/event/invite" element={<Protected Component={EventInvitedPeoplePage} />}/>
            <Route exact path="/event-banner" element={<Protected Component={EventBannrUpdatePage} />}/>


            {/* Media Pages Routes */}
            <Route exact path="/media" element={<Protected Component={MediaPage} />}/>
            <Route exact path="/files/:name" element={<Protected Component={MediaNestedPage}/>} />
            
             {/* Community setup routes */}
            <Route exact path="/community-setup" element={<Protected Component={CommunitySetUpPage} />}/>

             {/* Chat Box routes */}
            <Route exact path="/chat" element={<Protected Component={ChatPage} />}/>

             {/* Others Page */}
            {(userDetails && msDetails) ? (
             <Route path="*" element={<NotFoundComponent />} />) : ( <Route path="*" element={<NotFoundPage />} />)}
            <Route exact path="/notification" element={<Protected Component={NotificationPage} />}/>
            <Route exact path="/notice" element={<Protected Component={NoticePage} />}/>
            {/* <Route exact path="/testpage" element={<TestPage />} /> */}
          </Routes>
        </Container>
      </UserContext.Provider>
    </Fragment>
  );
};

export default AppRouter;