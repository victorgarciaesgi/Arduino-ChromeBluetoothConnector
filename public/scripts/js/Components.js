// Composant checkbox <checkbox></checkbox>
MainApp.component('checkbox', {
    templateUrl: '../../components/Checkbox.html',
    controller: function ($scope, $element, $attrs) { },
    bindings: {
        vgModel: '=',
        vgData: '<',
    }
});
// composant textarea
MainApp.component('areaForm', {
    templateUrl: '../../components/Area-form.html',
    controller: function ($scope, $element, $attrs) {
        var ctrl = this;
        $scope.$watch('$ctrl.vgModel', function (newValue, oldValue, scope) {
            if (!!newValue) {
                scope.areaForm[ctrl.vgName].$setDirty();
            }
        }, true);
    },
    bindings: {
        vgModel: '=',
        vgType: '<?',
        vgName: '<?',
        vgPlaceholder: '<?',
        vgValidator: '<?',
        vgErrors: '<?',
        vgRequired: '<?',
    }
});
MainApp.component('textForm', {
    templateUrl: '../../components/Text-form.html',
    controller: function ($scope, $element, $attrs) {
        var ctrl = this;
        $scope.$watch('$ctrl.vgModel', function (newValue, oldValue, scope) {
            if (!!newValue) {
                scope.textForm[ctrl.vgName].$setDirty();
            }
        }, true);
    },
    bindings: {
        vgModel: '=',
        vgType: '<?',
        vgName: '<?',
        vgPlaceholder: '<?',
        vgValidator: '<?',
        vgErrors: '<?',
        vgRequired: '<?',
        vgLegend: '<?'
    }
});
MainApp.component('searchForm', {
    templateUrl: '../../components/Search-form.html',
    controller: function ($scope, $element, $attrs, AjaxRequest) {
        var ctrl = this;
        ctrl.init = function () {
            this.limit = 4;
            this.selectBook = false;
            this.error = false;
            this.errorMessage = "";
            this.searching = false;
            this.searchText = "";
            this.filled = "";
            this.search_result = {
                selected: {},
                data: {},
                reset: function () {
                    this.selected = {};
                    this.data = {};
                }
            };
        };
        ctrl.$onInit = function () {
            ctrl.init();
            // if (!ctrl.vgModel && ctrl.vgOnlySelect){
            //   ctrl.vgModel = {};
            // }
        };
        ctrl.keydown = function (event, element) {
            if (event.which == 13) {
                event.preventDefault();
            }
            var model = ctrl.vgModel ? ctrl.vgModel : "";
            if (!ctrl.searching && (model.length > 1 || ctrl.searchText.length > 0) && (model != undefined || ctrl.searchText != undefined)) {
                if (event.which == 13 && !ctrl.error) {
                    event.preventDefault();
                    ctrl.selectAction(ctrl.search_result.selected);
                }
                else if (event.which == 38 || event.which == 40) {
                    event.preventDefault();
                    var list = ctrl.search_result.data;
                    var index = ctrl.search_result.selected.indexList;
                    if ((event.which == 38 && index > 0) || (event.which == 40 && index < ctrl.limit - 1 && index < (ctrl.search_result.data.length - 1))) {
                        var direction = (-39) + event.which;
                        ctrl.search_result.selected = list[index + direction];
                        ctrl.search_result.selected["indexList"] = index + direction;
                    }
                }
                else if (event.which == 27) {
                    ctrl.error = false;
                    ctrl.selectBook = false;
                    ctrl.displayResult = false;
                    event.target.blur();
                }
            }
            else {
                ctrl.displayResult = true;
            }
        };
        ctrl.selectAction = function (book) {
            if (ctrl.vgOnlySelect) {
                ctrl.searchText = book.name ? book.name : book.username;
                ctrl.vgModel = book;
                ctrl.search_result.reset();
                ctrl.displayResult = false;
                ctrl.selectBook = true;
            }
            else {
                ctrl.onSelectResult({ result: book });
                ctrl.search_result.reset();
                ctrl.displayResult = false;
                ctrl.selectBook = true;
            }
        };
        ctrl.search = function (source, value) {
            ctrl.error = false;
            AjaxRequest.get(source, value.replace(/ /g, '%20')).then(function (result) {
                if (result.error) {
                    ctrl.searching = false;
                    ctrl.search_result.reset();
                    ctrl.error = true;
                    ctrl.errorMessage = result.error;
                }
                else {
                    ctrl.searching = false;
                    ctrl.search_result.data = result;
                    ctrl.search_result.selected = result[0];
                    ctrl.search_result.selected["indexList"] = 0;
                }
            }, function (error) {
                ctrl.searching = false;
                ctrl.search_result.reset();
            });
        };
        $scope.$watch('$ctrl.vgModel', function (newValue, oldValue, scope) {
            if (!ctrl.vgOnlySelect) {
                if (!!newValue) {
                    if (newValue.trim().length > 1 && !ctrl.selectBook) {
                        ctrl.searching = true;
                        ctrl.search(ctrl.vgSource, newValue);
                    }
                    else {
                        ctrl.selectBook = false;
                    }
                }
                else {
                    ctrl.vgModel = "";
                    ctrl.init();
                }
            }
            else {
                if (!!newValue) {
                    if ($scope.searchForm[ctrl.vgData.name].$pristine && Object.keys(ctrl.vgModel).length > 0) {
                        $scope.searchForm[ctrl.vgData.name].$setDirty();
                    }
                    ctrl.filled = (Object.keys(ctrl.vgModel).length == 0 ? null : "filled");
                }
                else {
                    ctrl.init();
                    ctrl.vgModel = {};
                }
            }
        });
        $scope.$watch('$ctrl.searchText', function (newValue, oldValue, scope) {
            if (ctrl.vgOnlySelect) {
                if (!!newValue) {
                    if (newValue.trim().length > 0 && !ctrl.selectBook) {
                        if ($scope.searchForm[ctrl.vgData.name].$pristine) {
                            $scope.searchForm[ctrl.vgData.name].$setDirty();
                        }
                        ctrl.searching = true;
                        ctrl.search(ctrl.vgSource, newValue);
                    }
                    else {
                        ctrl.selectBook = false;
                    }
                }
                else {
                    ctrl.searchText = "";
                    ctrl.filled = "";
                    ctrl.vgModel = {};
                    ctrl.search_result.reset();
                }
            }
        });
    },
    bindings: {
        vgModel: '=',
        vgData: '<',
        vgDisabled: '=?',
        vgSource: '@',
        vgOrigin: '<?',
        vgOnlySelect: '<?',
        onSelectResult: '&'
    }
});
MainApp.component('tokenForm', {
    templateUrl: '../../components/Token-form.html',
    controller: function ($scope, $element, $attrs, AjaxRequest) {
        var ctrl = this;
        ctrl.init = function () {
            this.error = false;
            this.errorMessage = "";
            this.searching = false,
                this.selectToken = false;
            this.searchText = "";
            this.filled = "";
            this.search_result = {
                selected: {},
                data: {},
                reset: function () {
                    this.selected = {};
                    this.data = {};
                }
            };
        };
        ctrl.$onInit = function () {
            ctrl.init();
            if (!ctrl.vgModel) {
                ctrl.vgModel = [];
            }
        };
        ctrl.search = function (source, value) {
            ctrl.error = false;
            AjaxRequest.get(source, value).then(function (result) {
                if (result.error) {
                    ctrl.searching = false;
                    ctrl.search_result.reset();
                    ctrl.error = true;
                    ctrl.displayResult = true;
                    ctrl.errorMessage = result.error;
                }
                else if (result.length > 0) {
                    ctrl.searching = false;
                    var newResult = result.filter(function (element) { return ctrl.vgModel.findIndex(function (elem) { return elem.idCategory == element.idCategory; }) == -1; });
                    if (newResult.length > 0) {
                        ctrl.search_result.data = newResult;
                        ctrl.search_result.selected = newResult[0];
                        ctrl.search_result.selected["indexList"] = 0;
                    }
                    else {
                        ctrl.search_result.reset();
                        ctrl.error = true;
                        ctrl.displayResult = true;
                        ctrl.errorMessage = 'Aucun résultat';
                    }
                }
            }, function (error) {
                console.log(error);
                ctrl.searching = false;
                ctrl.search_result.reset();
            });
        };
        ctrl.selectAction = function (category) {
            if (ctrl.vgModel.findIndex(function (element) { return element.idCategory == category.idCategory; }) == -1) {
                ctrl.search_result.reset();
                ctrl.vgModel.push({ name: category.name, idCategory: category.idCategory });
                ctrl.searchText = "";
                ctrl.selectToken = true;
            }
        };
        ctrl.keydown = function (event, element) {
            if (event.which == 13) {
                event.preventDefault();
            }
            if (!ctrl.searching) {
                if (event.which == 13 && ctrl.search_result.data.length > 0) {
                    event.preventDefault();
                    ctrl.selectAction(ctrl.search_result.selected);
                }
                else if (event.which == 38 || event.which == 40) {
                    event.preventDefault();
                    var list = ctrl.search_result.data;
                    var index = ctrl.search_result.selected.indexList;
                    if ((event.which == 38 && index > 0) || (event.which == 40 && index < list.length - 1)) {
                        var direction = (-39) + event.which;
                        ctrl.search_result.selected = list[index + direction];
                        ctrl.search_result.selected["indexList"] = index + direction;
                    }
                }
                else if (event.which == 27) {
                    ctrl.error = false;
                    ctrl.selectToken = false;
                    ctrl.search_result.reset();
                }
            }
        };
        ctrl.delete = function (event, index, token) {
            ctrl.vgModel.splice(index, 1);
        };
        $scope.$watch('$ctrl.vgModel', function (newValue, oldValue, scope) {
            if (!!newValue) {
                if ($scope.tokenForm[ctrl.vgData.name].$pristine && newValue.length > 0) {
                    $scope.tokenForm[ctrl.vgData.name].$setDirty();
                }
                else if (!newValue.length) {
                    ctrl.init();
                }
                ctrl.filled = (newValue.length == 0 ? null : "filled");
            }
            else {
                ctrl.init();
                ctrl.vgModel = [];
            }
        }, true);
        $scope.$watch('$ctrl.searchText', function (newValue, oldValue, scope) {
            if (!!newValue) {
                if (newValue.trim().length > 0) {
                    ctrl.searching = true;
                    ctrl.search_result.reset();
                    ctrl.error = false;
                    ctrl.search(ctrl.vgSource, newValue);
                }
                else {
                    ctrl.searching = false;
                    ctrl.search_result.reset();
                    ctrl.selectToken = false;
                }
            }
            else {
                ctrl.searching = false;
                ctrl.search_result.reset();
                ctrl.selectToken = false;
            }
        });
    },
    bindings: {
        vgModel: '=',
        vgData: '<',
        vgSource: '<?',
        vgDisabled: '=?',
    }
});
// Composant notation par étoiles
MainApp.component('ratingForm', {
    templateUrl: '../../components/Rating-form.html',
    controller: function ($scope, $element, $attrs) {
        var ctrl = this;
        ctrl.count = 5; // Nombre d'étoiles
        ctrl.hoverStar = false; // Etat hover du block d'étoiles
        ctrl.filled = ""; // Placeholder qui rempli le champs input hidden
        ctrl.rating = 0; // Alternive variable pour garder la valeur d'avant lors d'un hover
        ctrl.hoverCount = 0; // Valeur de la note affichée
        ctrl.$onInit = function () {
            if (!ctrl.vgModel) {
                ctrl.vgModel = (ctrl.vgInit ? ctrl.vgInit : 0);
                ctrl.hoverCount = (ctrl.vgInit ? ctrl.vgInit : 0);
            }
            else {
                ctrl.hoverCount = ctrl.vgModel;
            }
        }; // Initialisation du composant
        ctrl.getNumber = function (num) { return new Array(num); };
        ctrl.hover = function (value) {
            if (ctrl.vgEditable) {
                ctrl.hoverStar = true;
                ctrl.hoverCount = value;
            }
        };
        ctrl.leave = function () {
            if (ctrl.vgEditable) {
                ctrl.hoverStar = false;
                ctrl.hoverCount = ($scope.ratingForm[ctrl.vgName].$dirty ? ctrl.rating : ctrl.vgInit);
            }
        };
        ctrl.set = function (value) {
            if (ctrl.vgEditable) {
                ctrl.hoverStar = false;
                ctrl.vgModel = value;
                ctrl.rating = value;
                ctrl.onSelectResult({ note: value });
            }
        };
        $scope.$watch('$ctrl.vgModel', function (newValue, oldValue, scope) {
            if (ctrl.vgEditable) {
                if (!!newValue) {
                    if ($scope.ratingForm[ctrl.vgName].$pristine) {
                        $scope.ratingForm[ctrl.vgName].$setDirty();
                    }
                    ctrl.filled = (newValue.length == 0 ? null : "filled");
                }
                else {
                    ctrl.hoverCount = (ctrl.vgInit ? ctrl.vgInit : 0);
                    ctrl.filled = "";
                }
            }
        }, true);
        $scope.$watch('$ctrl.vgInit', function (newValue, oldValue, scope) {
            if (!ctrl.vgEditable) {
                ctrl.hoverCount = (!!newValue ? newValue : 0);
            }
        }, true);
    },
    bindings: {
        vgModel: '=?',
        vgRequired: '<?',
        vgName: '<?',
        vgEditable: '<?',
        vgInit: '<?',
        vgCount: '<?',
        vgDisplaynote: '<?',
        onSelectResult: '&?'
    }
});
MainApp.component('dateBetweenForm', {
    templateUrl: '../../components/DateBetween-form.html',
    controller: function ($scope, $element, $attrs) {
        var ctrl = this;
        ctrl.$onInit = function () {
            var date = new Date(Date.now());
            date = new Date(date.setSeconds(0));
            ctrl.vgModelStart = new Date(date.setDate(date.getDate() + 1));
            ctrl.vgModelEnd = new Date(date.setDate(date.getDate() + 2));
        };
        $scope.$watch('$ctrl.vgModelStart', function (newValue, oldValue, scope) {
            if (!!newValue) {
                scope.dateForm1[ctrl.vgData.startName].$setDirty();
            }
            else {
                ctrl.$onInit();
            }
        }, true);
        $scope.$watch('$ctrl.vgModelStartTime', function (newValue, oldValue, scope) {
            if (!!newValue) {
                scope.dateForm1['startTime'].$setDirty();
            }
        }, true);
        $scope.$watch('$ctrl.vgModelEnd', function (newValue, oldValue, scope) {
            if (!!newValue) {
                scope.dateForm2[ctrl.vgData.endName].$setDirty();
            }
            else {
                ctrl.$onInit();
            }
        }, true);
        $scope.$watch('$ctrl.vgModelEndTime', function (newValue, oldValue, scope) {
            if (!!newValue) {
                scope.dateForm2['endTime'].$setDirty();
            }
        }, true);
    },
    bindings: {
        vgModelStart: '=',
        vgModelEnd: '=',
        vgModelStartTime: '=',
        vgModelEndTime: '=',
        vgData: '<?',
    }
});
// Form validation directives
//# sourceMappingURL=Components.js.map