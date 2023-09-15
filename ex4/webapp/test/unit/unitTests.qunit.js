/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"syncc18/ex4/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
