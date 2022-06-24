import React from 'react'
import { gql, useLazyQuery } from '@apollo/client'

const FIND_PERSON = gql`
query findPersonByName($nameToSearch: String!){
    findPerson(name: $nameToSearch){
        name
        phone
        id
        adress{
            street
            city
        }
    }
}
`
const FindPerson = () => {
    const [getPerson, result] = useLazyQuery(FIND_PERSON)
  return (
    <div>FindPerson</div>
  )
}

export default FindPerson