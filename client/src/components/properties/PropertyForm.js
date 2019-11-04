import React, { useState } from "react";
// import PropTypes from "prop-types";
import { withRouter } from 'react-router-dom'
import styled from "styled-components";
import { connect } from 'react-redux';
import PropertyFormPage1 from "./propertyFormComponents/PropertyFormPage1";
import PropertyFormPage2 from "./propertyFormComponents/PropertyFormPage2";
import PropertyFormPage3 from "./propertyFormComponents/PropertyFormPage3";

import { createProperty } from '../../actions/properties';

const PropertyForm = styled.form`
  margin: 2rem auto;
  padding: 2rem;
  height: 30rem;
  width: 70%;
  background: ${props => props.theme.white};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  box-shadow: 1px 0px 34px 5px rgba(0, 0, 0, 0.26);
`;

const Headline = styled.div`
  color: ${props => props.theme.darkGrey};
  padding: 0 2rem;
  height: 2.5rem;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  & h3,
  p {
    margin: 0;
  }
`;

const AddProperty = ({createProperty, history}) => {
  const [formPage, setFormPage] = useState(1);
  const [formState, setFromState] = useState({
    country: '',
    city: '',
    address: '',
    price: '',
    numOfRooms: '',
    type: '',
    utilities: [],
    images: []
  });

  const increaseFormPage = e => {
    e.preventDefault();
    setFormPage(formPage + 1);
  };

  const decreaseFormPage = e => {
    e.preventDefault();
    if (formPage > 1) {
      setFormPage(formPage - 1);
    }
  };

  const handleChange = e => {
    e.preventDefault()
    setFromState({ ...formState, [e.target.name]: e.target.value })
  };

  const handleUtilitiesInput = e => {
    e.preventDefault();
    if (e.key === "Enter" && e.target.value.length > 0) {
      const newUtility = e.target.value.trim();
      const utilities = formState.utilities;
      utilities.push(newUtility);
      setFromState({ ...formState, utilities });
    }
  };

  const removeUtility = index => {
    const utilities = formState.utilities;
    utilities.splice(index, 1);
    setFromState({ ...formState, utilities });
  };

  const handleNewImages = newImages => {
    let images = [...formState.images, ...newImages];
    setFromState({...formState, images});
    console.log(formState.images)
  }

  const removeUploadedImage = (e, index) => {
    e.stopPropagation();
    let images = [...formState.images];
    images.splice(index, 1);
    setFromState({ ...formState, images });
    console.log(images);
  };

  const submitProperty = e => {
    e.preventDefault();
    createProperty(history, formState);
  };

  const formPageChanger = () => {
    switch (formPage) {
      case 1:
        return <PropertyFormPage1 formState={formState} handleChange={handleChange} increaseFormPage={increaseFormPage} />;
      case 2:
        return (
          <PropertyFormPage2
            formState={formState}
            handleChange={handleChange}
            handleUtilitiesInput={handleUtilitiesInput}
            removeUtility={removeUtility}
            increaseFormPage={increaseFormPage}
            decreaseFormPage={decreaseFormPage}
          />
        );
      case 3:
        return (
          <PropertyFormPage3
            formState={formState}
            decreaseFormPage={decreaseFormPage}
            submitProperty={submitProperty}
            handleNewImages={handleNewImages}
            removeUploadedImage={removeUploadedImage}
          />
        );
      default:
        return null;
    }
  };

  return (
    <PropertyForm>
      <Headline>
        <h3>Add new property</h3>
        <p>Step {formPage} of 3</p>
      </Headline>
      {formPageChanger()}
    </PropertyForm>
  );
};

// AddProperty.propTypes = {};

export default connect(null, { createProperty })(withRouter(AddProperty));
