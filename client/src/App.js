import Navbar from "./component/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Home from "./component/Home";
import Detail from "./component/Detail";
import ProfileUser from "./component/ProfileUser";
import MyBooking from "./component/MyBooking";
import MyBookingPending from "./component/MyBokingPending";
import MyBookingApprove from "./component/MyBookingApprove";
import HistoryIncomeTrans from "./component/HistoryIncomeTrans";
import PrivateAdmin from "./routes/PrivateOwner";
import AddProperty from "./component/AddPoperty";
import PrivateTenant from "./routes/PrivateTenant";
import IndexPoperty from "./component/IndexPoperty";
import ProfileOwner from "./component/ProfileOwner";
import IndexOwner from "./component/IndexOwner";
import { API, setAuthToken } from "./config/api";
import { UserContext } from "./context/UseContext";

function App() {
  const [poperty, setPoperty] = useState([
    {
      name_poperty: "House Astina",
      image: "/image/Image_1.png",
      price: 8905000,
      TOR: "Year",
      amenities: "../image/Tag.png",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.  It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      address: "Jl. Elang IV Perum Permata Bintaro Residence, Pondok Aren,Tangerang Selatan",
      bed_room: 3,
      bath_room: 3,
      area: "1800 ft"
    },
    {
      name_poperty: "House Astina",
      image: "/image/Image_Suport3.svg",
      price: 1500000,
      TOR: "Year",
      amenities: "../image/Tag.png",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.  It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      address: "Jl. Elang IV Perum Permata Bintaro Residence, Pondok Aren,Tangerang Selatan",
      bed_room: 3,
      bath_room: 3,
      area: "1800 ft"
    },
    {
      name_poperty: "House Astina",
      image: "/image/Image_Suport2.svg",
      price: 25000000,
      TOR: "Year",
      amenities: "../image/Tag.png",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.  It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      address: "Jl. Elang IV Perum Permata Bintaro Residence, Pondok Aren,Tangerang Selatan",
      bed_room: 3,
      bath_room: 3,
      area: "1800 ft"
    },
    {
      name_poperty: "House Astina",
      image: "/image/Image_Suport1.svg",
      price: 25000000,
      TOR: "Year",
      amenities: "../image/Tag.png",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.  It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      address: "Jl. Elang IV Perum Permata Bintaro Residence, Pondok Aren,Tangerang Selatan",
      bed_room: 3,
      bath_room: 3,
      area: "1800 ft"
    },
  ]);
  const [checkHotel, setCheckHotel] = useState({
    check_in: "",
    check_out: "",
    total: ""
  })

  const [city, setCity] = useState("")


  // console.log(checkHotel)
  const [state, dispatch] = useContext(UserContext);
  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");
      let payload = response.data.data;
      payload.token = localStorage.token;
      dispatch({
        type: "USER_SUCCESS",
        payload,
      })
    } catch (error) {
      console.log(error);
      dispatch({
        type: "AUTH_ERROR",
      });
    }
  };

  useEffect(() => {
    checkUser()
  }, []);

  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }

  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route exact path="/" element={<Home hotel={poperty}/>} />
          <Route exact path="/detailHausy/:id" element={<Detail hotel={poperty} setCheckHotel={setCheckHotel} checkHotel={checkHotel} />} />

          <Route element={<PrivateTenant />}>
            <Route exact path="/detailHausy/:id" element={<Detail setCheckHotel={setCheckHotel} checkHotel={checkHotel} />} />
            <Route exact path="/profile_user" element={<ProfileUser />} />
            <Route exact path="/myticket/:id" element={<MyBooking hotel={poperty} checkHotel={checkHotel} />} />
            <Route exact path="/myticketpending" element={<MyBookingPending hotel={poperty} />} />  {/*this i need for my booking */}
            <Route exact path="/myticketapprove" element={<MyBookingApprove hotel={poperty} />} />
          </Route>

          <Route element={<PrivateAdmin />}>
            <Route exact path="/profile_owner" element={<ProfileOwner />} />
            <Route exact path="/addpoperty" element={<AddProperty hotel={poperty} />} />
            <Route exact path="/myticketapproveadmin" element={<HistoryIncomeTrans hotel={poperty} />} />
            <Route exact path="/indexadmin" element={<IndexOwner />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
    // {/* <Navbar/>
    // <Home/>
    // <Detail/>
    // <ProfileUser/>
    // <MyBooking/>
    // <MyBookingPending/>
    // <ProfileOwner/>
    // <IndexOwner/> */}
  );
}

export default App;
