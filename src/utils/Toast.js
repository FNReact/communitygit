import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
    const notifySuccess = (message) =>{
      toast.success(message?message:"Success!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
     
  
    const notifyError = (error) => {
      toast.error(error, {
        position: "top-right",
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    };
  
    const notifyWarn = () => {
      toast.warn("Warning!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    };

    export {notifySuccess,notifyWarn,notifyError}