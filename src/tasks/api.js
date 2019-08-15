// import apiUrl from '../apiConfig'
// import axios from 'axios'
//
// export const onNewTask = (taskObject, token) => {
//   console.log('onNew task', taskObject, token)
//   return axios({
//     url: apiUrl + '/tasks',
//     contentType: false,
//     processData: false,
//     headers: {
//       'Authorization': `Bearer ${token}`,
//       'Content-Type': 'application/json'
//     },
//     data: {
//       task: {
//         description: taskObject.description,
//         dueDate: taskObject.dueDate
//       }
//     },
//     method: 'POST'
//   })
// }
//
// export const indexAllTasks = token => {
//   console.log(apiUrl + '/tasks')
//   return axios({
//     url: apiUrl + '/tasks',
//     contentType: false,
//     processData: false,
//     headers: {
//       'Authorization': `Bearer ${token}`
//     },
//     method: 'GET'
//   })
// }
//
// export const putTask = (id, data, config) => {
//   // axios.put(`${apiUrl}/tasks/${this.props.match.params.id}`, { task: this.state.task }, config)
//   return axios.put(`${apiUrl}/tasks/${id}`, data, config)
// }
