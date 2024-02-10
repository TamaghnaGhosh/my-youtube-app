/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { googleApiKey } from "../../../utilts/constants";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addSuggetionMovies } from "../../../utilts/appSlice";

const YouTubeSearch = () => {
  const [videos, setVideos] = useState([]);
  const dispatch = useDispatch();
  const location = useLocation();

  const apiKey = googleApiKey; // Replace with your actual API key
  useEffect(() => {
    handleSearch();

    // return () => {
    //   second
    // }
  }, [location?.pathname]);

  const handleSearch = async () => {
    try {
      const apiUrl = `https://www.googleapis.com/youtube/v3/search?q=${location.pathname
        .replaceAll("%20", " ")
        .substring(8)}&part=snippet&type=video&maxResults=10&key=${apiKey}`;
      const response = await fetch(apiUrl);
      const data = await response?.json();

      if (response?.ok) {
        setVideos(data?.items);
        dispatch(addSuggetionMovies(data?.items));
      } else {
        console.error(
          "Error fetching data from YouTube API:",
          data?.error?.message
        );
      }
    } catch (error) {
      console.error("Error fetching data from YouTube API:", error);
    }
  };

  return (
    <div>
      {videos?.map((video) => (
        <Link to={`/watch?v=${video?.id?.videoId}`} key={video?.id?.videoId}>
          <ul className="p-2 m-2">
            <li>
              <img
                src={video.snippet.thumbnails?.medium?.url}
                alt="thumbnails"
                className="rounded-lg"
              />
              <h3 className="text-xl font-semibold">{video.snippet.title}</h3>
              <p>{video.snippet.description}</p>
            </li>
          </ul>
        </Link>
      ))}
    </div>
  );
};

export default YouTubeSearch;

// import { useState } from "react";
// import axios from "axios";
// import { googleApiKey } from "../../utilts/constants";

// const YouTubeSearch = () => {
//   const [query, setQuery] = useState("");
//   const [videos, setVideos] = useState([]);

//   const apiKey = googleApiKey; // Replace with your actual API key

//   const handleSearch = async () => {
//     try {
//       const response = await axios.get(
//         "https://www.googleapis.com/youtube/v3/search",
//         {
//           params: {
//             q: query,
//             part: "snippet",
//             type: "video",
//             maxResults: 10,
//             key: apiKey,
//           },
//         }
//       );

//       setVideos(response.data.items);
//     } catch (error) {
//       console.error("Error fetching data from YouTube API:", error);
//     }
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//       />
//       <button onClick={handleSearch}>Search</button>

//       <ul>
//         {videos.map((video) => (
//           <li key={video.id.videoId}>
//             <h3>{video.snippet.title}</h3>
//             <p>{video.snippet.description}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default YouTubeSearch;
