import { api } from "boot/axios";

export function getSetting({ commit }) {
  return new Promise((resolve, reject) => {
    api
      .get("v1/home/setting")
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function getHome({ commit }) {
  return new Promise((resolve, reject) => {
    api
      .get("v1/home/home")
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
}
export function getArticle({ commit }, item) {
  return new Promise((resolve, reject) => {
    api
      .get("v1/home/article", { params: item })
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
}
export function getArticleItem({ commit }, item) {
  return new Promise((resolve, reject) => {
    api
      .get("v1/home/article-item", { params: item })
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function getProject({ commit }, item) {
  return new Promise((resolve, reject) => {
    api
      .get("v1/home/project", { params: item })
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
}
