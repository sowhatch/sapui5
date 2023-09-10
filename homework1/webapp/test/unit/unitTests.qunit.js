/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"ui5C18/homework1/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
