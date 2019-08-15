import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import { indexAllTasks } from '../api'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import messages from '../../auth/messages'

import Layout from '../Layout'

class Tasks extends Component {
  constructor (props) {
    super(props)

    this.state = {
      tasks: []
    }
  }

  async componentDidMount () {
    // indexAllTasks(this.props.user.token)
    axios({
      url: apiUrl + '/tasks',
      contentType: false,
      processData: false,
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`
      },
      method: 'GET'
    })
      .then(res => {
        this.setState({ tasks: res.data.tasks })
      })
      .catch(error => {
        console.error(error)
        this.setState({ description: '', dueDate: '' })
        alert(messages.signUpFailure, 'danger')
      })
  }

  render () {
    const tasks = this.state.tasks.map(task => (
      <li key={task._id}>
        <Link to={'/tasks/' + task._id}>{task.description ? task.description : 'Unknown Description'}, {task.dueDate}</Link>
      </li>
    ))

    return (
      <Layout>
        <h3>All the tasks</h3>
        <ul>
          {tasks}
        </ul>
      </Layout>
    )
  }
}

export default Tasks
