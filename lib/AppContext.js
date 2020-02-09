import React, { useState } from 'react';

const AppContext = React.createContext([{}, () => { }]);

const initialState = {
    meta: null,
    isDark: false,
    eventsSet: false
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