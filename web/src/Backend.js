export let ServerUrl = '';

export function initServerUrl() {
    const hostname = window.location.hostname;
    if (hostname === 'localhost') {
        ServerUrl = `http://${hostname}:8800`;
    }
}

export function getAdapters() {
    return fetch(`${ServerUrl}/api/v1/adapters`, {
        method: "GET",
        credentials: "include"
    }).then(res => res.json())
}

export function getAdapter(adapterId) {
    return fetch(`${ServerUrl}/api/v1/adapter?id=${adapterId}`, {
        method: "GET",
        credentials: "include"
    }).then(res => res.json());
}

export function updateAdapters(adapters) {
    return fetch(`${ServerUrl}/api/v1/adapters`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(adapters),
    }).then(res => res.json());
}

export function updateAdapter(adapter) {
    return fetch(`${ServerUrl}/api/v1/adapter`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(adapter),
    }).then(res => res.json());
}

export function deleteAdapter(adapter) {
    return fetch(`${ServerUrl}/api/v1/adapter`, {
        method: 'DELETE',
        credentials: 'include',
        body: JSON.stringify(adapter),
    }).then(res => res.json());
}

export function testAdapterConnection(adapter) {
    return fetch(`${ServerUrl}/api/v1/test-adapter-connection`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(adapter),
    }).then(res => res.json());
}

export function getAdapterPolicies(adapterId) {
    return fetch(`${ServerUrl}/api/v1/adapter-policies?id=${adapterId}`, {
        method: 'GET',
        credentials: 'include',
    }).then(res => res.json());
}

export function getAdapterGroupingPolicies(adapterId) {
    return fetch(`${ServerUrl}/api/v1/adapter-grouping-policies?id=${adapterId}`, {
        method: 'GET',
        credentials: 'include',
    }).then(res => res.json());
}

export function setAdapterAllPolicies(adapterId, policies) {
    return fetch(`${ServerUrl}/api/v1/adapter-all-policies?id=${adapterId}`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(policies),
    }).then(res => res.json());
}

export function addAdapterPolicy(adapterId, policy) {
    return fetch(`${ServerUrl}/api/v1/adapter-policy?id=${adapterId}`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(policy),
    }).then(res => res.json());
}

export function removeAdapterPolicy(adapterId, policy) {
    return fetch(`${ServerUrl}/api/v1/adapter-policy?id=${adapterId}`, {
        method: 'DELETE',
        credentials: 'include',
        body: JSON.stringify(policy),
    }).then(res => res.json());
}

export function getEmptyAdapter() {
    return fetch(`${ServerUrl}/api/v1/empty-adapter`, {
        method: 'GET',
        credentials: 'include'
    }).then(res => res.json());
}

export function getModels() {
    return fetch(`${ServerUrl}/api/v1/models`, {
        method: "GET",
        credentials: "include"
    }).then(res => res.json());
}

export function getModel(modelId) {
    return fetch(`${ServerUrl}/api/v1/model?id=${modelId}`, {
        method: "GET",
        credentials: "include"
    }).then(res => res.json());
}

export function updateModels(models) {
    return fetch(`${ServerUrl}/api/v1/models`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(models),
    }).then(res => res.json());
}

export function updateModel(model) {
    return fetch(`${ServerUrl}/api/v1/model`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(model),
    }).then(res => res.json());
}

export function getEmptyModel() {
    return fetch(`${ServerUrl}/api/v1/empty-model`, {
        method: 'GET',
        credentials: 'include'
    }).then(res => res.json());
}

export function deleteModel(model) {
    return fetch(`${ServerUrl}/api/v1/model`, {
        method: 'DELETE',
        credentials: 'include',
        body: JSON.stringify(model),
    }).then(res => res.json());
}

export function getEnforcers() {
    return fetch(`${ServerUrl}/api/v1/enforcers`, {
        method: "GET",
        credentials: "include"
    }).then(res => res.json());
}

export function getEnforcer(enforcerId) {
    return fetch(`${ServerUrl}/api/v1/enforcer?id=${enforcerId}`, {
        method: "GET",
        credentials: "include"
    }).then(res => res.json());
}

export function updateEnforcers(enforcers) {
    return fetch(`${ServerUrl}/api/v1/enforcers`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(enforcers),
    }).then(res => res.json());
}

export function getEmptyEnforcer() {
    return fetch(`${ServerUrl}/api/v1/empty-enforcer`, {
        method: 'GET',
        credentials: 'include'
    }).then(res => res.json());
}

export function updateEnforcer(enforcer) {
    return fetch(`${ServerUrl}/api/v1/enforcer`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(enforcer),
    }).then(res => res.json());
}

export function deleteEnforcer(enforcer) {
    return fetch(`${ServerUrl}/api/v1/enforcer`, {
        method: 'DELETE',
        credentials: 'include',
        body: JSON.stringify(enforcer),
    }).then(res => res.json());
}

export function getPolicyLists() {
    return fetch(`${ServerUrl}/api/v1/policyLists`, {
        method: "GET",
        credentials: "include"
    }).then(res => res.json())
}

export function getPolicyList(policyListId) {
    return fetch(`${ServerUrl}/api/v1/policyList?id=${policyListId}`, {
        method: "GET",
        credentials: "include"
    }).then(res => res.json());
}

export function updatePolicyLists(policyLists) {
    return fetch(`${ServerUrl}/api/v1/policyLists`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(policyLists),
    }).then(res => res.json());
}

export function updatePolicyList(policyList) {
    return fetch(`${ServerUrl}/api/v1/policyList`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(policyList),
    }).then(res => res.json());
}

export function deletePolicyList(policyList) {
    return fetch(`${ServerUrl}/api/v1/policyList`, {
        method: 'DELETE',
        credentials: 'include',
        body: JSON.stringify(policyList),
    }).then(res => res.json());
}

export function getEmptyPolicyList() {
    return fetch(`${ServerUrl}/api/v1/empty-policyList`, {
        method: 'GET',
        credentials: 'include'
    }).then(res => res.json());
}

export function logout() {
    return fetch(`${ServerUrl}/api/v1/logout`, {
        method: 'POST',
        credentials: "include",
    }).then(res => res.json());
}

export function githubLogin(code, state, redirectUrl, addition) {
    return fetch(`${ServerUrl}/api/v1/auth-github?code=${code}&state=${state}&redirect_url=${redirectUrl}&addition=${addition}`, {
        method: 'GET',
        credentials: 'include',
    }).then(res => res.json());
}

export function getAccount() {
    return fetch(`${ServerUrl}/api/v1/account`, {
        method: 'GET',
        credentials: 'include'
    }).then(res => res.json());
}