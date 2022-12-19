//Import Libraries
import c3 from "c3";

// Variables for Month
const months = [
  "Jan",
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

  // create a variable that contains the value from element "data" an Array from obj(json) 
  const data = obj.data;
  // create a variable that contains the value from element "chartType" from obj(json)
  const chartType = obj.chartType;
  console.log(chartType);
  
  // capture the 
  const dateLabels = [
    obj.data[0].dateLabel,
    obj.data[1].dateLabel,
    obj.data[2].dateLabel,
    obj.data[3].dateLabel,
    obj.data[4].dateLabel,
    obj.data[5].dateLabel,
    obj.data[6].dateLabel,
    obj.data[7].dateLabel,
    obj.data[8].dateLabel,
    obj.data[9].dateLabel,
    obj.data[10].dateLabel,
    obj.data[11].dateLabel,
  
  ];
  console.log('dateLabels', dateLabels.length);




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

      // // is called "deconstruction"
      const {index, id, value} = (d);
      // // console.log("Index", index);
      const month = months[index];
      const dateLabel = dateLabels[index];
      console.log('dateLabel' , dateLabel);
   
      const newObj = {month, id , value, dateLabel};
      // console.log("new object", newObj);
      // // Call a FM script (scriptName, @param) in this case passing the data at from onclick event as a new JSON object that is converted to a string (.stringify)
      FileMaker.PerformScript("On Chart Click", JSON.stringify (newObj));
    },
    labels : true,
    type   : chartType,
    json   :  data,
    keys: {
          x: 'dateLabel',
          value: ['cleaning', 'misc', 'pads', 'treatment', 'moth' ]
        },
        groups: [
          ['cleaning', 'misc', 'pads', 'treatment', 'moth'],
        ],
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
      x: 'dateLabel', 
      value: ['Location sales']
    },
  })

    };
  };

//
