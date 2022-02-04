#!/usr/bin/env node
(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var chunk = require("./" + "" + chunkId + "." + hotCurrentHash + ".hot-update.js");
/******/ 		hotAddUpdateChunk(chunk.id, chunk.modules);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest() {
/******/ 		try {
/******/ 			var update = require("./" + "" + hotCurrentHash + ".hot-update.json");
/******/ 		} catch (e) {
/******/ 			return Promise.resolve();
/******/ 		}
/******/ 		return Promise.resolve(update);
/******/ 	}
/******/
/******/ 	//eslint-disable-next-line no-unused-vars
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "862a3defec05725d1543";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_selfInvalidated: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 			invalidate: function() {
/******/ 				this._selfInvalidated = true;
/******/ 				switch (hotStatus) {
/******/ 					case "idle":
/******/ 						hotUpdate = {};
/******/ 						hotUpdate[moduleId] = modules[moduleId];
/******/ 						hotSetStatus("ready");
/******/ 						break;
/******/ 					case "ready":
/******/ 						hotApplyInvalidatedModule(moduleId);
/******/ 						break;
/******/ 					case "prepare":
/******/ 					case "check":
/******/ 					case "dispose":
/******/ 					case "apply":
/******/ 						(hotQueuedInvalidatedModules =
/******/ 							hotQueuedInvalidatedModules || []).push(moduleId);
/******/ 						break;
/******/ 					default:
/******/ 						// ignore requests in error states
/******/ 						break;
/******/ 				}
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash, hotQueuedInvalidatedModules;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus(hotApplyInvalidatedModules() ? "ready" : "idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "main";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 		return hotApplyInternal(options);
/******/ 	}
/******/
/******/ 	function hotApplyInternal(options) {
/******/ 		hotApplyInvalidatedModules();
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (
/******/ 					!module ||
/******/ 					(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 				)
/******/ 					continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire &&
/******/ 				// when called invalidate self-accepting is not possible
/******/ 				!installedModules[moduleId].hot._selfInvalidated
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					parents: installedModules[moduleId].parents.slice(),
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		if (hotUpdateNewHash !== undefined) {
/******/ 			hotCurrentHash = hotUpdateNewHash;
/******/ 			hotUpdateNewHash = undefined;
/******/ 		}
/******/ 		hotUpdate = undefined;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = item.parents;
/******/ 			hotCurrentChildModule = moduleId;
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			return hotApplyInternal(options).then(function(list) {
/******/ 				outdatedModules.forEach(function(moduleId) {
/******/ 					if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 				});
/******/ 				return list;
/******/ 			});
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModules() {
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			if (!hotUpdate) hotUpdate = {};
/******/ 			hotQueuedInvalidatedModules.forEach(hotApplyInvalidatedModule);
/******/ 			hotQueuedInvalidatedModules = undefined;
/******/ 			return true;
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModule(moduleId) {
/******/ 		if (!Object.prototype.hasOwnProperty.call(hotUpdate, moduleId))
/******/ 			hotUpdate[moduleId] = modules[moduleId];
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./src/index.ts")(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/cli.ts":
/*!********************!*\
  !*** ./src/cli.ts ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.lintCommand = exports.syncCommand = void 0;
const Index_1 = __webpack_require__(/*! ./core/handlers/SpectralLinter/Index */ "./src/core/handlers/SpectralLinter/Index.ts");
const Index_2 = __webpack_require__(/*! ./core/handlers/SwaggerHubSync/Index */ "./src/core/handlers/SwaggerHubSync/Index.ts");
const Logger_1 = __webpack_require__(/*! ./core/utils/Logger */ "./src/core/utils/Logger.ts");
exports.syncCommand = {
    describe: 'A new tool for syncing all Open API specification from SwaggerHub to local machine.',
    command: 'adv-sync',
    builder: yargs => yargs.
        usage("Usage: $0 $1 -w [<workspace path>] -a [<author name>]")
        .demandOption(['w', 'a']).
        options({
        workspace: {
            alias: 'w',
            description: 'Path to specifications files directory',
            type: 'string',
        },
        author: {
            alias: 'a',
            description: 'Author of APIs',
            type: 'string',
        },
        completeSync: {
            alias: 's',
            description: 'Complete sync all APIs',
            type: 'boolean'
        }
    }),
    handler: async (args) => {
        const options = args;
        await (0, Index_2.sync)(options);
        Logger_1.Logger.Info(`Sync completed.`);
    }
};
exports.lintCommand = {
    describe: 'A new tool for analyzing all OpenAPI spec files with Spectral.',
    command: 'adv-lint',
    builder: yargs => yargs.
        usage("Usage: $0 <cmd>  -w [<workspace path>]")
        .demandOption(['w'])
        .options({
        workspace: {
            alias: 'w',
            description: 'Path to specifications files directory',
            type: 'string',
        },
        specFilter: {
            alias: 'f',
            description: 'Published|Draft|All, default: Published',
            type: 'string'
        },
        ruleset: {
            alias: 'r',
            description: 'Path to a Spectral ruleset file',
            type: 'string',
        },
        output: {
            alias: 'o',
            description: 'Write the result of linting to a csv file',
            type: 'string',
        },
        rules: {
            alias: 's',
            description: 'Select a list of rules in ruleset file',
            type: 'string'
        }
    }),
    handler: async (args) => {
        const options = args;
        await (0, Index_1.lint)(options);
        Logger_1.Logger.Info(`Linting completed.`);
    }
};


/***/ }),

/***/ "./src/core/handlers/BaseHandler.ts":
/*!******************************************!*\
  !*** ./src/core/handlers/BaseHandler.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseHandler = void 0;
const Logger_1 = __webpack_require__(/*! ../utils/Logger */ "./src/core/utils/Logger.ts");
class BaseHandler {
    constructor(handler) {
        this.handler = handler;
        Logger_1.Logger.Info(`Handler ${handler} Initialize`);
    }
}
exports.BaseHandler = BaseHandler;


/***/ }),

