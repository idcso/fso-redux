import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useNotificationDispatch } from './NotificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const voteAnecdoteMutation = useMutation({
    mutationFn: votedAnecdote => {
      return axios.put(`http://localhost:3002/anecdotes/${votedAnecdote.id}`, votedAnecdote).then(res => res.data)
    },
    onSuccess: votedAnecdote => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.map(anecdote => (
        anecdote.id === votedAnecdote.id ? votedAnecdote : anecdote
      )))
    }
  })

  const handleVote = (anecdote) => {
    const votedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    voteAnecdoteMutation.mutate(votedAnecdote)

    dispatch({
      type: 'VOTE',
      payload: anecdote.content
    })
    setTimeout(() => {
      dispatch({ type: 'DISABLE' })
    }, 5000)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: () => axios.get('http://localhost:3002/anecdotes').then(res => res.data),
    retry: 1
  })

  if (result.isLoading) {
    return <div>loading data...</div>
  } else if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
