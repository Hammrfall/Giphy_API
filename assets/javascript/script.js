var InitialButtonArray = ["Captain America", "Ironman", "Black Widow", "Hulk", "Hawkeye", "Thor"];

$(document).ready(function () {
    InitialButtonArray.forEach(function (element) {
        addButton(element);
    })
});

function addButton(name) {
    var buttonItem = $("<button>");
    buttonItem.attr("type", "button");
    buttonItem.addClass("btn btn-secondary");
    buttonItem.text(name);
    $("#buttoncontainer").append(buttonItem);
}