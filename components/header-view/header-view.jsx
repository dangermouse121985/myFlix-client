import { useState } from 'react';
import { MainView } from '../main-view/main-view';

export const HeaderView = () => {
  return (
    <div>
      <ul>
        <li>
          <a href="#">Profile</a>
        </li>
        <li>
          <button
            onClick={() => {
              localStorage.clear();
            }}
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};
