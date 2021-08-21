import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import CharacterList from './features/characterList'
import Character from './features/character'
import { store } from './app/store'
import Layout from './layout'
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/:page?">
              <CharacterList />
            </Route>
            <Route path="/character/:id">
              <Character />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
