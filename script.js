$('#genderSelect').on("change", function(){
  var choice = $(this).val()
  console.log(choice)
  if (choice == "Male") {
     drawMap(maleData);
  }
  else if (choice == "Female") {
     drawMap(femaleData);
  }
})

var femaleData = _.map(healthData, function(singleObj){
  // console.log(singleObj)
  return getData(singleObj, "Female")
  //  return getData(singleObj, "Female")
})

var maleData = _.map(healthData, function(singleObj){
  // console.log(singleObj)
  return getData(singleObj, "Male")
  //  return getData(singleObj, "Female")
})

function drawMap(data) {
  $('#heartDiseaseDeaths-by-state').highcharts('Map', {
    colorAxis: {
      min: 0
    },
    series : [{
      data : data,
      mapData: Highcharts.maps['countries/us/us-all'],
      joinBy: 'hc-key',
      name: 'Random data',
      title: "Deaths",
      subtitle: "by gender",
      states: {
        hover: {
          color: '#BADA55'
        }
      },
      dataLabels: {
        enabled: true,
        format: '{point.name}'
      }
    }, {
      name: 'Separators',
      type: 'mapline',
      data: Highcharts.geojson(Highcharts.maps['countries/us/us-all'], 'mapline'),
      color: 'silver',
      showInLegend: false,
      enableMouseTracking: false
    }]
  });
}

function getData(original, gender) {
  //  var convertedState = "us-" + original.Location.substring(0, 2).toLowerCase()
  var newState = {
    "hc-key": original.abbreviation.toLowerCase(),
    value: original[gender]
  }
  return newState;
}
