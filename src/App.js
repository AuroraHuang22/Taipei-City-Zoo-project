import React from "react";
import Map from "./Pages/map/index";
// import Map from "./Pages/map/map";
// import Selector from "./Pages/map/selector";
// import Animals from "./Pages/map/animals";
import styled from "styled-components";

const Flexbox = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 100vh;
  width: 60vw;
  display: flex;
  flex-direction: column;
`;

// [value,setValue]=useState(false)

// click(e,animals)=>{
//   animals
//  setValue(!value)

// }

// onClick={(e)=>click(e,monkey)}

function App() {
  return (
    <div className="App" style={{ display: "flex", flexDirection: "row" }}>
      <Map />
    </div>
  );
}

export default App;
