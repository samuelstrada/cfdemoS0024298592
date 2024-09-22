sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment"
],
function (Controller, MessageToast) {
    "use strict";

    return Controller.extend("com.xtendhr.web.controller.Main", {
        onInit: function () {
            
        },
        onSave: function () {
            var self = this;
            var ShirtSize = this.byId("inputSize").getValue();
            var ShirtColor = this.byId("inputcolor").getValue();
            
            // Validación simple
            if (!ShirtSize || !ShirtColor) {
                MessageToast.show("Please fillup all the values");
                return;
            }

            var DatosParaUrl = {
                "cust_Employee":"104016",
                "cust_ShirtSize": ShirtSize,
                "cust_ShirtColor": ShirtColor,
            };

        
            var path = "/srv/destinationadd?destinationX=CfDemo&path=cust_CompanyShirts_S0024298592";
            
            $.ajax({
                url: path,
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify(DatosParaUrl),
                success: function(data){
                    MessageToast.show("Data saved!");
                },
                error: function(){
                    MessageToast.show("webservice error");
                }
            });
        },

        onBackMain: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("RouteMain");
        }

    });
});