sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, MessageBox) {
        "use strict";

        return Controller.extend("sync.c18.test.student.controller.View1", {
            onInit: function () {
                var oData = {
                    edit: false,
                    info: {
                        Stdno : "",
                        Name : "",
                        Gender : ""
                    }
                };
                var oModel = new JSONModel(oData);
                var oView = this.getView();
                oView.setModel(oModel, "view");
            },

            onModelRefresh: function (){
                var oModel = this.getView().getModel();
                oModel.refresh();
            },

            onCreate: function (){
                var oView = this.getView();
                var oNewModel = oView.getModel("view");
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
                        MessageBox.success("생성완료");
                    },
                    error : function (oError){
                        MessageBox.error("생성실패" + oError.message,{
                            detail: oError.responseText
                        });
                    }
                });
            },

            onDelete : function(){
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
                
            },
            onChangeMode: function(){
                var oModel = this.getView().getModel("view");
                var oData = oModel.getData();

                if (oData.edit) { //true : 수정모드
                    oData.edit = false;     
                }else{
                    var oView = this.getView();

                    var oTable = this.byId("idTable");
                    var aIndex = oTable.getSelectedIndices();

                    if(aIndex.length > 1){
                        MessageBox.show("하나의 데이터만 선택하세요.");
                    }else if(aIndex.length === 0){
                        MessageBox.show("수정할 정보 하나를 선택하세요.");
                    }
                    else{
                        var oContext = oTable.getContextByIndex(aIndex[0]);
                        var Stdno = oContext.getProperty("Stdno");
                        var Name = oContext.getProperty("Name");
                        var Gender = oContext.getProperty("Gender");

                        oData.info.Stdno = Stdno;
                        oData.info.Name = Name;
                        oData.info.Gender = Gender;

                        if (Gender === '남'){
                            oView.byId("idRBG").setSelectedIndex(0);
                        }else{ //'여'
                            oView.byId("idRBG").setSelectedIndex(1);
                        }
                    }

                    oData.edit = true;
                    
                }
                oModel.setData(oData);
                this.getView().getModel().resetChanges();
            },

            onUpdate: function(){
                var oView = this.getView();
                var oEditModel = oView.getModel("view");
                var oData = oEditModel.getProperty("/info");
                //성별을 가진 라디오 버튼이 남/여 중 어느것을 선택했는지?
                var index = oView.byId("idRBG").getSelectedIndex();
                if (index === 0){
                    //남자를 선택
                    oData.Gender = '남';
                }else {
                    //여자를 선택
                    oData.Gender = '여';
                }
                var oTable = this.byId("idTable");
                var aIndex = oTable.getSelectedIndex();
                var oContext = oTable.getContextByIndex(aIndex);
                var sPath = oContext.getPath();

                var oModel = oView.getModel();

                oModel.update(sPath,{
                    Stdno : oData.Stdno,
                    Name : oData.Name,
                    Gender : oData.Gender
                },{
                    success: function (oData, oResponseText){
                        MessageBox.success("수정완료");
                    },
                    error : function (oError){
                        MessageBox.error("수정실패" + oError.message,{
                            detail: oError.responseText
                        });
                    }
                });
                        
            }

        });
    });
