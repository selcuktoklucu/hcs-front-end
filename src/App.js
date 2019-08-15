import React, { Component } from 'react'
import './App.scss'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from './auth/components/AuthenticatedRoute'
import Header from './header/Header'
import SignUp from './auth/components/SignUp'
import SignIn from './auth/components/SignIn'
import SignOut from './auth/components/SignOut'
import ChangePassword from './auth/components/ChangePassword'
import NewTask from './tasks/components/NewTask'
import AutoDismissAlert from './auth/autoDismissAlert.js'
// import Alert from 'react-bootstrap/Alert'
import Tasks from './tasks/components/IndexTasks'
import ShowTask from './tasks/components/ShowTask'
import EditTask from './tasks/components/EditTask'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      user: null,
      alerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  alert = (message, type) => {
    this.setState({ alerts: [...this.state.alerts, { message, type }] })
  }

  render () {
    const { alerts, user } = this.state

    return (
      <React.Fragment>
        <Header user={user} />
        {alerts.map((alert, index) => (
          <AutoDismissAlert
            key={index}
            alert={alert}
          />
        ))}
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp alert={this.alert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn alert={this.alert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/new-task' render={() => (
            <NewTask alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute exact user={user} path='/tasks' render={() => (
            <Tasks alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute exact user={user} path='/tasks/:id' render={(match) => (
            <ShowTask alert={this.alert} match={match.match} user={user} />
          )} />
          <AuthenticatedRoute exact user={user} path='/tasks/:id/edit' render={(match) => (
            <EditTask alert={this.alert} match={match.match} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut alert={this.alert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword alert={this.alert} user={user} />
          )} />
        </main>
      </React.Fragment>
    )
  }
}

export default App
