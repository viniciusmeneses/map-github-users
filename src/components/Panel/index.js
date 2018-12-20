import React from 'react';

import '@fortawesome/fontawesome-free/css/all.css';
import './styles.css';

const Panel = ({ users }) => (
  <section className="panel__wrapper">
    <div>
      {users.map(user => (
        <article className="panel__user" key={user.login}>
          <a href={user.url} className="panel__user-avatar__wrapper" target="_blank" rel="noopener noreferrer">
            <img src={user.avatar} alt="Github Avatar" className="panel__user-avatar__image" />
          </a>
          <div className="panel__user-text__wrapper">
            <h3 className="panel__user-text__name">{user.name}</h3>
            <p className="panel__user-text__login">{user.login}</p>
          </div>
          <button type="button" className="panel__user-button__remove">
            <i className="fas fa-times-circle" />
          </button>
          <button type="button" className="panel__user-button__go">
            <i className="fas fa-chevron-right" />
          </button>
        </article>
      ))}
    </div>
  </section>
);

export default Panel;
