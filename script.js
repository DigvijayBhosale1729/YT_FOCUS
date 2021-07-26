$(document).ready(function () {

  var API_KEY = "AIzaSyB5n9qzqaiL45kvBNQ70kHL276--ONR1AI"
  var SERP_API_KEY = "928df56a949fffbd402d6ed09e8ac0ef"
  var YT_GOOGLE_ID = "c31fa7d73c19eb9b2"
  var YT_QUORA_ID = "21b56c81fd3c2676b"
  var YT_STACKEX_ID = ""
  var YT_STACKOV_ID = ""
  maxRes = 8
  page = 1
  num = 8
  var video = ""
  var result = ""
  var glink = ""

  $("#searchForm").submit(function (event) {

    event.preventDefault()
    var searchq = $("#search").val();
    videoSearch(API_KEY, searchq, maxRes) //API_KEY, String to be searched, Max results
    googleSearch(API_KEY, YT_GOOGLE_ID, YT_QUORA_ID, searchq, num)
  })

  function videoSearch(key, searchq, maxRes) {
    var i = 1;
    $.get("https://youtube.googleapis.com/youtube/v3/search?part=snippet&type=video&key=" + key + "&q=" + searchq + "&maxResults=" + maxRes, function (data) {

      console.log(data)

      data.items.forEach(item => {
        if (i > 8) { i = 1; }
        video = `
        <iframe src="https://www.youtube.com/embed/${item.id.videoId}" allowfullscreen></iframe>
        `
        document.getElementById("video" + i).innerHTML = video + "<hr>";
        i = i + 1;
      });//for loop

    })//return data function

  }

  function googleSearch(GOOGLE_API_KEY, YT_GOOGLE_ID, YT_QUORA_ID, searchq, num) {
    var query = "https://customsearch.googleapis.com/customsearch/v1?safe=medium&key=" + GOOGLE_API_KEY + "&q=" + searchq + "&type=web&cx=" + YT_GOOGLE_ID + "&num=" + num
    $.get(query, function (data) {
      console.log(data)
      data.items.forEach(item => {
        glink = glink + `
        <a href="${item.formattedUrl}">${item.htmlTitle}</a>
        <br>
        <p>${item.htmlSnippet}</p>
        `
      })//for loop

    })
    query = "https://customsearch.googleapis.com/customsearch/v1?safe=medium&key=" + GOOGLE_API_KEY + "&q=" + searchq + "&type=web&cx=" + YT_QUORA_ID + "&num=" + num
    $.get(query, function (data) {
      console.log(data)
      data.items.forEach(item => {
        glink = glink + `
        <a href="${item.formattedUrl}">${item.htmlTitle}</a>
        <br>
        <p>${item.htmlSnippet}</p>
        `
      })//for loop
      document.getElementById("gresults").innerHTML = glink
    })
    
  }

})
