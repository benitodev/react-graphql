import { gql, useLazyQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { FIND_PERSON } from './graphql/queries'

const Persons = ({persons}) => {
    const [getPerson, result] = useLazyQuery(FIND_PERSON)
    const [person, setPerson] = useState(null)

    const showPerson = name => {
        getPerson({variables: {nameToSearch: name}})
    }

    useEffect(()=>{
        if(result.data){
            setPerson(result.data.findPerson)
        }
    }, [result.data])
    if(person) {
       return( <div>
            <h2>{person.name}</h2>
            <h3> {person.address.street}, {person.address.city} </h3>
            <button onClick={()=> setPerson(null)}>close</button>
        </div>)
    }
    if(persons === null) return null
  return (
    <div>
        <h2>Persons</h2>
        {persons.map(p => <div key={p.id} onClick={()=>{showPerson(p.name)}}>
            {p.name} - {p.phone}
        </div>)}
    </div>
  )
}

export default Persons