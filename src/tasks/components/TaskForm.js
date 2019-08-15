import React from 'react'

const TaskForm = ({ description, dueDate, handleSubmit, handleChange }) => (
  <form onSubmit={handleSubmit}>

    <label>Task Description</label>
    <input
      name="description"
      placeholder="Description"
      value={description}
      onChange={handleChange}
    />

    <label>Due Date</label>
    <input
      type="date"
      name="dueDate"
      placeholder="YYYY-MM-DD"
      value={dueDate}
      onChange={handleChange}
    />
    <button className='btn-primary' type="submit">Submit</button>
    <button className='btn-default' >Cancel</button>
  </form>
)

export default TaskForm
