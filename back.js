const accessKey = '9T_WC0Q6yXOon4RYHLWE6H7Buj_sv5FTUCKeEHhciWY'

// we need 4 elements primarily
// 1. search input
// 2. search button
// 3. image results
// 4. showmore button

const formElem = document.querySelector('form')
const inputElem = document.getElementById('search-input')
const searchResults = document.querySelector('.search-results')  //use "." in query selector for class
const showMore =  document.getElementById('show-more-button')

let inputData = ""
let page = 1;       //keep track of current pg of search results

async function searchImages(){
    inputData = inputElem.value;        //search query from input assigned to it
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`

    const response = await fetch(url)
    const data = await response.json()  

    const results = data.results


    if (page===1){
        searchResults.innerHTML= ""   //shows 3 Default images
    }

    results.map((result)=>{
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add("search-res");

        const image = document.createElement("img");
        image.src  =result.urls.small;
        image.alt =  result.alt_description;

        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);


    }
    );

    page++;

    if(page>1){
        showMore.style.display = 'block';
    }


}

formElem.addEventListener("submit", (event)=>{
    event.preventDefault();
    page = 1;
    searchImages();
});

showMore.addEventListener("click",()=>{
    searchImages();
})

