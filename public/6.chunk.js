webpackJsonp([6,18],{

/***/ 359:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__categories_routing__ = __webpack_require__(555);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__all_all_component__ = __webpack_require__(516);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__new_new_component__ = __webpack_require__(517);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Categories", function() { return Categories; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var Categories = /** @class */ (function () {
    function Categories() {
    }
    Categories = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_2__angular_common__["a" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */].forChild(__WEBPACK_IMPORTED_MODULE_4__categories_routing__["a" /* CategoriesRoutes */]),
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["b" /* ReactiveFormsModule */]
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__all_all_component__["a" /* AllComponent */],
                __WEBPACK_IMPORTED_MODULE_6__new_new_component__["a" /* NewComponent */],
            ]
        })
    ], Categories);
    return Categories;
}());

//# sourceMappingURL=categories.module.js.map

/***/ }),

/***/ 373:
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),

/***/ 516:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__database_service__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_service__ = __webpack_require__(51);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AllComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AllComponent = /** @class */ (function () {
    function AllComponent(database, authService) {
        var _this = this;
        this.database = database;
        this.authService = authService;
        this.commerces = [];
        this.rows = [];
        this.authService.getUser().subscribe(function (user) {
            _this.database.getMyCity(user.uid).then(function (city) {
                _this.adminCity = city;
            });
        });
    }
    AllComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.database.getCommercesByCity(this.adminCity).subscribe(function (shops) {
            _this.commerces = shops;
            _this.database.getCategories(_this.adminCity).subscribe(function (categories) {
                for (var i = 0; i < categories.length; i++) {
                    _this.getRow(shops, categories[i], i + 1).then(function (row) {
                        _this.rows.push(row);
                    });
                }
            });
        });
        this.tableData1 = {
            headerRow: ['#', 'Nombre', 'Identificador', '# locales', 'Eliminar'],
            dataRows: this.rows
        };
    };
    AllComponent.prototype.getRow = function (commerces, category, index) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            commerces.forEach(function (shop) {
                var categoryInfo = [];
                categoryInfo.push(index.toString());
                categoryInfo.push(category.display_name);
                categoryInfo.push(category.name);
                _this.getNumOfCommercesByCategory(commerces, category.name).then(function (num) {
                    categoryInfo.push(num);
                    categoryInfo.push(category.$key);
                    resolve(categoryInfo);
                });
            });
        });
    };
    AllComponent.prototype.getNumOfCommercesByCategory = function (commerces, categoryName) {
        return new Promise(function (resolve, reject) {
            var numOfShops = 0;
            var counted = 0;
            for (var i = 0; i < commerces.length; i++) {
                if (commerces[i].category == categoryName) {
                    numOfShops++;
                }
                if (i + 1 == commerces.length) {
                    resolve(numOfShops);
                }
            }
        });
    };
    AllComponent.prototype.deleteCategory = function (id) {
        this.database.deleteCategory('ambato', id);
    };
    AllComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Component */])({
            selector: 'app-all',
            template: __webpack_require__(579),
            styles: [__webpack_require__(570)]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__database_service__["a" /* DatabaseService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__database_service__["a" /* DatabaseService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__auth_service__["a" /* AuthService */]) === "function" && _b || Object])
    ], AllComponent);
    return AllComponent;
    var _a, _b;
}());

//# sourceMappingURL=all.component.js.map

/***/ }),

/***/ 517:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__database_service__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_service__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__storage_service__ = __webpack_require__(169);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var NewComponent = /** @class */ (function () {
    function NewComponent(database, storage, authService) {
        var _this = this;
        this.database = database;
        this.storage = storage;
        this.authService = authService;
        this.category = {
            name: '',
            display_name: '',
            color: '',
            img: ''
        };
        this.authService.getUser().subscribe(function (user) {
            _this.database.getMyCity(user.uid).then(function (city) {
                _this.adminCity = city;
            });
        });
    }
    NewComponent.prototype.ngOnInit = function () {
    };
    NewComponent.prototype.onSubmit = function () {
        var _this = this;
        this.image = document.getElementById('input-file').files[0];
        this.storage.uploadImage(this.image, 'cities/' + this.adminCity, this.image.name).then(function (image) {
            _this.database.createCategory(_this.adminCity, _this.category.name, _this.category.display_name, image.downloadURL, _this.category.color).then(function (ss) {
                _this.category = {
                    name: '',
                    display_name: '',
                    color: '',
                    img: ''
                };
            });
        });
    };
    NewComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Component */])({
            selector: 'app-new',
            template: __webpack_require__(580),
            styles: [__webpack_require__(571)]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__database_service__["a" /* DatabaseService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__database_service__["a" /* DatabaseService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__storage_service__["a" /* StorageService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__storage_service__["a" /* StorageService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__auth_service__["a" /* AuthService */]) === "function" && _c || Object])
    ], NewComponent);
    return NewComponent;
    var _a, _b, _c;
}());

//# sourceMappingURL=new.component.js.map

/***/ }),

/***/ 555:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__all_all_component__ = __webpack_require__(516);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__new_new_component__ = __webpack_require__(517);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CategoriesRoutes; });


var CategoriesRoutes = [
    {
        path: '',
        children: [{
                path: 'all',
                component: __WEBPACK_IMPORTED_MODULE_0__all_all_component__["a" /* AllComponent */]
            }]
    }, {
        path: '',
        children: [{
                path: 'new',
                component: __WEBPACK_IMPORTED_MODULE_1__new_new_component__["a" /* NewComponent */]
            }]
    },
];
//# sourceMappingURL=categories.routing.js.map

