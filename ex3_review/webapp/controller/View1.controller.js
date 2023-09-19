sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Fragment, JSONModel, MessageBox) {
        "use strict";

        return Controller.extend("sync.c18.ex3review.controller.View1", {
            onInit: function () {

                var oData ={
                    DistidList: [
                        {unit: "KM", text: "킬로미터"},
                        {unit: "MI", text: "마일"}
                    ]
                };

                var oModel = new JSONModel(oData);
                var oView = this.getView();
                oView.setModel(oModel,"new");

                var oModel = new JSONModel({
                    edit: false
                });
                oView.setModel(oModel,"view");

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
                        controller:this
                    }).then(function(oDialog){
                        oView.addDependent(oDialog);
                        oDialog.open();
                    });
                }
            },
            onCreateComplete: function(){
                var oView = this.getView();
                var oNewModel = oView.getModel("new");
                var oData = oNewModel.getData();
                var oModel = oView.getModel();
                oModel.create(
                    "/ConnectionSet",
                    {
                        Carrid : oData.Carrid,
                        Connid: oData.Connid,
                        Cityfrom : oData.Cityfrom,
                        Countryfr : oData.Countryfr,
                        Airpfrom : oData.Airpfrom,
                        Cityto : oData.Cityto,
                        Countryto : oData.Countryto,
                        Airpto : oData.Airpto,
                        Deptime : oData.Deptime,
                        Arrtime : oData.Arrtime,
                        Distance : oData.Distance,
                        Distid : oData.Distid,

                    },
                    {
                        success: function(){
                            MessageBox.success("생성성공");
                            oView.byId("idCreateDialog").close();
                        },
                        error: function(oError){
                            MessageBox.error("생성실패");

                        }
                    }
                );
            },
            onCreateCancel: function(){
                this.byId("idCreateDialog").close();
            },

            onChangeMode: function(){
                //view 모델의 경로 /edit 가 토글되도록 한다.
                var oViewModel = this.getView().getModel("view");
                var edit = oViewModel.getProperty("/edit");
                if (edit){
                    oViewModel.setProperty("/edit", false);
                }else {
                    oViewModel.setProperty("/edit", true);
                }
            },

            onSave: function(){
                var oView = this.getView();
                var oTable = oView.byId("idTable");
                var aIndex = oTable.getSelectedIndices();
                var maxLength = aIndex.length;
                var nSuccessCounter = 0;
                var oModel = oView.getModel();
                for( var i of aIndex){
                    var oContext = oTable.getContextByIndex(i);
                    oModel.update(
                        oContext.getPath(), //경로
                        {
                            Carrid: oContext.getProperty("Carrid"),
                            Connid: oContext.getProperty("Connid"),
                            Cityfrom : oContext.getProperty("Cityfrom"),
                            Countryfr : oContext.getProperty("Countryfr")
                        },
                        {
                            success: function(){
                                nSuccessCounter++;
                                if(nSuccessCounter === maxLength){
                                    MessageBox.success("수정완료");
                                }
                            },
                            error: function(oError){
                                MessageBox.error("수정실패", {detail: oError.responseText});
                            }
                        }
                    )
                }
            }
        });
    });
