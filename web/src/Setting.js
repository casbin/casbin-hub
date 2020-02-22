import { message } from 'antd'

export let ServerUrl = ''

export function initServerUrl() {
  const hostname = window.location.hostname
  if (hostname === 'localhost') {
    ServerUrl = `http://${hostname}:8000`
  }
}

export function openLink(link) {
  const w = window.open('about:blank')
  w.location.href = link
}

export function showMessage(type, text) {
  if (type === '') {
    return
  } else if (type === 'success') {
    message.success(text)
  } else if (type === 'error') {
    message.error(text)
  }
}

export function deepCopy(obj) {
  return Object.assign({}, obj)
}

export function myParseInt(i) {
  const res = parseInt(i)
  return isNaN(res) ? 0 : res
}

export function addRow(array, row) {
  return [...array, row]
}

export function deleteRow(array, i) {
  return [...array.slice(0, i), ...array.slice(i + 1)]
}

export function swapRow(array, i, j) {
  return [
    ...array.slice(0, i),
    array[j],
    ...array.slice(i + 1, j),
    array[i],
    ...array.slice(j + 1),
  ]
}

export function getSelectOptions(options) {
  if (options === null) {
    return []
  } else {
    return options
  }
}
