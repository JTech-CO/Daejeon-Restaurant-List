// 지도 링크 생성 유틸리티
const generateMapSearchUrl = (address, name) => {
    return `https://map.naver.com/v5/search/${encodeURIComponent(address + ' ' + name)}`;
};

window.MapUtils = { generateMapSearchUrl };

