import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
// import { putTask } from '../api'

import apiUrl from '../../apiConfig'
import TaskForm from './TaskForm'
import Layout from '../Layout'

class TaskEdit extends Component {
  constructor (props) {
    super(props)

    this.state = {
      task: {
        description: '',
        dueDate: ''
      },
      updated: false
    }
  }

  async componentDidMount () {
    await axios(`${apiUrl}/tasks/${this.props.match.params.id}`)
      .then(res => this.setState({ task: res.data }))
      .catch(console.error)
  }

  handleChange = event => {
    // console.log('name', event.target.name, 'value', event.target.value)
    // console.log('state.task', this.state)
    const updatedField = { [event.target.name]: event.target.value }
    const editedTask = Object.assign(this.state.task, updatedField)
    this.setState({ task: editedTask })
  }

  handleSubmit = event => {
    event.preventDefault()
    const config = { headers: {
      'Authorization': `Bearer ${this.props.user.token}`
    } }
    // putTask(this.props.match.params.id, { task: this.state.task }, config)
    //   .then(() => this.setState({ updated: true }))
    //   .catch(console.error)
    axios.put(`${apiUrl}/tasks/${this.props.match.params.id}`, { task: this.state.task }, config)
      .then(() => this.setState({ updated: true }))
      .catch(console.error)
  }

  render () {
    const { task, updated } = this.state
    const { handleChange, handleSubmit } = this

    if (updated) {
      return <Redirect to={`/tasks/${this.props.match.params.id}`} />
    }

    return (
      <Layout>
        <TaskForm
          task={task}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          cancelPath={`/tasks/${this.props.match.params.id}`}
        />
      </Layout>
    )
  }
}

export default TaskEdit
