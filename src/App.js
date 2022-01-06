// import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Styles from "./App.module.scss";import Home from "./Home";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/">
//           <Home />
//           </Route>
//         {/* <Route path="users" element={<About />}>
//           <Route path="me" element={<Information />} />
//         </Route> */}
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Layout from "./pages/Layout";
import Home from "./Home";
import About from "./About";
import Menu from "./Menu";
// import Blogs from "./pages/Blogs";
// import Contact from "./pages/Contact";
// import NoPage from "./pages/NoPage";

export default function App() {
  return (
    <BrowserRouter>
    {/* <Menu/> */}
      <Routes>
        <Route path="/" element={<Home />}>
          {/* <Route index element={<Home />} /> */}
          {/* <Route path="/about" element={<About />} /> */}
          {/* <Route path="/information" element={<Information />} /> */}
          {/* <Route path="*" element={<NoPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));