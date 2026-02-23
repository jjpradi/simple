import { Route, Navigate } from 'react-router-dom'
import Cookies from 'js-cookie' 

const ProtectedRoute = (props) => {
    Cookies.get('jwt_token')
    console.log(Cookies.get('jwt_token'))
    if(jwtToken===undefined){
    return <Navigate to="/login" />
}


return <Route {...props} />


}

export default ProtectedRoute