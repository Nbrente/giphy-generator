function ClearCreate(query) {
  //clear targets id="gifHolder"
  $("#gifHolder").empty();
  //constructs api call
  var url = "https://api.giphy.com/v1/gifs/search?api_key=02DRjE2QB7CJyymTzf4l7ZGC9SiDpow1";
  url += '&' + $.param(
    {
      'q': query,
      'limit': 50,
    });
  $.ajax({
    url: url,
    method: 'GET',
  }).then(function (response) {

    var temp = response.data;

    for (i = 0; i < temp.length; i++) {//create stills of all gifs with data-state="still"
      //img structure
      //<img src="" data-still="" data-animate="" data-state="" class="gif">
      var gifCreate = "<img src='" + temp[i].images["480w_still"].url + "' data-still='" + temp[i].images["480w_still"].url + "' data-animate='" + temp[i].images.original.url + "' data-state='still'" + "class='gif'>";
      $("#gifHolder").append(gifCreate);
    }
  })

}

$(document).ready(function () {
  $(document).on('submit', '#gifForm', function (e) {
    e.preventDefault();
    var x = $("input").val()
    createButton(x);
    $("#createButton").val("");
  });
});

function createButton(val) {
  val = val.trim();
  var newButton = "<button class='createGif' value='" + val + "'>" + val + "</button>"
  $("#btnHolder").append(newButton);
}

$(document).on("click", ".createGif", function (event) {// for creating rows of gifs
  var y = this.value;
  ClearCreate(y);
})

$(document).on("click", ".gif", function (event) {// for pausing/unpausing
  event.preventDefault();
  var state = $(this).attr("data-state");
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});