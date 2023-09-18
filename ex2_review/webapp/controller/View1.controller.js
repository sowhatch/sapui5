sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,Fragment,JSONModel) {
        "use strict";

        return Controller.extend("sync.c18.ex2review.controller.View1", {
            onInit: function () {

            },
            onOpenDialog : function(){
                //선택한 테이블
                //var oTable = oEvent.getSource();

                //id가 idTable인 테이블
                var oTable = this.byId("idTable");
                var aIndex = oTable.getSelectedIndices();

                //현재 테이블의 선택모드는 반드시 한개만 선택이 가능하므로,
                //선택된 항목번호 목록을 가져온다 해도, 그 목록엔 하나만 있다.
                var index = aIndex[0];
                var oContext = oTable.getContextByIndex(index);
                var path = oContext.getPath();
                //현재 화면에 선택한 라인의 경로를 현재위치로 지정한다.
                var oView = this.getView();
                oView.bindElement(path);

                var oModel = oView.getModel();
                //첫번째 경로: /FlightSet(Carrid='AA',Connid='0017',Fldate=datetime'2023-03-02T00%3A00%3A00')/toConnection
                var path1 = path + "/toConnection";
                oModel.read(path1,{
                    success: function(oData,oResponse){
                        var oJSONModel = new JSONModel(oData);
                        oView.setModel(oJSONModel,"conn");
                    },
                    error : function(){

                    }
                });
                //두번째 경로: /ConnectionSet(Carrid='AA',Connid='0017')
                var carrid = oContext.getProperty("Carrid");
                var connid = oContext.getProperty("Connid");
                var path2 = "/ConnectionSet(Carrid='"+ carrid + "',Connid='" + connid + "')";
                oModel.read(path2,{
                    success: function(oData,oResponse){
                        var oJSONModel = new JSONModel(oData);
                        oView.setModel(oJSONModel,"conn2");
                    },
                    error : function(){

                    }
                });
                var oDialog = this.byId("idDialog");
                if (oDialog){
                    oDialog.open();
                }else{
                    Fragment.load({
                        id: oView.getId(),
                        name : 'sync.c18.ex2review.view.Conn',
                        controller: this
                    }).then (function(oDialog){
                        oView.addDependent(oDialog);
                        oDialog.open();
                    })
                }
            },
            onCloseDialog: function(){
                this.byId("idDialog").close();
            }
        });
    });
