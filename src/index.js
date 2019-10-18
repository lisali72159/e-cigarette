import './styles/index.scss';

var tobacco_data1 = require('../data/ecig.json');

var width = 0;
var height = 0;

var svg = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

let year= 2016;
window.addEventListener('DOMContentLoaded', () => {
document.getElementById('app');

    var state = d3.selectAll('path').attr('fill', function(d){
    // debugger
    var abbr = this.id;
    // debugger
    for (var key in ecig_data) {
      debugger
      var percent = ecig_data[key][year]["percentage"];
      if (key === abbr && percent <= 4.0){
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

    document.getElementById("2016").addEventListener("click", () => {
      year = 2016;
      var state = d3.selectAll("path").attr("fill", function(d) {
        // debugger
        var abbr = this.id;
        // debugger
        for (var key in ecig_data) {
          debugger;
          var percent = ecig_data[key][year]["percentage"];
          if (key === abbr && percent <= 4.0) {
            debugger;
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

const bar_data = (Object.values(age_data));
// debugger
console.log(bar_data)
// debugger

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



// var svg = d3.select("svg"),
//     margin = {top: 20, right: 20, bottom: 30, left: 80},
//     width = +svg.attr("width") - margin.left - margin.right,
//     height = +svg.attr("height") - margin.top - margin.bottom;
  
// var tooltip = d3.select("body").append("div").attr("class", "toolTip");
  
// var x = d3.scaleLinear().range([0, width]);
// var y = d3.scaleBand().range([height, 0]);

// var g = svg.append("g")
// 		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
// d3.json("data.json", function(error, data) {
//   	if (error) throw error;
  
//   	data.sort(function(a, b) { return a.value - b.value; });
  
//   	x.domain([0, d3.max(data, function(d) { return d.value; })]);
//     y.domain(data.map(function(d) { return d.area; })).padding(0.1);

//     g.append("g")
//         .attr("class", "x axis")
//        	.attr("transform", "translate(0," + height + ")")
//       	.call(d3.axisBottom(x).ticks(5).tickFormat(function(d) { return parseInt(d / 1000); }).tickSizeInner([-height]));

//     g.append("g")
//         .attr("class", "y axis")
//         .call(d3.axisLeft(y));

//     g.selectAll(".bar")
//         .data(data)
//       .enter().append("rect")
//         .attr("class", "bar")
//         .attr("x", 0)
//         .attr("height", y.bandwidth())
//         .attr("y", function(d) { return y(d.area); })
//         .attr("width", function(d) { return x(d.value); })
//         .on("mousemove", function(d){
//             tooltip
//               .style("left", d3.event.pageX - 50 + "px")
//               .style("top", d3.event.pageY - 70 + "px")
//               .style("display", "inline-block")
//               .html((d.area) + "<br>" + "£" + (d.value));
//         })
//     		.on("mouseout", function(d){ tooltip.style("display", "none");});
// });

