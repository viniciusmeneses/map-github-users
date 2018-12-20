import React from 'react';
import { withState, withHandlers, compose } from 'recompose';
import PropTypes from 'prop-types';

import 'animate.css/animate.min.css';
import './styles.css';

const ModalInput = ({
  usernameInput,
  handleInputChange,
  handleFormSubmit,
  opened,
  handleClose,
}) => (
  <div className={`modal__wrapper ${opened ? 'modal__wrapper-opened' : 'modal__wrapper-closed'}`}>
    <aside className="modal__content">
      <h1 className="modal__title">Add new user</h1>
      <form className="modal__form" onSubmit={handleFormSubmit}>
        <input
          type="text"
          className="modal__form-input"
          placeholder="Github username..."
          onChange={handleInputChange}
          value={usernameInput}
        />
        <button type="button" className="modal__form-cancel" onClick={handleClose}>
          Cancel
        </button>
        <button type="submit" className="modal__form-submit">
          Find
        </button>
      </form>
    </aside>
  </div>
);

ModalInput.propTypes = {
  usernameInput: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleFormSubmit: PropTypes.func.isRequired,
  opened: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

const enchance = compose(
  withState('usernameInput', 'setUsernameInput', ''),
  withHandlers({
    handleInputChange: props => (e) => {
      const { target } = e;
      props.setUsernameInput(target.value);
    },
    handleFormSubmit: props => (e) => {
      e.preventDefault();
      props.userRequest(props.usernameInput);
      props.updateStatus(false);
      props.setUsernameInput('');
    },
    handleClose: props => () => {
      props.updateStatus(false);
      props.setUsernameInput('');
    },
  }),
);

export default enchance(ModalInput);
