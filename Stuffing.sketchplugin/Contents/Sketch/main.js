@import "utli.js";
@import "data.js";

var DataSupplier = require("sketch/data-supplier");

var onStartup = function() {
    DataSupplier.registerDataSupplier("public.text", "First Names", "SupplyNames");
};

var onShutdown = function() {
    DataSupplier.deregisterDataSuppliers();
};

var onSupplyNames = function(context) {


    console.log('*************** In onSupplyNames');
    var dataKey = context.data.key;
    var dataCount = context.data.requestedCount;

    var dynamicData = utli.randomDataFromData_count(theData, lastName);


    DataSupplier.supplyData(dataKey, dynamicData);
};
