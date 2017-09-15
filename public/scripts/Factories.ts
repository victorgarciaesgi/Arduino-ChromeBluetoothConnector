

MainApp.factory('AjaxRequest', ($http: angular.IHttpService) => {
  let get = (route: string, querry: string) => {
    return $http({
      url: route,
      method: "POST",
      data: { data: querry }
    }).then((result: any) => {
      var data = result.data;
      try {
        var returnData = JSON.parse(data);
      }
      catch (e) {
        var returnData = data;
      }
      return returnData;
    })
  }
  return {
    get: get,
  };
});


MainApp.factory('PromiseImage', function ($q:angular.IQService) {
  let load = (ImgLink: string) => {
    return $q((resolve, reject) => {
      var img = new Image();
      img.onload = (event) => {
        resolve(img);
      }
      img.onerror = () => {
        reject(false);
      }
      img.src = ImgLink;
    })
  }
  return {
    load: load
  }
});


// MainApp.factory('socket', function ($rootScope) {
//   var socket = io.connect('http://localhost:8126');
//   return {

//     on: function (eventName, callback) {
//       socket.on(eventName, function () {
//         var args = arguments;
//         $rootScope.$apply(function () {
//           callback.apply(socket, args);
//         });
//       });
//     },
//     emit: function (eventName, data, callback) {
//       socket.emit(eventName, data, function () {
//         var args = arguments;
//         $rootScope.$apply(function () {
//           if (callback) {
//             callback.apply(socket, args);
//           }
//         });
//       })
//     }
//   };
// });
