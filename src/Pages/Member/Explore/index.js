import React, { useLayoutEffect, useState } from "react";
import styled from "styled-components";

const ratio = 780 / 1639;
const ratioImg = 180 / 1440;

const Container = styled.div`
  width: 100%;
  height: ${(props) => {
    return `${props.width * ratio}px`;
  }};
  background-image: url("/Imgs/passport-bg-29.svg");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
  position: relative;
  .stamp {
    position: absolute;
    width: ${(props) => {
      return `${props.width * ratioImg}px`;
    }};
    height: ${(props) => {
      return `${props.width * ratioImg}px`;
    }};
    object-fit: contain;
  }
  @media (max-width: 996px) {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    height: 100%;
    justify-content: center;
    max-height: 40vh;
    background-image: none;
    background-color: #fff;
    .stamp {
      position: relative;
      width: 100%;
      height: 100%;
      max-width: 120px;
      min-height: 120px;
      border: 2px dashed grey;
      border-radius: 50%;
    }
  }
`;

export default function Explore(props) {
  const [size, setSize] = useState([0, 0]);
  const isRowPad = window.matchMedia("(max-width: 996px)").matches;
  const position = [
    [56, 69],
    [85, 31],
    [27, 69],
    [27, 11],
    [56, 11],
    [85, 50],
    [27, 50],
    [85, 89],
    [86, 69],
    [56, 31],
    [56, 50],
    [27, 89],
    [85, 11],
    [56, 89],
  ];

  let { blocksFilter, catalogs } = props;
  let arr = [];
  let arr1 = [];
  let stampPavilions = [];

  const findQualifiedPavilions = () => {
    catalogs.forEach((catalogs) =>
      blocksFilter.forEach((blocksFilters) => {
        if (blocksFilters[1] === catalogs) {
          arr.push(blocksFilters[1]);
        }
      })
    );
  };

  const filterPavilionsStamps = () => {
    catalogs.forEach((catalogs) => {
      if (catalogs === "新光特展館(大貓熊館)" || catalogs === "無尾熊館") {
        arr1 = arr.filter((arrs) => arrs === catalogs).length;
        if (arr1 >= 1) {
          stampPavilions.push(catalogs);
        }
      } else if (catalogs === "企鵝館") {
        arr1 = arr.filter((arrs) => arrs === catalogs).length;
        if (arr1 >= 2) {
          stampPavilions.push(catalogs);
        }
      } else {
        arr1 = arr.filter((arrs) => arrs === catalogs).length;
        if (arr1 >= 5) {
          stampPavilions.push(catalogs);
        }
      }
    });
  };

  findQualifiedPavilions();
  filterPavilionsStamps();

  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <>
      <Container id="passport" width={size[0]}>
        {catalogs.map((catalogs) =>
          stampPavilions.map((stamp, index) =>
            stamp === catalogs ? (
              <img
                key={stamp}
                className="stamp"
                style={{
                  top: isRowPad ? null : `${position[index][0]}%`,
                  left: isRowPad ? null : `${position[index][1]}%`,
                  transform: isRowPad ? "translate(0)" : "translate(-50%,-50%)",
                }}
                src={`/Imgs/stamp/${stamp}.png`}
                alt={stamp}
              />
            ) : undefined
          )
        )}
      </Container>
    </>
  );
}
