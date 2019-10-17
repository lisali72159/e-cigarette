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
  // debugger
  // console.log(this.id);
  for (var key in ecig_data) {
    // debugger
    var percent = ecig_data[key][2016]["percentage"];
    if (key === abbr && percent <= 4.0 ){
      // debugger
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

const all_data = tobacco_data1.data;
const filtered = all_data.filter(function(item) {
  return (
    item[25] === "Overall" && item[12] === "E-Cigarette Use (Adults)" && item[27] === "All Ages" && item[13] === "User Status" && item[15] === "Current"
  );
});


const ecig_data = {};
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

const all_states = document.getElementsByClassName("state");
const map = Object.values(all_states[0].children);
// debugger
document.onmousemove = event => {
  document.getElementById("info-box").style.left = event.pageX + 10 + "px";
  document.getElementById("info-box").style.top = event.pageY - 35 + "px";
};

map.forEach(state => {
  state.addEventListener("mouseover", e => {
  // debugger
  const id = e.currentTarget.id;
  const state = e.currentTarget.getElementsByTagName("title")[0].innerHTML;
  const percent = ecig_data[id][2016]["percentage"] + "%";
  // debugger
  const domEle = document.getElementById("info-box");
  domEle.innerHTML = state + ": " + percent;
  domEle.style.opacity = 1;
  // debugger
  }
)});

