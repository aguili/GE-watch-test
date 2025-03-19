/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Controllers/AnalogWatchController.ts":
/*!**************************************************!*\
  !*** ./src/Controllers/AnalogWatchController.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AnalogWatchController: () => (/* binding */ AnalogWatchController)
/* harmony export */ });
var AnalogWatchController = /** @class */ (function () {
    function AnalogWatchController(model, view, onDelete) {
        var _this = this;
        this.model = model;
        this.view = view;
        this.onDelete = onDelete;
        var deleteButton = document.createElement("button");
        deleteButton.textContent = "";
        deleteButton.className = "btn delete-btn";
        deleteButton.addEventListener("click", function () {
            return _this.onDelete(_this.model, _this.view);
        });
        this.view.getContainer().appendChild(deleteButton);
    }
    AnalogWatchController.prototype.update = function (time) {
        var syncedTime = this.model.syncTime(time);
        this.view.updateDisplay(syncedTime);
    };
    return AnalogWatchController;
}());



/***/ }),

/***/ "./src/Controllers/mainWatchController.ts":
/*!************************************************!*\
  !*** ./src/Controllers/mainWatchController.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MainController: () => (/* binding */ MainController)
/* harmony export */ });
/* harmony import */ var _Models_watchModel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Models/watchModel */ "./src/Models/watchModel.ts");
/* harmony import */ var _Views_watchView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Views/watchView */ "./src/Views/watchView.ts");
/* harmony import */ var _Controllers_watchController__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Controllers/watchController */ "./src/Controllers/watchController.ts");
/* harmony import */ var _Models_AnalogWatchModel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Models/AnalogWatchModel */ "./src/Models/AnalogWatchModel.ts");
/* harmony import */ var _Views_AnalogWatchView__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Views/AnalogWatchView */ "./src/Views/AnalogWatchView.ts");
/* harmony import */ var _Controllers_AnalogWatchController__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Controllers/AnalogWatchController */ "./src/Controllers/AnalogWatchController.ts");






var MainController = /** @class */ (function () {
    function MainController() {
        var _this = this;
        this.watches = [];
        this.addDigitalButton = document.createElement("button");
        this.addDigitalButton.className = "btn add-btn-dg";
        this.addDigitalButton.textContent = "Add Digital watch";
        this.addDigitalButton.addEventListener("click", function () {
            return _this.addDigitalWatch();
        });
        document.body.appendChild(this.addDigitalButton);
        this.addAnalogButton = document.createElement("button");
        this.addAnalogButton.className = "btn add-btn-an";
        this.addAnalogButton.textContent = "Add Analog watch";
        this.addAnalogButton.addEventListener("click", function () { return _this.addAnalogWatch(); });
        document.body.appendChild(this.addAnalogButton);
        setInterval(function () { return _this.syncWatches(); }, 1000);
    }
    MainController.prototype.addOffsetPrompt = function () {
        var systemTimezoneOffset = new Date().getTimezoneOffset() / -60;
        console.log("D\u00E9calage horaire d\u00E9tect\u00E9 : UTC".concat(systemTimezoneOffset >= 0 ? "+" : "").concat(systemTimezoneOffset));
        var systemTimezoneMessage = "Le fuseau horaire actuel est : UTC".concat(systemTimezoneOffset >= 0 ? "+" : "").concat(systemTimezoneOffset, ".");
        var timezoneOffset = prompt("".concat(systemTimezoneMessage, "\n\nEntrez un fuseau horaire (entre -12 et +14) :"));
        var offset;
        var isValidInput = false;
        while (!isValidInput) {
            if (timezoneOffset === null) {
                return { isValidInput: false, offset: 0 };
            }
            if (timezoneOffset.trim() === "") {
                offset = systemTimezoneOffset - 1;
                isValidInput = true;
                break;
            }
            if (isNaN(Number(timezoneOffset))) {
                alert("Erreur : Vous devez entrer un nombre valide.");
                timezoneOffset = prompt("".concat(systemTimezoneMessage, "\n\nEntrez un fuseau horaire (entre -12 et +14) :"));
                continue;
            }
            offset = parseInt(timezoneOffset, 10) - 1;
            if (offset < -12 || offset > 14) {
                alert("Erreur : Le fuseau horaire doit être compris entre -12 et +14.");
                timezoneOffset = prompt("".concat(systemTimezoneMessage, "\n\nEntrez un fuseau horaire (entre -12 et +14) :"));
                continue;
            }
            isValidInput = true;
        }
        return { isValidInput: isValidInput, offset: offset };
    };
    MainController.prototype.addDigitalWatch = function () {
        var _this = this;
        var validOffsetPrompt = this.addOffsetPrompt();
        if (validOffsetPrompt.isValidInput) {
            var model_1 = new _Models_watchModel__WEBPACK_IMPORTED_MODULE_0__.WatchModel(validOffsetPrompt.offset);
            var view_1 = new _Views_watchView__WEBPACK_IMPORTED_MODULE_1__.WatchView();
            var controller = new _Controllers_watchController__WEBPACK_IMPORTED_MODULE_2__.WatchController(model_1, view_1, function () {
                return _this.deleteWatch(model_1, view_1);
            });
            this.watches.push({ model: model_1, view: view_1, controller: controller });
            document.body.appendChild(view_1.getContainer());
        }
    };
    MainController.prototype.addAnalogWatch = function () {
        var _this = this;
        var validOffsetPrompt = this.addOffsetPrompt();
        if (validOffsetPrompt.isValidInput) {
            var model = new _Models_AnalogWatchModel__WEBPACK_IMPORTED_MODULE_3__.AnalogWatchModel(validOffsetPrompt.offset);
            var view = new _Views_AnalogWatchView__WEBPACK_IMPORTED_MODULE_4__.AnalogWatchView();
            var controller = new _Controllers_AnalogWatchController__WEBPACK_IMPORTED_MODULE_5__.AnalogWatchController(model, view, function (model, view) {
                return _this.deleteWatch(model, view);
            });
            this.watches.push({ model: model, view: view, controller: controller });
            document.body.appendChild(view.getContainer());
        }
    };
    MainController.prototype.deleteWatch = function (model, view) {
        this.watches = this.watches.filter(function (watch) { return watch.model !== model; });
        view.getContainer().remove();
    };
    MainController.prototype.syncWatches = function () {
        var now = new Date();
        this.watches.forEach(function (watch) {
            if (watch.controller instanceof _Controllers_AnalogWatchController__WEBPACK_IMPORTED_MODULE_5__.AnalogWatchController) {
                watch.controller.update(now);
            }
            else if (watch.controller instanceof _Controllers_watchController__WEBPACK_IMPORTED_MODULE_2__.WatchController) {
                // watch.controller.update(now);
            }
        });
    };
    return MainController;
}());



