"use strict";

const hourIndicator = document.querySelector('.hour_indicator');
const minuteIndicator = document.querySelector('.minute_indicator');
const secondIndicator = document.querySelector('.second_indicator');

function getDateFormated() {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}

function getClockRotation(clockElement) {
    const time = new Date();
    const hour = time.getHours() % 12 || 12;
    const minute = time.getMinutes();
    const second = time.getSeconds();
    let rotation = 0
    switch (clockElement.toLowerCase()) {
        case 'hour':
            rotation = ( ( hour  / 12 ) * 360 ) + ( ( ( minute / 60 ) / 12 ) * 360);
            break;
        case 'minute':
            rotation = ( ( minute / 60 )  * 360 );
            break;
        case 'second':
            rotation = ( ( second / 60 ) * 360 );
            break;
    }
    return rotation;
}

function insertTodayDate() {
    document.querySelector('#date').innerHTML = getDateFormated();
}

function setCSSRotate(rotation, element) {
    element.style = `transform: rotate(${rotation}deg);`;
}

function setInitialRotations() {
    const hourInitialRotation = getClockRotation('hour');
    const minuteInitialRotation = getClockRotation('minute');
    const secondInitialRotation = getClockRotation('second');

    setCSSRotate(hourInitialRotation, hourIndicator);
    setCSSRotate(minuteInitialRotation, minuteIndicator);
    setCSSRotate(secondInitialRotation, secondIndicator);
}

function getRotationValue(element) {
    const sliceStart = element.style.transform.indexOf('(') + 1;
    const sliceEnd = element.style.transform.length - 4;
    const rotation = Number( element.style.transform.slice( sliceStart, sliceEnd ) );
    return rotation;
}

function runClock() {
    // hour indicator rotation each second
    const hourSecondRotation = 30 / ( 60 * 60 );
    // minute indicator rotation each second
    const minuteSecondRotation = 6 / 60;
    // second indicator rotation each second
    const secondRotation = 6;

    let hourCurrentRotation = getRotationValue(hourIndicator) + hourSecondRotation;
    let minuteCurrentRotation = getRotationValue(minuteIndicator) + minuteSecondRotation;
    let secondCurrentRotation = getRotationValue(secondIndicator) + secondRotation;

    setCSSRotate(hourCurrentRotation, hourIndicator);
    setCSSRotate(minuteCurrentRotation, minuteIndicator);
    setCSSRotate(secondCurrentRotation, secondIndicator);
}

insertTodayDate();
setInitialRotations();
setInterval(runClock, 1000);