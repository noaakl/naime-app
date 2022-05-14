import React, { useState, useEffect } from "react";
import Iframe from 'react-iframe'


const IFrame = ({query}) => {
    return (
        // <Iframe url="http://www.youtube.com/embed/xDMP3i36naA"
        <Iframe url={`https://www.google.com/search?igu=1&ei=&q=${query}`}
        // width="20%"
        height="500px"
        id="myId"
        className="myClassname"
        display="initial"
        position="relative"
        />
        // <div className="App">
        //   <h3>Iframes in React</h3>
        //   {/* <iframe src="https://platform.twitter.com/widgets/tweet_button.html"></iframe> */}
        //   <iframe src="https://www.youtube.com/embed/uXWycyeTeCs"></iframe>
        // </div>
      );
    }

export default IFrame;
