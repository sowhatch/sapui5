sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, Fragment) {
        "use strict";

        return Controller.extend("sync.c18.test.crud.controller.View1", {
            onInit: function () {
                //
                var oData = {
                    carrier : {
                        Carrid : "",
                        Connid : "",
                        Currcode : "",
                        Url : ""
                    }
                };
                var oModel = new JSONModel(oData);
                var oView = this.getView();
                oView.setModel(oModel,"new");

            },

            onCreate: function () {
                var oView = this.getView();
                var oModel = oView.getModel("new");
                //초기화해주는 작업 필요
                oModel.setProperty("/carrier/Carrid", "");
                oModel.setProperty("/carrier/Carrname", "");
                oModel.setProperty("/carrier/Currcode", "");
                oModel.setProperty("/carrier/Url", "");

                //팝업창 호출
                this._openDialog();
            },

            _openDialog: function (){
                var oView = this.getView();
                var oDialog = oView.byId("idNewDialog");

                if(oDialog) {
                    //이미 해당 다이얼로그가 로드되어 있다면,
                    oDialog.open();
                }else{
                    //해당 다이얼로그가 화면에 로드되어 있지 않다면,
                    Fragment.load({
                        id : oView.getId(),
                        name : "sync.c18.test.crud.view.New",
                        controller : this
                    }).then(function(oDialog){
                        oView.addDependent(oDialog);
                        oDialog.open();
                    });
                }
            }
        });
    });
