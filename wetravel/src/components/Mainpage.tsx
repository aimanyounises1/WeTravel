import "../components/Mainpage.scss";
import Rola from "../Images/Rola.jpeg";
import Search from "../Images/search_logo.png";
import Card from "./Card";
interface Hotel {
  id: string;
  src: string;
  title: string;
}

const arr: Array<Hotel> = [
  {
    id: "1",
    src: "https://www.melares.com/uploads/antalya-turkey749395439.jpg",
    title: "Antalya Lake",
  },
  {
    id: "2",
    src: "https://media.shichor.co.il/a87daa5f0aeb03962dbac774498bdc87.jpg",
    title: "Sirmione",
  },
  {
    id: "2",
    src: "https://upload.wikimedia.org/wikipedia/commons/4/4b/La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg",
    title: "Paris Tower",
  },

  {
    id: "3",
    src: "https://cf.bstatic.com/xdata/images/hotel/max500/263858373.jpg?k=1818a9f40dbf631c2870111510af6d1eee39fd366d246da6a0b0875f1c87066a&o=&hp=1",
    title: "Las Vegas",
  },
];
function Mainpage() {
  return (
    <div className="wrapper">
      <div className="mainpage">
        <div className="header">
          <div className="menu-icon">
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
          </div>
          <img src={Rola}></img>
        </div>
        <div className="down">
          <h1>Travelles</h1>
          <p>App connect with travel community.</p>
          <div className="search-bar">
            <div className="right-div">
              <img src={Search}></img>
            </div>
            <div className="left-div">
              <p>Search for your destination</p>
              <div className="input__div">
                <p>From</p>
                <input type="text" />
                <p>To</p>
                <input type="text" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="div_h">
        <h1>Right now at </h1>
        <a href="">See all</a>
      </div>
      <div className="list">
        {arr.map((hotel, index) => {
          return (
            <Card
              key={index}
              src={hotel.src}
              id={hotel.id}
              title={hotel.title}
            />
          );
        })}
      </div>
      
    </div>
  );
}

export default Mainpage;