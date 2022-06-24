import { gql, useMutation } from '@apollo/client'
import React, { useState } from 'react'

import { EDIT_NUMBER } from './graphql/mutations'
const PhoneForm = ({notifyError}) => {
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")

    const [changeNumber] = useMutation(EDIT_NUMBER)
    const handleSubmit = (e)=>{
        e.preventDefault()

        changeNumber({variables: {name, phone}})
        setName("")
        setPhone("")
    }
  return (
    <div>
        <h2>Edit Phone number</h2>
        <form onSubmit={handleSubmit}>
            <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <button>Change Phone</button>
        </form>
    </div>
  )
}

export default PhoneForm