$('#axios-request').on('click', (event) => {
  var startDate = $('#start-date').val()
  var endDate = $('#end-date').val()
  var selectedCurrency = $('#currency').val()
  console.log(selectedCurrency)
  if (startDate == "" || endDate == "") {
    var searchUrl = `http://api.coindesk.com/v1/bpi/historical/close.json?currency=${selectedCurrency}`
  } else {
    var searchUrl = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}&currency=${selectedCurrency}`
  }
  axios.get(searchUrl)
  .then((response) => {
    var chartLabels = Object.keys(response.data.bpi)
    var chartValues = Object.values(response.data.bpi)
    var minPrice = Math.min.apply(null, chartValues)
    var maxPrice = Math.max.apply(null, chartValues)
    console.log(minPrice, chartValues)
    $('#min-value').text(minPrice)
    $('#max-value').text(maxPrice)
    var chartData = {
      labels: chartLabels,
      datasets: [
        {
          fillColor : "rgba(172,194,132,0.4)",
          strokeColor : "#ACC26D",
          pointColor : "#fff",
          pointStrokeColor : "#9DB86D",
          data: chartValues
        }
      ]
    }

    var currency = document.getElementById("myChart").getContext('2d');
    new Chart(currency).Line(chartData);
  })
  .catch((error) => {
    console.log(error)
  });
})