/***/ }),

/***/ "./src/Controllers/watchController.ts":
/*!********************************************!*\
  !*** ./src/Controllers/watchController.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WatchController: () => (/* binding */ WatchController)
/* harmony export */ });
/* harmony import */ var _utils_enableDrag__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/enableDrag */ "./src/utils/enableDrag.ts");

var WatchController = /** @class */ (function () {
    function WatchController(model, view, onDelete) {
        var _this = this;
        this.modeClicks = 0;
        this.model = model;
        this.view = view;
        this.view.bindDeleteButton(function () { return _this.handleDelete(); });
        this.onDelete = onDelete;
        this.setupEventHandlers();
        this.startUpdateLoop();
        (0,_utils_enableDrag__WEBPACK_IMPORTED_MODULE_0__.EnableDrag)(view.getContainer());
    }
    WatchController.prototype.setupEventHandlers = function () {
        var _this = this;
        this.view.bindModeButton(function () { return _this.handleMode(); });
        this.view.bindIncreaseButton(function () { return _this.handleIncrease(); });
        this.view.bindLightButton(function () { return _this.handleLight(); });
        this.view.bindFormatButton(function () { return _this.handleFormat(); });
        this.view.bindResetButton(function () { return _this.handleReset(); });
    };
    WatchController.prototype.startUpdateLoop = function () {
        var _this = this;
        setInterval(function () {
            _this.view.updateDisplay(_this.model.time, _this.model.mode, _this.model.light, _this.model.hourFormat);
        }, 1000);
    };
    WatchController.prototype.handleMode = function () {
        this.modeClicks = (this.modeClicks + 1) % 3;
        switch (this.modeClicks) {
            case 1:
                this.model.setMode("hours");
                break;
            case 2:
                this.model.setMode("minutes");
                break;
            default:
                this.model.setMode("none");
        }
    };
    WatchController.prototype.handleIncrease = function () {
        this.model.incrementTime();
        if (this.model.mode !== "none") {
            this.model.setEditedTime(this.model.time);
        }
    };
    WatchController.prototype.handleLight = function () {
        this.model.toggleLight();
    };
    WatchController.prototype.handleFormat = function () {
        this.model.toggleHourFormat();
    };
    WatchController.prototype.handleReset = function () {
        this.model.resetTime();
    };
    WatchController.prototype.handleDelete = function () {
        this.onDelete();
    };
    return WatchController;
}());



/***/ }),

