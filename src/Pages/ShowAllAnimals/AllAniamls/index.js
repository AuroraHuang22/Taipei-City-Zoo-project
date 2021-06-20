import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Filter from "./Filter";
import RenderAnimals from "./RenderAnimals";
import * as firestore from "../../../Utils/firebase";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: white;
`;

export default function All() {
  const [getUid, setGetUid] = useState();

  useEffect(() => {
    const unsubscribe = firestore.getUserId((uid) => {
      setGetUid(uid);
    });
    return unsubscribe;
  }, []);

  return (
    <Container>
      <Filter />
      <RenderAnimals uid={getUid} />
    </Container>
  );
}