/***/ "./src/core/handlers/SpectralLinter/Index.ts":
/*!***************************************************!*\
  !*** ./src/core/handlers/SpectralLinter/Index.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.lint = exports.SpectralLinter = exports.SpectralConfig = void 0;
const Export_1 = __webpack_require__(/*! ./Internal/Export */ "./src/core/handlers/SpectralLinter/Internal/Export.ts");
const SpecLoader_1 = __webpack_require__(/*! ./Internal/SpecLoader */ "./src/core/handlers/SpectralLinter/Internal/SpecLoader.ts");
const SpectralLinter_1 = __webpack_require__(/*! ./Internal/SpectralLinter */ "./src/core/handlers/SpectralLinter/Internal/SpectralLinter.ts");
var Types_1 = __webpack_require__(/*! ./Internal/Types */ "./src/core/handlers/SpectralLinter/Internal/Types.ts");
Object.defineProperty(exports, "SpectralConfig", { enumerable: true, get: function () { return Types_1.SpectralConfig; } });
var SpectralLinter_2 = __webpack_require__(/*! ./Internal/SpectralLinter */ "./src/core/handlers/SpectralLinter/Internal/SpectralLinter.ts");
Object.defineProperty(exports, "SpectralLinter", { enumerable: true, get: function () { return SpectralLinter_2.SpectralLinter; } });
const lint = async (options) => {
    const apisWithSpec = await (0, SpecLoader_1.loadSpecsFilesByQuery)(options.workspace, { isPublished: true, OAS: '3' });
    if (apisWithSpec.length === 0) {
        return;
    }
    const outputObserver = initObserver(options, ['csv', 'console']);
    const linter = new SpectralLinter_1.SpectralLinter(options);
    await linter.lint(apisWithSpec, (api, errors) => {
        outputObserver.notify(new Export_1.LinterOutput(api, errors));
    });
    outputObserver.flush();
};
exports.lint = lint;
const initObserver = (options, exportTypes) => {
    var _a;
    const outputObserver = new Export_1.LinterOutputObserver();
    if (exportTypes.includes('csv')) {
        outputObserver.attach(new Export_1.ExportToCsv(options.workspace, [(_a = options.rules) !== null && _a !== void 0 ? _a : 'all']));
    }
    if (exportTypes.includes('console')) {
        outputObserver.attach(new Export_1.ExportToConsole());
    }
    return outputObserver;
};


/***/ }),

/***/ "./src/core/handlers/SpectralLinter/Internal sync recursive":
/*!********************************************************!*\
  !*** ./src/core/handlers/SpectralLinter/Internal sync ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = "./src/core/handlers/SpectralLinter/Internal sync recursive";

/***/ }),

