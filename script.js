const apiKey = "f72802d2e96c446e81d547c3eb6cf31e";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load',()=>{
    fetchNews("India");
})

function relod(){
    window.location.reload();
}

async function fetchNews(query){
    const res = await fetch(`${url}${query}&apiKey=${apiKey}`);
    const data = await res.json();
    console.log(data);
    mergeData(data.articles);
}

function mergeData(articles){
    const cardsContainer = document.getElementById("cards-container");
    const cardsTemplate = document.getElementById("template-news");

    cardsContainer.innerHTML = "";
    
    articles.forEach((article) => {
        if(!article.urlToImage) return;
        const cardClone = cardsTemplate.content.cloneNode(true);
        fillData(cardClone,article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillData(cardClone,article){
    const newsImg = cardClone.querySelector('#news-img');
    const newsHead = cardClone.querySelector('#news-head');
    const newsSource = cardClone.querySelector('#news-date');
    const newsDesc = cardClone.querySelector('#news-desc');
    const date = new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone:"Asia/Jakarta"
    })
    newsImg.src = article.urlToImage;
    newsHead.innerHTML = article.title;
    newsDesc.innerHTML = article.description;
    newsSource.innerHTML = `${article.source.name} 📅 ${date}`;

    cardClone.firstElementChild.addEventListener("click",()=>{
        window.open(article.url,"_blank")
    })
}

let currentNav = null;
function onNavClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    currentNav ?.classList.remove('active');
    currentNav = navItem;
    currentNav.classList.add('active');
}

const searchBtn = document.getElementById("search-button");
const searchText = document.getElementById("news-input");

searchBtn.addEventListener(("click"),()=>{
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);
    currentNav?.classList.remove('active');
    currentNav = null;
})