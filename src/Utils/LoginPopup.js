import * as action from "../Redux/Action";
import { useSelector, useDispatch } from "react-redux";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useEffect, useState } from "react";
import styled from "styled-components";
import firebase from "firebase";
import * as firestore from "../Utils/firebase";
import * as toase from "../Utils/toast";

const RenderContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 20px;
  align-items: center;
  z-index: 1200;
  .logo {
    max-width: 100px;
  }
  .nav {
    display: flex;
    flex-direction: row;
    width: 300px;
    margin-top: 50px;
    justify-content: space-around;
    margin-bottom: 80px;
    .header {
      font-size: 30px;
      color: #929292;
      font-weight: 500;
    }
  }
  .inputBlock {
    display: flex;
    flex-direction: column;
    width: 400px;
    .inputDiv {
      width: 100%;
      position: relative;
      height: 28px;
      margin-bottom: 50px;
      .lable {
        position: absolute;
        top: 0;
        left: 0;
        font-size: 20px;
        color: #acacac;
        font-weight: 400;
        transform: translate(15px, 8px);
        pointer-events: none;
        transition: all 0.3s;
      }
      .is-active {
        transform: translate(0px, -18px);
        font-size: 14px;
        color: #ea7a60;
      }
      input {
        width: 100%;
        height: 40px;
        border: none;
        border-bottom: 2px solid #acacac;
        outline: none;
        background-color: none;
      }
    }
  }
  .success {
    font-size: 12px;
    color: #6b6b6b;
    font-weight: 400;
  }
  button {
    margin: 50px auto;
    padding: 10px 50px;
    border: none;
    outline: none;
    background-color: #c0bdd2;
    border-radius: 25px;
    color: white;
    font-size: 18px;
    font-weight: 600;
    transition: all 0.2s;
    cursor: pointer;
    :hover {
      background-color: #847eb1;
      box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
    }
  }
`;
const SignIn = styled.div`
  font-size: 30px;
  color: ${(props) => (props.orange ? "#ea7a60" : "#929292")};
  font-weight: 500;
  transition: color 0.2s;
  cursor: pointer;
  :hover {
    color: #ea7a60;
  }
`;
const SignUp = styled(SignIn)``;

export default function DetailsPopup() {
  const disPatch = useDispatch();

  const { open } = useSelector((state) => state.Login);
  const { login } = useSelector((state) => state.Login);
  const closeModal = () => disPatch(action.setLoginClose());

  const [title, setTitle] = useState("Sign In");

  const [message, setMessage] = useState("");

  let inputEmail = "";
  let inputPassword = "";

  useEffect(() => {
    setMessage("");
  }, [open]);

  const RenderDiv = () => {
    return (
      <RenderContainer>
        <img className="logo" src="/logo.svg" alt="logo" />
        <div className="nav">
          {title === "Sign In" ? (
            <>
              <SignIn
                orange
                onClick={() => {
                  setTitle("Sign In");
                }}
              >
                登入
              </SignIn>
              <span className="header">|</span>
              <SignUp
                onClick={() => {
                  setTitle("Sign Up");
                }}
              >
                註冊
              </SignUp>
            </>
          ) : (
            <>
              <SignIn
                onClick={() => {
                  setTitle("Sign In");
                }}
              >
                登入
              </SignIn>
              <span className="header">|</span>
              <SignUp
                orange
                onClick={() => {
                  setTitle("Sign Up");
                }}
              >
                註冊
              </SignUp>
            </>
          )}
        </div>
        <div className="inputBlock">
          <div className="inputDiv">
            <div className="lable">Email</div>
            <input
              id="email"
              type="email"
              onFocus={(e) => {
                e.target.parentNode.firstChild.classList.add("is-active");
              }}
              onBlur={(e) => {
                if (inputEmail.length === 0) {
                  e.target.parentNode.firstChild.classList.remove("is-active");
                }
              }}
              onChange={(e) => (inputEmail = e.target.value)}
            ></input>
          </div>
          <div className="inputDiv">
            <div className="lable">Password</div>
            <input
              id="password"
              type="password"
              onFocus={(e) => {
                e.target.parentNode.firstChild.classList.add("is-active");
              }}
              onBlur={(e) => {
                if (inputEmail.length === 0) {
                  e.target.parentNode.firstChild.classList.remove("is-active");
                }
              }}
              onChange={(e) => (inputPassword = e.target.value)}
            ></input>
          </div>
        </div>
        <div className="inputDiv">
          <span className="success">{message}</span>
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
          {title}
        </button>
      </RenderContainer>
    );
  };

  let uid = undefined;

  const submitRegister = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(inputEmail, inputPassword)
      .then((userCredential) => {
        setMessage("成功加入會員");
      })
      .then(() =>
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            uid = user.uid;
          }
          firestore.firebaseCreateNewMemberStore(uid);
          toase.success("成功加入會員");
          closeModal();
        })
      )
      .catch((error) => {
        setMessage(error.message);
      });
  };

  const submitSignin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(inputEmail, inputPassword)
      .then((userCredential) => {
        setMessage("登入成功");
        toase.success("登入成功");
        closeModal();
      })
      .catch((error) => {
        setMessage(error.message);
      });
  };

  return (
    <Popup
      open={open}
      closeOnDocumentClick
      onClose={closeModal}
      overlayStyle={{ background: "rgba(0, 0, 0, 0.4)", zIndex: 1200 }}
      contentStyle={{
        margin: "auto",
        boxSizing: "border-box",
        background: "#fff",
        width: "80%",
        maxWidth: "600px",
        padding: "60px 20px",
        borderRadius: "25px",
      }}
    >
      {login === "login" ? <RenderDiv /> : null}
    </Popup>
  );
}
