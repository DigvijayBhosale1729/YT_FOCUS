$(document).ready(function(){

  var API_KEY = "AIzaSyB5n9qzqaiL45kvBNQ70kHL276--ONR1AI"
  var SERP_API_KEY = "928df56a949fffbd402d6ed09e8ac0ef"
  maxRes = 8
  page = 1
  num = 10
  var video = ""

  $("#searchForm").submit(function(event){

    event.preventDefault()
    var searchq = $("#search").val();
    videoSearch(API_KEY, searchq, maxRes) //API_KEY, String to be searched, Max results
    serpGoogleSearch(SERP_API_KEY, searchq, page, num)
  })
 var i=1;
  function videoSearch(key, searchq, maxRes){

    $.get("https://youtube.googleapis.com/youtube/v3/search?part=snippet&type=video&key=" + key + "&q=" + searchq + "&maxResults=" + maxRes, function(data){

      console.log(data)

      data.items.forEach(item => {
        if(i>8){i=1;}
        video = `
        <iframe src="https://www.youtube.com/embed/${item.id.videoId}" allowfullscreen></iframe>
        `
        document.getElementById("video"+i).innerHTML=video;
        i=i+1;
      });//for loop

    })//return data function

  }

  function serpGoogleSearch(SERP_API_KEY, searchq, page, num){
    
    var query = `http://api.serpstack.com/search
    ? access_key = YOUR_ACCESS_KEY
    & query = ${searchq}
    & type = web
    & page = ${page}
    &num = ${num}`
    $.get(query, function(data){
      console.log(data)

    })
  }

})
