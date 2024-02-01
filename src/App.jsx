import { useState, useEffect } from 'react'
import './App.css'
import Item from './components/Item'
import AddItemModal from './components/AddItemModal'
import axios from 'axios';

function App() {
  const [items, setItems] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  }

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
      <header className='bg-[#4F5D75] fixed md:z-30 w-full flex justify-center md:justify-start'>
        <button
          className="md:hidden fixed top-0 left-0 my-2 mx-3 text-4xl z-40 text-white"
          onClick={toggleSidebar}
        >
          ☰
        </button>
        <h1 className="text-3xl text-white inline-block md:ml-5 my-3">
          AniList-Project
        </h1>
      </header>
      {isSidebarOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10"
          onClick={toggleSidebar}
        />
      )}
      <div className='flex flex-row'>

        <aside className={`w-[40%] md:w-[20%] z-20 h-full ${isSidebarOpen ? 'fixed' : 'hidden'} md:block bg-white flex flex-col`}>
          <button
            type="button"
            onClick={toggleSidebar}
            className="text-[#BFC0C0] bg-transparent hover:text-[#4F5D75] rounded-lg ml-auto mr-5 mt-5"
          >
            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className='mx-5 mt-11'>
            <AddItemModal setItems={setItems} />
          </div>
        </aside>

        <main className='w-full min-h-full bg-slate-100 pb-8'>
          <div className='mt-20 mx-5 md:mx-10'>
            {items.map(item => (
              <Item key={item._id} item={item} setItems={setItems} />
            ))}
          </div>
        </main>

      </div>


    </div>

  )
}

export default App
