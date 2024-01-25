import { Favorite, AddCircleOutline } from "@mui/icons-material"

export default function Item() {
    return (
        <div className="w-[760px] h-[140px] bg-white flex flex-row rounded-lg py-[10px] px-[10px]">
            <div className="w-[80px] h-[120px] bg-[#d9d9d9] rounded-md mr-[22px]">
                {/* image */}
            </div>
            <div className="flex flex-col justify-between">
                <div>
                    <div><span className="text-[#2D3142] font-semibold text-2xl">Solo Leveling</span></div>
                    <div><span className="text-[#4F5D75] text-sm">Genres: Comedy, Action, Romantic</span></div>
                </div>
                <div><span className="text-[#4F5D75]">Add note...</span></div>
            </div>
            <div className="ml-auto flex flex-col justify-between">
                <div className="flex flex-row">
                    <div className="flex flex-row mr-12">
                        <div><span className="text-[#4F5D75] text-xl mr-4">Ep. 4</span></div>
                        <div><AddCircleOutline /></div>
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