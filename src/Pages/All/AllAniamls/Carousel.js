import styled from "styled-components";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Carouseldiv = styled.div`
  .slider {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    width: 100%;
    padding: 30px 0px 40px;
    margin-top: 30px;
    margin-bottom: 0px;
    background-color: #185306;
    .slider-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: last baseline;
      color: #f8f8ba;
      transition: all 1s;
      .slider-img {
        width: 35%;
      }
      .slider-item-title {
        font-size: 16px;
        font-weight: 600;
        margin-top: 20px;
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

export default function CarouselDiv(props) {
  const item = props.item;
  return (
    <Carouseldiv>
      <Carousel
        responsive={responsive}
        swipeable={true}
        draggable={true}
        autoPlay={false}
        arrows={true}
        showDots={false}
        ssr={false}
        infinite={false}
        containerClass="slider"
        focusOnSelect={true}
        itemClass="carousel-item-padding-40-px"
      >
        {item.Diet ? (
          <div className="slider-item">
            <img className="slider-img" src="/Icons/diet-14.svg" alt="diet" />
            <div className="slider-item-title">"飲食</div>
            <div className="slider-item-content">{item.Diet}</div>
          </div>
        ) : null}
        {item.Behavior ? (
          <div className="slider-item">
            <img
              className="slider-img"
              src="/Icons/funfact-14.svg"
              alt="funfact"
            />
            <div className="slider-item-title">"趣事</div>
            <div className="slider-item-content">{item.Behavior}</div>
          </div>
        ) : null}
        {item.Habitat ? (
          <div className="slider-item">
            <img
              className="slider-img"
              src="/Icons/habitat-14.svg"
              alt="habitat"
            />
            <div className="slider-item-title">"棲息地</div>
            <div className="slider-item-content">{item.Habitat}</div>
          </div>
        ) : null}
        {item.Feature ? (
          <div className="slider-item">
            <img
              className="slider-img"
              src="/Icons/feature-14.svg"
              alt="feature"
            />
            <div className="slider-item-title">"特徵</div>
            <div className="slider-item-content">{item.Feature}</div>
          </div>
        ) : null}
        {item.Crisis ? (
          <div className="slider-item">
            <img
              className="slider-img"
              src="/Icons/threat-14.svg"
              alt="threat"
            />
            <div className="slider-item-title">"威脅</div>
            <div className="slider-item-content">{item.Crisis}</div>
          </div>
        ) : null}
      </Carousel>
    </Carouseldiv>
  );
}
