import React from "react";
import { useSelector, useDispatch } from "react-redux";
import * as action from "../../../Redux/Action";
import { ToastContainer } from "react-toastify";
import CarouselDiv from "./Carousel";
import Popup from "reactjs-popup";
import { Container } from "./Popup-style";
import "reactjs-popup/dist/index.css";
import ClickBar from "./ClickBar";

export default function DetailsPopup(props) {
  const { open } = useSelector((state) => state.FilterAnimals);
  const isRowBased = window.matchMedia("(max-width: 800px)");
  const { uid, popupAnimal } = props;
  const disPatch = useDispatch();
  const closeModal = () => disPatch(action.setClose());

  return (
    <Popup
      open={open}
      closeOnDocumentClick
      onClose={closeModal}
      overlayStyle={{ background: "rgba(0, 0, 0, 0.8)", zIndex: 1200 }}
      contentStyle={{
        position: "relative",
        margin: "auto",
        boxSizing: "border-box",
        background: "#fff",
        width: "680px",
        maxWidth: isRowBased ? "80vw" : "95vw",
        padding: 0,
        borderRadius: "10px",
        border: "none",
      }}
    >
      <Container>
        {props.showAnimals.map(
          (item) =>
            item.Name_Ch === popupAnimal && (
              <>
                <section className="main" key={item.Name_Latin}>
                  <div className="imgBox">
                    <img
                      className="img"
                      src={`/animals/${item.Name_Ch}.jpeg`}
                      alt="img"
                    />
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
                  <div className="location">
                    <span>{item.Location}</span>
                  </div>
                  <section className="info">
                    <div className="info-class">
                      <span>{item.Class}</span>
                      <span>{item.Order}</span>
                      <span>{item.Family}</span>
                    </div>
                    <div className="info-redlist">
                      <span>保育分級：{item.Conservation}</span>
                      {item.Taiwan && (
                        <span className="taiwan">{`(${item.Taiwan})`}</span>
                      )}
                      <img
                        className="redlist"
                        src={`/Imgs/${item.Conservation}.png`}
                        alt={item.Name_Ch}
                      />
                    </div>
                  </section>
                  <CarouselDiv item={item} />
                </section>
                <ClickBar uid={uid} item={item} popupAnimal={popupAnimal} />
              </>
            )
        )}
        <ToastContainer />
      </Container>
    </Popup>
  );
}
