function getYouTubeData (){
    fetch("https://youtube-v31.p.rapidapi.com/playlistItems?playlistId=PLk_6zRR4T6OAz11jvyqUB-Aoay2xOK9mb&part=snippet&maxResults=50", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "youtube-v31.p.rapidapi.com",
            "x-rapidapi-key": "e99e6ff537msh256aa6ba07c6c09p17565cjsn2e73e7783a62"
        }
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        let video = document.querySelector('#youTubeVideo');
        let videoLink = data.items[0].snippet.resourceId.videoId
        console.log(videoLink)
        video.src= `https://www.youtube.com/embed/${videoLink}`
        //https://www.youtube.com/watch?v=VK40REVJAzM
    })
    .catch(error => console.error(error)
    )};

getYouTubeData();

// thumbnail rendering
let thumbnail = document.querySelectorAll('.thumbnail')

function displayThumbnail () {
    thumbnail.src=data.items[0].thumbnails.high;
}
thumbnail.src=


// Get the modal
let modal1 = document.querySelector("#myModal");

// Get the button that opens the modal
let btn = document.querySelector("#CS");

// Get the <span> element that closes the modal
const span = document.querySelector(".close");

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal1.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
} 