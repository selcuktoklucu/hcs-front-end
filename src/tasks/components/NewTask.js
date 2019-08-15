import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import TaskForm from './TaskForm'
// import { onNewTask } from '../api'
import messages from '../../auth/messages'
import apiUrl from '../../apiConfig'
import axios from 'axios'

class NewTask extends Component {
  constructor () {
    super()

    this.state = {
      description: '',
      dueDate: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  handleSubmit = event => {
    event.preventDefault()
    // console.log(this.props.user)
    const { alert } = this.props
    // onNewTask(this.state, this.props.user.token)
    return axios({
      url: apiUrl + '/tasks',
      contentType: false,
      processData: false,
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`,
        'Content-Type': 'application/json'
      },
      data: {
        task: {
          description: this.state.description,
          dueDate: this.state.dueDate
        }
      },
      method: 'POST'
    })
      .then(() => alert('You Successfully Created A Task', 'success'))
      .catch(error => {
        console.error(error)
        this.setState({ description: '', dueDate: '' })
        alert(messages.signUpFailure, 'danger')
      })
  }

  render () {
    const { description, dueDate } = this.state

    return (
      <div>
        <TaskForm
          description={description}
          dueDate={dueDate}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
        />
      </div>
    )
  }
}

export default withRouter(NewTask)
