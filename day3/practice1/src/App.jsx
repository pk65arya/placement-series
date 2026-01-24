import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PostList from './componnents/PostList'

function App() {


  return (
    <div className='min-h-screen bg-gray-100'>
      <header className='bg-blue-600 text-white p-6 text-center'>

        <h1 className='text-3xl font-bold'>POST FEED</h1>
      </header>
     <PostList/>
    </div>
  )
}

export default App
