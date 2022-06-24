import logo from './logo.svg'
import './App.css'
import Persons from './Persons'
import PersonForm from './PersonForm'
import usePersons from './hooks/usePersons'
import { useState } from 'react'
import Notify from './Notify'
import PhoneForm from './PhoneForm'
import LoginForm from './LoginForm'
import useUser from './hooks/useUser'
import { ALL_PERSONS } from './graphql/queries'
import {useQuery, useMutation, useSubscription, useApolloClient} from "@apollo/client"


export const updateCache = (cache, query, addedPerson) => {
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.name
      return seen.has(k) ? false : seen.add(k)
    })
  }
  cache.updateQuery(query, ({ allPersons }) => {
    return {
      allPersons: uniqByName(allPersons.concat(addedPerson)),
    }
  })
}


function App() {
//down here is the way to do manually request  

// useEffect(()=>{
//   fetch('http://localhost:4000/', {
//     method: "POST",
//     headers:{"Content-Type": "application/json"},
//     body: JSON.stringify({ query:
//     `query {
//       allPersons {
//         name
//         adress{
//           street
//         }
//       }
//     }`
//   })
//   })
//   .then(res => res.json())
//   .then(res => {
//     console.log(res.data)
//   })
// },[])
useSubscription(PERSON_ADDED, {
  onSubscriptionData: ({ subscriptionData }) => {
    const addedPerson = subscriptionData.data.personAdded
    notify(`${addedPerson.name} added`)

    updateCache(client.cache, { query: ALL_PERSONS }, addedPerson)
  }
})


const {data, error, loading} = usePersons()
const [errorMessage, setErrorMessage] = useState(null)
const [token, setToken] = useState(()=> localStorage.getItem("phonenumbers-user-token"));
const client = useUser()

const results = client.readQuery({
  query: ALL_PERSONS
})

console.log("cache", results)
const notifyError = (message)=>{
setErrorMessage(message)
setTimeout(()=> setErrorMessage(null), 5000)
}

const logout = ()=>{
  localStorage.clear()
  setToken(null)
  client.resetStore()
}
// if (error) return <span style='color: red'>{error}</span>
  return (
    <div className="App">
      <header className="App-header">
      <Notify errorMessage={errorMessage}/>
        <img src={logo} className="App-logo" alt="logo" />
        {loading ? <p>Loading...</p> : 
        <>
        <p>GraphQl + React!</p>
        {
          <Persons persons={data.allPersons}  />
        }
        </>
        }
     {!token ? <LoginForm  notifyError={notifyError} setToken={setToken}/> : <button onClick={logout}>logout</button>}
      <PersonForm notifyError={notifyError}/>
      <PhoneForm/>
      
      </header>
    </div>
  )
}

export default App
