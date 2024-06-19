const currentDate = new Date();
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const formattedDate = currentDate.toLocaleDateString('en-US', options);

document.getElementById('currentDateLink').textContent = formattedDate;
getNews()
getWeather()

async function getNews(){
    const api="https://newsapi.org/v2/top-headlines?country=in&apiKey=33d9f65a480e4396902fab56b5717d9e"
    try {
        const response=await fetch(api)
        const newsData=await response.json()
        const news=newsData.articles
        console.log(news)
        renderNews(news)
    } catch (error) {
        console.error(error)
        
    }
}
function newscard(img,title,description,newslink){
    return`
    <div class="card" style="width: 18rem; margin-left: 50px;">
        <img src=${img} class="card-img-top" alt=${title}>
        <div class="card-body">
          <h5 class="card-title">${title}</h5>
          <p class="card-text">${description}</p>
          <a href=${newslink} class="btn btn-primary">Read</a>
        </div>
      </div>
    `
}
function renderNews(news){
    let newscontainer=""
    news.map((n)=>{
        newscontainer+=newscard(n.urlToImage,n.title,n.description,n.url)
    })
    const container=document.getElementById("container")
    container.innerHTML = newscontainer;
}

async function getWeather() {
    const apiKey = "3578c9a29ae7cb3f90f339cd14c42149";
    const city = "Delhi";
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(api);
        const weatherData = await response.json();
        console.log(weatherData);
        const temperature = weatherData.main.temp;
        const place = weatherData.name;
        console.log(`Temperature in ${place} is ${temperature}°C`);
        const weatherDiv = document.getElementById("weather");
        weatherDiv.innerHTML = `Temperature in ${place} is ${temperature}°C`;
    } catch (error) {
        console.error(error);
    }
}
