import * as Setting from "./Setting";

export const getAdapters = () => {
    return fetch(`${Setting.ServerUrl}/api/get-adapters`, {
        method: "GET",
        credentials: "include"
    }).then(res => res.json());
}

export const getAdapter = (adapterId) => {
    return fetch(`${Setting.ServerUrl}/api/get-adapter?id=${adapterId}`, {
        method: "GET",
        credentials: "include"
    }).then(res => res.json());
}

export const updateAdapters = (adapters) => {
    return fetch(`${Setting.ServerUrl}/api/update-adapters`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(adapters),
    }).then(res => res.json());
}

export const updateAdapter = (adapter) => {
    return fetch(`${Setting.ServerUrl}/api/update-adapter`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(adapter),
    }).then(res => res.json());
}

export const testAdapterConnection = (adapter) => {
    return fetch(`${Setting.ServerUrl}/api/test-adapter-connection`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(adapter),
    }).then(res => res.json());
}

export const getAdapterPolicies = (adapterId) => {
    return fetch(`${Setting.ServerUrl}/api/get-adapter-policies?id=${adapterId}`, {
        method: 'GET',
        credentials: 'include',
    }).then(res => res.json());
}

export const getAdapterGroupingPolicies = (adapterId) => {
    return fetch(`${Setting.ServerUrl}/api/get-adapter-grouping-policies?id=${adapterId}`, {
        method: 'GET',
        credentials: 'include',
    }).then(res => res.json());
}

export const setAdapterAllPolicies = (adapterId, policies) => {
    return fetch(`${Setting.ServerUrl}/api/set-adapter-all-policies?id=${adapterId}`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(policies),
    }).then(res => res.json());
}

export const addAdapterPolicy = (adapterId, policy) =>  {
    return fetch(`${Setting.ServerUrl}/api/add-adapter-policy?id=${adapterId}`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(policy),
    }).then(res => res.json());
}

export const removeAdapterPolicy = (adapterId, policy) => {
    return fetch(`${Setting.ServerUrl}/api/remove-adapter-policy?id=${adapterId}`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(policy),
    }).then(res => res.json());
}

export const getModels = () => {
    return fetch(`${Setting.ServerUrl}/api/get-models`, {
        method: "GET",
        credentials: "include"
    }).then(res => res.json());
}

export const getModel = (modelId) => {
    return fetch(`${Setting.ServerUrl}/api/get-model?id=${modelId}`, {
        method: "GET",
        credentials: "include"
    }).then(res => res.json());
}

export const updateModels = (models) => {
    return fetch(`${Setting.ServerUrl}/api/update-models`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(models),
    }).then(res => res.json());
}

export const updateModel = (model) => {
    return fetch(`${Setting.ServerUrl}/api/update-model`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(model),
    }).then(res => res.json());
}

export const getEnforcers = () => {
    return fetch(`${Setting.ServerUrl}/api/get-enforcers`, {
        method: "GET",
        credentials: "include"
    }).then(res => res.json());
}

export const getEnforcer = (enforcerId) => {
    return fetch(`${Setting.ServerUrl}/api/get-enforcer?id=${enforcerId}`, {
        method: "GET",
        credentials: "include"
    }).then(res => res.json());
}

export const updateEnforcers = (enforcers) => {
    return fetch(`${Setting.ServerUrl}/api/update-enforcers`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(enforcers),
    }).then(res => res.json());
}
