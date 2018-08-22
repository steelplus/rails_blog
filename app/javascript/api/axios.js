// rails serverとのやり取りをするAPI

import axios from 'axios';

// html-meta内のcsrf-tokenを返却します
const setToken = (params) => {
    const tags = document.getElementsByTagName("meta");
    for (let i = 0; i < tags.length; i++) {
        if (tags[i].name === "csrf-token") {
            params.authenticity_token = tags[i].content;
            // axios.defaults.headers['X-CSRF-TOKEN'] = tags[i].content;
            break;
        }
    }
    return params;
};

// csrf-tokenを更新します
const updateToken = (params) => {
    if (params.authenticity_token !== null && params.authenticity_token !== '') {
        const tags = document.getElementsByTagName("meta");
        for (let i = 0; i < tags.length; i++) {
            if (tags[i].name === "csrf-token") {
                tags[i].content = params.authenticity_token;
                break;
            }
        }
    }
};

export default {
    get: (path, params = {}) => {
        return axios.get(path, {params}).then(response => updateToken(response)).catch(response => updateToken(response));
    },
    post: (path, params = {}) => {
        return axios.post(path, setToken(params)).then(response => updateToken(response)).catch(response => updateToken(response));
    },
    put: (path, params = {}) => {
        return axios.put(path, setToken(params)).then(response => updateToken(response)).catch(response => updateToken(response));
    },
    delete: (path, params = {}) => {
        return axios.delete(path, {params: setToken(params)}).then(response => updateToken(response)).catch(response => updateToken(response));
    },
}