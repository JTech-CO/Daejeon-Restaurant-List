const DetailModal = ({ restaurant, onClose, onCopy }) => {
    const { useEffect } = React;
    const { X, Crown, Utensils, Coffee, Copy, ExternalLink } = window.Icons;
    const { generateMapSearchUrl } = window.MapUtils;
    
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = 'unset'; }
    }, []);

    const mapSearchUrl = generateMapSearchUrl(restaurant.address, restaurant.name);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden relative animate-scale-up">
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 bg-slate-100 rounded-full text-slate-500 hover:bg-slate-200 transition-colors"
                >
                    <X size={20} />
                </button>

                <div className="p-8 text-center">
                    <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        {restaurant.mainCategory === '카페' ? <Coffee size={32}/> : <Utensils size={32}/>}
                    </div>
                    
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">{restaurant.name}</h2>
                    <div className="flex justify-center items-center gap-1 mb-6">
                        {[...Array(restaurant.rating)].map((_, i) => (
                            <Crown key={i} size={20} className="text-yellow-500 fill-yellow-500" />
                        ))}
                    </div>

                    <div className="bg-slate-50 rounded-xl p-4 text-left space-y-3 mb-6">
                        <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                            <span className="text-sm text-slate-500">종류</span>
                            <span className="font-medium text-slate-800">{restaurant.category}</span>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                            <span className="text-sm text-slate-500">지역</span>
                            <span className="font-medium text-slate-800">{restaurant.region}</span>
                        </div>
                        <div className="pt-1">
                            <div className="flex justify-between items-start mb-1">
                                <span className="text-sm text-slate-500 shrink-0">주소</span>
                                <button onClick={() => onCopy(restaurant.address)} className="text-xs text-orange-600 flex items-center gap-1 hover:underline">
                                    <Copy size={10} /> 복사
                                </button>
                            </div>
                            <p className="text-sm text-slate-800 break-keep leading-relaxed">{restaurant.address}</p>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button 
                            onClick={() => onCopy(restaurant.address)}
                            className="flex-1 py-3 px-4 bg-white border border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-colors flex justify-center items-center gap-2"
                        >
                            <Copy size={18} />
                            주소 복사
                        </button>
                        <a 
                            href={mapSearchUrl} 
                            target="_blank" 
                            rel="noreferrer"
                            className="flex-1 py-3 px-4 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 shadow-md shadow-orange-200 transition-colors flex justify-center items-center gap-2"
                        >
                            <ExternalLink size={18} />
                            지도 보기
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.DetailModal = DetailModal;
