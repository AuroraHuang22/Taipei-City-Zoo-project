import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Container, Photo } from "./style";
import LevelContent from "./LevelContent";

function MemberInfo(props) {
  const page = useLocation().pathname;
  let { uid, catalogs, allVisitedAnimalsData } = props;
  const setStamps = () => {
    let numbers = [];
    let stampPavilions = [];
    const allVisitedAnimals = allVisitedAnimalsData.map((e) => e[1]);
    catalogs.forEach((catalogs) => {
      if (catalogs === "新光特展館(大貓熊館)" || catalogs === "無尾熊館") {
        numbers = allVisitedAnimals.filter((arrs) => arrs === catalogs).length;
        if (numbers >= 1) {
          stampPavilions.push(catalogs);
        }
      } else if (catalogs === "企鵝館") {
        numbers = allVisitedAnimals.filter((arrs) => arrs === catalogs).length;
        if (numbers >= 2) {
          stampPavilions.push(catalogs);
        }
      } else {
        numbers = allVisitedAnimals.filter((arrs) => arrs === catalogs).length;
        if (numbers >= 5) {
          stampPavilions.push(catalogs);
        }
      }
    });

    return stampPavilions;
  };
  const calcBar = () => {
    let bar = 0;
    if (stampPavilions.length) {
      bar = ((100 / catalogs.length) * stampPavilions.length).toFixed(1);
    } else {
      bar = 0;
    }
    return bar;
  };
  const stampPavilions = setStamps();
  const bar = calcBar();
  return (
    <Container>
      <img className="draw-1 draw" src="/Imgs/draw-13.svg" alt="draw" />
      <img className="draw-2 draw" src="/Imgs/draw-13.svg" alt="draw" />
      <div className="inner-container">
        <Photo />
        <LevelContent uid={uid} bar={bar} />
      </div>
      <div className="button-group">
        <Link to="/member">
          <div className={page === "/member" ? "btn active" : "btn"}>
            我的探索護照
          </div>
        </Link>
        <Link to="/member/saved">
          <div className={page === "/member/saved" ? "btn active" : "btn"}>
            我的行程
          </div>
        </Link>
        <Link to="/member/visited">
          <div className={page === "/member/visited" ? "btn active" : "btn"}>
            我的足跡
          </div>
        </Link>
      </div>
    </Container>
  );
}

export default MemberInfo;
