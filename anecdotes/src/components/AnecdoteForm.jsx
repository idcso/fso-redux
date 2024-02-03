import { useDispatch } from 'react-redux'
import { createNewAnecdote } from '../reducers/anecdoteReducer'
import { newNoteNotification, disableNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const createAnecdote = event => {
    event.preventDefault()

    const anecdote = event.target.anecdote.value
    dispatch(createNewAnecdote(anecdote))
    dispatch(newNoteNotification(anecdote))
    setTimeout(() => { dispatch(disableNotification()) }, 5000)

    event.target.anecdote.value = ''
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div><input name='anecdote' /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm