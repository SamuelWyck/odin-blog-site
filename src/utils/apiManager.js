import StorageManager from "./storageManager.js";



class APIManager {
    #apiDomain = "http://localhost:3000";
    #storage = StorageManager;


    async #makeApiCall(url, options) {
        const response = await fetch(url, options);
        const json = await response.json();
        return json;
    };


    async getPosts() {
        const url = `${this.#apiDomain}/posts`;
        const token = this.#storage.getCookie();
        const options = {
            mode: "cors",
            method: "GET",
            headers: {
                authorization: `Bearer ${token}`
            }
        };

        const response = await this.#makeApiCall(url, options);
        return response;
    };


    async getPost(postId) {
        const url = `${this.#apiDomain}/posts/${postId}`;
        const token = this.#storage.getCookie();
        const options = {
            mode: "cors",
            method: "GET",
            headers: {
                authorization: `Bearer ${token}`
            }
        };

        const response = await this.#makeApiCall(url, options);
        return response;
    };


    async getAuthoredPosts() {
        const url = `${this.#apiDomain}/admin/posts`;
        const token = this.#storage.getCookie();
        const options = {
            mode: "cors",
            method: "GET",
            headers: {
                authorization: `Bearer ${token}`
            }
        };

        const response = await this.#makeApiCall(url, options);
        return response;
    };


    async authPost(reqBody, signup) {
        const endPoint = (signup) ? "signup" : "login"
        const url = `${this.#apiDomain}/auth/${endPoint}`;
        const options = {
            mode: "cors",
            method: "POST",
            body: reqBody,
            headers: {
                "content-type": "application/json"
            }
        };

        const response = await this.#makeApiCall(url, options);
        return response;
    };
};



export default new APIManager();