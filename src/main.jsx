import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {ApolloClient, HttpLink, InMemoryCache,  ApolloProvider, split} from "@apollo/client"
import {setContext} from "apollo-link-context"
import { getMainDefinition } from '@apollo/client/utilities'
import { WebSocketLink } from '@apollo/client/link/ws'
const getAuth = ()=>{
  const token = localStorage.getItem("phonenumbers-user-token")
  return token ? `bearer ${token}` : null
}
const httpLink = new HttpLink({
  uri: 'http://localhost:4000',
})

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
  options: {
    reconnect: true
  }
})

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(httpLink),
)
const client = new ApolloClient({
  connectToDevTools: true,
  cache: new InMemoryCache(),
  link: splitLink
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)
