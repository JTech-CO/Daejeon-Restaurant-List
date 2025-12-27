const RestaurantCard = ({ data, onClick }) => {
    const { Crown, MapPin, Award } = window.Icons;
    const isHot = data.rating >= 3;
    return (
        <div 
            onClick={onClick}
            className="group bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md hover:border-orange-200 transition-all cursor-pointer overflow-hidden flex flex-col h-full"
        >
            <div className="p-5 flex flex-col h-full">
                <div className="flex justify-between items-start mb-2">
                    <div className="flex flex-col">
                        <span className="text-xs font-semibold text-slate-400 mb-1">{data.region}</span>
                        <h3 className="text-lg font-bold text-slate-800 group-hover:text-orange-600 transition-colors line-clamp-1">
                            {data.name}
                        </h3>
                    </div>
                    {isHot && (
                        <span className="bg-red-50 text-red-600 text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
                            <Award size={10} /> HOT
                        </span>
                    )}
                </div>
                
                <div className="flex items-center gap-1 mb-3">
                    {[...Array(data.rating)].map((_, i) => (
                        <Crown key={i} size={14} className="text-yellow-500 fill-yellow-500" />
                    ))}
                    <span className="text-xs text-slate-400 ml-1">({data.rating})</span>
                </div>

                <div className="mt-auto pt-3 border-t border-slate-50">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-600">
                            {data.category}
                        </span>
                    </div>
                    <div className="flex items-center text-slate-400 text-xs mt-2 truncate">
                        <div className="mr-1 min-w-[12px]"><MapPin size={12} /></div>
                        <span className="truncate">{data.address}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.RestaurantCard = RestaurantCard;
