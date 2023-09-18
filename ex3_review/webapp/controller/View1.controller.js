sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Fragment) {
        "use strict";

        return Controller.extend("sync.c18.ex3review.controller.View1", {
            onInit: function () {

            },
            onOpenCreateDialog:function(){
                var oView = this.getView();
                var oDialog = this.byId("idCreateDialog");
                if (oDialog) {
                    oDialog.open();
                } else {
                    Fragment.load({
                        id: oView.getId(),
                        name: "sync.c18.ex3review.view.New",
                        controlloer:this
                    }).then(function(oDialog){
                        oView.addDependent(oDialog);
                        oDialog.open();
                    });
                }
            },
            onCreateComplete:function(){

            },
            onCreateCancel:function(){
                
            }
        });
    });
