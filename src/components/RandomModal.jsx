const { Shuffle } = window.Icons;

const RandomModal = ({ restaurant, onClose, onRetry, onDetail }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl p-6 text-center relative animate-bounce-in">
                <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-full mb-4">
                        오늘의 추천 맛집
                    </span>
                    <h2 className="text-2xl font-bold text-slate-900 mb-1">{restaurant.name}</h2>
                    <p className="text-slate-500 text-sm">{restaurant.category}</p>
                </div>

                <div className="py-6 border-y border-slate-100 mb-6">
                    <p className="text-lg font-medium text-slate-800">
                        오늘은 <br/>
                        <span className="text-orange-600 font-bold text-xl">"{restaurant.name}"</span> <br/>
                        어떠신가요? 😋
                    </p>
                </div>

                <div className="flex flex-col gap-3">
                    <button 
                        onClick={onDetail}
                        className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors"
                    >
                        자세히 보기
                    </button>
                    <div className="flex gap-3">
                        <button 
                            onClick={onRetry}
                            className="flex-1 py-3 bg-white border border-slate-200 text-slate-600 font-medium rounded-xl hover:bg-slate-50 transition-colors flex justify-center items-center gap-2"
                        >
                            <Shuffle size={16} />
                            다시 뽑기
                        </button>
                        <button 
                            onClick={onClose}
                            className="flex-1 py-3 bg-white border border-slate-200 text-slate-600 font-medium rounded-xl hover:bg-slate-50 transition-colors"
                        >
                            닫기
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.RandomModal = RandomModal;
