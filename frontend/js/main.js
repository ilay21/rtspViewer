var app = angular.module("app", ['ui.router', 'ui.bootstrap'])
  .config(function ($stateProvider, ) {

    $stateProvider
      .state("login", {
        url: "/",
        component: "loginComponent"
      })
      .state("register", {
        url: "/register",
        component: "registerComponent"
      })
      .state("addNew", {
        url: "/new",
        component: "addNewComponent"
      })
      .state("list", {
        url: "/list",
        component: "listComponent"
      })
      .state("player", {
        url: "/player",
        component: "playerComponent",
        params: {rtspUrl: null}
      })
  })
