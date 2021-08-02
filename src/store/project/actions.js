import { api } from "boot/axios";

export function getList({ commit }, item) {
  return new Promise((resolve, reject) => {
    api
      .get("v1/project", { params: item })
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function getHomeData({ commit }) {
  return new Promise((resolve, reject) => {
    api
      .get("v1/project/home")
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function getSearchData({ commit }, item) {
  return new Promise((resolve, reject) => {
    api
      .get("v1/project/search", { params: item })
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
}
export function setData({ commit }, item) {
  return new Promise((resolve, reject) => {
    var apiUrl = "v1/project/";

    apiUrl +=
      parseInt(item.id) > 0 ? "update?id=" + parseInt(item.id) : "create";
    var requestType = parseInt(item.id) > 0 ? "put" : "post";
    api[requestType](apiUrl, item)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function getItem({ commit }, item) {
  return new Promise((resolve, reject) => {
    var apiUrl = "v1/project/view?id=" + parseInt(item);

    api
      .get(apiUrl)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function delData({ commit }, item) {
  return new Promise((resolve, reject) => {
    var apiUrl = "v1/project/delete?id=";
    apiUrl += item;
    api
      .delete(apiUrl, item)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
}
