var dataset = [
  13,
  10.7,
  10.7,
  12.4,
  8.8,
  10.2,
  12.1,
  6.2,
  10.3,
  4.2,
  7.6,
  10,
  1.7,
  8,
  10.2,
  10.5,
  10.8,
  9.1,
  12.7,
  14,
  10.7,
  14.2,
  10.4,
  8.7,
  7,
  10.9,
  10.3,
  8.3,
  9.5,
  11.6,
  8.6,
  6.7,
  10.1,
  10.6,
  10.9,
  8.5,
  8.5,
  9.8,
  8.7,
  8,
  9.8,
  14.7,
  7.8,
  9.8,
  9.6,
  4.4,
  11.7,
  12.5,
  8.6,
  8.5,
  12.7,
  11.1,
  4.8
];

var svgWidth = 900,
  svgHeight = 900,
  barPadding = 0;
var barWidth = svgWidth / dataset.length;

var svg = d3
  .select("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var barChart = svg
  .selectAll("rect")
  .data(dataset)
  .enter()
  .append("rect")
  .attr("y", function(d) {
    return svgHeight - d;
  })
  .attr("height", function(d) {
    return d;
  })
  .attr("width", barWidth - barPadding)
  .attr("transform", function(d, i) {
    var translate = [barWidth * i, 0];
    return "translate(" + translate + ")";
  });

