import React, { useEffect, useState } from "react";


import PostCard from "./PostCard";

const PostList=()=>{
  const [posts,setPosts]=useState([]);
  const [users,setUsers]=useState({});
  const [loading,setLoading]=useState(true);

  useEffect(()=>{
    const fetchPosts=fetch("https://jsonplaceholder.typicode.com/posts")
    .then((res)=>res.json());

    const fetchUsers=fetch("https://jsonplaceholder.typicode.com/users")
    .then((res)=>res.json());

    Promise.all([fetchPosts,fetchUsers]
    ).then(([postdata,userData])=>{
      setPosts(postdata);

      const userMap={};
      userData.forEach((user)=>{
        userMap[user.id]=user.username;
      });

      setUsers(userMap);
      setLoading(false);

    })
    .catch((err)=>{
      console.log(err);
      setLoading(false);
    })

  
  },[]);

  if(loading){
    return (

      <div className="text-center mt-20">Loading...</div>
    )
  }

  return(
    <div className="max-w-3xl mx-auto mt-10">
        {posts.map((post)=>(
          <PostCard key={post.id} post={post} username={users[post.userId]}/>
        ))}
    </div>
  )
}

export default PostList;