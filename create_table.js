class Deal {
    constructor(dealId, client_name, project_name, project_manager, project_cost) {
        this.dealId = dealId;
        this.client_name = client_name;
        this.project_name = project_name
        this.project_manager = project_manager
        this.project_cost = project_cost
    }

}
var myData = [new Deal(0, "Microsoft", "Appolo Project", "Mary", 1000),
new Deal(1, "Intel", "Hermes project", "bob", 10000),
new Deal(2, "Apple", "Zeus project", "Jane", 100000)]

var currentDealId = myData.length;
 window.localStorage.setItem("myData", JSON.stringify(myData));
//  window.localStorage allows us to persist key value pairs in a way that would survive page refreshes, navigation, and user closing/reopening browser.
//  window.localStorage has limits to the size of each object stored.   


function CreateTableFromJSON() {

    $('tbody').empty()
    // window.localStorage.setItem("myData", JSON.stringify(myData));

    var myDataTest = JSON.parse( window.localStorage.getItem("myData"))

    $.each(myDataTest, function (key, value) {
        $('tbody').append(`<tr>
    <td>${value.dealId}</td>
    <td>${value.client_name}</td>
    <td>${value.project_name}</td>
    <td>${value.project_manager}</td>
    <td>${value.project_cost}</td>
    <td><button onclick="DeleteRow(${value.dealId})"> <img src="trashcan.png" width="50""> </button></td>
  </tr>`);
    })
}

function AddNewDeal() {
    var clientName = document.getElementById("clientNameInput").value;
    var projectName = document.getElementById("projectNameInput").value;
    var projectManager = document.getElementById("projectManagerInput").value;
    var projectCost = document.getElementById("projectCostInput").value;


    document.getElementById("clientNameInput").value = "";
    document.getElementById("projectNameInput").value = "";
    document.getElementById("projectManagerInput").value = "";
    document.getElementById("projectCostInput").value = "";

    InsertRow(currentDealId, clientName, projectName, projectManager, projectCost);


}

function InsertRow(dealId, clientName, projectName, projectManager, projectCost) {
    //myData.push({"dealId": dealId, "client_name" : clientName, "project_name" : projectName, "project_manager" : projectManager, "project_cost" : projectCost})
    var a = new Deal(dealId, clientName, projectName, projectManager, projectCost);
    myData.push(a);
    currentDealId++;
     window.localStorage.clear();
     window.localStorage.setItem("myData", JSON.stringify(myData))
    // $("tbody").empty()
    CreateTableFromJSON();

}

function DeleteRow(dealId) {

    for (var i = 0; i < myData.length; i++) {

        if (myData[i].dealId === dealId) {
            if (confirm("Are you sure to delete Deal " + JSON.stringify(myData[i]))) {
                myData.splice(i, 1);
                 window.localStorage.removeItem(myData[i]);
            } else {

                break;
            }

        }

    }

    CreateTableFromJSON();
}

