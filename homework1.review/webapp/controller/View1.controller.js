sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,MessageToast, Fragment) {
        "use strict";

        return Controller.extend("ui5.c18.homework1.review.controller.View1", {
            onInit: function () {

            },

            _showMessage: function (oEvent){
                //1. getSource() 를 통해서 선택된 라인의 데이터를 가져오는 방법
                var oSource = oEvent.getSource();
                
                // 1-1. Selected Context 를 찾아서 해당 Context의 Property를 가져오는 방법
                var oSelectedContext = oSource.getSelectedContexts()[0]; // 선택된 라인의 데이터
                var carrid = oSelectedContext.getProperty("Carrid"); // 해당 데이터의 Carrid 값
                var connid = oSelectedContext.getProperty("Connid"); // 해당 데이터의 Connid 값

                // MessageToast.show("항공사:" + carrid + " / 항공편번호:" + connid);
                
                // 1-2. Selected Item 을 찾아서 해당 아이템의 Context의 Property를 가져오는 방법
                var oSelectedItem = oSource.getSelectedItem();
                var oContext = oSelectedItem.getBindingContext(); // 모델명
                var carrid = oContext.getProperty("Carrid");
                var connid = oContext.getProperty("Connid");
                
                // MessageToast.show("항공사:" + carrid + " / 항공편번호:" + connid);
                
                //2. getParameters() 를 통해서 선택된 라인의 데이터를 가져오는 방법
                var oParam = oEvent.getParameters();
                
                //2-1. listItem은 선택한 라인 정보고, 해당 라인에서 Context를 가져와 Property로 
                // 특정 컬럼의 데이터를 조회할 수 있다.
                var oItem  = oParam.listItem;
                var oContext = oItem.getBindingContext(); // 모델명
                var carrid = oContext.getProperty("Carrid");
                var connid = oContext.getProperty("Connid");

                // MessageToast.show("항공사:" + carrid + " / 항공편번호:" + connid);

                var oItems = oParam.listItems;

                // 2-2. oItems 라는 배열에서 첫번째 위치의 데이터를 oItem에 기록한다.
                // READ TABLE oItems INTO oItem INDEX 1.
                var oItem = oItems[0];

                var oContext = oItem.getBindingContext(); // 모델명
                var carrid = oContext.getProperty("Carrid");
                var connid = oContext.getProperty("Connid");

                MessageToast.show("항공사:" + carrid + " / 항공편번호:" + connid);
            },

            onSelectionChange: function (oEvent) {
                this._showMessage(oEvent);
                this._openDialog(oEvent);
            },

            _openDialog: function(oEvent) {
                //선택한 경로가 화면의 현재 위치로 지정되도록 설정
                var oSource = oEvent.getSource();
                var oItem = oSource.getSelectedItem();
                var sPath = oItem.getBindingContextPath();
                var oView = this.getView();
                oView.bindElement(sPath);
                //팝업 호출
                var oDialog = oView.byId("idInfoDialog");

                if(oDialog){
                    //View1.view.xml에서 이미 idInfoDialog를 사용한 적이 있다면,
                    //해당 다이얼로그를 바로open()한다.
                    oDialog.open();
                }else{
                    Fragment.load({
                        id : oView.getId(),
                        name : "ui5.c18.homework1.review.view.Info",
                        controller : this
                    }).then(function(oDialog){
                        oView.addDependent(oDialog); //Dialog가 Model에 접근하기 위해
                        oDialog.open();
                    });
                }

            },

            onCloseDialog: function() {
                var oDialog = this.byId("idInfoDialog");
                if(oDialog){
                    oDialog.close();
                }
            }
        });
    });
