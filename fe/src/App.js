import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [jsonData, setJsonData] = useState([]);

  async function fetchData() {
    /*url needs to be maintained in a separate sitemap configurations */
    try {
      const res = await axios.get(`http://localhost:5000/transformedJson`);
      setJsonData(res.data);
    } catch (e) {
      console.log("Error while fetching data", e);
    }
  }
  const insertIntoMongo = async () => { 
    try{
      const {data} =await axios.post(`http://localhost:5000/form-sumbit`,jsonData);
      console.log(data)
    }catch(e){
      console.log("Error while updating data", e);
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className="App">
      {jsonData.map((item) => (
        <div key={item.id} className="card">
          <p>Name: {item.name}</p>
          <p>Age: {item.age}</p>
          <p>Gender: {item["gender\r"]}</p>
        </div>
      ))}
      <button type="submit" onClick={() => insertIntoMongo()}>Submit</button>
    </div>

  );
}

export default App;
