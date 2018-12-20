import React from 'react';
import { withHandlers } from 'recompose';

import '@fortawesome/fontawesome-free/css/all.css';
import './styles.css';

const Panel = ({ users, handleRemoveClick, handleFindClick }) => (
  <section className="panel__wrapper">
    <div>
      {!users.length && (
        <div className="panel__no-users">
          <i className="fas fa-map-marked-alt" />
          <p>Add a Github user clicking on map!</p>
        </div>
      )}
      {users.map(user => (
        <article className="panel__user" key={user.login}>
          <a
            href={user.url}
            className="panel__user-avatar__wrapper"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={user.avatar} alt="Github Avatar" className="panel__user-avatar__image" />
          </a>
          <div className="panel__user-text__wrapper">
            <h3 className="panel__user-text__name">{user.name}</h3>
            <p className="panel__user-text__login">{user.login}</p>
          </div>
          <button
            type="button"
            className="panel__user-button__remove"
            onClick={() => handleRemoveClick(user.login)}
          >
            <i className="fas fa-times-circle" />
          </button>
          <button
            type="button"
            className="panel__user-button__find"
            onClick={() => handleFindClick(user.long, user.lat)}
          >
            <i className="fas fa-chevron-right" />
          </button>
        </article>
      ))}
    </div>
  </section>
);

export default withHandlers({
  handleRemoveClick: props => login => props.removeUser(login),
  handleFindClick: props => (long, lat) => props.findUser(long, lat),
})(Panel);
