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
].reverse();

var svgWidth = 1425,
  svgHeight = 600,
  barPadding = 2;

var barWidth = 26;


var svg = d3
  .select("body")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)
  .attr("class", "bar-chart")
  .attr("fill", "steelblue")
  // .attr("transform", "translate(50, 2)")

 
var xScale = d3
    .scaleLinear()
    .domain([0, "hi"])
    .range([0, svgWidth]);

var yScale = d3
  .scaleLinear()
  .domain([0, d3.max(dataset)])
  .range([svgHeight, 0]);

  debugger
var x_axis = d3.axisBottom().scale(xScale);

var y_axis = d3.axisLeft().scale(yScale);
         
  
svg
  .append("g")
  .attr("transform", "translate(48, -50)")
  .call(y_axis);

var xAxisTranslate = svgHeight - 50;
var yAxisTranslate = svgWidth - 0;

svg
    .append("g")
    .attr("transform", "translate(48, " + xAxisTranslate + ")")    
    .call(x_axis)
   
         
svg.append("text")
  .attr("transform",
    "translate(" + 500 + " ," +
    (595) + ")")
  .text("State");

svg.append("text")
  .attr("transform",
    "translate(" + 50 + " ," +
    (570) + ")")
  .text("AK AL AR AZ CA CO CT DC DE FL GA GU HI IA ID IL IN KS KY LA MA MD ME MI MN MO MS MT NC ND NE NH NJ NM NV NY OH OK OR PA PR RI SC SD TN TX US UT VA VT WA WI WV WY")

svg.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 2)
  .attr("x", -300)
  .attr("dy", "1em")
  .style("text-anchor", "middle")
  .text("Percent (%)");  

var barChart = svg
  .selectAll("rect")
  .data(dataset)
  .enter()
  .append("rect")
  .attr("y", function(d) {
    return yScale(d) ;
  })
  .attr("height", function(d) {
    return svgHeight - yScale(d) - 50;
  })
  
  .attr("width", barWidth - barPadding)
  .attr("transform", function(d, i) {
    var translate = [barWidth * i + 50, ];
    return "translate(" + translate + ")";
  });

