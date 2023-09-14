sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel
        ) {
        "use strict";

        return Controller.extend("sync.c18.test.jsonmodel.controller.View1", {
            onInit: function () {
                var oData = {
                    text1 : '문자 1',
                    text2 : "문자 2",
                    text3 : "'문자 1'",
                    text4 : '"문자 2"',
                    int : 1,
                    float : 1.1,
                    list: [
                        {key :'KRW'},
                        {key :'USD'}
                    ]
                };

                var oModel = new JSONModel(oData);

                //this는 이 환경에서 controller 으미
                //항상 controller는 this로 불린다.(x)
                //controller안에 oninit안에서만 this가 controller!
                var oView = this.getView();
                oView.setModel(oModel);
            },
            onAdd : function (){
                //<view에 있는 값 가져오는 방법>
                var oInput1 = this.byId("idInput1"); //1) view에서 부여해준 id값을 가져오고,
                var num1 = parseInt(oInput1.getValue());       //id값을 통해 value(입력값) 가져오기

                var oModel = this.getView().getModel(); //2)view에서 사용한 model을 가져오고,
                var oData = oModel.getData();           //해당 모델의 data를 가져온다. (jsonmodel 자체)
                var num2 = parseFloat(oData.float);     //jsonmodel 의 속성에 접근해 값 가져오기
                                                        //이 방법은 jsonmodel일때만 사용가능하다.
                var num2 = oModel.getProperty("/float");//3) 또는, view에서 사용한 model을 가져와서 getProperty()를 통해 프로퍼티 이름을 부여해
                                                        //값을 가져올 수 있다.

                var result = 0;
                result = num1 + num2 ;
                oModel.setProperty("/result", result);
            }
        });
    });
