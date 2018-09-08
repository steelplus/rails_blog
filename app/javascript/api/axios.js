// rails serverとのやり取りをするAPI
import axios from 'axios';
import 'babel-polyfill';

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

// エラー時はthrowします。エラーはVue-Componentでcatchします。
const onError = (error) => {
    updateToken(error.response);
    throw error.response.data.content.message;
};

export default {
    get: async (path, params = {}, callback = () => {
    }) => {
        await axios.get(path, setToken(params))
            .then(response => {
                callback(response);
                updateToken(response);
            }).catch(onError);
    },
    post: async (path, params = {}, callback = () => {
    }) => {
        await axios.post(path, setToken(params))
            .then(response => {
                callback(response);
                updateToken(response);
            }).catch(onError);
    },
    put: async (path, params = {}, callback = () => {
    }) => {
        await axios.put(path, setToken(params))
            .then(response => {
                callback(response);
                updateToken(response);
            }).catch(onError);
    },
    delete: async (path, params = {}, callback = () => {
    }) => {
        await axios.delete(path, {params: setToken(params)})
            .then(response => {
                callback(response);
                updateToken(response);
            }).catch(onError);
    },
}