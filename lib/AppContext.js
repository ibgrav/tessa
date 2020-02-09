import React, { useState } from 'react';

const AppContext = React.createContext([{}, () => { }]);

const initialState = {
  meta: null,
  isDark: false,
  eventsSet: false,
  theme: {
    text: {
      primary: '#333',
      secondary: '#fef9f7'
    },
    link: {
      primary: '#78b2de',
      active: '#c58c8c'
    },
    background: {
      primary: '#333',
      secondary: '#FFF'
    }
  }
}

const AppProvider = (props) => {
  const [state, setState] = useState(initialState);

  return (
    <AppContext.Provider value={[state, setState]}>
      {props.children}
    </AppContext.Provider>
  )
}

export { AppContext, AppProvider }