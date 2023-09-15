sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel, Fragment) {
        "use strict";

        return Controller.extend("sync.c18.ex2.controller.View1", {
            onInit: function () {

            },

            onItemPress: function(oEvent){
                var oSource = oEvent.getSource();
                var oItem = oSource.getSelectedItem();
                var oContext = oItem.getBindingContext();
                var path = oContext.getPath();
                var oView = this.getView();
                oView.bindElement(path);

                var oCarrid = oContext.getProperty("Carrid");
                var oConnid = oContext.getProperty("Connid");
                var oView = this.getView();
                var oModel = oView.getModel();
                oModel.read(
                    "/ConnectionSet(Carrid='" + oCarrid + "',Connid='" + oConnid +"')",
                    {
                        success : function(oData){
                            //oData는 read하여 조회된 데이터
                            var oConnModel = new JSONModel(oData);
                            oView.setModel(oConnModel,"view");
                        },
                        error : function(){
                            alert("조회실패");
                        }
                    }
                );//oModel.read() 는 데이터를 조회하기 위한 기능
                this._openDialog();
            },
            _openDialog : function(){
                var oView = this.getView();
                var oDialog = oView.byId("idDialog");
                if(oDialog){
                    oDialog.open();
                }else{
                    Fragment.load({
                        id : oView.getId(),
                        name:"sync.c18.ex2.view.Conn",
                        controller : this
                    }).then(function(oDialog){
                        oView.addDependent(oDialog);
                        oDialog.open();
                    });
                }
            },
            onCloseDialog: function (){
                this.byId("idDialog").close();
            }
            
        });
    });
