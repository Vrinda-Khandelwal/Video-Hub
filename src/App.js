import {useEffect,useState} from "react"
import axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css"

function App() {
  const [data,setData]=useState([])
  const [search,setSearch]=useState("")
  const [loc,setloc]=useState("")

  useEffect( ()=>
  {
    axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        q: search,
        type: 'video',
        maxResults: 10,
        key: 'AIzaSyBeUyLh_Z7AK5zcbDX8PqjDKReiZViNx6Y',
      },
    })
    .then(response=>
    {
      setData(response.data.items);
      console.log(response.data.items);
    }
    )
    .catch(e=>
    {
      console.log("Error",e);
    }
    )
  },[search]
);

  return (
    <>
    <div className="container-fluid text-white bg-danger p-5 m-3">
      <h1 className="text-center">YouTube Clone</h1>
    </div>
    <div className="container">
      <form>
        <input type="text" className="form-control" placeholder="Search Anything Here......" onChange={e=>setSearch(e.target.value)}></input>
      </form>
      <div className="row m-5">
        <div className="col-md-7">
        <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${loc}`+`?autoplay=1`}
            title="YouTube video player"
            frameBorder="0"
            allow="autoplay;"
            allowFullScreen
          ></iframe>
        </div>
        <div className="col-md-5">
        {
        data.map(item=><div className="row m-3">
          <div className="col-md-4">
            <img src={item.snippet.thumbnails.default.url} alt={item.snippet.title} />
          </div>
          <div className="col-md-8">
            <a href="#" onClick={e=>setloc(item.id.videoId)}>
            {item.snippet.title}</a>
          </div>
        </div>)
        }
        </div>
      </div>
    </div>
    </>
  );
}

export default App;
