import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCI3Hmv_gjjmFzRO-t0BngdDIKCcaSlyeM",
  authDomain: "zooproject-taipei.firebaseapp.com",
  projectId: "zooproject-taipei",
  storageBucket: "zooproject-taipei.appspot.com",
  messagingSenderId: "96578304850",
  appId: "1:96578304850:web:6f511770927ca18279588b",
  measurementId: "G-6SSVE3J0KN",
};
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

const firebaseAddAnimals = (data) => {
  data.forEach((item) => {
    db.collection("Animals")
      .doc(item.Name_Ch)
      .set({
        AlsoKnow: item.AlsoKnown,
        Behavior: item.Behavior,
        Class: item.Class,
        Code: item.Code,
        Conservation: item.Conservation,
        Crisis: item.Crisis,
        Diet: item.Diet,
        Distribution: item.Distribution,
        Family: item.Family,
        Feature: item.Feature,
        Geo: item.Geo,
        Habitat: item.Habitat,
        Location: item.Location,
        Name_Ch: item.Name_Ch,
        Name_En: item.Name_En,
        Order: item.Order,
        Phylum: item.Phylum,
        PicURL: item.Pic01_URL,
      })
      .then(() => {
        console.log("ok");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  });
};

const firebaseAddFacilities = (data) => {
  data.forEach((item, index) => {
    db.collection("Facilities")
      .doc()
      .set({
        Index: index,
        Brief: item.Brief,
        Keywords: item.Keywords,
        Geo: item.Geo,
        Category: item.Category,
        Item: item.Item,
        Meal: item.Meal,
        Memo: item.Memo,
        Pic01_ALT: item.Pic01_ALT,
        Shop: item.Shop,
        Summary: item.Summary,
        Title: item.Title,
      })
      .then(() => {
        console.log("OK");
      });
  });
};

const firebaseAddData = () => {
  db.collection("city")
    .doc("LA")
    .set({
      name: "Los Angeles",
      state: "CA",
      country: "USA",
    })
    .then(() => {
      console.log("Document successfully written!");
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
};

const firebaseGetData = (collection) => {
  return db
    .collection(collection)
    .get()
    .then((querySnapshot) => {
      let firebaseData = [];
      querySnapshot.forEach((doc) => {
        firebaseData.push(doc.data());
      });
      return firebaseData;
    });
};

export {
  firebaseAddData,
  firebaseGetData,
  firebaseAddFacilities,
  firebaseAddAnimals,
};
