
export const StorageHelper = {
    setItem:(key:string, value:any)=> {
        window.localStorage[key] = value;
    },
    getItem: (key:string) => {
        return window.localStorage[key] === undefined ? '' : window.localStorage[key];
    },
    setObject(key:string, value:any) {
        try {
            window.localStorage[key] = JSON.stringify(value);
        } catch (e) {
            alert('本地储存写入错误，若为safari浏览器请关闭无痕模式浏览。');
        }
    },
    getObject(key:string) {
        return JSON.parse(window.localStorage[key] || '{}');
    },
    getArray(key:string) {
        return JSON.parse(window.localStorage[key] || '[]');
    },
    removeItem(key:string) {
        window.localStorage.removeItem(key);
    },
    clear() {
        window.localStorage.clear();
    },
}

