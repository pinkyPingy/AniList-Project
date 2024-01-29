import { useState } from 'react'
import './App.css'
import Item from './components/Item'
import AddItemModal from './components/AddItemModal'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='flex flex-col'>
      <header>
        <h1 className="text-3xl font-bold underline bg-red-400">
          Hello world!
        </h1>
      </header>
      <div className='flex flex-row'>
        <aside className='w-[20%] bg-white flex flex-col'>
          <div className='mx-5 mt-10'>
            <AddItemModal />
          </div>
        </aside>
        <main className='w-full min-h-screen bg-slate-100'>

          <div className='m-10'>
            <Item />
          </div>




        </main>
      </div>


    </div>

  )
}

export default App
