import styled from "styled-components";

const Container = styled.div`
  display: flex;
  width: 100%;
  margin: 0 auto;
  max-width: 1280px;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  padding: 100px 50px;
  box-sizing: border-box;
  .background {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 200px;
    height: 200px;
    padding-bottom: 30px;
    margin-bottom: 20px;
    cursor: pointer;
  }
  .background:hover .imgBox {
    border: 3px solid #f09a8f;
  }
  .background:hover .text {
    background-color: #f09a8f;
    color: #f2f2f2;
    font-weight: 600;
  }
  .imgBox {
    width: 80%;
    height: 80%;
    border-radius: 50%;
    overflow: hidden;
    border: 3px solid #a5a4a3;
    background-color: #f2f2f2;
    transition: all 0.3s ease;
  }
  .img {
    height: 100%;
    object-fit: cover;
    object-position: center;
    filter: grayscale(30%);
    aspect-ratio: 1 / 1;
  }
  .text {
    position: absolute;
    width: 70%;
    text-align: center;
    top: 85%;
    white-space: nowrap;
    background-color: #f2f2f2;
    padding: 3px 20px;
    border-radius: 20px;
    font-size: 18px;
    letter-spacing: 2px;
    color: #a5a4a3;
    transition: all 0.3s ease;
  }
  .contain {
    color: #acabbe;
    display: flex;
    width: 100%;
    margin: 20px auto 0;
    justify-content: center;
    list-style: none;
  }
  .pages {
    display: block;
    color: #acabbe;
    padding: 0 10px;
    cursor: pointer;
    transition: color 0.2s;
    :hover {
      color: #c4c4cf;
    }
  }
  .active,
  .previous,
  .next {
    color: #f09a8f;
    cursor: pointer;
    transition: all 0.1s;
  }
  .previous,
  .next {
    color: grey;
    margin-right: 12px;
    padding: 2px 12px;
    border: 1px solid #f2f2f2;
    border-radius: 20px;
    cursor: pointer;
    :hover {
      background-color: #f2f2f2;
      border: 1px solid #f2f2f2;
    }
  }
  .next {
    margin-left: 12px;
  }
  @media (max-width: 768px) {
    padding: 80px 30px;
    .background {
      width: 150px;
      height: 150px;
      padding-bottom: 40px;
    }
    .text {
      width: 60%;
      top: 80%;
      font-size: 14px;
      white-space: normal;
    }
  }
  @media (max-width: 576px) {
    padding: 50px 10px;
    .background {
      width: 100px;
      height: 100px;
      padding-bottom: 40px;
      margin: 10px 5px;
    }
    .text {
      width: 60%;
      font-size: 12px;
      white-space: normal;
    }
    .contain {
      margin: 20px auto 60px;
      padding: 0;
    }
    .pages {
      display: block;
      color: #acabbe;
      font-size: 14px;
      padding: 0 10px;
      cursor: pointer;
      transition: color 0.2s;
      :hover {
        color: #c4c4cf;
      }
    }
    .active,
    .previous,
    .next {
      color: #f09a8f;
      cursor: pointer;
      transition: all 0.1s;
    }
    .previous,
    .next {
      color: grey;
      font-size: 14px;
      margin-right: 8px;
      white-space: nowrap;
      padding: 2px 4px;
      border: 1px solid #f2f2f2;
      border-radius: 20px;
      cursor: pointer;
      :hover {
        background-color: #f2f2f2;
        border: 1px solid #f2f2f2;
      }
    }
    .next {
      margin-left: 8px;
    }
  }
`;

export { Container };
