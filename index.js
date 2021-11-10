// getting the data from the API
let youTubeVideos = {};
const topics = ["CashSale", "CreditSale", "CashPurchase", "CreditPurchase", "SalesReturn", "PurchaseReturn"];
const vidModal = document.querySelector('#vidModal')

const getYouTubeData = async () => {
    const response = await fetch("https://youtube-v31.p.rapidapi.com/playlistItems?playlistId=PLk_6zRR4T6OAz11jvyqUB-Aoay2xOK9mb&part=snippet&maxResults=6", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "youtube-v31.p.rapidapi.com",
		"x-rapidapi-key": "e99e6ff537msh256aa6ba07c6c09p17565cjsn2e73e7783a62"
	    }
    });
    const transactionData = await response.json();
    //console.log(transactionData)
    return transactionData
    
    }

const mapTransactions = async () => {
    const data = await getYouTubeData();
    topics.forEach(async topic => {
        youTubeVideos[topic] = await findSomething(topic, data.items);
        const card = await (generateCard(youTubeVideos[topic]))
        document.querySelector('div.transaction-list').append(card)
    })
}

async function findSomething(topic, arr) {
    return arr.find(item => item.snippet.title === topic);
}

mapTransactions();

//rendering thumbnails on the page
const generateCard = async (data) => {
    const card = document.createElement('div');
    card.className = 'transaction-list'
    card.dataset['name'] = data.snippet.title

    card.innerHTML = `
    <h3 class ='transaction-list_h3'>${data.snippet.title}</h3>
    <img class ='transaction-list_img' data-name="${data.snippet.title}" src="${data.snippet.thumbnails.high.url}" alt="${data.snippet.title}" />
    `
    return card
}

// eventlistener to open and play the youtube videos
document.querySelector('div.transaction-list').addEventListener('click', event => {
    const element = event.target
    console.log(element.dataset)
    console.log(youTubeVideos[element.dataset['name']].snippet.resourceId.videoId)

    if (element.className.match('transaction-list')) {
        vidModal.classList.toggle('hidden')
        vidModal.innerHTML="";

        url = youTubeVideos[element.dataset['name']].snippet.resourceId.videoId
        const vid = document.createElement('iframe');
        vid.className = 'responsive-iframe'

        vid.setAttribute(
            "src",
            "https://www.youtube.com/embed/"+
            url +
            "?autoplay=1&autohide=1&border=0&wmode=opaque&enablejsapi=1"
        );
        vidModal.appendChild(vid)
    }
})

vidModal.addEventListener('click', event => {
    vidModal.classList.toggle('hidden')
  })