import { useNotificationText } from '../NotificationContext'

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  const notification = useNotificationText()

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification