import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as firestore from "../../../Utils/firebase";
import * as Toast from "../../../Utils/toast";

export default function ClickBar(props) {
  const [favoritiesMember, setFavoritiesMember] = useState([]);
  const [visitedMember, setVisitedMember] = useState([]);
  const { uid, item, popupAnimal } = props;

  const handleAddFavorite = (name) => {
    if (uid) {
      let favorities = [...favoritiesMember];
      favorities.push(name);
      setFavoritiesMember(favorities);
      firestore.firebaseAddFavoriate(uid, favorities);
      Toast.success(({ closeToast }) => (
        <div className="toast">
          收藏成功！可至
          <Link className="alink" to="/map">
            路線規劃頁面
          </Link>
          查看
        </div>
      ));
    } else {
      Toast.alertMes("請先登入會員呦");
    }
  };
  const handleRemoveFavorite = (name) => {
    let index = favoritiesMember.indexOf(name);
    let favorities = [...favoritiesMember];
    favorities.splice(index, 1);
    setFavoritiesMember(favorities);
    firestore.firebaseAddFavoriate(uid, favorities);
    Toast.remove("已移除造訪點");
  };
  const handleAddVisited = (name) => {
    if (uid) {
      let visiteds = [...visitedMember];
      visiteds.push(name);
      setVisitedMember(visiteds);
      firestore.firebaseAddVisited(uid, visiteds);
      Toast.success(({ closeToast }) => (
        <div className="toast">
          加入成功！可至
          <Link to="/member/visited" className="alink">
            我的足跡
          </Link>
          查看
        </div>
      ));
    } else {
      Toast.alertMes("請先登入會員呦");
    }
  };
  const handleRemoveVisited = (name) => {
    let index = visitedMember.indexOf(name);
    let visiteds = [...visitedMember];
    visiteds.splice(index, 1);
    setVisitedMember(visiteds);
    firestore.firebaseAddVisited(uid, visitedMember);
    Toast.remove("已抹除足跡");
  };

  useEffect(() => {
    if (uid) {
      firestore.firebaseGetMemberData(uid).then((data) => {
        console.log(data);
        setFavoritiesMember(data.favorities);
        setVisitedMember(data.isVisited);
      });
    }
  }, [uid]);

  return (
    <section className="clickBar">
      <div className="title-md">
        <span className="title-ch">{item.Name_Ch}</span>
        <span className="title-en">{item.Name_En}</span>
      </div>
      <div className="visitedBox">
        <section className="farvrite">
          <div
            className="defaultFavorite"
            style={{
              backgroundImage: "url(/Icons/buyton-05.svg)",
            }}
            key={item.Name_Latin}
            onClick={(e) => {
              handleAddFavorite(item.Name_Ch);
            }}
          />
          {favoritiesMember
            ? favoritiesMember.map((name) =>
                name === popupAnimal ? (
                  <div
                    className="defaultFavorite"
                    key={`ya-${item.Name_Latin}`}
                    style={{
                      backgroundImage: "url(/Icons/buyton-04.svg)",
                    }}
                    onClick={(e) => {
                      e.target.style.backgroundImage =
                        "url(/Icons/like-02.svg)";
                      handleRemoveFavorite(item.Name_Ch);
                    }}
                  />
                ) : null
              )
            : null}
          <div className="text-sm">加入收藏</div>
        </section>
        <section className="visited">
          <div
            className="defaultFavorite"
            style={{
              backgroundImage: "url(/Icons/buyton-06.svg)",
            }}
            key={item.Name_Latin}
            onClick={(e) => {
              handleAddVisited(item.Name_Ch);
            }}
          />
          {visitedMember
            ? visitedMember.map((name) =>
                name === popupAnimal ? (
                  <div
                    className="defaultFavorite"
                    key={`ya-${item.Name_Latin}`}
                    style={{
                      backgroundImage: "url(/Icons/buyton-07.svg)",
                    }}
                    onClick={(e) => {
                      e.target.style.backgroundImage =
                        "url(/Icons/like-02.svg)";
                      handleRemoveVisited(item.Name_Ch);
                    }}
                  />
                ) : null
              )
            : null}
          <div className="text-sm">探索足跡</div>
        </section>
      </div>
    </section>
  );
}
