
import { useEffect, useState } from "react";
import axios from "axios";


function App() {

  const [filterImages, setFilterImages] = useState([]);
  const [searchParam, setSearchParam] = useState("");
  const [url, setUrl] = useState("https://api.spaceflightnewsapi.net/v4/articles");


  const loanArticles = (url) => {
    axios.get(url)
      .then(res => {
        console.log(res.data.results);
        setFilterImages(res.data.results)
      }).catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    loanArticles(url);
  }, []);


  const handleChange = (e) => {
    setSearchParam(e.target.value);
    console.log("searchParam: " + searchParam);
  }

  const handleClick = () => {
    const urlWithParams = `https://api.spaceflightnewsapi.net/v4/articles/?search=${searchParam}`
    console.log("new url:" + urlWithParams);
    setUrl(urlWithParams)
    loanArticles(urlWithParams);
  }


  return (
    <>
      <div className=" block mx-auto bg-white w-80 md:w-3/4 md:mx-auto mt-10 py-5 
              mb-0 rounded-xl shadow-lg shadow-gray-500/50 ...">
        <h1 className="text-center text-xl md:text-3xl font-extrabold opacity-75 mb-4">Image Search App</h1>
        <div className>
          <input type="search" id="search-input" className="block border border-gray-300 px-16 mx-auto
          md:px-40 mt-5 py-2 ps-4 mb-3"
            placeholder="Search for news_site" onChange={handleChange} />
          <button id="search-Btn"
            className=" block mx-auto py-2 px-5 bg-green-500 text-white text-lg font-bold
                rounded-md hover:bg-green-800"
            onClick={() => handleClick()}>Search</button>
        </div>


        <div className="grid grid-cols- md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10" id="display-images">

          {filterImages && filterImages.map(({ id, title, image_url, news_site, url }) => {


            return (

              <div className="max-w-sm bg-white border border-gray-200 
               rounded-lg shadow-lg shadow-gray-500/50 ..." key={id}>
                <img className="rounded-lg w-full h-60 shrink-0" src={image_url} />
                <div className="p-5">
                  <h2 className="text-3xl text-black font-bold text-center">
                    <span className="text-xl text-black"> News Site :
                      <a href={url} className="text-3xl underline text-indigo-500 text-start">
                        {news_site} </a>
                    </span>

                  </h2>
                  <h5 className="mb-2 text-lg font-semi-bold tracking-tight
                   text-gray-900 dark:text-white text-center mt-3">A
                    {title}  </h5>

                </div>
              </div>
            )
          })}


        </div>
      </div>
    </>
  )
}

export default App;

