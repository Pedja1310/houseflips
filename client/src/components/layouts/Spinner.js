import React from "react";
import styled from "styled-components";
import spinner from "../../img/6.gif";

export default function Spinner() {
  const SpinnerDiv = styled.div`
    width: 200px;
    height: 200px;
    display: flex;
    margin: 0 auto;
    align-items: center;
  `;

  return (
    <SpinnerDiv>
      <img
        src={spinner}
        style={{ width: "40px", margin: "auto", display: "block" }}
        alt=""
      />
    </SpinnerDiv>
  );
}
