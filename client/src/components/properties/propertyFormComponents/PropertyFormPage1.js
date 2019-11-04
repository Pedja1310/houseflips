import React, { Fragment } from "react";
// import PropTypes from "prop-types";
import styled from "styled-components";

const OutterContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  height: 17rem;
`;

const InnerContainer = styled.div`
  width: 50%;
  padding: 0 2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
    margin: 1rem 0;
    border: none;
    border-bottom: 1px solid ${props => props.theme.grey3};
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
    margin: 1rem 0;
    border: none;
    border-bottom: 1px solid ${props => props.theme.grey3};
    color: ${props => props.theme.darkGrey};
    font-weight: 400;

    &:active,
    &:focus {
      outline: none;
    }
  }
`;

const ButtonSection = styled.div`
  margin: 1.5rem auto 1rem auto;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 2rem;
  justify-content: flex-end;
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

  &.nextButton {
    float: right;
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

const PropertyFormPage1 = ({
  formState,
  handleChange,
  increaseFormPage,
  updateForm
}) => {
  const { country, city, address, price, numOfRooms, type } = formState;
  return (
    <Fragment>
      <OutterContainer>
        <InnerContainer>
          <InputField>
            <label htmlFor="country">
              <input
                type="text"
                name="country"
                id="country"
                placeholder="Country"
                value={country}
                autoComplete="off"
                onChange={handleChange}
              />
            </label>
          </InputField>
          <InputField>
            <label htmlFor="city">
              <input
                type="text"
                name="city"
                id="city"
                placeholder="City"
                value={city}
                autoComplete="off"
                onChange={handleChange}
              />
            </label>
          </InputField>
          <InputField>
            <label htmlFor="address">
              <input
                type="text"
                name="address"
                id="address"
                value={address}
                placeholder="Address"
                autoComplete="off"
                onChange={handleChange}
              />
            </label>
          </InputField>
        </InnerContainer>
        <InnerContainer>
          <InputField>
            <label htmlFor="price">
              <input
                type="number"
                name="price"
                id="price"
                value={price}
                placeholder="Property Price"
                onChange={handleChange}
              />
            </label>
          </InputField>
          <InputField>
            <label htmlFor="numOfRooms">
              <input
                type="number"
                name="numOfRooms"
                id="numOfRooms"
                value={numOfRooms}
                placeholder="Number Of Rooms"
                onChange={handleChange}
              />
            </label>
          </InputField>
          <InputField>
            <label htmlFor="type">
              <select
                name="type"
                id="type"
                value={type}
                onChange={handleChange}
              >
                <option value="">Property Type</option>
                <option value="house">House</option>
                <option value="apartment">Apartment</option>
                <option value="loft">Loft</option>
              </select>
            </label>
          </InputField>
        </InnerContainer>
      </OutterContainer>
      <ButtonSection>
        <Button className="nextButton" type="button" onClick={increaseFormPage}>
          Next
        </Button>
      </ButtonSection>
    </Fragment>
  );
};

// PropertyFormPage1.propTypes = {};

export default PropertyFormPage1;
