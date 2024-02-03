import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    voteNotification(state, action) {
      return state = `you voted '${action.payload}'`
    },
    newNoteNotification(state, action) {
      return state = `you created '${action.payload}'`
    },
    disableNotification() {
      return ''
    }
  }
})

export const { voteNotification, newNoteNotification, disableNotification } = notificationSlice.actions
export default notificationSlice.reducer