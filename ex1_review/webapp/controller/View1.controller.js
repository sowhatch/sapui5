sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("sync.c18.ex1review.controller.View1", {
            onInit: function () {
                var oData = {
                    inputNum1 : 0,
                    inputNum2 : 0
                };

                var oModel = new JSONModel(oData);
                var oView = this.getView();
                oView.setModel(oModel);
            },

            onAdd : function(){
                var oModel = this.getView().getModel();
                var num1 = parseFloat(oModel.getProperty("/inputNum1"));
                var num2 = parseFloat(oModel.getProperty("/inputNum2"));

                var result = num1 + num2;
                oModel.setProperty("/outputAdd", result);
            },

            onSubtract : function(){
                var oModel = this.getView().getModel();
                var num1 = parseFloat(oModel.getProperty("/inputNum1"));
                var num2 = parseFloat(oModel.getProperty("/inputNum2"));

                var result = num1 - num2;
                oModel.setProperty("/outputSubtract", result);
            },

            onMultiple : function(){
                var oModel = this.getView().getModel();
                var num1 = parseFloat(oModel.getProperty("/inputNum1"));
                var num2 = parseFloat(oModel.getProperty("/inputNum2"));

                var result = num1 * num2;
                oModel.setProperty("/outputMultiple", result);
            },

            onDivide : function(){
                var oModel = this.getView().getModel();
                var num1 = parseFloat(oModel.getProperty("/inputNum1"));
                var num2 = parseFloat(oModel.getProperty("/inputNum2"));

                var result = num1 / num2;
                oModel.setProperty("/outputDivide", result);
            }
        });
    });
