import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    createNotification(state, action) {
      return state = action.payload
    },
    disableNotification() {
      return ''
    }
  }
})

export const { createNotification, disableNotification } = notificationSlice.actions

export const setNotification = (text, time) => {
  return (dispatch) => {
    dispatch(createNotification(text))
    setTimeout(() => { dispatch(disableNotification()) }, time * 1000)
  }
}

export default notificationSlice.reducer