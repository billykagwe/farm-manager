import {useContext,useEffect} from 'react'
import AuthContext from '../contexts/auth/authContext'

export const useLoadUser = () => {
const authContext = useContext(AuthContext)
const {loadUser} = authContext

useEffect(() => {
    loadUser()
    // eslint-disable-next-line
},[])
}
