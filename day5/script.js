
const root = document.getElementById('root');
const postContainer = document.getElementById('post-container');


const posts= ()=>{
  fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => response.json())
  .then(data => {
    data.forEach(post => {
      const postElement = document.createElement('div');
      postElement.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.body}</p>
        <hr>
      `;
      postContainer.appendChild(postElement);
    });
  })
  .catch(error => console.error('Error fetching posts:', error)); 
};

window.onload = ()=>{
  posts();    
}




