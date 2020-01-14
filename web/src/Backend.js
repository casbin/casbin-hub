import * as Setting from "./Setting";

export function getAdapters() {
    return fetch(`${Setting.ServerUrl}/api/get-adapters`, {
        method: "GET",
        credentials: "include"
    }).then(res => res.json());
}

export function updateAdapters(adapters) {
    return fetch(`${Setting.ServerUrl}/api/update-adapters`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(adapters),
    }).then(res => res.json());
}

export function getModels() {
    return fetch(`${Setting.ServerUrl}/api/get-models`, {
        method: "GET",
        credentials: "include"
    }).then(res => res.json());
}

export function updateModels(models) {
    return fetch(`${Setting.ServerUrl}/api/update-models`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(models),
    }).then(res => res.json());
}


export function getEnforcers() {
    return fetch(`${Setting.ServerUrl}/api/get-enforcers`, {
        method: "GET",
        credentials: "include"
    }).then(res => res.json());
}

export function updateEnforcers(enforcers) {
    return fetch(`${Setting.ServerUrl}/api/update-enforcers`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(enforcers),
    }).then(res => res.json());
}
