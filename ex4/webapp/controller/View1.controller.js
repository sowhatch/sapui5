sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel, Fragment, MessageBox) {
        "use strict";

        return Controller.extend("sync.c18.ex4.controller.View1", {
            onInit: function () {
                var oData = {
                    edit: false,
                    flight: {
                        Carrid : "",
                        Connid : "",
                        Countryfr : "",
                        Cityfrom : "",
                        Airpfrom : "",
                        Countryto : "",
                        Cityto : "",
                        Airpto : "",
                        Deptime : "",
                        Arrtime : "",
                        Distance : 0,
                        Distid : "",
                    }
                };
                var oModel = new JSONModel(oData);
                var oView = this.getView();
                oView.setModel(oModel, "view");
            },
            onChangeMode : function(){
                var oModel = this.getView().getModel("view");
                var oData  = oModel.getData();
                
                if ( oData.edit ) {
                    oData.edit = false;
                } else {
                    oData.edit = true;
                }
                oModel.setData(oData);
                this.getView().getModel().resetChanges();
            },
            onUpdate: function(){
                var that = this;
                var oView = this.getView();

                //SAP Gateway로 update하기 위한 OData Model
                var oModel = oView.getModel();

                var oTable = this.byId("idTable");

                //선택된 라인정보를 가져와 해당 라인들의 변경사항을 서버로 전송한다.
                var aIndex = oTable.getSelectedIndices();
                aIndex.forEach(function(vIndex, number, array){
                    //vIndex 숫자에 해당되는 행번호의 데이터를 가져온다.
                    var oContext = oTable.getContextByIndex(vIndex);
                    var sPath = oContext.getPath();

                    oModel.update(sPath, { 
                        Carrid : oContext.getProperty("Carrid"),
                        Connid : oContext.getProperty("Connid"),
                        Countryfr : oContext.getProperty("Countryfr"),
                        Cityfrom : oContext.getProperty("Cityfrom"),
                        Airpfrom : oContext.getProperty("Airpfrom"),
                        Countryto : oContext.getProperty("Countryto"),
                        Cityto : oContext.getProperty("Cityto"),
                        Airpto : oContext.getProperty("Airpto"),
                        Deptime : oContext.getProperty("Deptime"),
                        Arrtime : oContext.getProperty("Arrtime"),
                        Distance : oContext.getProperty("Distance"),
                        Distid : oContext.getProperty("Distid"),
                    }, 
                    {
                        success : function(oData, oResponse){
                            if(number + 1 === array.length){
                                MessageBox.success( array.length + "건이 수정되었습니다.");

                                //선택된 라인 해제
                                oTable.clearSelection();

                                //view모델의 /edit의 값에 따라 수정모드,조회모드로 관리된다.
                                // /edit = true면 수정모드, false면 조회모드
                                that.onChangeMode(); 
                            }
                        },
                        error : function (oError){
                            MessageBox.error("수정실패:" + oError.responseText);
                        }
                    });

                });
            }
        });
    });
