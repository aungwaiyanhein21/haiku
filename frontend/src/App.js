import React from 'react';

import { Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Nav from './components/Nav';

import { CssBaseline } from '@material-ui/core';
import Authors from './components/Authors/Authors';
import AuthorForm from './components/Authors/AuthorForm';

import Haiku from './components/Haiku/Haiku';
import HaikuForm from './components/Haiku/HaikuForm';
import Page404 from './components/Page404';

function App() {
  return (
    <>
      <CssBaseline />

      <Nav />
    

      <Switch>
        <Route exact path="/authors/update">
          <AuthorForm />
        </Route>
        <Route exact path="/authors/create">
          <AuthorForm />
        </Route>
        <Route exact path="/authors">
          <Authors />
        </Route>
        <Route exact path="/haiku/create">
          <HaikuForm isFormToBeUpdate={false}/>
        </Route>
        <Route exact path="/haiku/update">
          <HaikuForm isFormToBeUpdate={true}/>
        </Route>
        <Route exact path="/haiku">
          <Haiku />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="*">
          <Page404 />
        </Route>

       
      </Switch>
    </>
  );
}

export default App;
