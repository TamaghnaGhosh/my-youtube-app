/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
  COMMETS_API,
  googleApiKey,
  USERICON,
} from "../../../utilts/constants";

const commentsData = [
  {
    name: "Tamaghna Ghosh",
    text: "Lorem ipsum dolor sit amet, consectetur adip",
    replies: [],
  },
  {
    name: "Tamaghna Ghosh",
    text: "Lorem ipsum dolor sit amet, consectetur adip",
    replies: [
      {
        name: "Tamaghna Ghosh",
        text: "Lorem ipsum dolor sit amet, consectetur adip",
        replies: [],
      },
      {
        name: "Tamaghna Ghosh",
        text: "Lorem ipsum dolor sit amet, consectetur adip",
        replies: [
          {
            name: "Tamaghna Ghosh",
            text: "Lorem ipsum dolor sit amet, consectetur adip",
            replies: [
              {
                name: "Tamaghna Ghosh",
                text: "Lorem ipsum dolor sit amet, consectetur adip",
                replies: [
                  {
                    name: "Tamaghna Ghosh",
                    text: "Lorem ipsum dolor sit amet, consectetur adip",
                    replies: [
                      {
                        name: "Tamaghna Ghosh",
                        text: "Lorem ipsum dolor sit amet, consectetur adip",
                        replies: [],
                      },
                    ],
                  },
                  {
                    name: "Tamaghna Ghosh",
                    text: "Lorem ipsum dolor sit amet, consectetur adip",
                    replies: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Tamaghna Ghosh",
    text: "Lorem ipsum dolor sit amet, consectetur adip",
    replies: [],
  },
  {
    name: "Tamaghna Ghosh",
    text: "Lorem ipsum dolor sit amet, consectetur adip",
    replies: [],
  },
  {
    name: "Tamaghna Ghosh",
    text: "Lorem ipsum dolor sit amet, consectetur adip",
    replies: [],
  },
  {
    name: "Tamaghna Ghosh",
    text: "Lorem ipsum dolor sit amet, consectetur adip",
    replies: [],
  },
];

const CommentsContainer = ({ videoId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments();
  }, [videoId, googleApiKey]);

  const fetchComments = async () => {
    try {
      const response = await fetch(
        `${COMMETS_API}${videoId}&key=${googleApiKey}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch comments");
      }
      const data = await response.json();
      setComments(data?.items);
    } catch (error) {
      console.error(error);
    }
  };

  const Comment = ({ data }) => {
    const { name, text } = data;
    return (
      <div className="flex shadow-sm bg-gray-100 p-2 rounded-lg my-2">
        <img className="w-12 h-12" alt="user" src={USERICON} />
        <div className="px-3">
          <p className="font-bold">{name}</p>
          <p>{text}</p>
        </div>
      </div>
    );
  };
  const CommentList = ({ comments }) => {
    return comments.map((comment, i) => (
      <div key={i}>
        <Comment data={comment} />
        <div className="pl-5 border border-l-black ml-5">
          <CommentList comments={comment.replies} />
        </div>
      </div>
    ));
  };

  const CommentRealData = ({ data }) => {
    // console.log(data);
    const {
      authorDisplayName,
      authorProfileImageUrl,
      textDisplay,
      textOriginal,
    } = data;
    return (
      <div className="flex shadow-sm bg-gray-100 p-2 rounded-lg my-2">
        <img
          className="w-12 h-12 rounded-full"
          alt="user"
          src={authorProfileImageUrl}
        />
        <div className="px-3">
          <p className="font-bold">{authorDisplayName}</p>
          <p>{textDisplay || textOriginal}</p>
        </div>
      </div>
    );
  };
  const CommentListRealData = ({ comments }) => {
    return comments?.map((comment) => (
      <div key={comment?.id}>
        <CommentRealData data={comment?.snippet?.topLevelComment?.snippet} />
        <div className="pl-5 border border-l-black ml-5">
          <CommentRealData data={comment?.snippet?.topLevelComment?.snippet} />
        </div>
      </div>
    ));
  };

  return (
    <div className="m-5 p-2">
      <h1 className="text-2xl font-bold">Comments: </h1>

      <CommentListRealData comments={comments} />

      <h1 className="my-4 font-bold text-4xl">
        Fake data is generated with recursive components
      </h1>
      <CommentList comments={commentsData} />
    </div>
  );
};

export default CommentsContainer;

// import React, { useState, useEffect } from "react";

// const CommentReplies = ({ commentId, apiKey }) => {
//   const [replies, setReplies] = useState([]);

//   useEffect(() => {
//     const fetchReplies = async () => {
//       try {
//         const response = await fetch(
//           `https://www.googleapis.com/youtube/v3/comments?part=snippet&parentId=${commentId}&key=${apiKey}`
//         );

//         if (!response.ok) {
//           throw new Error("Failed to fetch replies");
//         }

//         const data = await response.json();
//         setReplies(data.items);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchReplies();
//   }, [commentId, apiKey]);

//   return (
//     <div>
//       <h3>Replies</h3>
//       <ul>
//         {replies.map((reply) => (
//           <li key={reply.id}>
//             <p>{reply.snippet.textOriginal}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default CommentReplies;

// import React, { useState, useEffect } from "react";
// import CommentReplies from "./CommentReplies"; // Assume you have a component for displaying comment replies

// const VideoComments = ({ videoId, apiKey }) => {
//   const [topLevelComments, setTopLevelComments] = useState([]);

//   useEffect(() => {
//     const fetchTopLevelComments = async () => {
//       try {
//         const response = await fetch(
//           `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${apiKey}`
//         );

//         if (!response.ok) {
//           throw new Error("Failed to fetch comments");
//         }

//         const data = await response.json();
//         setTopLevelComments(data.items);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchTopLevelComments();
//   }, [videoId, apiKey]);

//   return (
//     <div>
//       <h2>Comments</h2>
//       <ul>
//         {topLevelComments.map((commentThread) => (
//           <li key={commentThread.id}>
//             <p>{commentThread.snippet.topLevelComment.snippet.textOriginal}</p>
//             <CommentReplies
//               commentId={commentThread.snippet.topLevelComment.id}
//               apiKey={apiKey}
//             />
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default VideoComments;
