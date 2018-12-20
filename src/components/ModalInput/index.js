import React from 'react';
import { withState, withHandlers, compose } from 'recompose';

import 'animate.css/animate.min.css';
import './styles.css';

const ModalInput = ({ usernameInput, handleInputChange, handleFormSubmit, opened, handleClose }) => (
  <div className={`modal__wrapper ${opened ? 'modal__wrapper-opened' : 'modal__wrapper-closed'}`}>
    <aside className="modal__content">
      <h1 className="modal__title">Add new user</h1>
      <form className="modal__form" onSubmit={handleFormSubmit}>
        <input type="text" className="modal__form-input" placeholder="Github username..." onChange={handleInputChange} value={usernameInput} />
        <button type="button" className="modal__form-cancel" onClick={handleClose}>Cancel</button>
        <button type="submit" className="modal__form-submit">Find</button>
      </form>
    </aside>
  </div>
);

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
    },
    handleClose: props => () => {
      props.updateStatus(false);
    },
  }),
);

export default enchance(ModalInput);
