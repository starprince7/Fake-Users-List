import React, { useEffect, useState, useRef } from 'react'
import UserItem from '../components/UserItem'
import { usePeopleContext } from '../hooks/usePeopleContext'

function HomePage() {
  const { people, loading, findPeopleWithName, getPeople } = usePeopleContext()
  const [users, setUsers] = useState([] as typeof people)
  const SearchInput = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (SearchInput.current?.value === "") {
      setUsers(people)
    }
  }, [loading, people])

  const handleInputSearch = (text: string) => {
    setUsers(findPeopleWithName(text))
  }


  return (
    <div className="App">
      <header className="min-w-full fixed top-0 left-0 bg-white shadow-md p-5">
        <div className="container flex items-center">
          <h2 className="text-3xl font-extrabold text-gray-700">&#123; Fake Users &#125;</h2>
        </div>
      </header>

      {/* Search Input */}
      <div className="container-sm my-32 p-5">
        <input
          type="text" ref={SearchInput}
          placeholder="Search name or username. . ."
          onChange={(e) => handleInputSearch(e.target.value)}
          className='w-full outline-none rounded-md mb-5 px-5 py-3 text-gray-700 border border-gray-300 focus:shadow-md'
        />

        {
          loading
            ? (<h3 className='loader'>Please wait fetching users...</h3>)
            : (
              <div>
                <button onClick={getPeople} className="btn">Reload</button>
                <div className="user-title">
                  <div className="text-gray-500 font-bold px-5 py-3">Id</div>
                  <div className="text-gray-500 font-bold px-5 py-3">Name</div>
                  <div className="text-gray-500 font-bold px-5 py-3 text-center">User Name</div>
                  <div className="text-gray-500 font-bold px-5 py-3 text-left">Website</div>
                  <div className="text-gray-500 font-bold px-5 py-3 text-left">Company Name</div>
                </div>
                {
                  users && users.map((user) => (
                    <div key={user.id}>
                      <UserItem {...user} />
                    </div>
                  ))
                }
              </div>
            )
        }
      </div>
    </div>
  )
}

export default HomePage