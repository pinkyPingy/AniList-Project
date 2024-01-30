import { Favorite, AddCircleOutline } from "@mui/icons-material"
import axios from "axios";

export default function Item({ item, setItems }) {

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

    return (
        <div className="w-[760px] h-[142px] bg-white flex flex-row rounded-lg py-[10px] px-[10px] mb-3">
            {/* image */}
            <img src={item.imgURL} className="rounded-md mr-[22px] w-[86.85px]" />

            <div className="flex flex-col justify-between">
                <div>
                    <div><span className="text-[#2D3142] font-semibold text-2xl">{item.name}</span></div>
                    <div><span className="text-[#BFC0C0] text-sm">Genres: {item.genres}</span></div>
                </div>
                <div><span className="text-[#4F5D75]">Add note...</span></div>
            </div>
            <div className="ml-auto flex flex-col justify-between">
                <div className="flex flex-row">
                    <div className="flex flex-row mr-12">
                        <div><span className="text-[#4F5D75] text-xl mr-4">Ep. {item.episode}</span></div>
                        <div onClick={incrementEpisode}><AddCircleOutline /></div>
                    </div>
                    <div><Favorite /></div>
                </div>
                <div>
                    <select name="" id="" className="w-full bg-[#EF8354] rounded-md"></select>
                </div>
            </div>
        </div>
    )
}