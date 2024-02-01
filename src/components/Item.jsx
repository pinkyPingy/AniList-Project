import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material"
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import axios from "axios";
import { useState } from "react";

export default function Item({ item, setItems }) {
    const [selectedStatus, setSelectedStatus] = useState(item.status);

    const handleChangeStatus = async (event) => {
        const newStatus = event.target.value;
        try {
            const response = await axios.put(`http://localhost:3001/api/items/${item._id}`, { status: newStatus });
            const updatedItem = response.data;
            // Update the state with the updated item
            setItems(prevItems => prevItems.map(it => it._id === item._id ? updatedItem : it));
            setSelectedStatus(newStatus);
        } catch (error) {
            console.error('Error changing status:', error);
        }
    };

    const incrementEpisode = async () => {
        try {
            const response = await axios.put(`http://localhost:3001/api/items/${item._id}/increment`);
            const updatedItem = response.data;
            // Update the state with the updated item
            setItems(prevItems => prevItems.map(it => it._id === item._id ? updatedItem : it));
        } catch (error) {
            console.error('Error incrementing episode:', error);
        }
    };

    const decrementEpisode = async () => {
        try {
            const response = await axios.put(`http://localhost:3001/api/items/${item._id}/decrement`);
            const updatedItem = response.data;
            // Update the state with the updated item
            setItems(prevItems => prevItems.map(it => it._id === item._id ? updatedItem : it));
        } catch (error) {
            console.error('Error incrementing episode:', error);
        }
    };

    const toggleFavorited = async () => {
        try {
            const response = await axios.put(`http://localhost:3001/api/items/${item._id}/toggle-favorited`);
            const updatedItem = response.data;
            // Update the state with the updated item
            setItems(prevItems => prevItems.map(it => it._id === item._id ? updatedItem : it));
        } catch (error) {
            console.error('Error toggling favorited:', error);
        }
    };

    let statusColor;
    switch (selectedStatus) {
        case "":
            statusColor = "bg-gray-50"
            break;
        case "In Queue":
            statusColor = "bg-amber-100"
            break;
        case "Current Watching":
            statusColor = "bg-sky-100"
            break;
        case "Completed":
            statusColor = "bg-emerald-100"
            break;
        case "Dropped":
            statusColor = "bg-rose-100"
            break;
        default:
    }

    return (
        <div className="w-[760px] h-[142px] bg-white flex flex-row rounded-lg py-[10px] px-[10px] mb-3 shadow-md">
            {/* image */}
            <img src={item.imgURL} className="rounded-md mr-[22px] w-[86.85px]" />

            <div className="flex flex-col justify-between">
                <div>
                    <div><span className="text-[#2D3142] font-semibold text-2xl">{item.name}</span></div>
                    <div><span className="text-[#BFC0C0] text-sm">Genres: {item.genres}</span></div>
                </div>
                <div><span className="text-[#4F5D75]">{item.note}</span></div>
            </div>
            <div className="ml-auto flex flex-col justify-between">
                <div className="flex flex-row">
                    <div className="flex flex-row mr-6">
                        <div className={item.episode == 0 ? "text-[#BFC0C0]" : "text-[#4F5D75]"} onClick={decrementEpisode}><RemoveCircleOutline /></div>
                        <div><span className="text-[#2D3142] text-xl mx-2">Ep. {item.episode}</span></div>
                        <div className="text-[#4F5D75]" onClick={incrementEpisode}><AddCircleOutline /></div>
                    </div>
                    {item.favorited ? (
                        <FavoriteIcon
                            edge="start"
                            onClick={toggleFavorited}
                            style={{
                                cursor: 'pointer', color: '#EF8354'
                            }} // Adjust color as needed
                        />
                    ) : (
                        <FavoriteBorderIcon
                            edge="start"
                            onClick={toggleFavorited}
                            style={{ cursor: 'pointer' }}
                        />
                    )}
                </div>
                <div className="w-full flex flex-col justify-end">
                    <label htmlFor="status" className="block font-medium mb-1 text-sm text-gray-900">Status</label>
                    <select id="status" name="status" value={selectedStatus} onChange={handleChangeStatus} className={`${statusColor} border border-gray-300 text-[#4F5D75] text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2`}>
                        <option value="">Select status</option>
                        <option value="In Queue">In Queue</option>
                        <option value="Current Watching">Current Watching</option>
                        <option value="Completed">Completed</option>
                        <option value="Dropped">Dropped</option>
                    </select>
                </div>
            </div>
        </div >
    )
}