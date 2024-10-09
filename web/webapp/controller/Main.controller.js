sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment"
],
function (Controller, MessageToast, JSONModel) {
    "use strict";

    return Controller.extend("com.xtendhr.web.controller.Main", {
        onInit: function () {
            // var oModel = new sap.ui.model.odata.v2.ODataModel("/destinations/CfDemo/odata/v2/$metadata");
            // this.getView().setModel(oModel);
            this.onCallSRV();
        },

        onCallSRV: function(){
            var self = this;
            var path = "/srv/destination?destinationX=sfodatatech&path=/odata/v2/cust_CompanyShirts_S0024298592?$format=json";
            
            $.ajax({
                url: path,
                type: "GET",
                contentType: "application/json",
                //contentType: "text/plain",
                success: function(data){
                    
                    //self.setResponse(JSON.stringify(data));
                    // self.getOwnerComponent().getModel("odata").setData(data);
					// self.getView().getModel("odata");

                     // Crear un modelo JSON
                    var oModel = new sap.ui.model.json.JSONModel(data);
                    
                    // Asignar el modelo a la vista
                    self.getView().setModel(oModel, "odata");
                    
                },
                error: function(){
                    self.MessageToast.show("webservice error");
                }
            });

        },
        setResponse: function(data){
            var textArea = this.getView().byId("idTextArea");
            textArea.setValue(data);
        },
       
        onOpenNewView: function (oEvent) {
            
            var oButton = oEvent.getSource();
            var oRow = oButton.getParent(); 

            
            var aCells = oRow.getCells();
            var valor = aCells[0].getText();
            console.log(valor);

            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("RouteDetails", {externalCode: valor });
        },
        onOpenNewViewNewRecord: function (oEvent) {

            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("RouteNew");
        }
    });
});
