import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as action from "../../../Redux/Action";
import styled from "styled-components";
import AnimalsJson from "../../../Utils/animals.json";
import DetailsPopup from "./DetailsPopup";
import ReactPaginate from "react-paginate";

const Container = styled.div`
  display: flex;
  width: 100%;
  margin: 0 auto;
  max-width: 1280px;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  padding: 100px 50px;
  box-sizing: border-box;
  .background {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 200px;
    height: 200px;
    padding-bottom: 30px;
    margin-bottom: 20px;
    cursor: pointer;
  }
  .background:hover .imgBox {
    border: 3px solid #f09a8f;
  }
  .background:hover .text {
    background-color: #f09a8f;
    color: #f2f2f2;
    font-weight: 600;
  }
  .imgBox {
    width: 80%;
    height: 80%;
    border-radius: 50%;
    overflow: hidden;
    border: 3px solid #a5a4a3;
    background-color: #f2f2f2;
    transition: all 0.3s ease;
  }
  .img {
    height: 100%;
    object-fit: cover;
    object-position: center;
    filter: grayscale(30%);
    aspect-ratio: 1 / 1;
  }
  .text {
    position: absolute;
    width: 70%;
    text-align: center;
    top: 85%;
    white-space: nowrap;
    background-color: #f2f2f2;
    padding: 3px 20px;
    border-radius: 20px;
    font-size: 18px;
    letter-spacing: 2px;
    color: #a5a4a3;
    transition: all 0.3s ease;
  }
  .contain {
    color: #acabbe;
    display: flex;
    width: 100%;
    margin: 20px auto 0;
    justify-content: center;
    list-style: none;
  }
  .pages {
    display: block;
    color: #acabbe;
    padding: 0 10px;
    cursor: pointer;
    transition: color 0.2s;
    :hover {
      color: #c4c4cf;
    }
  }
  .active,
  .previous,
  .next {
    color: #f09a8f;
    cursor: pointer;
    transition: all 0.1s;
  }
  .previous,
  .next {
    color: grey;
    margin-right: 12px;
    padding: 2px 12px;
    border: 1px solid #f2f2f2;
    border-radius: 20px;
    cursor: pointer;
    :hover {
      background-color: #f2f2f2;
      border: 1px solid #f2f2f2;
    }
  }
  .next {
    margin-left: 12px;
  }
  @media (max-width: 768px) {
    padding: 80px 30px;
    .background {
      width: 150px;
      height: 150px;
      padding-bottom: 40px;
    }
    .text {
      width: 60%;
      top: 80%;
      font-size: 14px;
      white-space: normal;
    }
  }
  @media (max-width: 576px) {
    padding: 50px 10px;
    .background {
      width: 100px;
      height: 100px;
      padding-bottom: 40px;
      margin: 10px 5px;
    }
    .text {
      width: 60%;
      font-size: 12px;
      white-space: normal;
    }
    .contain {
      margin: 20px auto 60px;
      padding: 0;
    }
    .pages {
      display: block;
      color: #acabbe;
      font-size: 14px;
      padding: 0 10px;
      cursor: pointer;
      transition: color 0.2s;
      :hover {
        color: #c4c4cf;
      }
    }
    .active,
    .previous,
    .next {
      color: #f09a8f;
      cursor: pointer;
      transition: all 0.1s;
    }
    .previous,
    .next {
      color: grey;
      font-size: 14px;
      margin-right: 8px;
      white-space: nowrap;
      padding: 2px 4px;
      border: 1px solid #f2f2f2;
      border-radius: 20px;
      cursor: pointer;
      :hover {
        background-color: #f2f2f2;
        border: 1px solid #f2f2f2;
      }
    }
    .next {
      margin-left: 8px;
    }
  }
`;

export default function ReaderAnimals(props) {
  const [popupAnimal, setPopupAnimal] = useState(null);
  const [selectedPage, setSelectedPage] = useState(1);
  const { search } = useSelector((state) => state.FilterAnimals);
  const { place } = useSelector((state) => state.FilterAnimals);
  const uid = props.uid;

  const disPatch = useDispatch();
  const animalsJson = AnimalsJson;
  let showAnimals = [];

  if (!search && !place) {
    showAnimals = animalsJson;
  } else if (search && !place) {
    showAnimals = animalsJson.filter((item) => item.Name_Ch.includes(search));
  } else if (search && place) {
    showAnimals = animalsJson.filter(
      (item) => item.Name_Ch.includes(search) && item.Location.includes(place)
    );
  } else if (!search && place) {
    showAnimals = animalsJson.filter((item) => item.Location.includes(place));
  }

  const handlePageClicked = (data) => {
    let selected = data.selected;
    setSelectedPage(selected + 1);
  };

  const currentData = showAnimals.slice(
    (selectedPage - 1) * 20,
    (selectedPage - 1) * 20 + 20
  );

  const handleAnimalClick = (name) => {
    setPopupAnimal(name);
    disPatch(action.setOpen());
  };

  useEffect(() => {
    setSelectedPage(1);
  }, [place]);

  return (
    <Container>
      {currentData.length === 0 ? (
        <p style={{ textAlign: "center" }}>找不到符合條件的動物</p>
      ) : (
        currentData.map((item, index) => (
          <div
            className="background"
            key={item.Name_Ch}
            onClick={() => {
              handleAnimalClick(item.Name_Ch);
            }}
          >
            <div className="imgBox">
              <img
                loading="lazy"
                className="img"
                src={`/animals/${item.Name_Ch}.jpeg`}
                alt={item.Name_Ch}
              />
            </div>
            <div className="text">{item.Name_Ch}</div>
          </div>
        ))
      )}
      <ReactPaginate
        previousLabel={"上一頁"}
        nextLabel={"下一頁"}
        pageCount={Math.ceil(showAnimals.length / 20)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        onPageChange={handlePageClicked}
        forcePage={selectedPage - 1}
        containerClassName="contain"
        pageClassName="pages"
        pageLinkClassName="pagesLink"
        activeClassName="active"
        activeLinkClassName="active"
        previousClassName="previous"
        nextClassName="next"
        previousLinkClassName=""
        nextLinkClassName=""
        disabledClassName=""
      />
      <DetailsPopup
        uid={uid}
        showAnimals={showAnimals}
        popupAnimal={popupAnimal}
      />
    </Container>
  );
}
