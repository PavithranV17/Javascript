const cards = document.querySelector(".cards");
const category = document.querySelector(".category");

const noImg = "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

// const url = "https://newsapi.org/v2/everything?q=tesla&from=2024-04-20&sortBy=publishedAtxxxxxxxxxx";
const baseUrl = "https://newsapi.org/v2/";
const endUrl = "XXXXXXXXXXXX";

async function dataReq(Url){
    try{
        const res = await fetch(baseUrl + Url + endUrl);
        const json = res.json();
        return json;
    }catch(error){
        console.log(error);
    }
};

function urlReq(Url){
    dataReq(Url).then(data => {
        data.articles.forEach(item => {
            cards.innerHTML += `<div class="card">
                                    <div class="image">
                                        <img src="${item.urlToImage ? item.urlToImage : noImg}" alt="Default Image">
                                    </div>
    
                                    <div class="information">
                                        <div>
                                            <p class="title">${item.title}</p>
                                            <p class="description">${item.description}</p>
                                                <span>${item.publishedAt.replace("Z","").split("T")[1]}</span>
                                                <span>${item.publishedAt.replace("Z","").split("T")[0]}</span>
                                            </p>
                                        </div>
    
                                        <div class="other">
                                            <span class="source">${item.source.name}</span>
                                            <a class="url" href="${item.url}" target="_blank" >Read Article <i class="bi bi-arrow-right"></i></a>
                                        </div>
                                        
                                    </div>
                                </div>`;
        });
    });
};

category.addEventListener("click", event => {
    if(event.target.tagName === "SPAN"){
        cards.innerHTML = "";
        urlReq(event.target.dataset.url);
        category.querySelectorAll("span").forEach(item => {
            item.classList.remove("active");
        });
        event.target.classList.add("active");
    };
});

// As soon as the page loads, this function calls;
urlReq("top-headlines?country=us&category=business");