/***/ "./src/core/handlers/SpectralLinter/Internal/Export.ts":
/*!*************************************************************!*\
  !*** ./src/core/handlers/SpectralLinter/Internal/Export.ts ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportToConsole = exports.ExportToCsv = exports.LinterOutputObserver = exports.LinterOutput = void 0;
const fs = __webpack_require__(/*! fs */ "fs");
const path = __webpack_require__(/*! path */ "path");
const Table = __webpack_require__(/*! cli-table3 */ "cli-table3");
const Spectral_1 = __webpack_require__(/*! ./Spectral */ "./src/core/handlers/SpectralLinter/Internal/Spectral.ts");
const COLUMNS = ['API Name', 'Version', 'Rule', 'Severity', 'Path', 'Line No', 'Message', 'API URL'];
class LinterOutput {
    constructor(api, errors) {
        this.api = api;
        this.errors = errors;
    }
    convertToCsvLine() {
        return this.errors.map(error => {
            return `${this.api.name},` +
                `${this.api.version},` +
                `${error.code},` +
                `${this.getDiagnosticSeverity(error)},` +
                `${error.path.join('->')},` +
                `${this.getLineNos(error.range)},` +
                `"${error.message}",` +
                `${this.api.url}`;
        });
    }
    convertToTableRow() {
        return this.errors.map(error => {
            return [
                this.api.name,
                this.api.version,
                error.code,
                this.getDiagnosticSeverity(error),
                error.path.join('->'),
                this.getLineNos(error.range),
                error.message,
                this.api.url
            ];
        });
    }
    getDiagnosticSeverity(error) {
        switch (error.severity) {
            case Spectral_1.DiagnosticSeverity.Error:
                return 'error';
            case Spectral_1.DiagnosticSeverity.Warning:
                return 'warning';
            case Spectral_1.DiagnosticSeverity.Information:
                return 'information';
            case Spectral_1.DiagnosticSeverity.Hint:
                return 'hint';
        }
        return 'unknown';
    }
    getLineNos(range) {
        let line = '';
        if (range.start) {
            line += range.start.line;
        }
        if (range.end) {
            if (range.start.line !== range.end.line) {
                line += `-${range.start.line}`;
            }
        }
        return line;
    }
}
exports.LinterOutput = LinterOutput;
class LinterOutputObserver {
    constructor() {
        this._observers = [];
    }
    attach(linterOutputObserver) {
        this._observers.push(linterOutputObserver);
    }
    detach(linterOutputObserver) {
        this._observers.forEach((observer, i) => {
            if (observer === linterOutputObserver) {
                this._observers.splice(i, 1);
            }
        });
    }
    notify(event) {
        this._observers.forEach((observer, i) => {
            observer.update(event);
        });
    }
    flush() {
        this._observers.forEach((observer, i) => {
            observer.flush();
        });
    }
}
exports.LinterOutputObserver = LinterOutputObserver;
class ExportToCsv {
    constructor(workspace, ruleNames) {
        if (!fs.existsSync(workspace)) {
            throw new Error('The error output path is not found.');
        }
        this.outputPath = path.join(workspace, `rules_${ruleNames.join('_')}.csv`);
        this.lines = [COLUMNS.join(',')];
    }
    flush() {
        fs.writeFileSync(this.outputPath, this.lines.join('\n'));
    }
    update(event) {
        this.lines.push(...event.convertToCsvLine());
    }
}
exports.ExportToCsv = ExportToCsv;
class ExportToConsole {
    constructor() {
        this.table = new Table({
            head: ['#', ...COLUMNS.slice(0, 5)],
            colWidths: [4, 20, 10, 35, 10, 30]
        });
        this.counter = 0;
    }
    flush() {
        console.log('\x1b[34mSpectral linting summary report:\x1b[34m');
        console.log(this.table.toString());
    }
    update(event) {
        event.convertToTableRow().forEach(e => {
            this.table.push([this.counter, ...e.slice(0, 5)]);
            this.counter++;
        });
    }
}
exports.ExportToConsole = ExportToConsole;


/***/ }),

