import './styles/index.scss';

var width = 700;
var height = 580;

var svg = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('app').innerText = "Hello World!";



});


// Append empty placeholder g element to the SVG
// g will contain geometry elements
// var g = svg.append("g");

