import { useState, useEffect } from "react"
import AddItemSearchForm from "./AddItemSearchForm";
import axios from "axios";

const mockData = [
    { id: 1, title: "Solo Leveling", genre: ["Action", "Fantasy"] },
    { id: 2, title: "Black Clover", genre: ["Action", "Magic"] },
    { id: 3, title: "Naruto", genre: ["Action", "Comedy"] },
    { id: 4, title: "Spy x Family", genre: ["Comedy", "History"] },
    { id: 5, title: "One Punch Man", genre: ["History"] },
]

export default function AddItemModal() {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState({});
    const [searchTerm, setSearchTerm] = useState("")
    const [dataList, setDataList] = useState([])

    useEffect(() => {
        fetchAnime();
    }, [searchTerm])

    async function fetchAnime() {
        const config = { params: { q: searchTerm } }
        const res = await axios.get(`http://api.tvmaze.com/search/shows`, config);
        console.log(res.data)
        setDataList(res.data)
    }

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };

    const handleItemClick = (item) => {
        setSelectedItem(item);
    };

    const search = (searchTerm) => {
        setSearchTerm(searchTerm)
    }

    const itemList = dataList.map(data => (
        <li key={data.show.id} onClick={() => handleItemClick(data)}>
            <input type="radio" id={"anime" + data.show.id} name="anime" value={"anime" + data.show.id} className="hidden peer"></input>
            <label htmlFor={"anime" + data.show.id} className="inline-flex items-center justify-between w-full p-3 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-500 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500">
                <div className="block">
                    <div className="w-full text-lg font-semibold">{data.show.name}</div>
                    <div className="w-full text-gray-500 dark:text-gray-400">{data.show.genres.length <= 1 ? "Genre: " : "Genres: "}{data.show.genres.join(", ")}</div>
                </div>
                {/* <svg className="w-4 h-4 ms-3 rtl:rotate-180 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" /></svg> */}
            </label>

        </li>
    ))
    return (
        <>
            <button
                onClick={toggleModal}
                className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
            >
                Add your AniList
            </button>

            {modalOpen && (
                <div
                    id="select-modal"
                    tabIndex="-1"
                    aria-hidden="true"
                    className="w-[540px] h-[760px] bg-white rounded-lg shadow-md shadow-[#EF8354] overflow-y-auto overflow-x-hidden fixed top-[5%] right-0 left-[35%] z-50 flex-col justify-center items-center"
                >
                    <div className="relative p-4 w-full max-h-full">
                        {/* <!-- Modal header --> */}
                        <div className="flex items-center justify-between p-3 rounded-t dark:border-gray-600 mb-0">
                            <h1 className="text-xl font-semibold text-[#2D3142]">
                                Search for Anime
                            </h1>
                            <button
                                type="button"
                                onClick={toggleModal}
                                className="text-[#BFC0C0] bg-transparent hover:text-[#4F5D75] rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center"
                            >
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        {/* Search bar */}
                        <AddItemSearchForm search={search} />

                        {/* <!-- Item List--> */}
                        <div className="h-[270px] overflow-y-auto mb-3">
                            <ul className="space-y-1">
                                {itemList}
                            </ul>
                        </div>

                        {/* Show Selected Item */}
                        <div className="w-full h-[142px] border border-[#EF8354] rounded-lg flex p-[10px]">
                            {selectedItem.show ?
                                (selectedItem.show.image ? <img className="rounded-md" src={selectedItem.show.image.medium} ></img> : <img src="https://t4.ftcdn.net/jpg/04/99/93/31/360_F_499933117_ZAUBfv3P1HEOsZDrnkbNCt4jc3AodArl.jpg" className="w-[85.42px] h-[120px] rounded-md"></img>)

                                : <p className="text-[#BFC0C0] self-center mx-auto">Search something...</p>}
                        </div>
                        <div>
                            <button
                                onClick={toggleModal}
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                type="button"
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div >
            )
            }
        </>
    )
}