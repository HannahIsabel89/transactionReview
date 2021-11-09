// getting the data from the API
let youTubeVideos = {};
const topics = ["CashSale", "CreditSale", "CashPurchase", "CreditPurchase", "SalesReturn", "PurchaseReturn"];

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

const generateCard = async (data) => {
    console.log(data)
    const card = document.createElement('div');
    card.className = "transaction-card"

    card.innerHTML = `
    <h3>${data.snippet.title}</h3>
    <img class="transactionCardImg" data-name="${data.snippet.title}" src="${data.snippet.thumbnails.high.url}" alt="${data.snippet.thumbnails.title}" />
    `
    return card
    }