/***/ "./src/core/handlers/SpectralLinter/Internal/SpecLoader.ts":
/*!*****************************************************************!*\
  !*** ./src/core/handlers/SpectralLinter/Internal/SpecLoader.ts ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.loadSpecsFilesByQuery = void 0;
const Logger_1 = __webpack_require__(/*! ../../../utils/Logger */ "./src/core/utils/Logger.ts");
const Index_1 = __webpack_require__(/*! ../../SwaggerHubSync/Index */ "./src/core/handlers/SwaggerHubSync/Index.ts");
const loadSpecsFilesByQuery = async (workspace, query) => {
    const apis = await (0, Index_1.loadLastApiSpec)(workspace);
    if (!apis) {
        return [];
    }
    let versions = apis.filter(x => x.versions).map(x => x.versions).reduce((pre, curr) => {
        return [...pre, ...curr];
    });
    if (query.isPublished) {
        versions = versions.filter(x => x.published === true);
    }
    return Promise.all(versions.map(async (api) => {
        try {
            const content = (0, Index_1.loadOpenAPIsSpecificationFromDisk)(workspace, api);
            return {
                spec: content.toString(),
                api: api
            };
        }
        catch (error) {
            Logger_1.Logger.Error(error.message);
        }
        return { api: api };
    }));
};
exports.loadSpecsFilesByQuery = loadSpecsFilesByQuery;


/***/ }),

/***/ "./src/core/handlers/SpectralLinter/Internal/Spectral.ts":
/*!***************************************************************!*\
  !*** ./src/core/handlers/SpectralLinter/Internal/Spectral.ts ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.DiagnosticSeverity = exports.spectralTester = void 0;
const spectral_1 = __webpack_require__(/*! @stoplight/spectral */ "@stoplight/spectral");
const fs = __webpack_require__(/*! fs */ "fs");
const path = __webpack_require__(/*! path */ "path");
async function spectralTester(rulePath, selectedRuleName) {
    const ruleset = loadRuleset(rulePath);
    if (!(ruleset === null || ruleset === void 0 ? void 0 : ruleset.rules)) {
        throw new Error(`spectral rule at path ${rulePath} not found`);
    }
    const customFunctions = await loadCustomFunctions(path.dirname(rulePath), ruleset.functions);
    const spectral = new spectral_1.Spectral();
    const selectedRule = {};
    for (const rule in ruleset.rules) {
        if (selectedRuleName) {
            if (rule === selectedRuleName) {
                selectedRule[rule] = ruleset.rules[rule];
            }
        }
        else {
            selectedRule[rule] = ruleset.rules[rule];
        }
    }
    spectral.setRuleset({
        rules: selectedRule,
        functions: {},
        exceptions: {}
    });
    spectral.setFunctions(customFunctions);
    return spectral;
}
exports.spectralTester = spectralTester;
const loadRuleset = (source) => {
    var _a, _b;
    const ruleset = spectral_1.Parsers.parseYaml(fs.readFileSync(source, 'utf-8'));
    const rules = (_a = ruleset === null || ruleset === void 0 ? void 0 : ruleset.data) === null || _a === void 0 ? void 0 : _a.rules;
    const functions = (_b = ruleset === null || ruleset === void 0 ? void 0 : ruleset.data) === null || _b === void 0 ? void 0 : _b.functions;
    return { rules, functions };
};
const loadCustomFunctions = async (rootPath, functions) => {
    const importedFunction = {};
    for (const f of functions) {
        importedFunction[f] = await Promise.resolve().then(() => __webpack_require__("./src/core/handlers/SpectralLinter/Internal sync recursive")(path.join(rootPath, 'functions', `${f}.js`)));
    }
    return importedFunction;
};
var DiagnosticSeverity;
(function (DiagnosticSeverity) {
    DiagnosticSeverity[DiagnosticSeverity["Error"] = 0] = "Error";
    DiagnosticSeverity[DiagnosticSeverity["Warning"] = 1] = "Warning";
    DiagnosticSeverity[DiagnosticSeverity["Information"] = 2] = "Information";
    DiagnosticSeverity[DiagnosticSeverity["Hint"] = 3] = "Hint";
})(DiagnosticSeverity = exports.DiagnosticSeverity || (exports.DiagnosticSeverity = {}));


/***/ }),

