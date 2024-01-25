import { useState } from 'react'
import './App.css'
import Item from './components/Item'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='flex flex-col'>
      <main className='w-full min-h-screen bg-slate-100'>
        <h1 className="text-3xl font-bold underline bg-red-400">
          Hello world!
        </h1>
        <div className='m-10'>
          <Item />
        </div>

      </main>
    </div>

  )
}

export default App
