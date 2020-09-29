import React, { Component } from 'react';
import Login from './Login';
import Register from './Register';
import Home from './Home'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

class App extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route exact path="/register" component={Register} />
                </Switch>
            </Router>
        )
    }
}

export default App;
