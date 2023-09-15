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

        return Controller.extend("sync.c18.ex3.controller.View1", {
            onInit: function () {
                // 화면이 전부 그려지기 전에 onInit이 호출됨
                var oRouter = this.getOwnerComponent().getRouter();

                // getRoute(Mainfest.json 의 경로이름)
                oRouter.getRoute("RouteView1").attachMatched(this._onRouterMatched,this);

                var oTable = this.byId("idTable");
                
                this.oBusyIndicator = oTable.getNoData();

                var oData = {
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
                    },
                    list : [
                        {key:'KM'},
                        {key:'MI'}
                    ]
                };

                var oModel = new JSONModel(oData);
                this.getView().setModel(oModel,"view");
                
            },_onRouterMatched : function ( oEvent ) {

                // onInit 에서는 테이블의 바인딩 정보가 없으므로,
                // 라우터의 경로가 일치할 때 이 메소드가 호출되도록 로직을 추가함
                // 이 메소드가 호출되는 시점은 화면이 전부 로드가 끝난 뒤 이므로,
                // 테이블의 바인딩 정보를 가져올 수 있다.
    
                // 가져온 바인딩 정보를 이용하여 화면에 데이터를 새로고침 시켜 No Data 현상을 방지한다.
                // List Binding 정보를 가져온다.
    
                var oTable = this.byId("idTable");
                var oBinding = oTable.getBinding("rows");
    
                // 데이터를 요청했을 때 로직 - 로딩 과정을 보여주기 위한 작업
                oBinding.attachDataRequested(function () {
                    oTable.setNoData(this.oBusyIndicator);
                });
    
                // 데이터를 전달받았을 때 로직 - 로딩 과정을 중단한다.
                oBinding.attachDataReceived(function () {
                    oTable.setNoData(null);
                });
    
                // 연결된 OData Service에서 데이터를 새로고침
                oBinding.refresh();     
            },
            onModelRefresh : function () {
                this.byId("idTable").getBinding().refresh(true);
            },


            onOpenDialogNew : function (){

                var oView = this.getView();
                var oDialog = this.byId("idNewDialog");
                if ( oDialog ){
                    oDialog.open();
                } else {
                    var loadData = {
                        id: oView.getId(),
                        name: "sync.c18.ex3.view.New",
                        controller: this
                    };

                    Fragment.load( loadData ).then(function ( oDialog ) {
                        oView.addDependent(oDialog);
                        oDialog.open();
                    });
                }
            },
            onCloseDialog: function(oEvent){
                var oDialog = oEvent.getSource().getParent();
                oDialog.close();
            },
            onSave: function(){
                var that = this;
                var oView = this.getView();
                var oNewModel = oView.getModel("view");
                var oData = oNewModel.getProperty("/flight");

                var oModel = oView.getModel();
                //SAP로 생성 요청을 보냄
                oModel.create("/ConnectionSet",oData,{
                    success: function (oData, oResponseText){
                        MessageBox.success("생성완료");
                        that.byId("idNewDialog").close();
                    },
                    error : function (oError){
                        MessageBox.error("생성실패" + oError.message,{
                            detail: oError.responseText
                        });
                    }
                });

            },
            onDelete: function (){
                var oView = this.getView();
                var oModel = oView.getModel();

                // sap.ui.table.Table 의 ID를 전달해서 해당 객체를 oTable에 저장한다.
                // oTable에 담긴 정보를 이용해서 선택된 항목들을 찾고,
                // 선택된 항목들만 삭제되도록 이 메소드에서 구현한다.
                var oTable = this.byId("idTable");

                // 선택된 라인들의 번호
                var aIndex = oTable.getSelectedIndices();

                // i는 0부터 1씩 증가하여 최대 aIndex의 길이보다 작을 때까지 반복한다.
                // aIndex에 10줄이 있는 경우 i는 9가 될 때까지 반복한다.
                // 9까지 반복하는 경우 0부터 시작하므로 총 10번 반복하는 경우라 할 수 있다.
                var nSuccessCounter = 0;
                for ( var i=0; i<aIndex.length ; i++ ){
                    var oContext = oTable.getContextByIndex(aIndex[i]);
                    var sPath = oContext.getPath();
                    oModel.remove(
                        sPath,
                        {
                            success: function(){
                                nSuccessCounter++;
                                if ( nSuccessCounter === i ){
                                    MessageBox.success("데이터가 삭제되었습니다.");
                                    oTable.clearSelection();
                                }
                            },
                            error: function(){
                                MessageBox.error("삭제실패:" + oError.responseText );
                            }
                        }
                    )
                }
            }

        });
    });
