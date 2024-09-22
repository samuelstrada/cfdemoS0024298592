
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
], function (Controller, MessageToast,JSONModel) {
    "use strict";

    return Controller.extend("com.xtendhr.web.controller.Details", {
        onInit: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("RouteDetails").attachPatternMatched(this._onRouteMatched, this);
        },
        _onRouteMatched: function(oEvent) {
            var self = this;
            var oArgs = oEvent.getParameter("arguments");
            var valorUrl = oArgs.externalCode;
            this.externalCodeIdGlobal= valorUrl;
            
            console.log("Externalcode", valorUrl);
            var path = "/srv/destination?destinationX=CfDemo&path=cust_CompanyShirts_S0024298592?$filter= externalCode eq '" + valorUrl + "'&$format=json";
            
            $.ajax({
                url: path,
                type: "GET",
                contentType: "application/json",
                success: function(data){
                    var oModel = new sap.ui.model.json.JSONModel(data);
                    
                    self.getView().setModel(oModel, "odata");
                },
                error: function(){
                    self.MessageToast.show("webservice error");
                }
            });
            
        },
        _onDelete:function(oEvent){
            var self = this;
            var valorid = this.externalCodeIdGlobal;
            var path = "/srv/destinationdelete?destinationX=CfDemo&path=cust_CompanyShirts_S0024298592('" + valorid + "')";
            console.log(path);
            $.ajax({
                url: path,
                type: "DELETE",
                success: function(data){
                    MessageToast.show(valorid, " Deleted successfully");
                },
                error: function(){
                    MessageToast.show("webservice error");
                }
            });
        },
        onEditPrepareData:function(){
            var valorid = this.externalCodeIdGlobal;
            var oTable = this.byId("myTableDetails");
            var aItems = oTable.getItems();
            
            for (let index = 0; index < aItems.length; index++) {
                var oItem = aItems[index];
                var oCells = oItem.getCells();
                if (index === aItems.length - 1) {
                    var updatedData = {
                        // "externalCode": valorid,
                        
                        "cust_ShirtSize": oCells[1].getValue(),
                        "cust_ShirtColor": oCells[2].getValue(),
                    };
                    this._onEdit(updatedData);
                }
                
            }
        },
        _onEdit:function(updatedData){
            var self = this;
            var valorid = this.externalCodeIdGlobal;

            var path = "/srv/destinationupdate?destinationX=CfDemo&path=cust_CompanyShirts_S0024298592(externalCode='" + valorid + "')";
            console.log(JSON.stringify(updatedData));
            $.ajax({
                url: path,
                type: "PUT",
                contentType: 'application/json',
                data: JSON.stringify(updatedData),
                success: function(data){
                    MessageToast.show(oCells[1].getValue(),oCells[2].getValue(),"Updated");
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