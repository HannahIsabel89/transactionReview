// DOM things
const cashSaleIMG = document.querySelector('#CashSale'), 
creditSaleIMG = document.querySelector('#CreditSale'), 
cashPurchaseIMG = document.querySelector('#CashPurchase'), 
creditPurchaseIMG = document.querySelector('#CreditPurchase'), 
salesReturnIMG = document.querySelector('#SalesReturn'), 
purchaseReturnIMG = document.querySelector('#PurchaseReturn');

// getting the data from the API
const youTubeVideos = {}
const topics = ["CashSale", "CreditSale", "CashPurchase", "CreditPurchase", "SalesReturn", "PurchaseReturn"]

function getYouTubeData (){
    fetch("https://youtube-v31.p.rapidapi.com/playlistItems?playlistId=PLk_6zRR4T6OAz11jvyqUB-Aoay2xOK9mb&part=snippet&maxResults=6", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "youtube-v31.p.rapidapi.com",
		"x-rapidapi-key": "e99e6ff537msh256aa6ba07c6c09p17565cjsn2e73e7783a62"
	}
})
    .then(res => res.json())
    .then(data => {
        //console.log(data)
        topics.forEach(topic => {
            youTubeVideos[topic] = findSomething(topic, data.items)
            renderImg()
        })
    })
    .catch(error => console.error(error)
    )};

getYouTubeData() 

function findSomething(topic, arr) {
    return arr.find(item => item.snippet.title === topic)
};

console.log(youTubeVideos)

//let picURL = youTubeVideos[CashSale][snippet][thumbnails][high][url]
//cashSaleIMG.src = picURL

function renderImg() {
    let picURL = youTubeVideos.CashSale.snippet.thumbnails.high.url
    cashSaleIMG.src = picURL
}

/*class Transaction {
    constructor(name) {
        this.name=name;
    }
    renderImg () {
        let picURL = youTubeVideos.${this.name}.snippet.thumbnails.high.url

    }
}*/

// modal 
// modal element 
const modal = document.getElementById('myModal'), 
closeBtn = document.getElementsByClassName('close')[0],
iframe = document.querySelector('iframe');

//listen for a open click
cashSaleIMG.addEventListener('click', openModal);
//listen for close click
closeBtn.addEventListener('click', closeModal);
//listen for outside click
window.addEventListener('click', clickOutside);

//function to open the modal
function openModal() {
    modal.style.display = 'block';
    iframe.src = 'https://www.youtube.com/embed/gHrNmXh5reg?autoplay=1&mute=1'
}
//function to close the modal
function closeModal() {
    modal.style.display = 'none';
}
function clickOutside(e) {
    if(e.target == modal){
        modal.style.display = 'none'
    }
}