import React, { Fragment } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
// import PropTypes from "prop-types";

const OutterContainer = styled.div`
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
    height: 33%;
  }

  &.utilitiesList {
    height: 65%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: flex-start;
    overflow-y: scroll;
  }
`;

const InputField = styled.div`
  width: 100%;
  margin: 0 auto;

  & label {
    display: flex;
    flex-direction: column;
  }

  & input {
    height: 2.5rem;
    width: 100%;
    margin: 0;
    border: none;
    border-bottom: 1px solid ${props => props.theme.grey1};
    color: ${props => props.theme.darkGrey};
    font-weight: 400;

    &:active,
    &:focus {
      outline: none;
    }
  }

  & input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  & input[type="number"] {
    -moz-appearance: textfield;
  }

  & select {
    height: 2.5rem;
    margin: 0.5rem 0;
    border: none;
    border-bottom: 1px solid ${props => props.theme.grey3};
    color: ${props => props.theme.darkGrey};
    font-weight: 400;

    &:active,
    &:focus {
      outline: none;
    }
  }

  & span {
    font-size: 0.8rem;
    color: ${props => props.theme.darkGrey};
    display: block;
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

const Utility = styled.div`
  padding: 0.2rem 0.5rem;
  margin: 0.2rem;
  height: 1.5rem;
  background-color: ${props => props.theme.grey3};
  color: ${props => props.theme.white};
  display: inline-block;
  display: flex;
  align-items: center;
  border-radius: 2px;

  & p {
    margin: 0;
  }

  & svg {
    margin-left: 0.5rem;
  }
`;

const PropertyFormPage2 = ({
  formState,
  increaseFormPage,
  decreaseFormPage,
  handleUtilitiesInput,
  removeUtility
}) => {
  const { utilities } = formState;
  return (
    <Fragment>
      <OutterContainer>
        <InnerContainer className="inputDiv">
          <InputField>
            <label htmlFor="utility">
              <input
                type="text"
                name="utility"
                id="utility"
                placeholder="Add utlities like swimming pool, garage, bathrooms, etc."
                maxLength="30"
                disabled={utilities.length === 15}
                onKeyDown={e => {
                  if (e.key === "Enter") handleUtilitiesInput(e);
                }}
              />
            </label>
            <span>Press enter to add item to the list.</span>
            <span>{15 - utilities.length} of 15 places left.</span>
          </InputField>
        </InnerContainer>
        <InnerContainer className="utilitiesList">
          {utilities.map((utility, index) => {
            return (
              <Utility key={index}>
                <p>{utility}</p>
                <FontAwesomeIcon
                  icon={faTimes}
                  onClick={e => removeUtility(index)}
                />
              </Utility>
            );
          })}
        </InnerContainer>
      </OutterContainer>
      <ButtonSection>
        <Button className="backButton" type="button" onClick={decreaseFormPage}>
          Back
        </Button>
        <Button className="nextButton" type="button" onClick={increaseFormPage}>
          Next
        </Button>
      </ButtonSection>
    </Fragment>
  );
};

// PropertyFormPage2.propTypes = {};

export default PropertyFormPage2;
