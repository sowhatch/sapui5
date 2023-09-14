sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Fragment, JSONModel) {
        "use strict";

        return Controller.extend("sync.c18.test.fragment.controller.View1", {
            onInit: function () {

            },

            onSelectionChange: function (){
                //alert("aa");
            },

            onItemPress: function (oEvent){
                //alert("onItemPress 실행");

                
                var oSource = oEvent.getSource();
                var oItem = oSource.getSelectedItem();
                var oContext = oItem.getBindingContext();
                var path = oContext.getPath();
                var oView = this.getView();
                oView.bindElement(path);

                var oSupplieruuid = oContext.getProperty("Supplieruuid");
                var oView = this.getView();
                var oModel = oView.getModel();
                oModel.read(
                    "/SupplierSet(guid'" + oSupplieruuid + "')",
                    {
                        success : function(oData){
                            //oData는 read하여 조회된 데이터
                            var oSupplierModel = new JSONModel(oData);
                            oView.setModel(oSupplierModel,"bp");
                        },
                        error : function(){
                            alert("조회실패");
                        }
                    }
                );//oModel.read() 는 데이터를 조회하기 위한 기능
                this._openDialog();
            },

            _openDialog: function(){
                var oView = this.getView();
                var oDialog = oView.byId("idDialog");
                if(oDialog){
                    oDialog.open();
                }else{
                    Fragment.load({
                        id : oView.getId(),
                        name:"sync.c18.test.fragment.view.Supplier",
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
