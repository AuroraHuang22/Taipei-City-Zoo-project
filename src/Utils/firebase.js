import firebase from "firebase";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "zooproject-taipei.firebaseapp.com",
  projectId: "zooproject-taipei",
  storageBucket: "zooproject-taipei.appspot.com",
  messagingSenderId: "96578304850",
  appId: "1:96578304850:web:6f511770927ca18279588b",
  measurementId: "G-6SSVE3J0KN",
};
firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();

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

const firebaseCreateNewMemberStore = (uid) => {
  db.collection("Users")
    .doc(uid)
    .set(
      {
        favorities: [],
        isVisited: [],
        uid: uid,
      },
      { merge: true }
    )
    .then(() => {
      console.log("Document successfully written!");
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
};

const firebaseAddFavoriate = (uid, arr) => {
  db.collection("Users")
    .doc(uid)
    .set(
      {
        favorities: arr,
      },
      { merge: true }
    )
    .then(() => {
      console.log("Document successfully written!");
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
};

const firebaseAddVisited = (uid, arr) => {
  db.collection("Users")
    .doc(uid)
    .set(
      {
        isVisited: arr,
      },
      { merge: true }
    )
    .then(() => {
      console.log("Document successfully written!");
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
};

const firebaseAddSaved = (uid, geo, num) => {
  db.collection("Users")
    .doc(uid)
    .collection("saved")
    .doc()
    .set(
      {
        geo: geo,
        num: num,
      },
      { merge: true }
    )
    .then(() => {
      console.log("Document successfully written!");
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
};

const firebaseGetData = (collection) =>
  db
    .collection(collection)
    .get()
    .then((querySnapshot) => {
      const firebaseData = querySnapshot.docs.map((doc) => doc.data());
      return firebaseData;
    });

const firebaseGetMemberData = (uid) =>
  db
    .collection("Users")
    .doc(uid)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return doc.data();
      } else {
        return null;
      }
    });

const firebaseGetSavedData = (uid, callback) =>
  db
    .collection("Users")
    .doc(uid)
    .collection("saved")
    .get()
    .then((querySnapshot) => {
      const arr = querySnapshot.docs.map((doc) => doc.data());
      callback(arr);
    });

const firebaseGetSavedId = (uid, callback) =>
  db
    .collection("Users")
    .doc(uid)
    .collection("saved")
    .get()
    .then((querySnapshot) => {
      const arr = querySnapshot.docs.map((doc) => doc.id);
      callback(arr);
    });

const getUserId = (callback) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      callback(user.uid);
    } else {
      callback(false);
    }
  });
};

const firebaseDeleteDoc = (uid, doc) =>
  db
    .collection("Users")
    .doc(uid)
    .collection("saved")
    .doc(doc)
    .delete()
    .then(() => {
      console.log("Document successfully deleted!");
    })
    .catch((error) => {
      console.error("Error removing document: ", error);
    });

const signOut = () => firebase.auth().signOut();

export {
  firebaseCreateNewMemberStore,
  firebaseAddFavoriate,
  firebaseAddVisited,
  firebaseGetData,
  firebaseAddFacilities,
  firebaseAddAnimals,
  firebaseGetMemberData,
  getUserId,
  firebaseAddSaved,
  firebaseGetSavedData,
  firebaseGetSavedId,
  firebaseDeleteDoc,
  signOut,
};
