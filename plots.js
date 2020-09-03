function init() {
    var selector = d3.select("#selDataset");
  
    d3.json("samples.json").then((data) => {
      var sampleNames = data.names;
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  })}
  
  function optionChanged(newSample) {
    console.log(newSample);
    buildMetadata(newSample);
    buildCharts(newSample);
  }
  
  function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
      var metadata = data.metadata;
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];
      var PANEL = d3.select("#sample-metadata");
  
      PANEL.html("");
      Object.entries(result).forEach(([key,value]) =>{
        PANEL.append("h6").text(`${key}:  ${value}`);  
      })
     
    });
  } 
  
  function buildCharts(sample)
  {
    // console.log(sample);
    d3.json("samples.json").then((data) => {
      var samples = data.samples;
      var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
      var sortedResultArray = resultArray.sort((a,b) => a.sample_values-b.sample_values)
      var result = sortedResultArray[0];
      var otu_ids = result.otu_ids;
      var otu_labels = result.otu_labels;
      var sample_values = result.sample_values;
        console.log(sample_values);
      var yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
      
      var barData = [
        {
          y: yticks,
          x: sample_values.slice(0, 10).reverse(),
          text: otu_labels.slice(0, 10).reverse(),
          type: "bar",
          orientation: "h",
        }
      ];
      
      var data1 = barData;
      var layout1 = {
        title: "Top 10 bacterial species",
        xaxis: { title: "Value"},
        yaxis: { title: "Top 10 bacterial species"}
      };
      var bubbleData = [
        {
          x: otu_ids,
          y: sample_values,
          type: "bubble",
          mode: 'markers',
          marker: {
            label: otu_labels,
            color: otu_ids,
            size: sample_values
        }
      }];
      
      var data2 = bubbleData;
      
      var layout2 = {
        title: 'Bubble Chart of Belly Button Bacterial Species by Patient ID',
        showlegend: false,
        height: 600,
        width: 600
      };
            
      Plotly.newPlot("bar", data1, layout1);

      Plotly.newPlot("bubble", data2, layout2);
    })
  
    // d3.json("samples.json").then((data) => {
    //   var samples = data.samples;
    //   var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
    //   // var sortedResultArray = resultArray.sort((a,b) => a.sample_values-b.sample_values)
    //   var result = resultArray[0];
    //   var otu_ids = result.otu_ids;
    //   var otu_labels = result.otu_labels;
    //   var sample_values = result.sample_values;
    //     // console.log(sample_values);
    //   // var yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
    //   var gaugeData = [
    //     {
    //       y: yticks,
    //       x: sample_values.slice(0, 10).reverse(),
    //       text: otu_labels.slice(0, 10).reverse(),
    //       type: "bar",
    //       orientation: "h",
    //     }
    //   ];
      
    //   var data = gaugeData;
    //   var layout = {
    //     title: "Belly Button Washing Frequency",
    //     // xaxis: { title: "Value"},
    //     // yaxis: { title: "Top 10 bacterial species"}
    //   };
    //   Plotly.newPlot("gauge", data, layout);
    // })

    // d3.json("samples.json").then((data1) => {
    //   var samples = data1.samples;
    //   var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
    //   // var sortedResultArray = resultArray.sort((a,b) => a.sample_values-b.sample_values)
    //   var result = resultArray[0];
    //   var otu_ids = result.otu_ids;
    //   var otu_labels = result.otu_labels;
    //   var sample_values = result.sample_values;
    //   // var yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
    //   console.log(sample_values);
      // var trace = {
      //   x: otu_ids,
      //   y: sample_values,
      //   mode: 'markers',
      //   marker: {
      //     label: otu_labels,
      //     color: otu_ids,
      //     size: sample_values
      //   }
      // };
      
      // var data1 = trace;
      
      // var layout = {
      //   title: 'Marker Size',
      //   showlegend: false,
      //   height: 600,
      //   width: 600
      // };
            
      // Plotly.newPlot('bubble', data1, layout);
    
      //   var trace = {
    //   x: otu_ids,
    //   y: sample_values,
    //   type: "bubble",
    //   mode: "markers",
    //   marker: {
    //     color: otu_ids,
    //     size: sample_values
    //   },
    //   text: otu_labels};
     
    //  var data = trace;
    //  var layout = {
    //   title: "Relative Size Chart of Belly Button Samples",
    //   showlegend: false,
    //   height: 600,
    //   width: 600
    //   // xaxis: { title: "OTU ID"},
    //   // yaxis: { title: "Sample Value"}
    //  };
      // Plotly.newPlot("bubble", data, layout); 
    // })

  }
  
  init();