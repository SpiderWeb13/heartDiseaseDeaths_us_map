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
  return getData(singleObj, "Female")
})

var maleData = _.map(healthData, function(singleObj){
  return getData(singleObj, "Male")
})

function drawMap(data) {
  $('#heartDiseaseDeaths-by-state').highcharts('Map', {
    title : { text : 'Per 100,000 people' },
    colorAxis: {
      minColor: '#EEEEEF',
      maxColor: '#073FF5',
    },
    series : [
      {
        data : data,
        mapData: Highcharts.maps['countries/us/us-all'],
        joinBy: 'hc-key',
        name: 'Random data',
        states: {
          hover: { color: 'red' }
        },
        dataLabels: {
          enabled: true,
          format: '{point.name}'
        }
      },
      {
        name: 'Separators',
        type: 'mapline',
        data: Highcharts.geojson(Highcharts.maps['countries/us/us-all'], 'mapline'),
        color: '#372A75',
        showInLegend: false,
        enableMouseTracking: false
      }]
    });
  }

  function getData(original, gender) {
    var newState = {
      "hc-key": original.abbreviation.toLowerCase(),
      value: original[gender]
    }
    return newState;
  }
