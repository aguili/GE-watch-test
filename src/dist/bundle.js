/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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



var MainController = /** @class */ (function () {
    function MainController() {
        var _this = this;
        this.watches = [];
        this.addButton = document.createElement("button");
        this.addButton.className = "btn add-btn";
        this.addButton.textContent = "Add watch";
        this.addButton.addEventListener("click", function () { return _this.addWatch(); });
        document.body.appendChild(this.addButton);
        // Synchroniser toutes les montres chaque seconde
        setInterval(function () { return _this.syncWatches(); }, 1000);
    }
    MainController.prototype.addWatch = function () {
        var _this = this;
        var timezoneOffset;
        var offset;
        var isValidInput = false;
        while (!isValidInput) {
            timezoneOffset = prompt("Choisissez un fuseau horaire (ex: 2 pour GMT+2, -3 pour GMT-3) :");
            if (timezoneOffset === null) {
                return;
            }
            if (timezoneOffset.trim() === "") {
                offset = 0; // Convertir en heures
                console.log("Décalage horaire du système (GMT):", offset);
                break; // Sortir de la boucle
            }
            if (isNaN(Number(timezoneOffset))) {
                alert("Erreur : Vous devez entrer un nombre valide.");
                continue;
            }
            offset = parseInt(timezoneOffset, 10);
            if (offset < -12 || offset > 12) {
                alert("Erreur : Le fuseau horaire doit être compris entre -12 et +12.");
                continue;
            }
            isValidInput = true;
        }
        // Créer une nouvelle montre avec le décalage horaire valide
        var model = new _Models_watchModel__WEBPACK_IMPORTED_MODULE_0__.WatchModel(offset);
        var view = new _Views_watchView__WEBPACK_IMPORTED_MODULE_1__.WatchView();
        var controller = new _Controllers_watchController__WEBPACK_IMPORTED_MODULE_2__.WatchController(model, view, function () {
            return _this.deleteWatch(model, view);
        });
        this.watches.push({ model: model, view: view, controller: controller });
        document.body.appendChild(view.getContainer());
    };
    MainController.prototype.deleteWatch = function (model, view) {
        this.watches = this.watches.filter(function (watch) { return watch.model !== model; });
        view.getContainer().remove();
    };
    MainController.prototype.syncWatches = function () {
        var now = new Date();
        this.watches.forEach(function (watch) { return watch.model.syncTime(now); });
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
        this.loadSavedTime();
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
        this.updateInterval = setInterval(function () {
            if (_this.editedTime) {
                _this.editedTime.setSeconds(_this.editedTime.getSeconds() + 1);
            }
            else {
                _this.currentTime = _this.getCurrentTime();
            }
        }, 1000);
    };
    // Gérer l'heure réglée dans le localStorage
    WatchModel.prototype.saveTime = function () {
        if (this.editedTime) {
            localStorage.setItem("savedTime", JSON.stringify(this.editedTime));
        }
        else {
            localStorage.removeItem("savedTime");
        }
    };
    WatchModel.prototype.loadSavedTime = function () {
        var savedTime = localStorage.getItem("savedTime");
        if (savedTime) {
            this.editedTime = new Date(JSON.parse(savedTime));
        }
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
        this.saveTime();
    };
    WatchModel.prototype.setEditedTime = function (newTime) {
        this.editedTime = newTime;
        this.saveTime();
    };
    return WatchModel;
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
        // Convertir en format 12h si nécessaire
        if (is12HourFormat) {
            var period = hours >= 12 ? "PM" : "AM";
            // Convertir en format 12h
            if (hours === 0) {
                hours = 12; // Minuit (0 heures) devient 12 en format 12h
            }
            else if (hours > 12) {
                hours = hours % 12; // Heures après midi (13-23) deviennent 1-11
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