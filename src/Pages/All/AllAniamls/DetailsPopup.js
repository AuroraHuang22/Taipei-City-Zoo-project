import * as action from "../../../Redux/Action";
import { useSelector, useDispatch } from "react-redux";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import * as firestore from "../../../Utils/firebase";
import { useState } from "react";
import styled from "styled-components";

const Start = styled.div``;
const Visited = styled.div``;

export default function DetailsPopup(props) {
  const [addfavorite, setAddfavorite] = useState("");
  const [addvisited, setAddvisited] = useState("");
  const disPatch = useDispatch();
  const { open } = useSelector((state) => state.FilterAnimals);
  const closeModal = () => disPatch(action.setClose());

  let uid = props.uid;
  let favoritiesMember = props.favoritiesMember;
  let visitedMember = props.visitedMember;

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
              <br />
              <Start>
                <div
                  key={item.Name_Latin}
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    color: "grey",
                    fontSize: "40px",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onClick={(e) => {
                    if (uid) {
                      if (e.target.style.color !== "orange") {
                        favoritiesMember.push(item.Name_Ch);
                        firestore.firebaseAddFavoriate(uid, favoritiesMember);
                        setAddfavorite(`加${item.Name_Ch}`);
                      }
                    } else {
                      alert("欲使用加入收藏功能,請先登入會員呦");
                    }
                  }}
                >
                  ★
                </div>
                {favoritiesMember.length
                  ? favoritiesMember.map((name) =>
                      name === props.popupAnimal ? (
                        <div
                          key={`ya-${item.Name_Latin}`}
                          style={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            color: "orange",
                            fontSize: "40px",
                            cursor: "pointer",
                            transition: "all 0.2s",
                          }}
                          onClick={(e) => {
                            if (e.target.style.color === "orange") {
                              e.target.style.color = "grey";
                              let index = favoritiesMember.indexOf(
                                item.Name_Ch
                              );
                              favoritiesMember.splice(index, 1);
                              firestore.firebaseAddFavoriate(
                                uid,
                                favoritiesMember
                              );
                              setAddfavorite(`${item.Name_Latin}`);
                            }
                          }}
                        >
                          ★
                        </div>
                      ) : null
                    )
                  : null}
              </Start>
              <Visited>
                <div
                  key={item.Name_Latin}
                  style={{
                    marginTop: "60px",
                    position: "absolute",
                    bottom: 0,
                    right: 0,

                    color: "grey",
                    fontSize: "40px",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onClick={(e) => {
                    if (uid) {
                      if (e.target.style.color !== "orange") {
                        visitedMember.push(item.Name_Ch);
                        firestore.firebaseAddVisited(uid, visitedMember);
                        setAddvisited(`add-${item.Name_Latin}`);
                      }
                    } else {
                      alert("欲使用加入收藏功能,請先登入會員呦");
                    }
                  }}
                >
                  ✓
                </div>
                {visitedMember.length
                  ? visitedMember.map((name) =>
                      name === props.popupAnimal ? (
                        <div
                          key={`ya-${item.Name_Latin}`}
                          style={{
                            marginTop: "60px",
                            position: "absolute",
                            bottom: 0,
                            right: 0,
                            color: "orange",
                            fontSize: "40px",
                            cursor: "pointer",
                            transition: "all 0.2s",
                          }}
                          onClick={(e) => {
                            if (e.target.style.color === "orange") {
                              e.target.style.color = "grey";
                              let index = visitedMember.indexOf(item.Name_Ch);
                              visitedMember.splice(index, 1);
                              firestore.firebaseAddVisited(uid, visitedMember);
                              setAddvisited(`remo-${item.Name_Latin}`);
                            }
                          }}
                        >
                          ✓
                        </div>
                      ) : null
                    )
                  : null}
              </Visited>
            </div>
          ) : null
        )}
      </div>
    </Popup>
  );
}
