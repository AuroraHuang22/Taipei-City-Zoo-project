import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Toast from "../../../../Utils/toast";
import * as reduxAction from "../../../../Redux/Action";
import "react-toastify/dist/ReactToastify.css";

let flag = false;
export default function SubmitButton(props) {
  const { animalsData, routeData, savedData } = props;
  const params = new URLSearchParams(document.location.search.substring(1));
  const idValue = params.get("id");
  const dispatch = useDispatch();
  const animalsNum = useSelector(
    (state) => state.AnimalsReducer.showAnimals.num
  );

  const submit = () => {
    let pavilionsArray = animalsData
      .filter((animals) => animalsNum.includes(animals.CID))
      .map((result) => [result.Location, result.Index]);

    if (pavilionsArray.length) {
      const set = new Set();
      const pavilionsSort = pavilionsArray
        .filter((item) => (!set.has(item[1]) ? set.add(item[1]) : false))
        .sort((a, b) => a[1] - b[1]);

      let found = pavilionsSort.indexOf(
        pavilionsSort.find((index) => index[1] >= 4 && index[1] < 10)
      );
      if (found !== -1) {
        pavilionsSort.splice({ found }, 0, ["列車站", 3.5]);
      }

      pavilionsSort[0][1] >= 10
        ? pavilionsSort.sort((a, b) => b[1] - a[1])
        : pavilionsSort.sort((a, b) => a[1] - b[1]);

      let result = [];
      routeData.forEach((item) =>
        pavilionsSort.forEach(
          (pav) => item.Location === pav[0] && result.push(...item.Route)
        )
      );
      dispatch(reduxAction.addRecommend(pavilionsSort));
      dispatch(reduxAction.addRoute(result));
      dispatch(reduxAction.gotoNextStep());
    } else {
      Toast.alertMes("請先選擇至少一種想看的動物喔！");
    }
  };

  useEffect(() => {
    const initSavedPlan = () => {
      if (idValue) {
        if (savedData === "none" || savedData.length === 0) {
          return null;
        }
        let geoArray = [];
        savedData[idValue - 1].geo.forEach((item) => {
          let arr1 = item.split(",");
          geoArray.push([Number(arr1[0]), Number(arr1[1])]);
        });
        let numArray = savedData[idValue - 1].num.map((item) => Number(item));

        dispatch(reduxAction.removeAllAnimal());
        geoArray.forEach((item, index) =>
          dispatch(reduxAction.addAnimal(item, Number(numArray[index])))
        );
        flag = true;
      }
    };
    initSavedPlan();
  }, [dispatch, idValue, savedData]);

  if (flag) {
    submit();
  }
  return (
    <button className="btn" onClick={submit}>
      下一步 選擇顯示設施
    </button>
  );
}