/***/ "./src/Models/AnalogWatchModel.ts":
/*!****************************************!*\
  !*** ./src/Models/AnalogWatchModel.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AnalogWatchModel: () => (/* binding */ AnalogWatchModel)
/* harmony export */ });
/* harmony import */ var _watchModel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./watchModel */ "./src/Models/watchModel.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var AnalogWatchModel = /** @class */ (function (_super) {
    __extends(AnalogWatchModel, _super);
    function AnalogWatchModel(offset) {
        var _this = _super.call(this) || this;
        _this.offset = offset;
        return _this;
    }
    AnalogWatchModel.prototype.syncTime = function (now) {
        var offsetMs = this.offset * 60 * 60 * 1000;
        return new Date(now.getTime() + offsetMs);
    };
    return AnalogWatchModel;
}(_watchModel__WEBPACK_IMPORTED_MODULE_0__.WatchModel));



/***/ }),

/***/ "./src/Models/watchModel.ts":
/*!**********************************!*\
  !*** ./src/Models/watchModel.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WatchModel: () => (/* binding */ WatchModel)
/* harmony export */ });
var WatchModel = /** @class */ (function () {
    function WatchModel(timezoneOffset) {
        if (timezoneOffset === void 0) { timezoneOffset = 0; }
        this.editedTime = null;
        this.editMode = "none";
        this.isLightOn = false;
        this.is12HourFormat = false;
        this.timezoneOffset = timezoneOffset;
        this.currentTime = this.getCurrentTime();
        this.startClock();
    }
    Object.defineProperty(WatchModel.prototype, "time", {
        // Getters/Setters
        get: function () {
            return this.editedTime || this.currentTime;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WatchModel.prototype, "mode", {
        get: function () {
            return this.editMode;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WatchModel.prototype, "light", {
        get: function () {
            return this.isLightOn;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WatchModel.prototype, "hourFormat", {
        get: function () {
            return this.is12HourFormat;
        },
        enumerable: false,
        configurable: true
    });
    WatchModel.prototype.startClock = function () {
        var _this = this;
        setInterval(function () {
            if (_this.editedTime) {
                _this.editedTime.setSeconds(_this.editedTime.getSeconds() + 1);
            }
            else {
                _this.currentTime = _this.getCurrentTime();
            }
        }, 1000);
    };
    WatchModel.prototype.getCurrentTime = function () {
        var now = new Date();
        var offset = this.timezoneOffset * 3600 * 1000;
        return new Date(now.getTime() + offset);
    };
    WatchModel.prototype.syncTime = function (baseTime) {
        var offset = this.timezoneOffset * 3600 * 1000;
        this.currentTime = new Date(baseTime.getTime() + offset);
    };
    WatchModel.prototype.setMode = function (newMode) {
        this.editMode = newMode;
        if (newMode === "none") {
            if (!this.editedTime) {
                this.editedTime = new Date(this.currentTime);
            }
        }
    };
    WatchModel.prototype.incrementTime = function () {
        var timeToUpdate = this.editedTime || this.currentTime;
        var newTime = new Date(timeToUpdate);
        if (this.editMode === "hours") {
            newTime.setHours((newTime.getHours() + 1) % 24);
        }
        else if (this.editMode === "minutes") {
            newTime.setMinutes((newTime.getMinutes() + 1) % 60);
            if (newTime.getMinutes() === 0) {
                newTime.setHours((newTime.getHours() + 1) % 24);
            }
        }
        this.editedTime = newTime;
    };
    WatchModel.prototype.toggleLight = function () {
        this.isLightOn = !this.isLightOn;
    };
    WatchModel.prototype.toggleHourFormat = function () {
        this.is12HourFormat = !this.is12HourFormat;
    };
    WatchModel.prototype.resetTime = function () {
        this.currentTime = new Date();
        this.editedTime = null;
    };
    WatchModel.prototype.setEditedTime = function (newTime) {
        this.editedTime = newTime;
    };
    return WatchModel;
}());



/***/ }),

/***/ "./src/Views/AnalogWatchView.ts":
/*!**************************************!*\
  !*** ./src/Views/AnalogWatchView.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AnalogWatchView: () => (/* binding */ AnalogWatchView)
/* harmony export */ });
/* harmony import */ var _utils_Matrix3x3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/Matrix3x3 */ "./src/utils/Matrix3x3.ts");

