import './styles/index.scss';


var tobacco_data1 = require('../data/tobacco_use.json');

var width = 700;
var height = 580;

var svg = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

// var tobacco_data = [];
// $.each(tobacco_data.y)


window.addEventListener('DOMContentLoaded', () => {
document.getElementById('app').innerText = "Hello World!";



});


// Append empty placeholder g element to the SVG
// g will contain geometry elements
var g = svg.append("g");

console.log('hello');
console.log(Object.values(tobacco_data1)[0].data_value);
console.log('finish');
