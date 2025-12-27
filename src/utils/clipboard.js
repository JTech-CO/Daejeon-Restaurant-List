// 클립보드 유틸리티
const copyToClipboard = async (text) => {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (err) {
        console.error('클립보드 복사 실패:', err);
        return false;
    }
};

window.ClipboardUtils = { copyToClipboard };