/***/ "./src/core/handlers/SpectralLinter/Internal/SpectralLinter.ts":
/*!*********************************************************************!*\
  !*** ./src/core/handlers/SpectralLinter/Internal/SpectralLinter.ts ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SpectralLinter = void 0;
const Spectral_1 = __webpack_require__(/*! ./Spectral */ "./src/core/handlers/SpectralLinter/Internal/Spectral.ts");
const Logger_1 = __webpack_require__(/*! ../../../utils/Logger */ "./src/core/utils/Logger.ts");
const BaseHandler_1 = __webpack_require__(/*! ../../BaseHandler */ "./src/core/handlers/BaseHandler.ts");
const Export_1 = __webpack_require__(/*! ./Export */ "./src/core/handlers/SpectralLinter/Internal/Export.ts");
class SpectralLinter extends BaseHandler_1.BaseHandler {
    constructor(config) {
        super('SpectralLinter');
        this.config = config;
    }
    async lint(apis, findErrorCallback) {
        const linter = await (0, Spectral_1.spectralTester)(this.config.ruleset, this.config.rules);
        for (const api of apis.filter((x) => x.spec !== undefined)) {
            try {
                const errors = (await linter.run(api.spec));
                if (errors && errors.length > 0) {
                    findErrorCallback(api.api, errors);
                }
            }
            catch (error) {
                Logger_1.Logger.Error(error.message);
            }
        }
    }
    initObserver(exportTypes) {
        var _a;
        const outputObserver = new Export_1.LinterOutputObserver();
        if (exportTypes.includes('csv')) {
            outputObserver.attach(new Export_1.ExportToCsv(this.config.workspace, [(_a = this.config.rules) !== null && _a !== void 0 ? _a : 'all']));
        }
        if (exportTypes.includes('console')) {
            outputObserver.attach(new Export_1.ExportToConsole());
        }
        return outputObserver;
    }
}
exports.SpectralLinter = SpectralLinter;


/***/ }),

/***/ "./src/core/handlers/SpectralLinter/Internal/Types.ts":
/*!************************************************************!*\
  !*** ./src/core/handlers/SpectralLinter/Internal/Types.ts ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),

/***/ "./src/core/handlers/SwaggerHubSync/Index.ts":
/*!***************************************************!*\
  !*** ./src/core/handlers/SwaggerHubSync/Index.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.sync = exports.loadOpenAPIsSpecificationFromDisk = exports.loadLastApiSpec = exports.SwaggerHubConfig = exports.ApiSpec = void 0;
const SpecStorage_1 = __webpack_require__(/*! ./Internal/SpecStorage */ "./src/core/handlers/SwaggerHubSync/Internal/SpecStorage.ts");
const SwaggerHubSync_1 = __webpack_require__(/*! ./Internal/SwaggerHubSync */ "./src/core/handlers/SwaggerHubSync/Internal/SwaggerHubSync.ts");
var Types_1 = __webpack_require__(/*! ./Internal/Types */ "./src/core/handlers/SwaggerHubSync/Internal/Types.ts");
Object.defineProperty(exports, "ApiSpec", { enumerable: true, get: function () { return Types_1.ApiSpec; } });
Object.defineProperty(exports, "SwaggerHubConfig", { enumerable: true, get: function () { return Types_1.SwaggerHubConfig; } });
var SpecStorage_2 = __webpack_require__(/*! ./Internal/SpecStorage */ "./src/core/handlers/SwaggerHubSync/Internal/SpecStorage.ts");
Object.defineProperty(exports, "loadLastApiSpec", { enumerable: true, get: function () { return SpecStorage_2.loadLastApiSpec; } });
Object.defineProperty(exports, "loadOpenAPIsSpecificationFromDisk", { enumerable: true, get: function () { return SpecStorage_2.loadOpenAPIsSpecificationFromDisk; } });
const sync = async (options) => {
    const swagger = new SwaggerHubSync_1.SwaggerHubSync(options);
    const oldApis = await (0, SpecStorage_1.loadLastApiSpec)(options.workspace);
    const [modifiedApis, modifiedDate] = await swagger.findModifiedApis(oldApis);
    if (modifiedApis.length === 0) {
        return;
    }
    const modifiedVersions = swagger.filterOnlyNeededVersions(modifiedApis, modifiedDate);
    const modifiedOpenApiSpecifications = await swagger.downloadApisSpecification(modifiedVersions);
    (0, SpecStorage_1.saveOpenAPIsSpecificationToDisk)(options.workspace, modifiedOpenApiSpecifications);
    (0, SpecStorage_1.saveApiSpecs)(options.workspace, swagger.overwriteModifiedApis(oldApis, modifiedApis));
};
exports.sync = sync;


/***/ }),

