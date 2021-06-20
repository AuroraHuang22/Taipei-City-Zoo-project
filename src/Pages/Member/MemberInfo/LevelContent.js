export default function LevelContent(prop) {
  const { uid, bar } = prop;
  return (
    <div className="level">
      {uid ? (
        <>
          <span className="level-text">
            {bar <= 20 ? (
              <>探索菜鳥</>
            ) : bar > 20 && bar < 40 ? (
              <>探索里民</>
            ) : bar > 41 && bar < 60 ? (
              <>探索里長</>
            ) : bar > 61 && bar < 80 ? (
              <>探索村長</>
            ) : bar > 81 && bar < 90 ? (
              <>探索嚮導</>
            ) : bar === 100 ? (
              <>動物園達人</>
            ) : null}
          </span>
          <br />
          <span className="desc">
            {bar <= 20 ? (
              <>甘願只當菜鳥？快起身規劃探索旅程吧！</>
            ) : bar > 20 && bar < 40 ? (
              <>還不太知道,非洲象在哪裡</>
            ) : bar > 41 && bar < 60 ? (
              <>去過幾次動物園,身邊朋友偶爾會相信你的方向感</>
            ) : bar > 61 && bar < 80 ? (
              <>有一定的地理知識,專門解救在動物園找不到長頸鹿的民眾</>
            ) : bar > 81 && bar < 90 ? (
              <>已經將動物園地圖熟背在腦海,偶爾會去動物園兼差當領隊</>
            ) : bar === 100 ? (
              <>傳說中的動物園達人,只有你可以召喚雲豹的出現</>
            ) : null}
          </span>
        </>
      ) : (
        <>
          <span
            style={{
              fontWeight: "bold",
              marginRight: "15px",
              marginLeft: "5px",
            }}
          >
            請問你是?
          </span>
          <br />
          <span className="desc">不登入，怎麼知道你的實力啦～</span>
        </>
      )}
      <div className="bar-block">
        <div className="bar-bottom">
          <div
            className="bar-top"
            style={{
              width: `${bar}%`,
            }}
          ></div>
        </div>
        <span className="text">{bar}%</span>
      </div>
    </div>
  );
}
