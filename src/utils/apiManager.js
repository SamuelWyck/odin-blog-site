import StorageManager from "./storageManager.js";



class APIManager {
    #apiDomain = "http://localhost:3000";
    #storage = StorageManager;
    postPageLength = 10;


    async #makeApiCall(url, options) {
        const response = await fetch(url, options);
        const json = await response.json();
        return json;
    };


    async #getPostOrPosts({postId, pageNumber}) {
        const endPoint = (postId) ? 
            `/${postId}` : `?pageNumber=${pageNumber}`;

        const url = `${this.#apiDomain}/posts${endPoint}`;
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


    async getPosts(pageNumber) {
        const response = await this.#getPostOrPosts({pageNumber});
        return response;
    };


    async getPost(postId) {
        const response = await this.#getPostOrPosts({postId});
        return response;
    };


    async #getAuthoredPostOrPosts(postId) {
        const endPoint = (postId) ? `/${postId}` : "";
        const url = `${this.#apiDomain}/admin/posts${endPoint}`;
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
        const response = await this.#getAuthoredPostOrPosts(
            null
        );
        return response;
    };


    async getAuthoredPost(postId) {
        const response = await this.#getAuthoredPostOrPosts(
            postId
        );
        return response;
    };


    async getApiKey() {
        const url = `${this.#apiDomain}/admin/apikey`;
        const token = this.#storage.getCookie();
        const options = {
            mode: "cors",
            method: "GET",
            headers: {
                authorization: `Bearer ${token}`,
            }
        };

        const response = await this.#makeApiCall(url, options);
        return response;
    }


    async #editOrCreatePost(reqBody, postId) {
        const url = (postId) ?
            `${this.#apiDomain}/admin/posts/edit/${postId}` :
            `${this.#apiDomain}/admin/posts/new`;

        const token = this.#storage.getCookie();

        const options = {
            mode: "cors",
            method: (postId) ? "PUT" : "POST",
            body: reqBody,
            headers: {
                authorization: `Bearer ${token}`,
                "content-type": "application/json",
            }
        };

        const response = await this.#makeApiCall(url, options);
        return response;
    };


    async editAuthoredPost(reqBody, postId) {
        const response = await this.#editOrCreatePost(
            reqBody, 
            postId
        );
        return response;
    };


    async newAuthoredPost(reqBody) {
        const response = await this.#editOrCreatePost(
            reqBody,
            null
        );
        return response;
    };


    async deleteAuthoredPost(postId) {
        const url = `${this.#apiDomain}/admin/posts/delete/${postId}`;
        const token = this.#storage.getCookie();
        const options = {
            mode: "cors",
            method: "DELETE",
            headers: {
                authorization: `Bearer ${token}`
            }
        };

        const response = await this.#makeApiCall(url, options);
        return response;
    };


    async authenticateUser(reqBody, signup) {
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


    async #editOrCreateComment(reqBody, commentId) {
        const endPoint = (commentId) ? `edit/${commentId}` : `new`;
        const url = `${this.#apiDomain}/comments/${endPoint}`;
        const token = this.#storage.getCookie();
        const options = {
            mode: "cors",
            method: (commentId) ? "PUT" : "POST",
            body: reqBody,
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${token}`
            }
        };

        const response = await this.#makeApiCall(url, options);
        return response;
    };


    async newComment(reqBody) {
        const response = await this.#editOrCreateComment(
            reqBody,
            null
        );
        return response;
    };


    async editComment(reqBody, commentId) {
        const response = await this.#editOrCreateComment(
            reqBody,
            commentId
        );
        return response;
    };


    async deleteComment(commentId) {
        const url = `${this.#apiDomain}/comments/delete/${commentId}`;
        const token = this.#storage.getCookie();
        const options = {
            mode: "cors",
            method: "DELETE",
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${token}`
            }
        };

        const response = await this.#makeApiCall(url, options);
        return response;
    };
};



export default new APIManager();