/***/ "./src/core/handlers/SwaggerHubSync/Internal/HttpClient.ts":
/*!*****************************************************************!*\
  !*** ./src/core/handlers/SwaggerHubSync/Internal/HttpClient.ts ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SwaggerHubClient = void 0;
const axios_1 = __webpack_require__(/*! axios */ "axios");
class HttpClient {
    constructor(baseURL) {
        this._initializeResponseInterceptor = () => {
            this.instance.interceptors.response.use(this._handleResponse, this._handleError);
        };
        this._handleResponse = ({ data }) => data;
        this._handleError = (error) => Promise.reject(error);
        this.instance = axios_1.default.create({
            baseURL,
            timeout: 15000,
        });
        this._initializeResponseInterceptor();
    }
}
class SwaggerHubClient extends HttpClient {
    constructor(apiKey, author) {
        super(`https://api.swaggerhub.com/apis/${author}`);
        this.apiKey = apiKey;
        this._initializeRequestInterceptor = () => {
            this.instance.interceptors.request.use(this._handleRequest, this._handleError);
        };
        this._handleRequest = (config) => {
            if (config === null || config === void 0 ? void 0 : config.headers)
                config.headers['Authorization'] = this.apiKey;
            return config;
        };
        this.getAll = async () => {
            const apis = [];
            let page = 0;
            const defaultParams = {
                limit: 100,
                sort: 'UPDATED',
                order: 'DESC'
            };
            let response = await this.instance.get('', {
                params: {
                    ...defaultParams,
                    page: page,
                }
            });
            while ((response === null || response === void 0 ? void 0 : response.apis) && (response === null || response === void 0 ? void 0 : response.apis.length) > 0) {
                apis.push(...response.apis);
                page++;
                response = await this.instance.get('', {
                    params: {
                        ...defaultParams,
                        page: page,
                    }
                });
            }
            return apis.map(x => ApiMapper(x));
        };
        this._initializeRequestInterceptor();
    }
    async getVersions(apiName) {
        const response = await this.instance.get(`/${apiName}`);
        if (response.apis) {
            const apis = response.apis;
            return apis.map(x => ApiMapper(x));
        }
        return [];
    }
    async getDefinition(url, defType) {
        const response = await this.instance.get(`${url}/swagger.${defType}`);
        return response;
    }
}
exports.SwaggerHubClient = SwaggerHubClient;
const ApiMapper = (input) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    let entity = {
        name: input.name,
        description: input.description,
        url: (_b = (_a = input.properties.find(x => x.type === 'Swagger')) === null || _a === void 0 ? void 0 : _a.url) !== null && _b !== void 0 ? _b : '',
        published: ((_c = input.properties.find(x => x.type === 'X-Published')) === null || _c === void 0 ? void 0 : _c.value) === 'true',
        modified: new Date((_e = (_d = input.properties.find(x => x.type === 'X-Modified')) === null || _d === void 0 ? void 0 : _d.value) !== null && _e !== void 0 ? _e : ''),
        oasVersion: (_g = (_f = input.properties.find(x => x.type === 'X-OASVersion')) === null || _f === void 0 ? void 0 : _f.value) !== null && _g !== void 0 ? _g : '',
        version: (_j = (_h = input.properties.find(x => x.type === 'X-Version')) === null || _h === void 0 ? void 0 : _h.value) !== null && _j !== void 0 ? _j : ''
    };
    if (entity.url.includes('/')) {
        entity.apiName = entity.url.split('/').reverse()[1];
    }
    return entity;
};


/***/ }),

