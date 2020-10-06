import { message } from "antd";
import * as Conf from "./Conf"

export let ClientUrl = '';

export function initFullClientUrl() {
    const hostname = window.location.hostname;
    if (hostname === 'localhost') {
        ClientUrl = `http://${hostname}:3030`;
    } else {
        ClientUrl = `https://${hostname}`;
    }
}


export function goToLink(link) {
    window.location.href = link;
}

export function showMessage(type, text) {
    if (type === "") {
        return;
    } else if (type === "success") {
        message.success(text, 0.5);
    } else if (type === "error") {
        message.error(text, 0.5);
    }
}

export function deleteRow(array, i) {
    return [...array.slice(0, i), ...array.slice(i + 1)];
}

export function swapRow(array, i, j) {
    return [...array.slice(0, i), array[j], ...array.slice(i + 1, j), array[i], ...array.slice(j + 1)];
}


export function getGithubAuthCode(method) {
    window.event.returnValue = false
    window.location.href = `${Conf.config.oauth_uri}?client_id=${Conf.config.client_id}&redirect_uri=${ClientUrl}/callback/${method}&scope=${Conf.GithubAuthScope}&response_type=code&state=${Conf.GithubAuthState}`;
}

