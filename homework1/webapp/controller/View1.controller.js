sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast, JSONModel) {
        "use strict";

        return Controller.extend("ui5.C18.homework1.controller.View1", {
            onInit: function () {
            },

            onSelection: function (oEvent){
                //Task 3 선택한 라인의 정보를 가져와 Message를 Toast하기
                var oSelectedItem = oEvent.getParameter("listItem");
                var carrid = oSelectedItem.getBindingContext().getProperty("Carrid");
                var connid = oSelectedItem.getBindingContext().getProperty("Connid");
                MessageToast.show("항공사코드: " + [carrid] + `
                 항공편 번호: ` + [connid]);

                //Task 4 선택한 라인의 정보를 가져와 PopUp창을 띄우기
                var fltime = oSelectedItem.getBindingContext().getProperty("Fltime");
                var deptime = oSelectedItem.getBindingContext().getProperty("Deptime");
                var arrtime = oSelectedItem.getBindingContext().getProperty("Arrtime");
                var distance = oSelectedItem.getBindingContext().getProperty("Distance");
                distance = distance.split('.')[0];
                var distid = oSelectedItem.getBindingContext().getProperty("Distid");
                var oData = {
                    flight:{
                        carrid: [carrid],
                        connid: [connid],
                        fltime: [fltime],
                        deptime: [deptime],
                        arrtime: [arrtime],
                        distance: [distance],
                        distid: [distid]
                    },
                    unit: "MI"
                };
                var oModel = new JSONModel( oData );
                this.getView().setModel( oModel );

                //view에 infoDialog라는 id값을 가진 dialog를 찾아 창 열기
                var oDialog = this.byId("infoDialog");

                if(oDialog){ //infoDialog가 id인 view가 있다면
                    oDialog.open(); //view 열기

                }else {//infoDialog가 id인 view를 찾지 못했다면
                    var oView = this.getView();
                    sap.ui.core.Fragment.load({
                        id : oView.getId(),
                        name : "ui5.C18.homework1.view.Info",
                        controller : this
                    }).then(function(oDialog) {
                        //View1.view.xml에 팝업을 연결하고, 화면에 보이도록 open() 호출
                        oView.addDependent(oDialog);
                        oDialog.open();
                    });
                    
                }

            },
            onCloseDialog: function(){
                //닫기 버튼을 누르면 호출되는 함수로, id값을 통해 dialog를 닫는다.
                this.byId("infoDialog").close();

                //닫기 버튼을 누른 후 화면을 새로고침해 데이터를 다시 출력한다.
                history.go(0);
            }
        });
    });
