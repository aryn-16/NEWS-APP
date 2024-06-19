const currentDate = new Date();
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const formattedDate = currentDate.toLocaleDateString('en-US', options);

document.getElementById('currentDateLink').textContent = formattedDate;
getNews()
getWeather()

async function getNews(){
    const api="https://gnews.io/api/v4/top-headlines?category=general&lang=en&country=in&max=10&apikey=a9161f741d6570c9b42519d9314d575d"
    try {
        const response=await fetch(api)
        const newsData=await response.json()
        const news=newsData.articles
        console.log(newsData)
        renderNews(news)
    } catch (error) {
        console.error(error)
        
    }
}
function newscard(img,title,description,newslink){
    return`
    <div class="card" style="width: 100%;">
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
        newscontainer+=newscard(n.image,n.title,n.description,n.url)
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
