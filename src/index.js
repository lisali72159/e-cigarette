import './styles/index.scss';

var tobacco_data1 = require('../data/ecig.json');

var width = 0;
var height = 0;

var svg = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "map")

let year= 2016;
document.getElementById("legend-container-1").style.opacity = 1;
document.getElementById("legend-container-2").style.opacity = 0;

window.addEventListener('DOMContentLoaded', () => {
document.getElementById('app');

    var state = d3.selectAll('path').attr('fill', function(d){
    // debugger
    var abbr = this.id;
    // debugger
    for (var key in ecig_data) {
      // debugger
      var percent = ecig_data[key][year]["percentage"];
      if (key === abbr && percent <= 4.0){
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

    document.getElementById("2016").addEventListener("click", () => {
      year = 2016;
      var state = d3.selectAll("path").attr("fill", function(d) {
        // debugger
        var abbr = this.id;
        // debugger
        for (var key in ecig_data) {
          // debugger;
          var percent = ecig_data[key][year]["percentage"];
          if (key === abbr && percent <= 4.0) {
            // debugger;
            return "#99ddff";
          } else if (key === abbr && (percent <= 4.7 && percent >= 4.1)) {
            return "#2a91c2";
          } else if (key === abbr && (percent >= 4.8 && percent <= 5.1)) {
            return "#014f87";
          } else if (key === abbr && percent >= 5.2) {
            return "#12283c";
          }
        }
      })
    });
   
    document.getElementById("2017").addEventListener("click", () => {
      year = 2017; 
      var state = d3.selectAll("path").attr("fill", function(d) {
        // debugger
        var abbr = this.id;
        // debugger
        for (var key in ecig_data) {
          // debugger;
          var percent = ecig_data[key][year]["percentage"];
          if (key === abbr && percent <= 3.9) {
            // debugger;
            return "#99ddff";
          } else if (key === abbr && (percent >= 4.0 && percent <= 4.6)) {
            return "#2a91c2";
          } else if (key === abbr && (percent >= 4.7 && percent <= 4.9)) {
            return "#014f87";
          } else if (key === abbr && percent >= 5.0) {
            return "#12283c";
          }
        }
      });
    })

  document.getElementById("2017").addEventListener("click", () => {
    document.getElementById("legend-container-2").style.opacity = 1;
    document.getElementById("legend-container-1").style.opacity = 0;

  })

  document.getElementById("2016").addEventListener("click", () => {
    document.getElementById("legend-container-1").style.opacity = 1;
    document.getElementById("legend-container-2").style.opacity = 0;

  })
  });



// Append empty placeholder g element to the SVG
// g will contain geometry elements
var g = svg.append("g");

const all_data = tobacco_data1.data;
const filtered = all_data.filter(function(item) {
  return (
    item[25] === "Overall" && item[12] === "E-Cigarette Use (Adults)" && 
    item[27] === "All Ages" && item[13] === "User Status" && item[15] === "Current"
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

const age1 = all_data.filter(function(item) {
  return (
    item[12] === "E-Cigarette Use (Adults)" &&
    item[27] === "18 to 24 Years" &&
    item[8] === "2016"
  );
});


const age2 = all_data.filter(function(item) {
  return (
    item[12] === "E-Cigarette Use (Adults)" &&
    item[27] === "18 to 24 Years" &&
    item[8] === "2017"
  );
});


const age_data = {};
age1.forEach(function(item) {
  var state_abbreviation = item[9];
  var percentage = item[18];
  var year = item[8];
  var datarow = 
     { state_abbr: state_abbreviation, percentage: percentage };

  if (!age_data[state_abbreviation]) {
    Object.assign(age_data, { [state_abbreviation]: datarow }); 
  } else {
    age_data[state_abbreviation][year] = {
      state_abbr: state_abbreviation,
      percentage: percentage
    }; 
  }
});

const bar_data = (Object.values(age_data)).reverse();

// debugger
console.log(bar_data)
debugger

var dataset = [];
for (let i = 0; i < bar_data.length; i++) {
  dataset.push(Number(bar_data[i].percentage))
}

console.log(dataset);

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
  const percent = ecig_data[id][year]["percentage"] + "%";
  // debugger
  const domEle = document.getElementById("info-box");
  domEle.innerHTML = state + ": " + percent;
  domEle.style.opacity = 1;
  // debugger
  }
)});


map.forEach(state => { 
  state.addEventListener("mouseleave", e => {
  document.getElementById("info-box").innerHTML = "";
  document.getElementById("info-box").style.opacity = 0;
  })
});

//BAR GRAPH

const container = d3.select(".container");

const margin = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 70
};

const width2 = 2000,
    height2 = 3000;

const tooltip = container
    .append("div")
    .attr("id", "tooltip")
    .style("opacity", 0);

// include in the div tooltip, two paragraphs to detail the information in two lines
tooltip
    .append("p")
    .attr("class", "state");

tooltip
    .append("p")
    .attr("class", "description");


// HORIZONTAL BAR CHART
// include a chart visualizing data regarding the number of licenses for different sport categories, and for hunting purposes
// structure the data in an array of objects detailing 1. category and 1. value


// include a section for the specific visualization
const percentage = container
    .append("section");

// include introductory heading and paragraph
percentage
    .append("h2");

// SVG
// include the SVG and nested g element in which to plot the visualization
const percentageSVG = percentage
    .append("svg")
    .attr("className", "bar-graph")
    .attr("viewBox", `0 0 ${width2 + margin.left + margin.right} ${height2 + margin.top + margin.bottom}`)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// SCALES
// define scales based on the data

// linear scale for the x axis, detailing the data values
const percentageXScale = d3
    .scaleLinear()
    .domain([0, d3.max(bar_data, (d) => parseInt(d.percentage))])
    .range([0, width2]);

// band scale for the y-axis, with one band for data point
const percentageYScale = d3
    .scaleBand()
    .domain(bar_data.map(data => data.state_abbr))
    .range([0, height2]);


// AXES
// reducing the number of horizontal ticks
const percentageXAxis = d3
    .axisBottom(percentageXScale)
    .ticks(10);

// removing the ticks for the vertical axis
const percentageYAxis = d3
    .axisLeft(percentageYScale)
    .tickSize(0)
    .tickPadding(5);

percentageSVG
    .append("g")
    .attr("className", `axis`)
    .attr("id", `x-axis`)
    .attr("transform", `translate(0, ${height2})`)
    .call(percentageXAxis);

percentageSVG
    .append("g")
    .attr("className", `axis`)
    .attr("id", `y-axis`)
    .call(percentageYAxis);

// HORIZONTAL BARS
// append a rect element for each data point
percentageSVG
    .selectAll("rect")
    .data(bar_data)
    .enter()
    .append("rect")
    // on hover show the tooltip with information regarding the category and the actual number of licenses
    .on("mouseenter", (d, i) => {
        tooltip
            .style("opacity", 1)
            // pageX and pageY allow to target where the cursor lies in a page taller than 100vh
            // slightly offset the position of the tooltip with respect to the cursor
            .style("left", `${d3.event.pageX + 10}px`)
            .style("top", `${d3.event.pageY - 10}px`);
        tooltip
            .select("p.state")
            .text(() => `${d.state_abbr}`);
        tooltip
            .select("p.description")
            .text(() => `${d.percentage}%`);
    })
    .on("mouseout", () => tooltip.style("opacity", 0))
    // include two classes of the hunting category, to style it accordingly
    
    // each rectangle starts from the left and its respective band
    .attr("x", 0)
    // vertically offset by a fourth of the band width as to center the bars (which have half the band width)
    .attr("y", (d) => percentageYScale(d.state_abbr) + percentageYScale.bandwidth()/4)
    // while the height is dicated by 1.5 the band width, the width is transitioned to the appropriate value represented by the data value
    .attr("height", percentageYScale.bandwidth()/1.5)
    .transition()
    .duration((d, i) => 2000 - 100 * i)
    .delay((d, i) => 900 + 100 * i)
    .attr("width", (d, i) => { 
      return (
      percentageXScale(parseInt(d.percentage)))
    });
