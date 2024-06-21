import ListHeader from "./components/ListHeader";
import ListItem from "./components/Listltem"; // แก้ไข Listltem เป็น ListItem
import Auth from './components/Auth'
import { useEffect, useState } from "react";
import {useCookies} from 'react-cookie'

const App = () => {
  const [cookies,setCookie,removeCookie]=useCookies(null)
  const authToken = cookies.AuthToken
  const userEmail = cookies.Email
  const [tasks, setTasks] = useState(null);


  const getData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`); // ใส่ URL ที่ต้องการดึงข้อมูล
      const json = await response.json(); // สมมติว่าข้อมูลเป็น JSON
      setTasks(json);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
   if(authToken){
    getData()
   }}
   ,[])

  console.log(tasks);

  // Sort by date
  const sortedTasks = tasks?.sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="app">
      {!authToken && <Auth/>}
      {authToken  &&
      <>
      <ListHeader listName={"🏝️Holiday Tick list"} getData={getData} />
     <p className="user-email">Welcome back {userEmail}</p>
      {sortedTasks?.map((task) =><ListItem key={task.id} task={task}  getData={getData}/>)}
      </>}
      <p className="copyright">Creative Coding LLC</p>
    </div>
  );
};

export default App;
