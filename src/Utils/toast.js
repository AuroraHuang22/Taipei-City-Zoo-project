import { toast, Flip, Slide, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const alertMes = (message) =>
  toast(message, {
    autoClose: 3000,
    position: toast.POSITION.TOP_CENTER,
    hideProgressBar: true,
    style: {
      opacity: 0.9,
      backgroundColor: "#faf9d7",
      color: "#827b60",
      fontWeight: 400,
    },
    transition: Bounce,
  });

const success = (message) =>
  toast.success(message, {
    autoClose: 3000,
    position: toast.POSITION.TOP_CENTER,
    hideProgressBar: true,
    style: {
      opacity: 0.9,
      backgroundColor: "#e5f7e0",
      color: "#4f6e59",
      fontWeight: 400,
    },
    transition: Flip,
  });

const remove = (message) =>
  toast(message, {
    autoClose: 1500,
    position: toast.POSITION.TOP_CENTER,
    hideProgressBar: true,
    style: {
      opacity: 0.9,
      backgroundColor: "#ededed",
      color: "#636363",
      fontWeight: 400,
    },
    transition: Flip,
  });

const login = (message) => {
  toast.success(message, {
    autoClose: 2500,
    position: toast.POSITION.TOP_CENTER,
    hideProgressBar: true,
    style: {
      opacity: 0.9,
      backgroundColor: "#e5f7e0",
      color: "#4f6e59",
      fontWeight: 400,
    },
    transition: Flip,
  });
};

const logout = (message) => {
  toast(message, {
    autoClose: 2000,
    position: toast.POSITION.TOP_RIGHT,
    hideProgressBar: true,
    style: {
      opacity: 0,
      backgroundColor: "#ededed",
      color: "#636363",
      fontWeight: 400,
    },
    transition: Flip,
  });
};

export { remove, success, alertMes, logout };
