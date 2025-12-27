const { useState, useMemo } = React;

const App = () => {
    // 컴포넌트 참조
    const RestaurantCard = window.RestaurantCard;
    const DetailModal = window.DetailModal;
    const RandomModal = window.RandomModal;
    const [activeRegion, setActiveRegion] = useState("전체");
    const [activeCategory, setActiveCategory] = useState("전체");
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("rating");
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const [isRandomModalOpen, setIsRandomModalOpen] = useState(false);
    const [randomPick, setRandomPick] = useState(null);
    const [showToast, setShowToast] = useState(false);

    // 데이터 가공
    const RESTAURANTS = window.RESTAURANT_DATA.map((item, index) => {
        const mainCategory = item.category.split(' ')[0].split('/')[0];
        return {
            ...item,
            id: index,
            mainCategory: mainCategory === "제과점" ? "카페" : mainCategory,
        };
    });

    // 필터 및 정렬
    const filteredRestaurants = useMemo(() => {
        let result = RESTAURANTS;

        if (activeRegion !== "전체") {
            result = result.filter(r => r.region.includes(activeRegion));
        }

        if (activeCategory !== "전체") {
            result = result.filter(r => {
                if (activeCategory === "카페/베이커리") return r.mainCategory === "카페" || r.category.includes("베이커리");
                return r.mainCategory === activeCategory;
            });
        }

        if (searchTerm) {
            result = result.filter(r => 
                r.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                r.category.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        return result.sort((a, b) => {
            if (sortBy === 'rating') {
                if (b.rating !== a.rating) return b.rating - a.rating;
                return a.name.localeCompare(b.name);
            } else {
                return a.name.localeCompare(b.name);
            }
        });
    }, [activeRegion, activeCategory, searchTerm, sortBy]);

    const handleRandomPick = () => {
        if (filteredRestaurants.length === 0) {
            alert("추천할 맛집 목록이 없습니다!");
            return;
        }
        const randomIndex = Math.floor(Math.random() * filteredRestaurants.length);
        setRandomPick(filteredRestaurants[randomIndex]);
        setIsRandomModalOpen(true);
    };

    const copyToClipboard = async (text) => {
        const success = await window.ClipboardUtils.copyToClipboard(text);
        if (success) {
            setShowToast(true);
            setTimeout(() => setShowToast(false), 2000);
        }
    };

    const categories = ["전체", "한식", "양식", "일식", "중식", "카페/베이커리"];
    const regions = ["전체", "유성구", "서구", "중구", "동구"];
    const { Search, Filter, Utensils, Shuffle } = window.Icons;

    return (
        <div className="min-h-screen font-sans">
            {/* 헤더 */}
            <header className="sticky top-0 z-40 bg-white border-b border-orange-100 shadow-sm">
                <div className="max-w-5xl mx-auto px-4 py-4">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center text-white shadow-lg">
                                <Utensils size={24} />
                            </div>
                            <div>
                                <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">대전의 맛</h1>
                                <p className="text-xs text-slate-500">대전 찐맛집 아카이브</p>
                            </div>
                        </div>
                        <button 
                            onClick={handleRandomPick}
                            className="flex items-center gap-2 bg-orange-100 hover:bg-orange-200 text-orange-700 px-4 py-2 rounded-full font-medium transition-colors text-sm"
                        >
                            <Shuffle size={16} />
                            <span className="hidden sm:inline">오늘 뭐 먹지?</span>
                        </button>
                    </div>

                    <div className="space-y-3">
                        <div className="relative">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                <Search size={18} />
                            </div>
                            <input 
                                type="text" 
                                placeholder="맛집 이름, 메뉴(예: 칼국수) 검색..." 
                                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-3 justify-between">
                            <div className="flex gap-1 overflow-x-auto pb-1 no-scrollbar">
                                {regions.map(region => (
                                    <button
                                        key={region}
                                        onClick={() => setActiveRegion(region)}
                                        className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                                            activeRegion === region 
                                            ? "bg-slate-800 text-white" 
                                            : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                                        }`}
                                    >
                                        {region}
                                    </button>
                                ))}
                            </div>

                            <div className="flex items-center gap-2 min-w-fit">
                                <div className="text-slate-400">
                                    <Filter size={16} />
                                </div>
                                <select 
                                    className="bg-transparent text-sm font-medium text-slate-600 focus:outline-none cursor-pointer"
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                >
                                    <option value="rating">별점 높은 순</option>
                                    <option value="name">이름 가나다 순</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* 메인 컨텐츠 */}
            <main className="max-w-5xl mx-auto px-4 py-6">
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2 no-scrollbar">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-medium border whitespace-nowrap transition-all ${
                                activeCategory === cat
                                ? "bg-orange-50 border-orange-200 text-orange-700 ring-1 ring-orange-200"
                                : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="mb-4 text-sm text-slate-500">
                    총 <span className="font-bold text-orange-600">{filteredRestaurants.length}</span>개의 맛집을 찾았습니다.
                </div>

                {filteredRestaurants.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {filteredRestaurants.map(restaurant => (
                            <RestaurantCard 
                                key={restaurant.id} 
                                data={restaurant} 
                                onClick={() => setSelectedRestaurant(restaurant)} 
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                            <Search size={32} />
                        </div>
                        <p className="text-slate-500 text-lg">검색 결과가 없습니다.</p>
                        <button 
                            onClick={() => {setSearchTerm(""); setActiveCategory("전체"); setActiveRegion("전체");}}
                            className="mt-4 text-orange-600 font-medium hover:underline"
                        >
                            필터 초기화
                        </button>
                    </div>
                )}
            </main>

            {/* 모달 */}
            {selectedRestaurant && (
                <DetailModal 
                    restaurant={selectedRestaurant} 
                    onClose={() => setSelectedRestaurant(null)} 
                    onCopy={copyToClipboard}
                />
            )}

            {isRandomModalOpen && randomPick && (
                <RandomModal 
                    restaurant={randomPick} 
                    onClose={() => setIsRandomModalOpen(false)}
                    onRetry={handleRandomPick}
                    onDetail={() => {
                        setIsRandomModalOpen(false);
                        setSelectedRestaurant(randomPick);
                    }}
                />
            )}

            {/* 토스트 */}
            {showToast && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-800 text-white px-4 py-2 rounded-full text-sm shadow-lg animate-fade-in-up z-50">
                    주소가 복사되었습니다! 📋
                </div>
            )}
        </div>
    );
};

window.App = App;
