import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios"


type UserAddress = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: { lat: string | number; lng: string | number };
};

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: UserAddress;
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  }
}

interface AppState {
  people: User[]
  loading: boolean
  getPeople: () => Promise<void>
  findPeopleWithName: (text: string) => User[]
}

const PeopleContext = createContext({} as AppState);

// >>> Hook <<<
export const usePeopleContext = () => {
  return useContext(PeopleContext)
}


//  >>> Context Provider <<<
type PeopleProviderProps = { children: React.ReactNode }

const PeopleProvider = ({ children }: PeopleProviderProps) => {
  const [people, setPeople] = useState<User[]>([]);
  const [loading, setLoading] = useState(false)

  // Search through people state
  const findPeopleWithName = (text: string) => {
    const copy = [...people]

    return copy.filter(user => {
      let lowcase_text = text.toLowerCase()
      let name = user.name.toLowerCase()
      let username = user.username.toLowerCase()
      if (name.includes(lowcase_text) || username.includes(lowcase_text)) return user
    })
  }

  async function getPeople() {
    setLoading(true)
    const res = await axios.get("https://jsonplaceholder.typicode.com/users")
    setPeople(res.data)
    setLoading(false)
  }

  // >>> Fetch users 
  useEffect(() => {
    getPeople()
  }, [])

  const value = {
    people,
    loading,
    getPeople,
    findPeopleWithName
  }

  return (
    <PeopleContext.Provider value={value} >{children}</PeopleContext.Provider>
  )
};

export default PeopleProvider