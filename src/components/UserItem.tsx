import React from 'react'
import { User } from '../hooks/usePeopleContext'


function UserItem({ id, name, username, website, company }: User) {
  return (
    <div className="user-list group" id={`${id}`}>
      <div className="text-gray-500 px-5 py-3">{ id }</div>
      <div className="text-gray-500 px-5 py-3">{ name }</div>
      <div className="text-gray-500 px-5 py-3 text-center">{ username }</div>
      <a href={`https://${website}`} target="_blank">
        <div className="text-gray-500 px-5 py-3 text-right group-hover:text-blue-600 group-hover:font-semibold">{ website }</div>
      </a>
      <div className="text-gray-500 px-5 py-3 text-right">{ company.name }</div>
    </div>
  )
}

export default UserItem