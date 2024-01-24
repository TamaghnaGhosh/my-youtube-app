import { useState } from "react";
import { googleApiKey } from "../../utilts/constants";

const YouTubeSearch = () => {
  const [query, setQuery] = useState("");
  const [videos, setVideos] = useState([]);
  const apiKey = googleApiKey; // Replace with your actual API key

  const handleSearch = async () => {
    try {
      if (query?.trim() !== "") {
        const apiUrl = `https://www.googleapis.com/youtube/v3/search?q=${query}&part=snippet&type=video&maxResults=10&key=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response?.json();

        if (response?.ok) {
          setVideos(data?.items);
        } else {
          console.error(
            "Error fetching data from YouTube API:",
            data?.error?.message
          );
        }
      }
    } catch (error) {
      console.error("Error fetching data from YouTube API:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={() => handleSearch()}>Search</button>

      <ul>
        {videos?.map((video) => (
          <li key={video.id.videoId}>
            <h3>{video.snippet.title}</h3>
            <p>{video.snippet.description}</p>
          </li>
        ))}
      </ul>
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
