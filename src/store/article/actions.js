import { api } from "boot/axios";

export function getList({ commit }, item) {
  return new Promise((resolve, reject) => {
    api
      .get("v1/article", { params: item })
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
    var apiUrl = "v1/article/";

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
    var apiUrl = "v1/article/view?id=" + parseInt(item);

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
    var apiUrl = "v1/article/delete?id=";
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
