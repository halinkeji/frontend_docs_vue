import { api } from "boot/axios";

export function getList({ commit }, item) {
  return new Promise((resolve, reject) => {
    api
      .get("v1/log", { params: item })
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
    var apiUrl = "v1/log/delete?id=";
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
