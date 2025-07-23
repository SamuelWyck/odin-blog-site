class StorageManager {
    #key = "cookie";

    storeCookie(cookie) {
        if (!cookie) {
            cookie = null;
        }
        localStorage.setItem(this.#key, cookie);
    };


    getCookie() {
        const cookie = localStorage.getItem(this.#key);
        return cookie;
    };


    clearCookie() {
        localStorage.removeItem(this.#key);
    };


    cookieExists() {
        const cookie = localStorage.getItem(this.#key);
        return cookie !== null;
    };
};



export default new StorageManager();