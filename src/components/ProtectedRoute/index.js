import {Navigate} from 'react-router-dom'
import Cookies from 'js-cookie'

const ProtectedRoute = ({children}) => {
  const token = Cookies.get('jwt_token')

  console.log(token)

  if (token === undefined || token === null || token === '') {
    return <Navigate to="/login" />
  } else {
    return children
  }
}

export default ProtectedRoute
