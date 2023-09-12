sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
    "sap/m/MessageBox"
],
    /**
     * @param {sap.ui.core.mvc.Controller} Controller
     * @param {sap.ui.model.json.JSONModel} JSONModel
     * @param {sap.ui.core.Fragment} Fragment
     */
    function (Controller, JSONModel, Fragment, MessageBox) {
        "use strict";

        return Controller.extend("sync.c18.test.crud.controller.View1", {
            onInit: function () {
                // "sap/ui/model/json/JSONModel"
                // 생성 시 사용할 Model 데이터
                var oData = {
                    carrier: {
                        Carrid: "",
                        Carrname: "",
                        Currcode: "",
                        Url: ""
                    }
                };

                var oModel = new JSONModel( oData );
                var oView  = this.getView();
                oView.setModel(oModel,"new");

                var oModel = new JSONModel( oData );
                oView.setModel(oModel,"edit");
            },

            onCreate : function () {

                // new 모델의 데이터 초기화
                var oView = this.getView();
                var oModel = oView.getModel("new");
                oModel.setProperty("/carrier/Carrid", "");
                oModel.setProperty("/carrier/Carrname", "");
                oModel.setProperty("/carrier/Currcode", "");
                oModel.setProperty("/carrier/Url", "");

                // 팝업창 호출
                this._openDialog("idNewDialog", "sync.c18.test.crud.view.New");
            },

            _openDialog : function ( sId, sName ){
                var oView = this.getView();
                var oDialog = oView.byId(sId);

                if ( oDialog ) {
                    // 이미 해당 다이얼로그가 로드되어 있다면,
                    oDialog.open(); // 다시 읽어오지 않고 바로 open
                } else {
                    // 해당 다이얼로그가 화면에 로드되어 있지 않은 경우
                    // "sap/ui/core/Fragment"
                    Fragment.load({
                        id: oView.getId(),
                        name: sName,
                        controller: this
                    }).then(function( oDialog ) {
                        oView.addDependent(oDialog);
                        oDialog.open();
                    });
                }
            },

            onCloseDialog : function () {
                this.byId("idNewDialog").close();
            },
            onCloseEditDialog : function () {
                this.byId("idEditDialog").close();
            },

            onSave : function (){
                var oModel = this.getView().getModel();
                var oNewModel = this.getView().getModel("new");

                var oInputData = oNewModel.getData();

                var that = this;
                oModel.create(
                    "/CarrierSet",
                {
                    Carrid   : oInputData.carrier.Carrid,
                    Carrname : oInputData.carrier.Carrname,
                    Currcode : oInputData.carrier.Currcode,
                    Url      : oInputData.carrier.Url
                },
                {
                    success : function ( oData, oResponse ){
                        MessageBox.success("신규 항공사" + oData.Carrid + "가 생성되었습니다.");
                        // UX400 p.329
                        // oModel.setRefreshAfterChange(false);
                        // oModel.refresh();   
                        that.onCloseDialog(); //this가 아니라 that -> newDialog를 닫기 위해 위에서 that을 만들어줌
                    },
                    error : function ( oError ) {     
                        MessageBox.error("생성실패:" + oError.responseText);                                                            
                    }
                }
            );

            },

            onDelete : function(){
                var oTable = this.byId("idTable");
                var oItems = oTable.getSelectedItems();

                if(!oItems || oItems.length === 0){
                    //사용자가 한 줄도 선택하지 않고, delete 버튼을 눌렀을 때
                    MessageBox.information("라인을 먼저 선택하세요.");
                    return; //onDelete 중단
                }

                //oItems에 데이터가 있는 경우 여기부터 실행됨

                //OData Model을 가져와 Delete명령을 보낸다.
                var oModel = this.getView().getModel();
                
                var nSuccessCounter = 0;
                for(var i = 0; i < oItems.length; i++){
                    var oItem = oItems[i];
                    var path = oItem.getBindingContext().getPath();
                    
                    oModel.remove(path, {
                        success: function(oData, oResponse){
                         //요청된 결과가 성공적으로 진행되었을 때
                            nSuccessCounter ++ ;
                            if(nSuccessCounter === i){
                                MessageBox.success("삭제가 완료되었습니다.");
                            }
                        },
                        error: function (oError){
                            //요청된 내용이 오류로 이어졌을 때
                            MessageBox.error("삭제실패: " + oError.responseText);
                        }
                    });
                };
                
            },
            onOpenDialogEdit: function(oEvent){
                var oSource = oEvent.getSource(); //이벤트가 발생한 출처
                var oContext = oSource.getBindingContext(); //출처에 연결된 데이터 가져옴

                var carrid = oContext.getProperty("Carrid"); //데이터의 속상값 조회
                var carrname = oContext.getProperty("Carrname");
                var currcode = oContext.getProperty("Currcode");
                var url = oContext.getProperty("Url");

                var oEditModel = this.getView().getModel("edit");
                oEditModel.setData({
                    carrier : {
                        Carrid : carrid,
                        Carrname : carrname,
                        Currcode : currcode,
                        Url : url
                    }
                });
                this._openDialog("idEditDialog", "sync.c18.test.crud.view.Edit");
            },
            onEditComplete: function(){
                var oView = this.getView();
                var oEditModel = oView.getModel("edit");
                var sCarrier = oEditModel.getData().carrier;
                
                var oModel = oView.getModel();
                oModel.update(
                    //경로,
                    "/CarrierSet('" + sCarrier.Carrid+ "')",

                    //그 경로에 대한 데이터가 어떻게 변경했으면 좋을지 데이터를 전달
                   sCarrier, 
                   {
                        success : function(){
                            MessageBox.success("항공사" + sCarrier.Carrid + "가 성공적으로 수정되었습니다.");
                        },
                        error: function(){
                            MessageBox.error("수정실패" + oError.message);
                        }
                    }
                )
                
            }
            
        });
    });