var AnalogWatchView = /** @class */ (function () {
    function AnalogWatchView() {
        this.container = document.createElement("div");
        this.container.className = "analog-clock";
        this.hourHand = document.createElement("div");
        this.hourHand.className = "hand hour-hand";
        this.minuteHand = document.createElement("div");
        this.minuteHand.className = "hand minute-hand";
        this.secondHand = document.createElement("div");
        this.secondHand.className = "hand second-hand";
        this.container.append(this.hourHand, this.minuteHand, this.secondHand);
    }
    AnalogWatchView.prototype.updateDisplay = function (time) {
        var hours = time.getHours() % 12;
        var minutes = time.getMinutes();
        var seconds = time.getSeconds();
        // Calculer les angles des aiguilles
        var hourAngle = hours * 30 + minutes * 0.5; // 30 degrés par heure, 0.5 degré par minute
        var minuteAngle = minutes * 6 + seconds * 0.1; // 6 degrés par minute, 0.1 degré par seconde
        var secondAngle = seconds * 6; // 6 degrés par seconde
        // Appliquer les transformations matricielles
        var hourMatrix = _utils_Matrix3x3__WEBPACK_IMPORTED_MODULE_0__.Matrix3x3.rotationMatrix(hourAngle);
        var minuteMatrix = _utils_Matrix3x3__WEBPACK_IMPORTED_MODULE_0__.Matrix3x3.rotationMatrix(minuteAngle);
        var secondMatrix = _utils_Matrix3x3__WEBPACK_IMPORTED_MODULE_0__.Matrix3x3.rotationMatrix(secondAngle);
        // Appliquer les transformations aux aiguilles
        this.applyTransform(this.hourHand, hourMatrix);
        this.applyTransform(this.minuteHand, minuteMatrix);
        this.applyTransform(this.secondHand, secondMatrix);
    };
    // Appliquer une transformation matricielle à un élément
    AnalogWatchView.prototype.applyTransform = function (element, matrix) {
        var transform = "matrix(".concat(matrix.values[0][0], ", ").concat(matrix.values[1][0], ", ").concat(matrix.values[0][1], ", ").concat(matrix.values[1][1], ", ").concat(matrix.values[0][2], ", ").concat(matrix.values[1][2], ")");
        element.style.transform = transform;
    };
    AnalogWatchView.prototype.getContainer = function () {
        return this.container;
    };
    return AnalogWatchView;
}());



/***/ }),

/***/ "./src/Views/watchView.ts":
/*!********************************!*\
  !*** ./src/Views/watchView.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WatchView: () => (/* binding */ WatchView)
/* harmony export */ });
var WatchView = /** @class */ (function () {
    function WatchView() {
        document.getElementById("watch-root");
        this.createUI();
    }
    WatchView.prototype.createUI = function () {
        this.container = document.createElement("div");
        this.container.className = "watch-container";
        this.display = document.createElement("div");
        this.display.className = "display";
        this.modeBtn = document.createElement("button");
        this.modeBtn.className = "btn mode-btn";
        this.modeBtn.textContent = "MOD";
        this.increaseBtn = document.createElement("button");
        this.increaseBtn.className = "btn increase-btn";
        this.increaseBtn.textContent = "ADJ";
        this.lightBtn = document.createElement("button");
        this.lightBtn.className = "btn light-btn";
        this.lightBtn.textContent = "LT";
        this.formatBtn = document.createElement("button");
        this.formatBtn.className = "btn format-btn";
        this.formatBtn.textContent = "AP";
        this.resetBtn = document.createElement("button");
        this.resetBtn.className = "btn reset-btn";
        this.resetBtn.textContent = "RST";
        this.deleteBtn = document.createElement("button");
        this.deleteBtn.className = "btn delete-btn";
        this.deleteBtn.textContent = "";
        this.container.append(this.display, this.modeBtn, this.increaseBtn, this.lightBtn, this.formatBtn, this.resetBtn, this.deleteBtn);
        document.body.appendChild(this.container);
    };
    WatchView.prototype.getContainer = function () {
        return this.container;
    };
    WatchView.prototype.updateDisplay = function (time, editMode, isLightOn, is12HourFormat) {
        var hours = time.getHours();
        var minutes = this.formatNumber(time.getMinutes());
        var seconds = this.formatNumber(time.getSeconds());
        if (is12HourFormat) {
            var period = hours >= 12 ? "PM" : "AM";
            if (hours === 0) {
                hours = 12;
            }
            else if (hours > 12) {
                hours = hours % 12;
            }
            this.display.innerHTML = "\n            <span class=\"".concat(editMode === "hours" ? "blink" : "", "\">").concat(this.formatNumber(hours), "</span>:\n            <span class=\"").concat(editMode === "minutes" ? "blink" : "", "\">").concat(minutes, "</span>:\n            <span class=\"seconds\">").concat(seconds, "</span>\n            <span class=\"period\">").concat(period, "</span> <!-- Afficher AM ou PM dynamiquement -->\n        ");
        }
        else {
            this.display.innerHTML = "\n            <span class=\"".concat(editMode === "hours" ? "blink" : "", "\">").concat(this.formatNumber(hours), "</span>:\n            <span class=\"").concat(editMode === "minutes" ? "blink" : "", "\">").concat(minutes, "</span>:\n            <span>").concat(seconds, "</span>\n        ");
        }
        this.display.style.backgroundColor = isLightOn ? "#FBE106" : "#FFFFFF";
    };
    WatchView.prototype.formatNumber = function (num) {
        return num.toString().padStart(2, "0");
    };
    //évenements :
    WatchView.prototype.bindFormatButton = function (handler) {
        this.formatBtn.addEventListener("click", handler);
    };
    WatchView.prototype.bindModeButton = function (handler) {
        this.modeBtn.addEventListener("click", handler);
    };
    WatchView.prototype.bindIncreaseButton = function (handler) {
        this.increaseBtn.addEventListener("click", handler);
    };
    WatchView.prototype.bindLightButton = function (handler) {
        this.lightBtn.addEventListener("click", handler);
    };
    WatchView.prototype.bindResetButton = function (handler) {
        this.resetBtn.addEventListener("click", handler);
    };
    WatchView.prototype.bindDeleteButton = function (handler) {
        this.deleteBtn.addEventListener("click", handler);
    };
    return WatchView;
}());



