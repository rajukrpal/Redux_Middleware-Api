import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen">
      {/* <img
        src="./NotFound.gif" //
        alt="Page Not Found"
        className="max-w-full h-auto mb-8"
      /> */}
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Oops! Page Not Found</h1>
      <p className="text-lg text-gray-600 mb-8">The page you are looking for does not exist.</p>
      <Link to="/" className="text-blue-500 hover:underline">Go back to home</Link>
    </div>
    </div>
  )
}

export default NotFound
