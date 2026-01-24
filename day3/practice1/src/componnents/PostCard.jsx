import React, { useState } from "react";

const PostCard= ({post,username})=>{
     const [showComments,setShowComments]=useState(false);
     const [comments,setComments]=useState([]);

     const toogleComments=()=>{
      if(!showComments){
        fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`)
        .then((res)=>res.json())
        .then((data)=>{
          setComments(data);
          setShowComments(true);
        })
        .catch((err)=>console.log(err));
      }else{
        setShowComments(false);
      }
     };

  return(
    <div className="bg-white shadow-md rounded-lg p-6 mb-4 relative">
      <h2 className="text-xl font-bold mb-2">{post.title}</h2>
      <p className="text-gray-600">{post.body}</p>

      <div className="absolute bottom-3 left-4 text-sm text-gray-500">
        @{username}
      </div>
      <div onClick={toogleComments} className="absolute bottom-3 right-4 cursor-pointer text-xl">
        💬
      </div>

      {showComments && (
        <div className="mt-4 border-t pt-4">
            {comments.map((comment)=>(
              <div key={comment.id} className="mb-3">
                  <p className="font-bold">{comment.name}</p>
                  <p className="text-gray-700 ml-4">{comment.body}</p>
                  <p className="text-gray-400 ml-4 text-sm">@{comment.email}</p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default PostCard;