/***/ }),

/***/ "./src/utils/Matrix3x3.ts":
/*!********************************!*\
  !*** ./src/utils/Matrix3x3.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Matrix3x3: () => (/* binding */ Matrix3x3)
/* harmony export */ });
var Matrix3x3 = /** @class */ (function () {
    function Matrix3x3(values) {
        this.values = values;
    }
    // Multiplier deux matrices
    Matrix3x3.prototype.multiply = function (other) {
        var result = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
        ];
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                for (var k = 0; k < 3; k++) {
                    result[i][j] += this.values[i][k] * other.values[k][j];
                }
            }
        }
        return new Matrix3x3(result);
    };
    // Appliquer une transformation à un point (x, y)
    Matrix3x3.prototype.transformPoint = function (x, y) {
        var resultX = this.values[0][0] * x + this.values[0][1] * y + this.values[0][2];
        var resultY = this.values[1][0] * x + this.values[1][1] * y + this.values[1][2];
        return { x: resultX, y: resultY };
    };
    // Créer une matrice de rotation
    Matrix3x3.rotationMatrix = function (angle) {
        var rad = (angle * Math.PI) / 180;
        var cos = Math.cos(rad);
        var sin = Math.sin(rad);
        return new Matrix3x3([
            [cos, -sin, 0],
            [sin, cos, 0],
            [0, 0, 1],
        ]);
    };
    // Créer une matrice de translation
    Matrix3x3.translationMatrix = function (dx, dy) {
        return new Matrix3x3([
            [1, 0, dx],
            [0, 1, dy],
            [0, 0, 1],
        ]);
    };
    // Créer une matrice de mise à l'échelle
    Matrix3x3.scalingMatrix = function (sx, sy) {
        return new Matrix3x3([
            [sx, 0, 0],
            [0, sy, 0],
            [0, 0, 1],
        ]);
    };
    Matrix3x3.prototype.getValues = function () {
        return this.values;
    };
    return Matrix3x3;
}());



/***/ }),

/***/ "./src/utils/enableDrag.ts":
/*!*********************************!*\
  !*** ./src/utils/enableDrag.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EnableDrag: () => (/* binding */ EnableDrag)
/* harmony export */ });
function EnableDrag(element) {
    var isDragging = false;
    var offsetX, offsetY;
    element.addEventListener("mousedown", function (e) {
        isDragging = true;
        offsetX = e.clientX - element.getBoundingClientRect().left;
        offsetY = e.clientY - element.getBoundingClientRect().top;
        element.style.cursor = "grabbing";
    });
    document.addEventListener("mousemove", function (e) {
        if (isDragging) {
            element.style.left = "".concat(e.clientX - offsetX, "px");
            element.style.top = "".concat(e.clientY - offsetY, "px");
        }
    });
    document.addEventListener("mouseup", function () {
        if (isDragging) {
            isDragging = false;
            element.style.cursor = "grab";
        }
    });
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Controllers_mainWatchController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Controllers/mainWatchController */ "./src/Controllers/mainWatchController.ts");

// Initialiser l'application
new _Controllers_mainWatchController__WEBPACK_IMPORTED_MODULE_0__.MainController();

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map