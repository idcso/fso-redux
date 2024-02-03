import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const id = action.payload
      const votedAnecdote = state.find(a => a.id === id)
      const changedAnecdote = {
        ...votedAnecdote,
        votes: votedAnecdote.votes + 1
      }
      return state
              .map(a => a.id === id ? changedAnecdote : a)
              .sort((a, b) => b.votes - a.votes)
    },
    createNewAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { voteAnecdote, createNewAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer