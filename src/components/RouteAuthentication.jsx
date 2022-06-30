import React from 'react'
import { Navigate } from 'react-router-dom'
import useUserContext from '../UserContext';

export const RouteAuthentication = ({ children, redirectTo }) => {

const { currentUser } = useUserContext()
    return (
        currentUser 
        ? children 
        : <Navigate to={redirectTo}/>
  )
}
