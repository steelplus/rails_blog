// rails serverとのやり取りをするAPI

import axios from 'axios';

// html-meta内のcsrf-tokenを返却します
const setToken = (params) => {
    const tags = document.getElementsByTagName("meta");
    for (let i = 0; i < tags.length; i++) {
        if (tags[i].name === "csrf-token") {
            params.authenticity_token = tags[i].content;
            break;
        }
    }
    return params;
};

// csrf-tokenを更新します
const updateToken = (params) => {
    if (params.data.authenticity_token !== null && params.data.authenticity_token !== '') {
        const tags = document.getElementsByTagName("meta");
        for (let i = 0; i < tags.length; i++) {
            if (tags[i].name === "csrf-token") {
                tags[i].content = params.data.authenticity_token;
                break;
            }
        }
    }
};

export default {
    get: (path, params = {}, callback = () => {
    }, errorCallback = () => {
    }) => {
        return axios.get(path, {params})
            .then(response => {
                callback(response);
                updateToken(response)
            }).catch(error => {
                errorCallback(error);
                updateToken(error.response)
            });
    },
    post: (path, params = {}, callback = () => {
    }) => {
        return axios.post(path, setToken(params))
            .then(response => {
                callback(response);
                updateToken(response)
            }).catch(error => {
                updateToken(error.response);
                throw error;
            });
    },
    put: (path, params = {}, callback = () => {
    }, errorCallback = () => {
    }) => {
        return axios.put(path, setToken(params))
            .then(response => {
                callback(response);
                updateToken(response)
            }).catch(error => {
                errorCallback(error);
                updateToken(error.response)
            });
    },
    delete: (path, params = {}, callback = () => {
    }, errorCallback = () => {
    }) => {
        return axios.delete(path, {params: setToken(params)})
            .then(response => {
                callback(response);
                updateToken(response)
            }).catch(error => {
                errorCallback(error);
                updateToken(error.response)
            });
    },
}