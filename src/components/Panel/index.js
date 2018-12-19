import React from 'react';

import './styles.css';

const Panel = ({ users }) => (
  <section className="panel__wrapper">
    <div>
      {users.map(user => (
        <article>

        </article>
      ))}
    </div>
  </section>
);

export default Panel;
