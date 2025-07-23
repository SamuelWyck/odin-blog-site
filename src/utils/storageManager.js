class StorageManager {
    #key = "cookie";

    storeCookie(cookie) {
        localStorage.setItem(this.#key, cookie);
    };


    getCookie() {
        const cookie = localStorage.getItem(this.#key);
        return cookie;
    };


    clearCookie() {
        localStorage.removeItem(this.#key);
    };
};



export default StorageManager;