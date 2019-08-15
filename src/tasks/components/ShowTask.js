import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Layout from '../Layout'
import axios from 'axios'
import apiUrl from '../../apiConfig'

class Task extends Component {
  constructor (props) {
    super(props)

    this.state = {
      task: null,
      deleted: false
    }
  }

  async componentDidMount () {
    // console.log('this.props', this.props)
    await axios(`${apiUrl}/tasks/${this.props.match.params.id}`)
      .then(res => {
        // console.log('res', res)
        this.setState({ task: res.data })
      })
      .catch(console.error)
  }

  destroy = (id) => {
    // console.log('trying to delete')
    // console.log('user.token', this.props.user.token)
    axios.delete(
      `${apiUrl}/tasks/${id}`,
      { headers: {
        'Authorization': `Bearer ${this.props.user.token}`
      } })
      .then(res => {
        this.setState({ deleted: true })
      })
      .then()
      .catch(console.error)
  }

  render () {
    const { task, deleted } = this.state

    if (!task) {
      return (
        <Layout>
          <p>Loading...</p>
        </Layout>
      )
    }

    if (deleted) {
      return (
        <Layout>
          <p>Task Deleted...</p>
        </Layout>
      )
    }

    return (
      <Layout>
        <h4>Desciption: {task.description ? task.description : 'Unknown Title'}</h4>
        <p>taskID: {task._id}</p>
        <p>Due Date: {task.dueDate ? task.dueDate : 'Unknown'}</p>

        <button className='btn-danger' onClick={() => this.destroy(task._id)}>Delete Task</button>
        <Link to={'/tasks/' + task._id + '/edit'}>
          <button className='btn-primary'>Edit</button>
        </Link>
        <Link to='/tasks'>Back to all tasks</Link>
      </Layout>
    )
  }
}

export default Task
