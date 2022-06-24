import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import {LOGIN} from './graphql/mutations'
const LoginForm = ({notifyError, setToken}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [login, result] = useMutation(LOGIN, {onError: error => {notifyError(error.graphQLErrors[0].message)}})
    const handleSubmit = (e)=>{
        e.preventDefault()
        login({variables: {username, password}})
    }

    useEffect(()=>{
        if(result.data){
            const token = result.data.login.value
            setToken(token)
            window.localStorage.setItem("phonenumbers-user-token", token)
        }
    }, [result.data])
  return (
    <div>
        <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        Username
        <input value={username} onChange={({target})=> setUsername(target.value)} />
        Password
        <input type="password" value={password} onChange={({target})=> setPassword(target.value)} />  
        <button>Log in</button> 
      </form>
    </div>
  )
}

export default LoginForm