import './styles/index.scss';

var tobacco_data1 = require('../data/ecig.json');

var width = 700;
var height = 580;

var svg = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

window.addEventListener('DOMContentLoaded', () => {
document.getElementById('app');
var state = d3.selectAll('path').attr('fill', function(d){
//  debugger
  var abbr = this.id;
  debugger
  // console.log(this.id);
  for (var key in ecig_data) {
    debugger
    var percent = ecig_data[key][2016]["percentage"];
    if (key === abbr && percent <= 4.0 ){
      debugger
      return "#99ddff";
    } else if (key === abbr && (percent <= 4.7 && percent >= 4.1)) {
      return "#2a91c2";
    } else if (key === abbr && (percent >= 4.8 && percent <=5.1)) {
      return "#014f87"
    } else if (key === abbr && (percent >= 5.2)){
      return "#12283c"
    }
  }
});

});

// Append empty placeholder g element to the SVG
// g will contain geometry elements
var g = svg.append("g");

console.log('hello');
const all_data = tobacco_data1.data;
const filtered = all_data.filter(function(item) {
  return (
    item[25] === "Overall" && item[12] === "E-Cigarette Use (Adults)" && item[27] === "All Ages" && item[13] === "User Status" && item[15] === "Current"
  );
});

// console.log(filtered);
// console.log('finish');


var ecig_data = {};

filtered.forEach(function(item) {
  var state_abbreviation = item[9];
  var percentage = item[18];
  var year = item[8];
  var datarow = { [year]: { "state_abbr": state_abbreviation, "percentage": percentage }}

  if (!ecig_data[state_abbreviation]) {
    Object.assign(ecig_data,{ [state_abbreviation]: datarow }) // 2016
  } else {
    ecig_data[state_abbreviation][year] = { "state_abbr": state_abbreviation, "percentage": percentage } // 2017
  }
});

console.log(ecig_data);
debugger
var state = d3.selectAll('path').attr('fill', function(d){
 debugger
	// Get the ID of the path we are currently working with
	// Our SVG uses the state abbreviation for the ID
  var abbr = this.id;
  debugger
  console.log(this.id);
  for (var key in ecig_data) {
    debugger
    if (key === abbr ){
      debugger
      return blue;
    }
  }
});

// console.log(state);
// debugger
// var state = d3.selectAll('path').attr('fill', function(d){
 
// 	// Get the ID of the path we are currently working with
// 	// Our SVG uses the state abbreviation for the ID
// 	var abbr = this.id;
 
	
	
// });
	