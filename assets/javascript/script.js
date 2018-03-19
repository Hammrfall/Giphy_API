//Global variables
var buttonArray = ["captain america", "ironman", "black widow", "hulk", "hawkeye", "thor", "black panther"];
var searchString = "";
var lastSearch;
var currentGifCount;
var pullPerQuery = 10;

$(document).ready(function () {
    currentGifCount = 0;
    clearAllGifs();
    buttonArray.forEach(function (element) {
        addButton(element);
    })
});

function addButton(name) {
    var buttonItem = $("<button>");
    buttonItem.attr("type", "button", "val", name);
    buttonItem.addClass("btn btn-secondary search");
    buttonItem.text(name);
    $("#buttoncontainer").append(buttonItem);
}

function getGifs() {
    if (searchString !== lastSearch) {
        currentGifCount = 0;
        clearAllGifs();
    }
    var siteString = "https://api.giphy.com/v1/gifs/search?";
    var apiKeyString = "api_key=4N43c1L84737DmVNlPdGssWrMq32sIeT";
    var queryString = "&q=" + searchString + "&limit=" + (currentGifCount + pullPerQuery) + "&offset=0&lang=en";
    var queryString = siteString + apiKeyString + queryString;
    $.ajax({
        url: queryString,
        method: "GET"
    }).then(function (response) {
        var startCount = currentGifCount;
        var pullCeiling = currentGifCount + pullPerQuery;
        for (var i = startCount; i < pullCeiling; i++) {
            addGif(response.data[i].images.fixed_width_still.url, response.data[i].images.fixed_width.url, response.data[i].rating);
            currentGifCount++;
        }
    });
    lastSearch = searchString;
}

function addGif(staticURL, animatedURL, rating) {
    var image = $("<img>");
    var newDiv = $("<span>");
    newDiv.addClass("gifContainer")
    newDiv.html("<p><b>Rated: " + rating + "</b></p>")
    image.addClass("gif");
    image.attr("src", staticURL)
        .attr("data-staticurl", staticURL)
        .attr("data-animatedurl", animatedURL)
        .attr("data-rating", rating)
        .attr("data-status", "static")
        .attr("alt", "gif not available");
    newDiv.prepend(image);
    $("#gifcontainer").prepend(newDiv);
    $("#gifcontainer").css("visibility", "visible");
}

function clearAllGifs() {
    $("#gifcontainer").empty();
    $("#gifcontainer").css("visibility", "hidden")
}

function alreadyaButton(inputName) {
    returnValue = false;
    if (inputName === "") {
        returnValue = true;
    } else {
        buttonArray.forEach(function (element) {
            if (inputName === element) {
                returnValue = true;
            }
        })
    }
    return returnValue;
}

//Callbacks
$("#buttoncontainer").on("click", ".search", function () {
    searchString = this.textContent;
    getGifs();
});

$("#userinput").click('click', function () {
    var inputString = $("#newbuttonname").val().trim().toLowerCase();
    if (alreadyaButton(inputString) === false) {
        addButton(inputString);
        buttonArray.push(inputString);
    }
    $("#newbuttonname").val("");
})

$("#gifcontainer").on("click", ".gif", function () {
    var state = $(this).attr("data-status");
    if (state === "static") {
        $(this).attr("src", $(this).attr("data-animatedurl"));
        $(this).attr("data-status", "animated");
    } else {
        $(this).attr("src", $(this).attr("data-staticurl"));
        $(this).attr("data-status", "static");
    }
})