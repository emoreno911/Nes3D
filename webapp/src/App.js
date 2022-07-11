import React from 'react';
import { Route, HashRouter, Switch } from 'react-router-dom';
import Visual from './pages/visual';
import Home from './pages/home';
import DataContextProvider from './app/context';

function App() {
  return (
    <DataContextProvider>
        <HashRouter>
            <Switch>
                <Route path="/" exact render={props => <Home {...props} />} />
                <Route path="/visual/:tokenId?" render={(props) => <Visual {...props} />} />
            </Switch>
        </HashRouter>
    </DataContextProvider>
  );
}

export default App;
