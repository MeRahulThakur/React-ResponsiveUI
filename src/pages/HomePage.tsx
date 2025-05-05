import { convertDateToLocalTimezone } from "../utility/helpers";

const Home = () => {
  const dateString = new Date().toISOString();
  //const dateString = "2025-05-05 09:50 AM GMT+5:30"
  const result = convertDateToLocalTimezone(dateString);
  return (
    <div className="page">
    <h1>Home</h1>
    <p>Welcome to homepage of Responsive UI Design System created by Rahul Thakur.</p>
    <p>Time: {result}</p>
  </div>
  )
}

export default Home;
