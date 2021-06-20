import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as action from "../../../Redux/Action";
import AnimalsJson from "../../../Utils/animals.json";
import DetailsPopup from "./DetailsPopup";
import ReactPaginate from "react-paginate";
import { Container } from "./RenderAnimals-style";

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
