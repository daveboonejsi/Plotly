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
      var yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
      var metadata = data.metadata;
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];
      var washesPerWeek = result.wfreq;
     
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
      
      var data3 = [
        {
          type: "indicator",  
          mode: "gauge+number",
          value: washesPerWeek,
          title: { text: "Belly Button Washing Frequency - Washes per week" },
          domain: { x: [0, 1], y: [0, 1] },
          gauge: {
            axis: { range: [null, 9], tickwidth: 1, tickcolor: "darkblue" },
            bar: { color: "green" },
            bgcolor: "white",
            borderwidth: 2,
            bordercolor: "gray",
            steps: [
              { range: [0, 2], color: "yellow", name: "1-2" },
              { range: [3, 4], color: "lightgreen", name: "3-4" },
              { range: [5, 6], color: "lightblue" },
              { range: [7, 9], color: "royalblue" },
            ],
            threshold: {
              line: { color: "red", width: 4 },
              thickness: 1,
              value: 7
            }
        }
      }];
      
      var layout3 = {
        width: 500,
        height: 400,
        margin: { t: 25, r: 25, l: 25, b: 25 },
        paper_bgcolor: "beige",
        font: { color: "darkblue", family: "Arial" }
      };
      
      Plotly.newPlot("bar", data1, layout1);
      Plotly.newPlot("bubble", data2, layout2);
      Plotly.newPlot("gauge", data3, layout3);
    })
  }
  
  init();