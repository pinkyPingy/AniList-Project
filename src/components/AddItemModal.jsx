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
    const [detail, setDetail] = useState({
        episode: 0,
        status: "",
        note: "",
        favorited: false
    })

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
        if (modalOpen) {
            setDataList([]);
            setSearchTerm("");
            setSelectedItem({});
        }
        setModalOpen(!modalOpen);
    };

    const handleItemClick = (item) => {
        setSelectedItem(item);
    };

    const search = (searchTerm) => {
        setSearchTerm(searchTerm)
    }

    const addItem = async () => {
        try {
            const response = await axios.post('/api/items', {
                name: 'New Item',
                description: 'Description of new item'
            });
            setItems([...items, response.data]);
        } catch (error) {
            console.error('Error adding item:', error);
        }
    };

    const itemList = dataList.map(data => (
        <li key={data.show.id} onClick={() => handleItemClick(data)}>
            <input type="radio" id={"anime" + data.show.id} name="anime" value={"anime" + data.show.id} className="hidden peer"></input>
            <label htmlFor={"anime" + data.show.id} className="inline-flex items-center justify-between w-full p-3 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-500 dark:peer-checked:text-blue-400 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:bg-[#4F5D75] dark:hover:bg-gray-500">
                <div className="block">
                    <div className="w-full text-lg font-semibold">{data.show.name}</div>
                    <div className="w-full text-gray-400">{data.show.genres.length <= 1 ? "Genre: " : "Genres: "}{data.show.genres.join(", ")}</div>
                </div>
                {/* <svg className="w-4 h-4 ms-3 rtl:rotate-180 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" /></svg> */}
            </label>

        </li>
    ))
    return (
        <>
            <button
                onClick={toggleModal}
                className="block text-white bg-[#EF8354] hover:bg-[#2D3142] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                type="button"
            >
                Add your AniList
            </button>

            {modalOpen && (
                <div
                    id="select-modal"
                    tabIndex="-1"
                    aria-hidden="true"
                    className="w-[540px] h-[799px] bg-white rounded-lg shadow-md shadow-[#EF8354] overflow-y-auto overflow-x-hidden fixed top-[5%] right-0 left-[35%] z-50 flex-col justify-center items-center"
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
                        <div className="w-full h-[142px] border border-[#EF8354] rounded-lg flex flex-row p-[10px] mb-3">
                            {selectedItem.show ?
                                <>
                                    {selectedItem.show.image ? <img className="rounded-md mr-[22px]" src={selectedItem.show.image.medium} ></img> : <img src="https://t4.ftcdn.net/jpg/04/99/93/31/360_F_499933117_ZAUBfv3P1HEOsZDrnkbNCt4jc3AodArl.jpg" className="w-[85.42px] h-[120px] rounded-md mr-[22px]"></img>}
                                    < div className="flex flex-col">
                                        <div><span className="text-[#2D3142] font-semibold text-2xl">{selectedItem.show.name}</span></div>
                                        <div><span className="text-[#BFC0C0] text-sm">{selectedItem.show.genres.length <= 1 ? "Genre: " : "Genres: "}{selectedItem.show.genres.join(", ")}</span></div>
                                        {/* <div><span className="text-[#4F5D75] text-sm">{selectedItem.show.summary}</span></div> */}
                                    </div>
                                </>
                                : <p className="text-[#BFC0C0] self-center mx-auto">Select something...</p>
                            }
                        </div>
                        {/* Detail */}
                        <div className="mb-4">
                            <div className="flex flex-row">
                                <div className="mr-auto">
                                    <label htmlFor="episode" className="block font-medium mb-1 text-sm text-gray-900 mr-2">Episode</label>
                                    <input type="number" name="episode" min={0} id="episode" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-16 p-2" defaultValue={0}></input>
                                </div>
                                <div>
                                    <label htmlFor="status" className="block font-medium mb-1 text-sm text-gray-900">Status</label>
                                    <select id="status" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-60 p-2">
                                        <option value="">Select status</option>
                                        <option value="In Queue">In Queue</option>
                                        <option value="Current Watching">Current Watching</option>
                                        <option value="Completed">Completed</option>
                                        <option value="Dropped">Dropped</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mt-1">
                                <label htmlFor="note" className="block mb-1 text-sm font-medium text-gray-900">Note</label>
                                <textarea id="note" rows="1" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Add note..."></textarea>
                            </div>
                            <div className="mt-3 flex items-center">
                                <input id="favorited" type="checkbox" value="" className="w-5 h-5 border border-gray-300 rounded-lg bg-gray-50 focus:ring-3 focus:ring-red-300"></input>
                                <label htmlFor="favorited" className="ml-2 text-sm text-gray-900">Add as Favorited</label>
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <button
                                onClick={toggleModal}
                                type="button"
                                className="mr-4 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={toggleModal}
                                className="text-white bg-[#EF8354] hover:bg-[#2D3142] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                type="button"
                            >
                                Add to your AniList
                            </button>
                        </div>
                    </div>
                </div >
            )
            }
        </>
    )
}