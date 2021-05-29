import * as action from "../Redux/Action";
import { useSelector, useDispatch } from "react-redux";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useState } from "react";
import styled from "styled-components";
import firebase from "firebase";
import * as firestore from "../Utils/firebase";

const RenderContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 30%;
  margin: auto;
  height: 60%;
  border: 1px solid grey;
  border-radius: 25px;

  .inputDiv {
    display: flex;
    justify-content: center;
    flex-direction: row;
    margin-bottom: 12px;
    label {
      width: 100px;
    }
    input {
      width: 60%;
      height: 15px;
    }
    .faild {
      color: red;
    }
    .success {
      color: grey;
    }
  }
  button {
    height: 30px;
    margin: 50px auto;
    width: 60%;
  }
  h2 {
    margin-bottom: 80px;
  }
  p {
    align-self: flex-end;
    font-size: 8px;
    color: grey;
  }
  span {
    align-self: flex-end;
    font-size: 8px;
    color: blue;
    cursor: pointer;
  }
`;

export default function DetailsPopup() {
  const disPatch = useDispatch();
  const { open } = useSelector((state) => state.Login);
  const closeModal = () => disPatch(action.setLoginClose());
  const [title, setTitle] = useState("Sign In");
  const [text, setText] = useState("Don't have account?");
  const [state, setState] = useState("Sign Up");
  const [message, setMessage] = useState("");
  const [errMessage, setErrMessage] = useState("");
  let inputEmail = "";
  let inputPassword = "";

  const RenderDiv = () => {
    return (
      <RenderContainer>
        <h2>{title}</h2>
        <div className="inputDiv">
          <label htmlFor="email"> Email</label>
          <input
            id="email"
            type="email"
            onChange={(e) => (inputEmail = e.target.value)}
          ></input>
        </div>
        <div className="inputDiv">
          <label htmlFor="password"> Password</label>
          <input
            id="password"
            type="password"
            onChange={(e) => (inputPassword = e.target.value)}
          ></input>
        </div>
        <div className="inputDiv">
          <span className="success">{message}</span>
          <span className="faild">{errMessage}</span>
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            if (title === "Sign In") {
              submitSignin();
            } else {
              submitRegister();
            }
          }}
        >
          submit
        </button>
        <p>{text}</p>
        <span
          onClick={() => {
            if (title === "Sign In") {
              setTitle("Sign Up");
              setText("Already have account?");
              setState("Sign In");
            } else {
              setTitle("Sign In");
              setText("Don't have account?");
              setState("Sign Up");
            }
          }}
        >
          {state}
        </span>
      </RenderContainer>
    );
  };

  let uid = undefined;

  const submitRegister = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(inputEmail, inputPassword)
      .then((userCredential) => {
        setMessage("註冊成功");
      })
      .then(() =>
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            uid = user.uid;
          }
          firestore.firebaseCreateNewMemberStore(uid);
        })
      )
      .catch((error) => {
        setErrMessage(error.message);
      });
  };

  const submitSignin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(inputEmail, inputPassword)
      .then((userCredential) => {
        setMessage("登入成功");
        closeModal();
      })
      .catch((error) => {
        setErrMessage(error.message);
      });
  };

  return (
    <Popup
      open={open}
      closeOnDocumentClick
      onClose={closeModal}
      overlayStyle={{ background: "rgba(0, 0, 0, 0.4)" }}
      contentStyle={{
        margin: "auto",
        boxSizing: "border-box",
        background: "#fff",
        width: "50%",
        padding: "60px 20px",
        borderRadius: "25px",
      }}
    >
      <RenderDiv />
    </Popup>
  );
}
