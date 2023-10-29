const baseUrl = "https://icircles.app";

const loginUrl = `${baseUrl}/api/auth/login`;
const registerUrl = `${baseUrl}/api/auth/register`;
const userDetailsUrl = `${baseUrl}/api/publicprofile`;
const userInfoUrl = `${baseUrl}/api/auth/user`;
const commonUserUrl = `${baseUrl}/api/common/user`;
const createFeedsUrl = `${baseUrl}/api/community/feeds`;
const commentsUrl = `${baseUrl}/api/community/comments`;
const allMembersUrl = `${baseUrl}/api/massociation/members`;
const commuinityUrl = `${baseUrl}/api/mymicrosites/microsite`;
const userCheckUrl = `${baseUrl}/api/auth/users/usercheck`;
const addUserUrl = `${baseUrl}/api/common/user`;

//get all community microsites where type_id=9
const allMicrositeUrl = `${baseUrl}/api/microsite/microsites`;

//specific user's microsite 
const userMicrositesUrl = `${baseUrl}/api/mymicrosites/microsites`;
const micrositeDetailsUrl = `${baseUrl}/api/microsite/details`;

// jobs api
const allJobsUrl = `${baseUrl}/api/jobboard/jobs`;
const allJobCategoryUrl =`${baseUrl}/api/jobboard/categories`;
//comment and like
const reactionsUrl = `${baseUrl}/api/community/postreaction`;
const commentReactionUrl = `${baseUrl}/api/community/commentsreaction`;

//Classified api
const classifiedUrl = `${baseUrl}/api/classified/item`;
const ClassifiedCategoryUrl = `${baseUrl}/api/classified/categories`;
const classifiedBidsUrl = `${baseUrl}/api/classified/bids`;
const classifiedOrderUrl = `${baseUrl}/api/classified/Order`;
const classifiedMyOrderUrl = `${baseUrl}/api/classified/myorder`;


//localresource
const resourceUrl = `${baseUrl}/api/community/localresource`;
const resourceMediaUrl = `${baseUrl}/api/community/localresource/media`;

//local business/entity
const localBusinessUrl = `${baseUrl}/api/community/localentity`;
const businessTypeUrl = `${baseUrl}/api/community/typesuggestion`;
const localBusinessMediaUrl = `${baseUrl}/api/community/localentity/media`;

// events
const eventsUrl = `${baseUrl}/api/common/events`;
const eventMediaUrl = `${baseUrl}/api/common/events/media`;
const eventsReviewUrl = `${baseUrl}/api/common/eventsreview`;
const eventParticipantUrl = `${baseUrl}/api/common/participants`;

//Media
const allMediaUrl = `${baseUrl}/api/mymicrosites/allmedia`;
// const deleteFolderUrl = `${baseUrl}/api/auth/user/media`;
const deleteFolderUrl = `${baseUrl}/api/mymicrosites/deletefolder`;
const editMediaFolderUrl =`${baseUrl}/api/mymicrosites/editfolder`;
const editMediaUrl = `${baseUrl}/api/mymicrosites/editmedia`;
const addMediaUrl = `${baseUrl}/api/mymicrosites/media`;


// Bug report api
const reportUrl = `${baseUrl}/api/common/micrositecontact`;

// Magazine api
const categoryUrl = `${baseUrl}/api/cms/pagecategories`;
const magazineMainUrl = `${baseUrl}/api/cms/frontpages`;
const postUrl = `${baseUrl}/api/cms/pages`;
const postDetailsUrl = `${baseUrl}/api/cms/pagebasedpost`;

const getPostsByCatIdUrl= `${baseUrl}/api/cms/categorypages`;

const matrimonyUrl = `${baseUrl}/api/matrimony`;

// const getSinglePostUrl =  `${baseUrl}/api/cms/dynamiccontent`
const mediaUploadUrl = `${baseUrl}/api/cms/pages`;
const mediaDeleteUrl = `${baseUrl}/api/cms/pages`;

// chat rooms
const chatRoomUrl = `${baseUrl}/api/chat/rooms`;
const chatMessagesUrl = `${baseUrl}/api/chat/messages`;

// recommendation 
const resourceRecommendationUrl = `${baseUrl}/api/community/resourcerecommandations`

const businessRecommendationUrl = `${baseUrl}/api/community/recommandations`



let token = sessionStorage.getItem("token");
const header = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};
const multipartHeader = {
  "Content-Type": "multipart/form-data",
  Authorization: `Bearer ${token}`,
};

export {
  baseUrl,
  loginUrl,
  userInfoUrl,
  userDetailsUrl,
  registerUrl,
  header,
  multipartHeader,
  createFeedsUrl,
  commentsUrl,
  allMembersUrl,
  commuinityUrl,
  userCheckUrl,
  addUserUrl,
  allMicrositeUrl,
  micrositeDetailsUrl,
  allJobsUrl,
  allJobCategoryUrl,
  reactionsUrl,
  commentReactionUrl,
  ClassifiedCategoryUrl,
  classifiedUrl,
  userMicrositesUrl,
  classifiedBidsUrl,
  classifiedOrderUrl,
  classifiedMyOrderUrl,
  commonUserUrl,
  resourceUrl,
  resourceMediaUrl,
  localBusinessUrl,
  businessTypeUrl,
  localBusinessMediaUrl,
  eventsUrl,
  eventMediaUrl,
  eventsReviewUrl,
  eventParticipantUrl,
  allMediaUrl,
  deleteFolderUrl,
  editMediaFolderUrl,
  editMediaUrl,
  addMediaUrl,

  reportUrl,

  magazineMainUrl,
  categoryUrl,
  postUrl,
  postDetailsUrl,
  getPostsByCatIdUrl,

  matrimonyUrl,
  
  mediaUploadUrl,
  mediaDeleteUrl,

  chatRoomUrl,
  chatMessagesUrl,


  resourceRecommendationUrl,
  businessRecommendationUrl
};