/***/ "./src/core/handlers/SwaggerHubSync/Internal/SpecStorage.ts":
/*!******************************************************************!*\
  !*** ./src/core/handlers/SwaggerHubSync/Internal/SpecStorage.ts ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.loadOpenAPIsSpecificationFromDisk = exports.saveOpenAPIsSpecificationToDisk = exports.loadLastApiSpec = exports.saveApiSpecs = void 0;
const fs = __webpack_require__(/*! fs */ "fs");
const path = __webpack_require__(/*! path */ "path");
const FileNamePrefix = 'APIs_';
const saveApiSpecs = (workspace, specs) => {
    const dbDir = path.join(workspace, '_db');
    if (!fs.existsSync(dbDir)) {
        fs.mkdirSync(dbDir);
    }
    specs.sort((a, b) => {
        return a.modified.getTime() - b.modified.getTime();
    }).slice().reverse();
    fs.writeFileSync(path.join(dbDir, `${FileNamePrefix}${Date.now()}.json`), JSON.stringify(specs));
    return true;
};
exports.saveApiSpecs = saveApiSpecs;
const loadLastApiSpec = async (workspace) => {
    const dbDir = path.join(workspace, '_db');
    if (!fs.existsSync(dbDir)) {
        return [];
    }
    const files = fs.readdirSync(dbDir);
    const specs = files.map((e) => {
        const info = fs.lstatSync(path.join(dbDir, e));
        if (info.isFile() && e.startsWith(FileNamePrefix)) {
            return {
                'date': parseInt(e.replace(FileNamePrefix, '')),
                'path': path.join(dbDir, e)
            };
        }
        return {
            'date': -1,
            'path': ''
        };
    }).filter(e => e.date !== -1);
    if (specs.length > 0) {
        specs.sort((a, b) => a.date > b.date ? 1 : -1).reverse();
        const lastSpecsKey = specs[0];
        const specsStr = fs.readFileSync(lastSpecsKey.path);
        const apis = JSON.parse(specsStr.toString());
        apis.forEach((e) => {
            e.modified = new Date(e.modified);
        });
        return apis;
    }
    return [];
};
exports.loadLastApiSpec = loadLastApiSpec;
const saveOpenAPIsSpecificationToDisk = (workspace, specs) => {
    checkSpecDirectoryExist(workspace);
    for (const spec of specs) {
        fs.writeFileSync(path.join(workspace, 'specs', specFileName(spec.api, 'json')), JSON.stringify(spec.jsonSpec, null, 2));
    }
    return true;
};
exports.saveOpenAPIsSpecificationToDisk = saveOpenAPIsSpecificationToDisk;
const loadOpenAPIsSpecificationFromDisk = (workspace, api) => {
    const content = fs.readFileSync(path.join(workspace, 'specs', specFileName(api, 'json')));
    return content.toString();
};
exports.loadOpenAPIsSpecificationFromDisk = loadOpenAPIsSpecificationFromDisk;
const specFileName = (api, type) => {
    return `${api.apiName}-${api.version}${api.published ? '-published' : ''}.${type}`;
};
const checkSpecDirectoryExist = (workspace) => {
    const root = path.join(workspace, 'specs');
    if (!fs.existsSync(root)) {
        fs.mkdirSync(root);
    }
};


/***/ }),

/***/ "./src/core/handlers/SwaggerHubSync/Internal/SwaggerHubSync.ts":
/*!*********************************************************************!*\
  !*** ./src/core/handlers/SwaggerHubSync/Internal/SwaggerHubSync.ts ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SwaggerHubSync = void 0;
const HttpClient_1 = __webpack_require__(/*! ./HttpClient */ "./src/core/handlers/SwaggerHubSync/Internal/HttpClient.ts");
const Logger_1 = __webpack_require__(/*! ../../../utils/Logger */ "./src/core/utils/Logger.ts");
const BaseHandler_1 = __webpack_require__(/*! ../../BaseHandler */ "./src/core/handlers/BaseHandler.ts");
class SwaggerHubSync extends BaseHandler_1.BaseHandler {
    constructor(config) {
        super('SwaggerHubSync');
        this.config = config;
        this.client = new HttpClient_1.SwaggerHubClient(this.config.apiKey, this.config.author);
    }
    async renewModifiedApisVersions(modifiedApi) {
        for (const api of modifiedApi) {
            try {
                if (api.apiName) {
                    api.versions = await this.client.getVersions(api.apiName);
                    Logger_1.Logger.Info(`All versions for ${api.apiName} is fetched.`);
                }
            }
            catch (error) {
                Logger_1.Logger.Error('Error occurred at fetching API versions for {{name}}--{{version}}: {{error}}', { name: api.name, version: api.version, error: error });
            }
        }
    }
    filterOnlyNeededVersions(allApis, modifiedDate) {
        return allApis.filter(x => x.versions).map(spec => {
            return spec.versions.filter(x => modifiedDate && x.modified > modifiedDate).map(version => {
                return version;
            });
        }).reduce((r, c) => [...r, ...c]);
    }
    async findModifiedApis(savedApis) {
        const fetchedApis = await this.client.getAll();
        Logger_1.Logger.Debug(`{{count}} numbers of APIs information fetched from SwaggerHub`, { count: fetchedApis.length });
        let workingApis = fetchedApis;
        let modifiedDate = null;
        if (!this.config.completeSync && savedApis.length > 0) {
            modifiedDate = new Date(savedApis[0].modified);
            workingApis = fetchedApis.filter(e => modifiedDate && e.modified > modifiedDate);
        }
        if (workingApis.length === 0) {
            Logger_1.Logger.Info(`No new modified APIs is founded.`);
        }
        else {
            Logger_1.Logger.Info(`the ${workingApis.length} numbers of new modified APIs is founded.`);
        }
        await this.renewModifiedApisVersions(workingApis);
        return [workingApis, modifiedDate];
    }
    async downloadApisSpecification(apis) {
        const openApiSpecs = [];
        for (const api of apis) {
            try {
                const newSpec = await this.client.getDefinition(api.url, 'json');
                if (newSpec) {
                    openApiSpecs.push({ api: api, jsonSpec: newSpec });
                    Logger_1.Logger.Debug('API definition for {{name}}-{{version}} was fetched', { name: api.name, version: api.version });
                }
            }
            catch (error) {
                Logger_1.Logger.Error('Error occurred at fetching API definition for {{name}}--{{version}}', { name: api.name, version: api.version, error: error });
            }
        }
        return openApiSpecs;
    }
    overwriteModifiedApis(oldApis, modifiedApis) {
        for (const api of modifiedApis.filter(x => x.versions)) {
            let oldApiIndex = oldApis.findIndex(x => x.name === api.name);
            if (oldApiIndex >= 0) {
                oldApis[oldApiIndex] = api;
            }
            else {
                oldApis.push(api);
            }
        }
        return oldApis;
    }
}
exports.SwaggerHubSync = SwaggerHubSync;


