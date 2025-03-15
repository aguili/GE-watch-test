/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Controllers/watchController.ts":
/*!********************************************!*\
  !*** ./src/Controllers/watchController.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WatchController: () => (/* binding */ WatchController)
/* harmony export */ });
var WatchController = /** @class */ (function () {
    function WatchController(model, view, onDelete) {
        var _this = this;
        this.modeClicks = 0;
        this.model = model;
        this.view = view;
        this.onDelete = onDelete;
        this.view.bindDeleteButton(function () { return _this.handleDelete(); });
        this.setupEventHandlers();
        this.startUpdateLoop();
    }
    WatchController.prototype.setupEventHandlers = function () {
        var _this = this;
        this.view.bindModeButton(function () { return _this.handleMode(); });
        this.view.bindIncreaseButton(function () { return _this.handleIncrease(); });
        this.view.bindLightButton(function () { return _this.handleLight(); });
        this.view.bindFormatButton(function () { return _this.handleFormat(); }); // Nouvel événement
        this.view.bindResetButton(function () { return _this.handleReset(); }); // Nouvel événement
    };
    WatchController.prototype.startUpdateLoop = function () {
        var _this = this;
        setInterval(function () {
            _this.view.updateDisplay(_this.model.time, _this.model.mode, _this.model.light, _this.model.hourFormat // Passer le format d'heure à la vue
            );
        }, 1000);
    };
    // Mettre à jour la méthode handleReset pour supprimer la sauvegarde
    WatchController.prototype.handleReset = function () {
        this.model.resetTime();
    };
    // Nouvelle méthode pour gérer le changement de format
    WatchController.prototype.handleFormat = function () {
        this.model.toggleHourFormat();
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
            this.model.setEditedTime(this.model.time); // Sauvegarder l'heure réglée
        }
    };
    WatchController.prototype.handleLight = function () {
        this.model.toggleLight();
    };
    WatchController.prototype.handleDelete = function () {
        this.onDelete(); // Appeler la fonction de suppression
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
        this.is12HourFormat = false; // Nouvelle propriété
        this.timezoneOffset = timezoneOffset;
        this.currentTime = this.getCurrentTime();
        this.startClock();
        this.loadSavedTime(); // Charger l'heure sauvegardée au démarrage
    }
    WatchModel.prototype.startClock = function () {
        var _this = this;
        this.updateInterval = setInterval(function () {
            if (_this.editedTime) {
                // Si une heure a été réglée, on continue à partir de cette heure
                _this.editedTime.setSeconds(_this.editedTime.getSeconds() + 1);
            }
            else {
                // Sinon, on utilise l'heure actuelle
                _this.currentTime = _this.getCurrentTime();
            }
        }, 1000);
    };
    // Sauvegarder l'heure réglée dans le localStorage
    WatchModel.prototype.saveTime = function () {
        if (this.editedTime) {
            localStorage.setItem("savedTime", JSON.stringify(this.editedTime));
        }
        else {
            localStorage.removeItem("savedTime"); // Supprimer la sauvegarde si l'heure n'est pas réglée
        }
    };
    WatchModel.prototype.loadSavedTime = function () {
        var savedTime = localStorage.getItem("savedTime");
        if (savedTime) {
            this.editedTime = new Date(JSON.parse(savedTime));
        }
    };
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
    WatchModel.prototype.getCurrentTime = function () {
        var now = new Date();
        var offset = this.timezoneOffset * 3600 * 1000; // Convertir en millisecondes
        return new Date(now.getTime() + offset);
    };
    WatchModel.prototype.syncTime = function (baseTime) {
        var offset = this.timezoneOffset * 3600 * 1000;
        this.currentTime = new Date(baseTime.getTime() + offset);
    };
    WatchModel.prototype.setMode = function (newMode) {
        this.editMode = newMode;
        if (newMode === "none") {
            // Quand on quitte le mode édition, on conserve l'heure réglée
            if (!this.editedTime) {
                this.editedTime = new Date(this.currentTime);
            }
        }
    };
    WatchModel.prototype.incrementTime = function () {
        var newTime = new Date(this.currentTime);
        if (this.editMode === "hours") {
            newTime.setHours((newTime.getHours() + 1) % 24);
        }
        else if (this.editMode === "minutes") {
            newTime.setMinutes((newTime.getMinutes() + 1) % 60);
            if (newTime.getMinutes() === 0) {
                newTime.setHours((newTime.getHours() + 1) % 24);
            }
        }
        // Mettre à jour l'heure réglée
        this.editedTime = newTime;
    };
    WatchModel.prototype.toggleLight = function () {
        this.isLightOn = !this.isLightOn;
    };
    WatchModel.prototype.toggleHourFormat = function () {
        this.is12HourFormat = !this.is12HourFormat;
    };
    // Nouvelle méthode pour réinitialiser l'heure
    WatchModel.prototype.resetTime = function () {
        this.currentTime = new Date(); // Réinitialiser à l'heure actuelle
        this.editedTime = null; // Effacer l'heure réglée manuellement
        this.saveTime(); // Mettre à jour le localStorage
    };
    // Mettre à jour l'heure réglée et sauvegarder
    WatchModel.prototype.setEditedTime = function (newTime) {
        this.editedTime = newTime;
        this.saveTime(); // Sauvegarder la nouvelle heure
    };
    Object.defineProperty(WatchModel.prototype, "hourFormat", {
        // Getter pour le format d'heure
        get: function () {
            return this.is12HourFormat;
        },
        enumerable: false,
        configurable: true
    });
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
        this.root = document.getElementById("watch-root");
        this.createUI();
    }
    WatchView.prototype.createUI = function () {
        this.container = document.createElement("div"); // Créer le conteneur
        this.container.className = "watch-container";
        this.display = document.createElement("div");
        this.display.className = "display";
        this.modeBtn = document.createElement("button");
        this.modeBtn.className = "btn mode-btn";
        this.modeBtn.textContent = "MODE";
        this.increaseBtn = document.createElement("button");
        this.increaseBtn.className = "btn increase-btn";
        this.increaseBtn.textContent = "ADJ";
        this.lightBtn = document.createElement("button");
        this.lightBtn.className = "btn light-btn";
        this.lightBtn.textContent = "LIGHT";
        // Nouveau bouton pour basculer entre 12h et 24h
        this.formatBtn = document.createElement("button");
        this.formatBtn.className = "btn format-btn";
        this.formatBtn.textContent = "12/24";
        // Nouveau bouton Reset
        this.resetBtn = document.createElement("button");
        this.resetBtn.className = "btn reset-btn";
        this.resetBtn.textContent = "RESET";
        // Nouveau bouton Delete
        this.deleteBtn = document.createElement("button");
        this.deleteBtn.className = "btn delete-btn";
        this.deleteBtn.textContent = "Supprimer";
        this.container.append(this.display, this.modeBtn, this.increaseBtn, this.lightBtn, this.formatBtn, // Ajouter le bouton à l'interface
        this.resetBtn, // Ajouter le bouton Reset à l'interface
        this.deleteBtn // Ajouter le bouton Delete à l'interface
        );
        document.body.appendChild(this.container); // Ajouter le conteneur au DOM
    };
    // Nouvelle méthode pour retourner le conteneur
    WatchView.prototype.getContainer = function () {
        return this.container;
    };
    WatchView.prototype.updateDisplay = function (time, editMode, isLightOn, is12HourFormat) {
        var hours = time.getHours();
        var minutes = this.formatNumber(time.getMinutes());
        var seconds = this.formatNumber(time.getSeconds());
        // Convertir en format 12h si nécessaire
        if (is12HourFormat) {
            var period = hours >= 12 ? "PM" : "AM"; // Déterminer AM ou PM
            hours = hours % 12 || 12; // Convertir 0 en 12 pour le format 12h
            this.display.innerHTML = "\n            <span class=\"".concat(editMode === "hours" ? "blink" : "", "\">").concat(this.formatNumber(hours), "</span>:\n            <span class=\"").concat(editMode === "minutes" ? "blink" : "", "\">").concat(minutes, "</span>:\n            <span>").concat(seconds, "</span>\n            <span class=\"period\">").concat(period, "</span> <!-- Afficher AM ou PM dynamiquement -->\n        ");
        }
        else {
            this.display.innerHTML = "\n            <span class=\"".concat(editMode === "hours" ? "blink" : "", "\">").concat(this.formatNumber(hours), "</span>:\n            <span class=\"").concat(editMode === "minutes" ? "blink" : "", "\">").concat(minutes, "</span>:\n            <span>").concat(seconds, "</span>\n        ");
        }
        this.display.style.backgroundColor = isLightOn ? "#FBE106" : "#FFFFFF";
    };
    WatchView.prototype.formatNumber = function (num) {
        return num.toString().padStart(2, "0");
    };
    // Lier le nouveau bouton
    WatchView.prototype.bindFormatButton = function (handler) {
        this.formatBtn.addEventListener("click", handler);
    };
    // Événements
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
/* harmony import */ var _Models_watchModel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Models/watchModel */ "./src/Models/watchModel.ts");
/* harmony import */ var _Views_watchView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Views/watchView */ "./src/Views/watchView.ts");
/* harmony import */ var _Controllers_watchController__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Controllers/watchController */ "./src/Controllers/watchController.ts");



