// @TODO: YOUR CODE HERE!
// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 660;

// Define the chart's margins as an object
var margin = {
  top: 30,
  right: 40,
  bottom: 80,
  left: 100
};

// Define dimensions of the chart area
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import data from an external CSV file
d3.csv("/./assets/data/data.csv").then(function(stateData) {

  console.log(stateData);
  // console.log([stateData]);
  // var stateData = [stateData]
  // Format the data
  stateData.forEach(function(data) {
    data.age = parseFloat(data.age);
    data.ageMoe = parseFloat(data.ageMoe);
    data.healthcare = parseFloat(data.healthcare);
    data.healthcareHigh = parseFloat(data.healthcareHigh);
    data.healthcareLow = parseFloat(data.healthcareLow);
    data.id = +data.id;
    data.income = +data.income;
    data.incomeMoe = parseFloat(data.incomeMoe);
    data.obesity = parseFloat(data.obesity);
    data.obesityHigh = parseFloat(data.obesityHigh);
    data.obesityLow = parseFloat(data.obesityLow);
    data.poverty = parseFloat(data.poverty);
    data.povertyMoe = parseFloat(data.povertyMoe);
    data.smokes = parseFloat(data.smokes);
    data.smokesHigh = parseFloat(data.smokesHigh);
    data.smokesLow = parseFloat(data.smokesLow);
  });
 

  // Create scaling functions
  var xLinearScale = d3.scaleLinear()
    .domain(d3.extent(stateData, d => d.obesity))
    .range([0, width]);

  var yLinearScale = d3.scaleLinear()
      .domain([0, d3.max(stateData, d => d.income) * 1.2])
      .range([height, 0]);

    // Create axis functions
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);
  
  // Add x-axis
  chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  // Add y1-axis to the left side of the display
  chartGroup.append("g")
    .call(leftAxis);

  // Create Circles for Scatter Plot 
  var circlesGroup = chartGroup.selectAll("circle")
  .data(stateData)
  .enter()
  .append("circle")
  .attr("cx", d => xLinearScale(d.obesity))
  .attr("cy", d => yLinearScale(d.income))
  .attr("r", "15")
  .attr("fill", "blue")
  .attr("opacity", ".7")

//Create circle labels
chartGroup.selectAll('text')
  .data(stateData)
  .enter()
  .append("text")
  .attr("x", d => xLinearScale(d.obesity) - 12)
  .attr("y", d => yLinearScale(d.income) + 7.5)
  .text( d => d.abbr)
  .attr("font-family", "sans-serif")
  .attr("font-size", "15px")
  .attr("fill", "red");

// Create axes labels
chartGroup.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 0 - margin.left + 10)
  .attr("x", 0 - (height / 2))
  .attr("dy", "1em")
  .attr("class", "axisText")
  .text("Income");

chartGroup.append("text")
  .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
  .attr("class", "axisText")
  .attr("y", 0)
  .text("Obesity");

});