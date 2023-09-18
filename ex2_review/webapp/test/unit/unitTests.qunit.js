/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"syncc18/ex2_review/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
