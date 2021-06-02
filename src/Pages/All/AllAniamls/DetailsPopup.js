import * as action from "../../../Redux/Action";
import { useSelector, useDispatch } from "react-redux";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import * as firestore from "../../../Utils/firebase";
import React, { useState, useRef } from "react";
import styled from "styled-components";
import { ToastContainer, toast, Flip, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Container = styled.div`
  box-sizing: border-box;
  padding-top: 350px;
  span {
    display: block;
    letter-spacing: 1.5px;
  }
  .imgBox {
    width: 320px;
    height: 350px;
    border-radius: 50px;
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
    transform: translate(-10%, -5%) rotate(15deg);
    .img {
      width: 350px;
      height: 380px;
      transform: rotate(-15deg);
      object-fit: cover;
    }
  }
  .title {
    position: absolute;
    top: 220px;
    right: 5%;
    font-size: 22px;
    max-width: 220px;
    .title-ch {
      font-size: 26px;
    }
  }
  .location {
    padding-left: 30px;
    color: gray;
    font-size: 18px;
  }
  .info {
    box-sizing: border-box;
    padding: 0px 30px;
    display: flex;
    flex-direction: row;
    width: 100%;
    margin-top: 20px;
    .info-class {
      width: 35%;
      span {
        color: gray;
        font-size: 18px;
        line-height: 40px;
      }
    }
    .info-redlist {
      width: 65%;
      justify-self: flex-start;
      color: gray;
      font-size: 18px;
      line-height: 40px;
      .redlist {
        width: 100%;
        object-fit: cover;
      }
    }
  }
  .slider {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    width: 100%;
    padding: 20px 0px 40px;
    margin-top: 30px;
    background-color: #185306;
    .slider-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: start;
      color: #f8f8ba;
      transition: all 1s;
      .slider-item-title {
        font-size: 14px;
        font-weight: 600;
        margin-bottom: 10px;
        letter-spacing: 1px;
      }
      .slider-item-content {
        padding: 0 20px;
        font-size: 14px;
        line-height: 26px;
        letter-spacing: 1px;
        max-height: 120px;
        overflow-y: scroll;
        white-space: pre-wrap;
      }
    }
  }
  .visited-title {
    margin-top: 50px;
    text-align: center;
    letter-spacing: 1px;
    font-size: 18px;
    color: grey;
    .hightlight {
      display: inline-block;
      margin: 0 8px;
      font-weight: 600;
    }
    .visitedBox {
      display: flex;
      justify-content: center;
      font-size: 50px;
      margin-top: 50px;
      transition: all 0.2s;
      .farvrite,
      .visited {
        width: 50%;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 70px;
        .defaultFavorite,
        .defaultVisited {
          cursor: pointer;
          display: block;
          position: absolute;
          top: 0;
          right: 50%;
          transform: translateX(50%);
          width: 50px;
          height: 50px;
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
          transition: all 0.2s;
        }
      }
      .text {
        font-size: 14px;
      }
      .text-sm {
        font-size: 14px;
        color: lightgray;
      }
    }
  }
`;
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 2,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
export default function DetailsPopup(props) {
  const [addfavorite, setAddfavorite] = useState("");
  const [addvisited, setAddvisited] = useState("");
  const disPatch = useDispatch();
  const { open } = useSelector((state) => state.FilterAnimals);
  const closeModal = () => disPatch(action.setClose());

  let alertMes = (message) =>
    toast(message, {
      autoClose: 2500,
      position: toast.POSITION.BOTTOM_CENTER,
      hideProgressBar: true,
      style: {
        opacity: 0.9,
        backgroundColor: "#faf9d7",
        color: "#827b60",
        fontWeight: 400,
      },
      transition: Bounce,
    });

  let success = (message) =>
    toast.success(message, {
      autoClose: 1500,
      position: toast.POSITION.BOTTOM_CENTER,
      hideProgressBar: true,
      style: {
        opacity: 0.9,
        backgroundColor: "#e5f7e0",
        color: "#4f6e59",
        fontWeight: 400,
      },
      transition: Flip,
    });

  let remove = (message) =>
    toast(message, {
      autoClose: 1500,
      position: toast.POSITION.BOTTOM_CENTER,
      hideProgressBar: true,
      style: {
        opacity: 0.9,
        backgroundColor: "#ededed",
        color: "#636363",
        fontWeight: 400,
      },
      transition: Flip,
    });

  let uid = props.uid;
  let favoritiesMember = props.favoritiesMember;
  let visitedMember = props.visitedMember;
  let popupAnimal = props.popupAnimal;

  return (
    <Popup
      open={open}
      closeOnDocumentClick
      onClose={closeModal}
      overlayStyle={{ background: "rgba(0, 0, 0, 0.7)" }}
      contentStyle={{
        position: "relative",
        margin: "auto",
        boxSizing: "border-box",
        background: "#fff",
        width: "568px",
        maxWidth: "95vw",
        padding: "60px 0px",
        borderRadius: "25px",
        overflow: "hidden",
        border: "none",
        maxHeight: "90vh",
        overflowY: "scroll",
      }}
    >
      <Container>
        {props.showAnimals.map((item) =>
          item.Name_Ch === popupAnimal ? (
            <div key={item}>
              <div className="imgBox">
                <img className="img" src={item.Pic01_URL} alt="img" />
              </div>
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
                  <img
                    className="redlist"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Status_iucn2.3.svg/480px-Status_iucn2.3.svg.png"
                    alt="img"
                  />
                </div>
              </section>

              <Carousel
                responsive={responsive}
                swipeable={true}
                draggable={true}
                autoPlay={false}
                arrows={false}
                showDots={true}
                ssr={false}
                infinite={false}
                containerClass="slider"
                focusOnSelect={true}
                itemClass="carousel-item-padding-40-px"
              >
                {item.Diet ? (
                  <div className="slider-item">
                    <div className="slider-item-title">"飲食</div>
                    <div className="slider-item-content">{item.Diet}</div>
                  </div>
                ) : null}
                {item.Behavior ? (
                  <div className="slider-item">
                    <div className="slider-item-title">"趣事</div>
                    <div className="slider-item-content">{item.Behavior}</div>
                  </div>
                ) : null}
                {item.Habitat ? (
                  <div className="slider-item">
                    <div className="slider-item-title">"棲息地</div>
                    <div className="slider-item-content">{item.Habitat}</div>
                  </div>
                ) : null}
                {item.Feature ? (
                  <div className="slider-item">
                    <div className="slider-item-title">"特徵</div>
                    <div className="slider-item-content">{item.Feature}</div>
                  </div>
                ) : null}
                {item.Crisis ? (
                  <div className="slider-item">
                    <div className="slider-item-title">"威脅</div>
                    <div className="slider-item-content">{item.Crisis}</div>
                  </div>
                ) : null}
              </Carousel>
              <div className="visited-title">
                你曾造訪過<div className="hightlight">{item.Name_Ch}</div>嗎？
                <div className="visitedBox">
                  <section className="farvrite">
                    <div
                      className="defaultFavorite"
                      style={{
                        backgroundImage: "url(/Icons/like-02.svg)",
                      }}
                      key={item.Name_Latin}
                      onClick={(e) => {
                        if (uid) {
                          favoritiesMember.push(item.Name_Ch);
                          firestore.firebaseAddFavoriate(uid, favoritiesMember);
                          setAddfavorite(`加${item.Name_Ch}`);
                          success(`已加入收藏`);
                        } else {
                          alertMes("欲使用加入收藏功能,請先登入會員呦");
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
                                backgroundImage: "url(/Icons/like-03.svg)",
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
                                remove("已移除收藏");
                              }}
                            />
                          ) : null
                        )
                      : null}
                    <div className="text">還沒！不過我想看!</div>
                    <div className="text-sm">加入收藏</div>
                  </section>
                  <section className="visited">
                    <div
                      className="defaultFavorite"
                      style={{
                        backgroundImage: "url(/Icons/like-02.svg)",
                      }}
                      key={item.Name_Latin}
                      onClick={(e) => {
                        if (uid) {
                          visitedMember.push(item.Name_Ch);
                          firestore.firebaseAddVisited(uid, visitedMember);
                          setAddvisited(`add-${item.Name_Latin}`);
                          success(`已加入足跡`);
                        } else {
                          alertMes("欲使用加入足跡功能,請先登入會員呦");
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
                                backgroundImage: "url(/Icons/like-03.svg)",
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
                                remove("已移除足跡");
                              }}
                            />
                          ) : null
                        )
                      : null}
                    <div className="text">有！我還跟牠很熟!</div>
                    <div className="text-sm">加入足跡</div>
                  </section>
                </div>
              </div>
            </div>
          ) : null
        )}
        <ToastContainer />
      </Container>
    </Popup>
  );
}
