const routes = [
  {
    path: "",
    component: () => import("layouts/Home.vue"),
    children: [
      {
        path: "",
        name: "index",
        component: () => import("pages/index.vue")
      },

      {
        path: "/details",
        name: "userDocs",
        component: () => import("pages/details.vue")
      },
      {
        path: "/search",
        name: "searchProject",
        component: () => import("pages/search.vue")
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
