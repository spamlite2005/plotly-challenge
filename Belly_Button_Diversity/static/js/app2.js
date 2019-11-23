function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel
  // var chosenSample =  firstSample;
  // var defaultURL = "/metadata/";
  // var fullURL = defaultURL + chosenSample;
  d3.json(`/metadata/${sample}`).then(function(data) {
     
  // Use `d3.json` to fetch the metadata for a sample
 
  // console.log(metadata);
    // Use d3 to select the panel with id of `#sample-metadata`
  var panel = d3.select('#sample-metadata').html("");
    //.enter();
    // Use `.html("") to clear any existing metadata
    
    // Use `Object.entries` to add each key and value pair to the panel
    Object.entries(data).forEach(([key,value]) => {
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    panel.append("h6").text(`${key}:${value}`);
    console.log(Object.entries(data));
    
  })
    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
});
}

// var allSamples = []
// console.log(allSamples);
function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  d3.json(`samples/${sample}`).then(function(data) {
    console.log(Object.entries(sample));
  // allSamples.enter()
  //   .push(sample);
    // @TODO: Build a Bubble Chart using the sample data
    // Create the data array for the plot
  // var graphData = [allSamples];

  var trace1 = {
    values: data.sample_values.slice(0,10),
    labels: data.otu_ids.slice(0,10),
    type: "pie"
  };
  
  // Create our second trace
  var trace2 = {
    x: data.otu_ids,
    y: data.sample_values,
    type: "scatter",
    mode: "markers",
    marker: {
      size: data.sample_values, 
      color: data.otu_ids,
      text: data.otu_labels
    }
  };
  
  // The data array consists of both traces
  var pie_data = [trace1];
  var bubble_data = [trace2];
  
  // Note that we omitted the layout object this time
  // This will use default parameters for the layout
  Plotly.newPlot("pie", pie_data);
  Plotly.newPlot("bubble", bubble_data);

  // Define the plot layout
  var layout = {
    title: "Belly Button Diversity",
    xaxis: { title: "Otu_ids" },
    yaxis: { title: "Sample Values" }
  }
});

// Plot the chart to a div tag with id "plot"
  // Plotly.newPlot("scatter", graphData, layout);
    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).


}


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
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();