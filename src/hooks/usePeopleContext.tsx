import React, { createContext, useContext, useState } from "react";


type UserAddress = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: { lat: string | number; lng: string | number };
};

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: UserAddress;
}

interface List {
  people: User[]
  findPeopleWithName: (text: string) => User[]
}

const PeopleContext = createContext({} as List);

// >>> Hook <<<
export const usePeopleContext = () => {
  return useContext(PeopleContext)
}


//  >>> Context Provider <<<
type PeopleProviderProps = { children: React.ReactNode }

const PeopleProvider = ({ children }: PeopleProviderProps) => {
  const [people, setPeople] = useState<User[]>([]);
  const [loading, setLoading] = useState(false)

  // Search through people List
  const findPeopleWithName = (text: string) => {
    const copy = [...people]
    return copy.filter(user => {
      if (user.name.includes(text)) return user
    })
  }

  return (
    <PeopleContext.Provider value={{ people, findPeopleWithName }} >{children}</PeopleContext.Provider>
  )
};

export default PeopleProvider