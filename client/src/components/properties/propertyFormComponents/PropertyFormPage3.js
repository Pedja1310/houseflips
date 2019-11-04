import React, { Fragment, useState } from "react";
// import PropTypes from "prop-types";
import styled from "styled-components";
import ImageDropzone from "./ImageDropzone";

const OutterContainer = styled.div`
  padding: 0 2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 17rem;
`;

const InnerContainer = styled.div`
  width: 100%;
  padding: 0 2rem;
  height: 100%;
  display: flex;
  flex-direction: row;

  &.inputDiv {
    height: 20%;
  }

  &.imagesDiv {
    height: 80%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: flex-start;
    overflow-y: scroll;
  }
`;

const ButtonSection = styled.div`
  margin: 1.5rem auto 1rem auto;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 2rem;
  justify-content: space-between;
`;

const Button = styled.button`
  flex: 0 0 30%;
  height: 3rem;
  border: 1px solid ${props => props.theme.darkGrey};
  border-radius: 5px;
  color: ${props => props.theme.darkGrey};
  background: ${props => props.theme.white};

  &.backButton:hover {
    background: ${props => props.theme.red1};
    border: none;
    color: ${props => props.theme.white};
  }

  &:hover {
    background: ${props => props.theme.green2};
    border: none;
    color: ${props => props.theme.white};
  }

  &:focus {
    outline: 0;
  }
`;

const PropertyFormPage3 = ({
  decreaseFormPage,
  submitProperty,
  formState,
  handleNewImages,
  removeUploadedImage
}) => {
  const { images } = formState;
  return (
    <Fragment>
      <OutterContainer>
        <p>Drag and drop images, or click to select up to 10 files...</p>
        <ImageDropzone
          handleNewImages={handleNewImages}
          formState={formState}
          removeUploadedImage={removeUploadedImage}
        />
      </OutterContainer>
      <ButtonSection>
        <Button className="backButton" type="button" onClick={decreaseFormPage}>
          Back
        </Button>
        <Button className="nextButton" type="submit" onClick={submitProperty}>
          Finish
        </Button>
      </ButtonSection>
    </Fragment>
  );
};

// PropertyFormPage3.propTypes = {};

export default PropertyFormPage3;
