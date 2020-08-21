import * as Setting from "./Setting";

export function getAdapters() {
    return fetch(`${Setting.ServerUrl}/api/get-adapters`, {
        method: "GET",
        credentials: "include"
    }).then(res => res.json())
}

export function getAdapter(adapterId) {
    return fetch(`${Setting.ServerUrl}/api/get-adapter?id=${adapterId}`, {
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

export function updateAdapter(adapter) {
    return fetch(`${Setting.ServerUrl}/api/update-adapter`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(adapter),
    }).then(res => res.json());
}

export function deleteAdapter(adapter){
    return fetch(`${Setting.ServerUrl}/api/delete-adapter`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(adapter),
    }).then(res => res.json());
}

export function testAdapterConnection(adapter) {
    return fetch(`${Setting.ServerUrl}/api/test-adapter-connection`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(adapter),
    }).then(res => res.json());
}

export function getAdapterPolicies(adapterId) {
    return fetch(`${Setting.ServerUrl}/api/get-adapter-policies?id=${adapterId}`, {
        method: 'GET',
        credentials: 'include',
    }).then(res => res.json());
}

export function getAdapterGroupingPolicies(adapterId) {
    return fetch(`${Setting.ServerUrl}/api/get-adapter-grouping-policies?id=${adapterId}`, {
        method: 'GET',
        credentials: 'include',
    }).then(res => res.json());
}

export function setAdapterAllPolicies(adapterId, policies) {
    return fetch(`${Setting.ServerUrl}/api/set-adapter-all-policies?id=${adapterId}`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(policies),
    }).then(res => res.json());
}

export function addAdapterPolicy(adapterId, policy) {
    return fetch(`${Setting.ServerUrl}/api/add-adapter-policy?id=${adapterId}`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(policy),
    }).then(res => res.json());
}

export function removeAdapterPolicy(adapterId, policy) {
    return fetch(`${Setting.ServerUrl}/api/remove-adapter-policy?id=${adapterId}`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(policy),
    }).then(res => res.json());
}

export function getEmptyAdapter() {
    return fetch(`${Setting.ServerUrl}/api/get-empty-adapter`, {
        method: 'Get',
        credentials: 'include'
    }).then(res => res.json());
}

export function getModels() {
    return fetch(`${Setting.ServerUrl}/api/get-models`, {
        method: "GET",
        credentials: "include"
    }).then(res => res.json());
}

export function getModel(modelId) {
    return fetch(`${Setting.ServerUrl}/api/get-model?id=${modelId}`, {
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

export function updateModel(model) {
    return fetch(`${Setting.ServerUrl}/api/update-model`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(model),
    }).then(res => res.json());
}

export function getEmptyModel() {
    return fetch(`${Setting.ServerUrl}/api/get-empty-model`, {
        method: 'Get',
        credentials: 'include'
    }).then(res => res.json());
}

export function deleteModel(model){
    return fetch(`${Setting.ServerUrl}/api/delete-model`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(model),
    }).then(res => res.json());
}

export function getEnforcers() {
    return fetch(`${Setting.ServerUrl}/api/get-enforcers`, {
        method: "GET",
        credentials: "include"
    }).then(res => res.json());
}

export function getEnforcer(enforcerId) {
    return fetch(`${Setting.ServerUrl}/api/get-enforcer?id=${enforcerId}`, {
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

export function getEmptyEnforcer() {
    return fetch(`${Setting.ServerUrl}/api/get-empty-enforcer`, {
        method: 'Get',
        credentials: 'include'
    }).then(res => res.json());
}

export function updateEnforcer(enforcer) {
    return fetch(`${Setting.ServerUrl}/api/update-enforcer`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(enforcer),
    }).then(res => res.json());
}

export function deleteEnforcer(enforcer){
    return fetch(`${Setting.ServerUrl}/api/delete-enforcer`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(enforcer),
    }).then(res => res.json());
}

export function getPolicyLists() {
    return fetch(`${Setting.ServerUrl}/api/get-policyLists`, {
        method: "GET",
        credentials: "include"
    }).then(res => res.json())
}

export function getPolicyList(policyListId) {
    return fetch(`${Setting.ServerUrl}/api/get-policyList?id=${policyListId}`, {
        method: "GET",
        credentials: "include"
    }).then(res => res.json());
}

export function updatePolicyLists(policyLists) {
    return fetch(`${Setting.ServerUrl}/api/update-policyLists`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(policyLists),
    }).then(res => res.json());
}

export function updatePolicyList(policyList) {
    return fetch(`${Setting.ServerUrl}/api/update-policyList`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(policyList),
    }).then(res => res.json());
}

export function deletePolicyList(policyList){
    return fetch(`${Setting.ServerUrl}/api/delete-policyList`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(policyList),
    }).then(res => res.json());
}

export function getEmptyPolicyList() {
    return fetch(`${Setting.ServerUrl}/api/get-empty-policyList`, {
        method: 'Get',
        credentials: 'include'
    }).then(res => res.json());
}