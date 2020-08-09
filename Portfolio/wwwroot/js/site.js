﻿
var rows = ['softwareSection', 'engineeringSection', 'artistSection'];
$(window).scroll(function () {
    if (rows.length < 1){
        $(this).off('scroll');
        return
    }
    let element = document.getElementById(rows[0]);
    var offset;
    var lineId;
    var elemIdTo;
    switch (rows[0]) {
        case "engineeringSection": 
            offset = 200; 
            lineId = 'engineeringLine';
            elemIdTo = 'artistSection';
            break;
        case "artistSection": 
            offset = 400; 
            lineId = 'artistLine';
            elemIdTo = 'contactSection';
            break;
        default: 
            offset = 0;
            lineId = 'softwareLine';
            elemIdTo = 'engineeringSection';
    }
    if ($(window).scrollTop() > (element.getBoundingClientRect().top + offset) ) {
        
        $('#' + rows[0]).css('visibility', 'visible').hide().fadeIn(1500);
        growLine(rows[0], elemIdTo, lineId)
        rows.splice(0, 1);
    }
});

growLine = (elemIdFrom, elemIdTo, lineId) => {
    let elFrom = document.getElementById(elemIdFrom);
    let elTo = document.getElementById(elemIdTo);
    let y = elTo.getBoundingClientRect().top - elFrom.getBoundingClientRect().top;
    $('#' + lineId).animate(
        {height: y}, 
        {delay: 3000,
                easing: 'linear',
                duration: 3000})
}


function scrollToElement(elementId) {
    var speed = calculateScrollSpeed(elementId);
    $('html,body').animate({
            scrollTop:  $('#' + elementId).offset().top}, speed);
}

calculateScrollSpeed = (elementId) => {
    var elmntToScrollTo = document.getElementById(elementId);
    var nameSection = document.getElementById('nameSection');
    var test = (elmntToScrollTo.getBoundingClientRect().top - nameSection.getBoundingClientRect().top);
    if (test < 500){
        return 1000
    }
    else if (test < 1000){
        return 2000
    }
    return 3000
}


var shouldScroll = true;

scrollArtLeft = () => {
    var firstChild = $('#slide-track div:first-child').clone();
    firstChild.appendTo($('#slide-track'));
    $('#slide-track div:first-child').remove();
}

scrollModalLeft = () => {
    var firstChild = $('#modal-slide-track div:first-child').clone();
    firstChild.appendTo($('#modal-slide-track'));
    $('#modal-slide-track div:first-child').remove();
}

autoScrollArt = () => {
    if (shouldScroll){
        var firstChild = $('#slide-track div:first-child').clone();
        $({x: 0}).animate({x: -200}, {
            duration: 2000,
            easing: 'linear',
            step: function () {
                $('#slide-track').css({transform: 'translateX(' + this.x + 'px)'});
            }
        });
        firstChild.appendTo($('#slide-track'));
        $('#slide-track div:first-child').remove();
    }

};

scrollArtRight = () => {
    var lastChild = $('#slide-track div:last-child').clone();
    lastChild.prependTo($('#slide-track'));
    $('#slide-track div:last-child').remove();
}

scrollModalRight = () => {
    var lastChild = $('#modal-slide-track div:last-child').clone();
    lastChild.prependTo($('#modal-slide-track'));
    $('#modal-slide-track div:last-child').remove();
}

$('#slider').mouseenter(() => shouldScroll = false);
$('#slider').mouseleave(() => shouldScroll = true);

$('#scrollArtLeft').click(function(){shouldScroll = true; scrollArtLeft(); shouldScroll = false; wasLeft = true;});
$('#scrollArtRight').click(scrollArtRight);

$('#scrollModalLeft').click(scrollModalLeft);
$('#scrollModalRight').click(scrollModalRight);

var artModal = document.getElementById("artModal");
document.getElementById('closeArt').addEventListener('click', () => artModal.style.display = "none");

var modalImgWidth = -600;
getFirstPieceToShow =(initialPieceName)=> {
    var artPieceIds = $('#modal-slide-track').children().map(function () {return this.id;});
    // the below code shouldn't be necessary but for some reason the indexOf function is not working on this string array
    var initialIndex = 0;
    for (var i = 0; i < artPieceIds.length; i++){
        if (artPieceIds[i] === initialPieceName) {
            initialIndex = i; }
    }
    var x = initialIndex * modalImgWidth;
    $('#modal-slide-track').css({transform: 'translateX(' + x + 'px)'});
}

function showArtModal(initialPieceName) {
    getFirstPieceToShow(initialPieceName);
    artModal.style.display = "block";
}

window.onclick = function(event) {
    if (event.target === artModal) {
        artModal.style.display = "none";
    }
}

// @Html.ActionLink("help documentation", "Help", new { id = @Model.Id }, new { target = "_blank" })