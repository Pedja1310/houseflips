import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Spinner from "../layouts/Spinner";

const Portfolio = ({ auth: { user, loading } }) => {
  const PortfolioContainer = styled.div`
    width: 100%;
    padding: 2rem 2rem;
  `;

  const PortfolioHeader = styled.div`
    height: 3rem;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `;

  const AddNewPropertyButton = styled(Link)`
    border-radius: 3px;
    font-size: 1rem;
    padding: 0.6rem 1.1rem;
    text-transform: uppercase;

    background: ${props => props.theme.darkGrey};
    color: ${props => props.theme.white};
    &:hover {
      text-decoration: none;
      border: 1px solid ${props => props.theme.darkGrey};
      background: ${props => props.theme.white};
      color: ${props => props.theme.darkGrey};
    }
  `;

  const Headline = styled.p`
    font-size: 1.7rem;
    margin: 0;
  `;

  return loading && user === null ? (
    <Spinner />
  ) : (
    <PortfolioContainer>
      <PortfolioHeader>
        <Headline>Welcome, {user.name}.</Headline>
        <AddNewPropertyButton to="add-property">
          Add New Property
        </AddNewPropertyButton>
      </PortfolioHeader>
    </PortfolioContainer>
  );
};

Portfolio.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(Portfolio);