/***/ }),

/***/ "./src/core/handlers/SwaggerHubSync/Internal/Types.ts":
/*!************************************************************!*\
  !*** ./src/core/handlers/SwaggerHubSync/Internal/Types.ts ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),

/***/ "./src/core/utils/Logger.ts":
/*!**********************************!*\
  !*** ./src/core/utils/Logger.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const Mustache = __webpack_require__(/*! mustache */ "mustache");
const Reset = "\x1b[0m";
const Bright = "\x1b[1m";
const Dim = "\x1b[2m";
const Underscore = "\x1b[4m";
const Blink = "\x1b[5m";
const Reverse = "\x1b[7m";
const Hidden = "\x1b[8m";
const FgBlack = "\x1b[30m";
const FgRed = "\x1b[31m";
const FgGreen = "\x1b[32m";
const FgYellow = "\x1b[33m";
const FgBlue = "\x1b[34m";
const FgMagenta = "\x1b[35m";
const FgCyan = "\x1b[36m";
const FgWhite = "\x1b[37m";
const BgBlack = "\x1b[40m";
const BgRed = "\x1b[41m";
const BgGreen = "\x1b[42m";
const BgYellow = "\x1b[43m";
const BgBlue = "\x1b[44m";
const BgMagenta = "\x1b[45m";
const BgCyan = "\x1b[46m";
const BgWhite = "\x1b[47m";
class Logger {
    static getTime() {
        return (new Date()).toISOString();
    }
    static write(message, params, color = FgWhite) {
        console.log(`${color}${this.getTime()}-${Mustache.render(message, params)}${color}`);
    }
    static Debug(message, params) {
        this.write(message, params, FgYellow);
    }
    static Info(message, params) {
        this.write(message, params, FgGreen);
    }
    static Error(message, params) {
        this.write(message, params, FgRed);
    }
}
exports.Logger = Logger;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const yargs = __webpack_require__(/*! yargs */ "yargs");
const cli_1 = __webpack_require__(/*! ./cli */ "./src/cli.ts");
const parser = yargs(process.argv.slice(2))
    .scriptName('api-analyzer')
    .version('1.0.0')
    .help(true)
    .strictCommands()
    .showHelpOnFail(true)
    .command(cli_1.syncCommand)
    .command(cli_1.lintCommand);
(async () => {
    await parser.argv;
})();


/***/ }),

/***/ "@stoplight/spectral":
/*!**************************************!*\
  !*** external "@stoplight/spectral" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@stoplight/spectral");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),

/***/ "cli-table3":
/*!*****************************!*\
  !*** external "cli-table3" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("cli-table3");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "mustache":
/*!***************************!*\
  !*** external "mustache" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("mustache");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "yargs":
/*!************************!*\
  !*** external "yargs" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("yargs");

/***/ })

/******/ })));
//# sourceMappingURL=main.js.map
