//Import Libraries
import c3 from "c3";

// Variables for Month
const months = [
  "Jan" + 22,
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];



// Call function to load the chart 
window.loadChart = function (json) {
  console.log("loadChart", json);
  //create a variable that contains the json passed by the FM script named loadChart
  const obj = JSON.parse(json);
  console.log(obj);
  const labels = [
    obj.data[0].label,
    obj.data[1].label,
    obj.data[2].label,
    obj.data[3].label,
    obj.data[4].label,
    obj.data[5].label,
    obj.data[6].label,
    obj.data[7].label,
    obj.data[8].label,
    obj.data[9].label,
    obj.data[10].label,
    obj.data[11].label,
  
  ];
  console.log('labels', labels);


  // create a variable that contains the value from element "data" an Array from obj(json) 
  const data = obj.data;
  // create a variable that contains the value from element "chartType" from obj(json)
  const chartType = obj.chartType;
  console.log(chartType);

  // Create variables for chartHeight  chartWidth
  const chartHeight = obj.chartHeight;
  const chartWidth  = obj.chartWidth; 
 
  const options =  { 
    size: {height : chartHeight, width  : chartWidth},
    bindto: "#chart",
    axis: {
      x: {type: "category" },
      y: {},
    }, 

  data: {
    onclick: function(d){
      console.log("data",d);
      // const index = d.index;
      // // const name = d.name;
      // // const value = d.value;
      // // optional way to define multiple variables that are values of an object
      // // is called "deconstruction"
      const {index, id, value} = (d);
      // // console.log("Index", index);
      const month = months[index];
      const label = labels[index];
      // const year = 2022;
      // const year = d.year;
      // // console.log("Month",month);
      // // const cleaning = cleaning[index];
      // // console.log('cleaning', cleaning);
      // // adding Month: before the const name changes the value of the variable returned to the DOM
      const newObj = {month, id , value, label};
      // console.log("new object", newObj);
      // // Call a FM script (scriptName, @param) in this case passing the data at from onclick event as a new JSON object that is converted to a string (.stringify)
      FileMaker.PerformScript("On Chart Click", JSON.stringify (newObj));
    },
    labels : true,
    type   : chartType,
    json   :  data,
    keys: {
          x: "label" ,
          value: ['cleaning', 'misc', 'pads', 'treatment', 'moth', 'AR sales' ]
        },
     },
  };
  
  
  // chart variable calling options variable
  const chart = c3.generate(options);  
  
  // transformChart passes the 'type' 
  window.transformChart = function (type) {
    chart.transform(type);
  };

  // resize the chart
  window.resizeChart = function (height, width) {
    chart.resize({
      height: height,
      width: width
    })
  };

  window.loadData = function (json) {
    const obj = JSON.parse(json);
  console.log(obj);
  // create a variable that contains the value from element "data" an Array from obj(json) 
  const data = obj.data;
  console.log(data);
  chart.load({
    json: data,
    keys: {
      x: "label", 
      value: ['Location sales']
    },
  })

    };
  };

//
