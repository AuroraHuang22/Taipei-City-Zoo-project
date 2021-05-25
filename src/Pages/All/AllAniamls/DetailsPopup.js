import * as action from "../../../Redux/Action";
import { useSelector, useDispatch } from "react-redux";
import firebase from "firebase";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import * as firestore from "../../../Utils/firebase";
import { useEffect, useState } from "react";

let uid = undefined;
let firebaseFavoriateArray = [];
let favoriatiesMember = [];

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    uid = user.uid;
    console.log(uid);
    firestore
      .firebaseGetMemberData(uid)
      .then((data) => (firebaseFavoriateArray = { ...data }))
      .then((data) => (favoriatiesMember = firebaseFavoriateArray.favoriaties));
  }
});

export default function DetailsPopup(props) {
  const [addfavoriate, setAddfavoriate] = useState("");
  const disPatch = useDispatch();
  const { open } = useSelector((state) => state.FilterAnimals);
  const closeModal = () => disPatch(action.setClose());

  return (
    <Popup
      open={open}
      closeOnDocumentClick
      onClose={closeModal}
      overlayStyle={{ background: "rgba(0, 0, 0, 0.7)" }}
      contentStyle={{
        margin: "auto",
        boxSizing: "border-box",
        background: "#fff",
        width: "50%",
        padding: "60px 20px",
        borderRadius: "25px",
      }}
    >
      <div className="modal">
        <span
          className="close"
          onClick={closeModal}
          style={{
            display: "block",
            position: "absolute",
            top: "-30px",
            right: "-30px",
            fontSize: "40px",
            color: "white",
            cursor: "pointer",
          }}
        >
          &times;
        </span>
        {props.showAnimals.map((item) =>
          item.Name_Ch === props.popupAnimal ? (
            <div key={item.Name_En} className="content">
              {item.Name_Ch}
              <br />
              <div
                key={item.Name_Latin}
                style={{
                  color: "grey",
                  fontSize: "40px",
                  position: "absolute",
                  top: "60px",
                  right: "30px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onClick={(e) => {
                  if (uid) {
                    if (e.target.style.color !== "orange") {
                      favoriatiesMember.push(item.Name_Ch);
                      firestore.firebaseAddFavoriate(uid, favoriatiesMember);
                      setAddfavoriate(`加${item.Name_Ch}`);
                    }
                  } else {
                    alert("欲使用加入收藏功能,請先登入會員呦");
                  }
                }}
              >
                ★
              </div>
              {favoriatiesMember.length
                ? favoriatiesMember.map((name) =>
                    name === props.popupAnimal ? (
                      <div
                        key={`ya-${item.Name_Latin}`}
                        style={{
                          color: "orange",
                          fontSize: "40px",
                          position: "absolute",
                          top: "60px",
                          right: "30px",
                          cursor: "pointer",
                          transition: "all 0.2s",
                        }}
                        onClick={(e) => {
                          if (e.target.style.color === "orange") {
                            e.target.style.color = "grey";
                            let index = favoriatiesMember.indexOf(item.Name_Ch);
                            favoriatiesMember.splice(index, 1);
                            firestore.firebaseAddFavoriate(
                              uid,
                              favoriatiesMember
                            );
                            setAddfavoriate(`${item.Name_Latin}`);
                          }
                        }}
                      >
                        ★
                      </div>
                    ) : null
                  )
                : null}
              <br />
              英文學名：{item.Name_Latin}
              <br />
              園區位置：{item.Location}
              <br />
              分類：{item.Phylum} -&gt; {item.Class} -&gt; {item.Order}
              -&gt; {item.Family}
              <br />
              保育等級：{item.Conservation}
              <br />
              主要分佈：{item.Distribution}
              <br />
              生活習性：{item.Habitat}
              <br />
              外部特徵：{item.Feature}
              <br />
              行為：{item.Behavior}
              <br />
              飲食：{item.Diet}
            </div>
          ) : null
        )}
      </div>
    </Popup>
  );
}
