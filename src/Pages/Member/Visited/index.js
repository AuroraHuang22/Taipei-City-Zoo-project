import React from "react";
import { Container, ItemBlock, Render } from "./style";

export default function Visited(props) {
  const { catalogs, allVisitedAnimalsData, getVisited } = props;
  return (
    <Container>
      <Render>
        {getVisited.length ? (
          catalogs.map((item, index) => (
            <ItemBlock key={`${index}858`}>
              <span className="title">
                <img
                  className="title-bg"
                  src={`/Icons/${item}-32.svg`}
                  alt="outline"
                />
              </span>
              <div className="greyGround">
                {catalogs.map((pav, pavIndex) =>
                  item === "新光特展館(大貓熊館)" && pavIndex === 1 ? (
                    <div key={pav} className="grey-bg">
                      <p className="greyGround-p">🈳</p>
                    </div>
                  ) : item === "企鵝館" && pavIndex < 2 ? (
                    <div key={pav} className="grey-bg">
                      <p className="greyGround-p">🈳</p>
                    </div>
                  ) : item === "無尾熊館" && pavIndex === 1 ? (
                    <div key={pav} className="grey-bg">
                      <p className="greyGround-p">🈳</p>
                    </div>
                  ) : item !== "無尾熊館" &&
                    item !== "企鵝館" &&
                    item !== "新光特展館(大貓熊館)" &&
                    pavIndex < 5 ? (
                    <div key={pav} className="grey-bg">
                      <p className="greyGround-p">🈳</p>
                    </div>
                  ) : null
                )}
              </div>
              <div className="animalsBlock">
                {allVisitedAnimalsData.map(
                  (ele) =>
                    ele[1] === item && (
                      <div key={ele[0]} className="inner-animal">
                        <div className="blocksFilter-p">{ele[0]}</div>
                        <div
                          className="animal-img"
                          style={{
                            backgroundImage: `url("/animals/${ele[0]}.jpeg")`,
                          }}
                        ></div>
                      </div>
                    )
                )}
              </div>
            </ItemBlock>
          ))
        ) : (
          <div className="desc">
            到 <a href="/all">動物總覽</a>搜集你的第一個足跡吧！
          </div>
        )}
      </Render>
    </Container>
  );
}
