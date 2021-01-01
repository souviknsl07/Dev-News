let key= "a5476e6b5106b2584d8d8c2d889ba420";

let newsAccordian = document.getElementById("newsAccordian");

const xhr = new XMLHttpRequest();
xhr.open('GET', `https://gnews.io/api/v4/top-headlines?token=${key}&lang=en`, true)
xhr.onload= function(){
    if(this.status===200){
        let json = JSON.parse(this.responseText)
        let articles= json.articles;
        let newsHtml ="";
       articles.forEach((element, index)=>{
            console.log(element)
            let news = `
                <div class="card">
                    <div class="card-header" id="heading${index}">
                        <h2 class="mb-0">
                            <button
                            class="btn btn-link btn-block text-left collapsed"
                            type="button"
                            data-toggle="collapse"
                            data-target="#collapse${index}"
                            aria-expanded="true"
                            aria-controls="collapse${index}"
                            >
                            <b>Breaking News ${index+1}:</b> ${element.title}
                            </button>
                        </h2>
                        </div>

                        <div
                        id="collapse${index}"
                        class="collapse"
                        aria-labelledby="heading${index}"
                        data-parent="#newsAccordian"
                        >
                        <div class="card-body">${element.content}. <a href="${element.url}" onclick="window.open(this.href,'_blank');return false;">Read more<a></div>
                    </div>
                </div>
                `;
            newsHtml += news
        })
        newsAccordian.innerHTML = newsHtml
    }
    else{
        console.log("error")
    }
}
xhr.send()

let search = document.getElementById('searchTxt')
search.addEventListener("input", function(){
    let inputVal=search.value
    //console.log(inputVal);
    let cards= document.getElementsByClassName("card");
    Array.from(cards).map((element)=>{
        let cardTitle=element.getElementsByTagName("h2")[0].innerText;
        let cardTxt=element.getElementsByClassName("card-body")[0].innerText;
        //console.log(cardTxt);
        if(cardTitle.includes(inputVal)|| cardTxt.includes(inputVal)){
            element.style.display="block";
        }
        else{
            element.style.display="none";
        }
    })
})

