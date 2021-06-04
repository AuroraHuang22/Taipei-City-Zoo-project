import * as action from "../../../Redux/Action";
import { useSelector, useDispatch } from "react-redux";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import * as firestore from "../../../Utils/firebase";
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import * as Toast from "../../../Utils/toast";
import CarouselDiv from "./Carousel";
import { Container } from "./Popup-style";

export default function DetailsPopup(props) {
  const [addfavorite, setAddfavorite] = useState("");
  const [addvisited, setAddvisited] = useState("");
  const disPatch = useDispatch();
  const { open } = useSelector((state) => state.FilterAnimals);
  const closeModal = () => disPatch(action.setClose());

  let uid = props.uid;
  let favoritiesMember = props.favoritiesMember;
  let visitedMember = props.visitedMember;
  let popupAnimal = props.popupAnimal;

  return (
    <Popup
      open={open}
      closeOnDocumentClick
      onClose={closeModal}
      overlayStyle={{ background: "rgba(0, 0, 0, 0.8)" }}
      contentStyle={{
        position: "relative",
        margin: "auto",
        boxSizing: "border-box",
        background: "#fff",
        width: "680px",
        maxWidth: "95vw",
        padding: 0,
        borderRadius: "10px",
        border: "none",
      }}
    >
      <Container>
        {props.showAnimals.map((item) =>
          item.Name_Ch === popupAnimal ? (
            <>
              <section className="main" key={item.Name_Latin}>
                <div className="imgBox">
                  <img className="img" src={item.Pic01_URL} alt="img" />
                </div>
                <img className="bg-svg-01" src="/Icons/popup.svg" alt="img" />
                <img
                  className="bg-svg-03"
                  src="/Icons/popup-03.svg"
                  alt="img"
                />
                <img
                  className="bg-svg-02"
                  src="/Icons/popup-02.svg"
                  alt="img"
                />

                <div className="title">
                  <span className="title-ch">{item.Name_Ch}</span>
                  <span className="title-en">{item.Name_En}</span>
                </div>
                <span className="location">{item.Location}</span>
                <section className="info">
                  <div className="info-class">
                    <span>{item.Class}</span>
                    <span>{item.Order}</span>
                    <span>{item.Family}</span>
                  </div>
                  <div className="info-redlist">
                    <span>保育分級：{item.Conservation}</span>
                    {item.Taiwan ? (
                      <span className="taiwan">{`(${item.Taiwan})`}</span>
                    ) : null}
                    <img
                      className="redlist"
                      src={`/Imgs/${item.Conservation}.png`}
                      alt={item.Name_Ch}
                    />
                  </div>
                </section>
                <CarouselDiv item={item} />
              </section>
              <section className="clickBar">
                <div className="visitedBox">
                  <section className="farvrite">
                    <div
                      className="defaultFavorite"
                      style={{
                        backgroundImage: "url(/Icons/disFavorite.svg)",
                      }}
                      key={item.Name_Latin}
                      onClick={(e) => {
                        if (uid) {
                          favoritiesMember.push(item.Name_Ch);
                          firestore.firebaseAddFavoriate(uid, favoritiesMember);
                          setAddfavorite(`加${item.Name_Ch}`);
                          Toast.success(`收藏成功！可至路線規劃頁面查看`);
                        } else {
                          Toast.alertMes("請先登入會員呦");
                        }
                      }}
                    />
                    {favoritiesMember.length
                      ? favoritiesMember.map((name) =>
                          name === popupAnimal ? (
                            <div
                              className="defaultFavorite"
                              key={`ya-${item.Name_Latin}`}
                              style={{
                                backgroundImage: "url(/Icons/favorite.svg)",
                              }}
                              onClick={(e) => {
                                e.target.style.backgroundImage =
                                  "url(/Icons/like-02.svg)";
                                let index = favoritiesMember.indexOf(
                                  item.Name_Ch
                                );
                                favoritiesMember.splice(index, 1);
                                firestore.firebaseAddFavoriate(
                                  uid,
                                  favoritiesMember
                                );
                                setAddfavorite(`${item.Name_Latin}`);
                                Toast.remove("已移除造訪點");
                              }}
                            />
                          ) : null
                        )
                      : null}
                    <div className="text-sm">造訪點</div>
                  </section>
                  <section className="visited">
                    <div
                      className="defaultFavorite"
                      style={{
                        backgroundImage: "url(/Icons/notVisited.svg)",
                      }}
                      key={item.Name_Latin}
                      onClick={(e) => {
                        if (uid) {
                          visitedMember.push(item.Name_Ch);
                          firestore.firebaseAddVisited(uid, visitedMember);
                          setAddvisited(`add-${item.Name_Latin}`);
                          Toast.success(`加入成功！可至探索護照查看`);
                        } else {
                          Toast.alertMes("請先登入會員呦");
                        }
                      }}
                    />
                    {visitedMember.length
                      ? visitedMember.map((name) =>
                          name === popupAnimal ? (
                            <div
                              className="defaultFavorite"
                              key={`ya-${item.Name_Latin}`}
                              style={{
                                backgroundImage: "url(/Icons/vistied.svg)",
                              }}
                              onClick={(e) => {
                                e.target.style.backgroundImage =
                                  "url(/Icons/like-02.svg)";
                                let index = visitedMember.indexOf(item.Name_Ch);
                                visitedMember.splice(index, 1);
                                firestore.firebaseAddVisited(
                                  uid,
                                  visitedMember
                                );
                                setAddvisited(`remo-${item.Name_Latin}`);
                                Toast.remove("已抹除足跡");
                              }}
                            />
                          ) : null
                        )
                      : null}
                    <div className="text-sm">探索足跡</div>
                  </section>
                </div>
              </section>
            </>
          ) : null
        )}
        <ToastContainer />
      </Container>
    </Popup>
  );
}