/***/ }),

/***/ 570:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(373)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 571:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(373)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 579:
/***/ (function(module, exports) {

module.exports = "<div class=\"main-content\">\n  <div class=\"container-fluid\">\n      <div class=\"row\">\n          <div class=\"col-md-12\">\n              <div class=\"card\">\n                  <div class=\"card-header card-header-icon\" data-background-color=\"rose\">\n                      <i class=\"material-icons\">assignment</i>\n                  </div>\n                  <div class=\"card-content\">\n                      <h4 class=\"card-title\">Categorias</h4>\n                      <div class=\"table-responsive\">\n                          <table class=\"table\">\n                                  <thead>\n                                      <tr>\n                                        <th class=\"text-center\">{{ tableData1.headerRow[0] }}</th>\n                                        <th>{{ tableData1.headerRow[1] }}</th>\n                                        <th>{{ tableData1.headerRow[2] }}</th>\n                                        <th>{{ tableData1.headerRow[3] }}</th>\n                                        <th class=\"text-right\">{{ tableData1.headerRow[4] }}</th>\n                                      </tr>\n                                  </thead>\n                                <tbody>\n                                    <tr *ngFor=\"let row of tableData1.dataRows\">\n                                        <td class=\"text-center\">{{row[0]}}</td>\n                                        <td>{{row[1]}}</td>\n                                        <td>{{row[2]}}</td>\n                                        <td>{{row[3]}}</td>\n                                        <td class=\"td-actions text-right\">\n                                            <button (click)=\"deleteCategory(row[4])\" type=\"button\" rel=\"tooltip\" class=\"btn btn-danger btn-round\">\n                                                <i class=\"material-icons\">close</i>\n                                            </button>\n                                        </td>\n                                    </tr>\n                                </tbody>\n                          </table>\n                      </div>\n                  </div>\n              </div>\n          </div>\n          \n      </div>\n  </div>\n</div>\n"

/***/ }),

/***/ 580:
/***/ (function(module, exports) {

module.exports = "<div class=\"main-content\">\n    <div class=\"container-fluid\">\n        <div class=\"row\">\n            <div class=\"col-md-2\"></div>\n            <div class=\"col-md-8\">\n                <div class=\"card\">\n                    <form #f=\"ngForm\" novalidate (ngSubmit)=\"onSubmit()\">\n                            <div class=\"card-header card-header-icon\" data-background-color=\"rose\">\n                                    <i class=\"material-icons\">mail_outline</i>\n                                </div>\n                                <h4 class=\"card-title\">Categoria</h4>\n                        \n                           \n                            <div class=\"card-content\">\n                                \n                                    <div class=\"col-md-6\">\n                                <div class=\"form-group label-floating\">\n                                    <label class=\"control-label\" for=\"\">Identificador(ingles):\n                                        <span class=\"star\">*</span>\n                                    </label>\n                                    <input type=\"text\" class=\"form-control\" name=\"name\" [(ngModel)]=\"category.name\"\n                                    required>\n                                </div>\n                                <div class=\"form-group label-floating\">\n                                    <label class=\"control-label\" for=\"\">Nombre a mostrar:\n                                        <span class=\"star\">*</span>\n                                    </label>\n                                    <input type=\"text\" class=\"form-control\" name=\"display_name\" [(ngModel)]=\"category.display_name\"\n                                    required  >\n                                </div>\n                                <div class=\"form-group label-floating\">\n                                    <label class=\"control-label\" for=\"\">Color (RGBA):\n                                        <span class=\"star\">*</span>\n                                    </label>\n                                    <input type=\"color\" class=\"form-control\" name=\"color\" [(ngModel)]=\"category.color\"\n                                    required >\n                                </div>\n                            </div>\n                            <div class=\"col-md-6 centerC\">\n                            <div class=\"fileinput fileinput-new text-center\" data-provides=\"fileinput\">\n                                <div class=\"fileinput-new thumbnail img-circle\">\n                                    <img src=\"../../assets/img/placeholder.jpg\" alt=\"...\">\n                                </div>\n                                <div class=\"fileinput-preview fileinput-exists thumbnail img-circle\"></div>\n                                <div>\n                                    <span class=\"btn btn-round btn-rose btn-file\">\n                                        <span class=\"fileinput-new\">Agregar Foto</span>\n                                        <span class=\"fileinput-exists\">Cambiar</span>\n                                        <input type=\"file\" id=\"input-file\" name=\"...\" /></span>\n                                    <br />\n                                    <a href=\"#pablo\" class=\"btn btn-danger btn-round fileinput-exists\" data-dismiss=\"fileinput\"><i class=\"fa fa-times\"></i> Quitar</a>\n                                </div>\n                            </div>\n                            <div class=\"category form-category\">\n                                    <span class=\"star\">*</span> Campos Obligatorios</div>\n                                <div class=\"form-footer text-right\">\n                        </div>\n                            \n           \n                                <div class=\"form-group\">\n\n                                    <button type=\"submit\" class=\"btn btn-rose btn-fill btn-wd\" [disabled]=\"!f.valid\">Crear</button>\n                                </div>\n                            </div>\n                        </div>\n                    </form>\n                </div>\n\n            </div>\n          \n        </div>\n    </div>\n</div>\n"

/***/ })

});
//# sourceMappingURL=6.chunk.js.map