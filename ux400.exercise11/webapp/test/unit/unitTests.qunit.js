/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"sync/ux400.exercise11/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
