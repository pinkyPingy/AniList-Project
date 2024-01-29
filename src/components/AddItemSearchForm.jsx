import { useState } from "react"

export default function AddItemSearchForm({ search }) {
    const [searchValue, setSearchValue] = useState("")

    const handleChange = (evt) => {
        setSearchValue(evt.target.value)
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        search(searchValue);
    }

    return (
        <form className="flex items-center mb-3" onSubmit={handleSubmit} >
            <label htmlFor="simple-search" className="sr-only">Search</label>
            <div className="relative w-full">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>
                <input value={searchValue} onChange={handleChange} type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-[#2D3142] text-sm rounded-lg focus:ring-[#4F5D75] focus:border-[#4F5D75] block w-full ps-10 p-2.5" placeholder="Search for Anime / TV Series..." required></input>
            </div>
            <button type="submit" className="p-2.5 ms-2 text-sm font-medium text-white bg-[#4F5D75] rounded-lg border border-blue-700 hover:bg-[#2D3142] focus:ring-4 focus:outline-none focus:ring-blue-300">
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
                <span className="sr-only">Search</span>
            </button>
        </form>
    )
}