function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel
  var chosenSample =  firstSample;
  var defaultURL = "/metadata/";
  var fullURL = defaultURL + chosenSample;
  d3.json(fullURL).then(function(data) {
    var data = [data];
   });
  
  // Use `d3.json` to fetch the metadata for a sample
  var metadata = d3.json(fullURL);
  console.log(metadata);
    // Use d3 to select the panel with id of `#sample-metadata`
  d3.select('#sample-metadata')
    .enter()
    // Use `.html("") to clear any existing metadata
    .html("")
    // Use `Object.entries` to add each key and value pair to the panel
    .Object.entries(metadata);
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    console.log(Object.entries(metadata));
    

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
};

var allSamples = []
console.log(allSamples);
function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  d3.json(fullURL).then(function(data) {
    console.log(Object.entries(sample));
  allSamples.enter()
    .push(sample);
    // @TODO: Build a Bubble Chart using the sample data
    // Create the data array for the plot
  var graphData = [allSamples];

    // Define the plot layout
  var layout = {
    title: "Belly Button Diversity",
    xaxis: { title: "Otu_ids" },
    yaxis: { title: "Sample Values" }
}})

// Plot the chart to a div tag with id "plot"
  Plotly.newPlot("scatter", graphData, layout);
    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
  };

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  })};


function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
