import { useState, useEffect } from 'react'
import './App.css'
import Item from './components/Item'
import AddItemModal from './components/AddItemModal'
import axios from 'axios';

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch data from backend when component mounts
    axios.get('http://localhost:3001/api/items')
      .then(response => {
        setItems(response.data);
        console.log("First fetch: ", response.data)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className='flex flex-col'>
      <header className='bg-[#4F5D75]'>
        <h1 className="text-3xl text-white inline-block ml-5 my-3">
          AniList-Project
        </h1>
      </header>
      <div className='flex flex-row'>

        <aside className='w-[20%] bg-white flex flex-col'>
          <div className='mx-5 mt-10'>
            <AddItemModal setItems={setItems} />
          </div>
        </aside>

        <main className='w-full min-h-screen bg-slate-100'>
          <div className='mt-10 ml-10'>
            {/* {items.map(item => ( */}
            <Item />
            {/* ))} */}
          </div>
        </main>

      </div>


    </div>

  )
}

export default App
