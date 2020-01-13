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
