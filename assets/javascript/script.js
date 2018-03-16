var buttonArray = ["captain america", "ironman", "black widow", "hulk", "hawkeye", "thor"];
var lastSearch;
var searchString = "";
var currentGifCount = 0;
var startPullCount = 5;
var pullCount = startPullCount;

$(document).ready(function () {
    buttonArray.forEach(function (element) {
        addButton(element);
    })
});

function addButton(name) {
    var buttonItem = $("<button>");
    buttonItem.attr("type", "button");
    buttonItem.attr("val", name);
    buttonItem.addClass("btn btn-secondary search");
    buttonItem.text(name);
    $("#buttoncontainer").append(buttonItem);
}



function getGifs() {
    clearAllGifs();
    var siteString = "https://api.giphy.com/v1/gifs/search?"
    var apiKeyString = "api_key=4N43c1L84737DmVNlPdGssWrMq32sIeT"
    var queryString = "&q=" + searchString + "&limit=25&offset=0&rating=G&lang=en"
    var queryString = siteString + apiKeyString + queryString
    $.ajax({
        url: queryString,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        for (var i = 0; i < pullCount; i++) {
            addGif(response.data[i].images.fixed_width.url, "g");
        }

    });
}

function addGif(url, rating) {
    var image = $("<img>");
    image.addClass("gif");
    image.attr("src", url);
    image.attr("alt", "gif not available")
    $("#gifcontainer").append(image);
}

function clearAllGifs() {
    $("#gifcontainer").empty();
}

function alreadyaButton(inputName) {
    returnValue = false;
    if (inputName === "") {
        returnValue = true;
    } else {
        buttonArray.forEach(function (element) {
            if (inputName === element) {returnValue = true;}
        })
    }
    return returnValue;
}


//Callbacks
$("#buttoncontainer").on("click", ".search", function () {
    searchString = this.textContent
    getGifs();
});

$("#userinput").click('click', function () {
    var inputString = $("#newbuttonname").val().trim().toLowerCase();
    if (alreadyaButton(inputString) === false) {
        addButton(inputString);
        buttonArray.push(inputString);
    }
})