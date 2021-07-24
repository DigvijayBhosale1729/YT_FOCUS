$(document).ready(function(){

  var API_KEY = "AIzaSyB5n9qzqaiL45kvBNQ70kHL276--ONR1AI"
  var video = ""

  $("#searchForm").submit(function(event){

    event.preventDefault()
    var searchq = $("#search").val();

    videoSearch(API_KEY, searchq, 15) //API_KEY, String to be searched, Max results
  })

  function videoSearch(key, searchq, maxRes){

    $.get("https://youtube.googleapis.com/youtube/v3/search?part=snippet&type=video&key=" + key + "&q=" + searchq + "&maxResults=" + maxRes, function(data){

      console.log(data)

      data.items.forEach(item => {

        video = `
        <iframe src="https://www.youtube.com/embed/${item.id.videoId}" allowfullscreen></iframe>
        `
        $("#videos").append(video)

      });//for loop

    })//return data function

  }

})
