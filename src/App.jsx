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
      <header className='bg-[#4F5D75] z-30 w-full'>
        <button
          className="md:hidden fixed top-0 left-0 my-2 mx-3 text-4xl z-40 text-[#EF8354]"
          onClick={toggleSidebar}
        >
          ☰
        </button>
        <h1 className="text-3xl text-white inline-block ml-16 md:ml-5 my-3">
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
          <div className='mx-5 mt-10'>
            <AddItemModal setItems={setItems} />
          </div>
        </aside>

        <main className='w-full min-h-full bg-slate-100 pb-8'>
          <div className='mt-10 mx-5 md:mx-10'>
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
