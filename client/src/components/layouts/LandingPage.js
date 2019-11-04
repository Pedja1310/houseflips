import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import LandingImage from "../../img/beachHouse.jpg";

const MainDiv = styled.div`
  position: relative;
  background: url(${LandingImage}) no-repeat center;
  height: calc(100vh - 8vh);
`;

const OverlayDiv = styled.div`
  background: rgba(255, 255, 255, 0.8);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const LandingPage = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/portfolio" />;
  }

  return (
    <MainDiv>
      <OverlayDiv />
    </MainDiv>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  {}
)(LandingPage);
