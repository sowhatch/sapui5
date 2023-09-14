sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("sync.c18.test.student.controller.View1", {
            onInit: function () {
                var oData = {
                    info: {
                        Stdno : "",
                        Name : "",
                        Gender : ""
                    }
                };
                var oModel = new JSONModel(oData);
                var oView = this.getView();
                oView.setModel(oModel, "new");
            },

            onModelRefresh: function (){
                var oModel = this.getView().getModel();
                oModel.refresh();
            },

            onCreate: function (){
                var oView = this.getView();
                var oNewModel = oView.getModel("new");
                var oData = oNewModel.getProperty("/info");

                //성별을 가진 라디오 버튼이 남/여 중 어느것을 선택했는지?
                var index = oView.byId("idRBG").getSelectedIndex();
                if (index === 0){
                    //남자를 선택
                    oData.Gender = '남';
                }else {
                    //여자를 선택
                    oData.Gender = '여';
                }

                var oModel = oView.getModel();
                //SAP로 생성 요청을 보냄
                oModel.create("/StudentSet",oData,{
                    success: function (oData, oResponseText){
                        sap.m.MessageBox.success("생성완료");
                    },
                    error : function (oError){
                        sap.m.MessageBox.error("생성실패" + oError.message,{
                            detail: oError.responseText
                        });
                    }
                });
            }
        });
    });