var MainController = /** @class */ (function () {
    function MainController() {
        var _this = this;
        this.watches = [];
        this.addButton = document.createElement("button");
        this.addButton.className = "btn add-btn";
        this.addButton.textContent = "Add";
        this.addButton.addEventListener("click", function () { return _this.addWatch(); });
        document.body.appendChild(this.addButton);
        // Synchroniser toutes les montres chaque seconde
        setInterval(function () { return _this.syncWatches(); }, 1000);
    }
    MainController.prototype.addWatch = function () {
        var _this = this;
        // Demander à l'utilisateur de choisir un fuseau horaire
        var timezoneOffset = prompt("Choisissez un fuseau horaire (ex: 2 pour GMT+2):");
        var offset = timezoneOffset ? parseInt(timezoneOffset, 10) : 0;
        // Créer une nouvelle montre
        var model = new _Models_watchModel__WEBPACK_IMPORTED_MODULE_0__.WatchModel(offset);
        var view = new _Views_watchView__WEBPACK_IMPORTED_MODULE_1__.WatchView();
        var controller = new _Controllers_watchController__WEBPACK_IMPORTED_MODULE_2__.WatchController(model, view, function () {
            return _this.deleteWatch(model, view);
        });
        // Ajouter la montre à la liste
        this.watches.push({ model: model, view: view, controller: controller });
        // Afficher la nouvelle montre
        document.body.appendChild(view.getContainer());
    };
    MainController.prototype.deleteWatch = function (model, view) {
        // Supprimer la montre de la liste
        this.watches = this.watches.filter(function (watch) { return watch.model !== model; });
        // Supprimer l'élément du DOM
        view.getContainer().remove();
    };
    MainController.prototype.syncWatches = function () {
        var now = new Date();
        this.watches.forEach(function (watch) { return watch.model.syncTime(now); });
    };
    return MainController;
}());
// Initialiser l'application
new MainController();

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map