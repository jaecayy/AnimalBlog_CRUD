const express = require('express');
const app = express();
const path = require('path');
const { v4: uuid } = require('uuid');

const methodOverride  = require('method-override');

app.set('view engine','ejs');
app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, '/views'));
app.use(express.json())
app.use(methodOverride('_method'));

let blogs = [
    {
      id: uuid(),
      image:
        "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YW5pbWFsfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      heading: "Tortoise",
      about: `Some quick example text to build on the card title and make up the
      bulk of the card's content`,
    },
    {
      id: uuid(),
      image:
        "https://images.unsplash.com/photo-1475809913362-28a064062ccd?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YW5pbWFsfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      heading: "ButterFly",
      about: `Some quick example text to build on the card title and make up the
      bulk of the card's content`,
    },
    {
      id: uuid(),
      image:
        "https://images.unsplash.com/photo-1474511320723-9a56873867b5?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGFuaW1hbHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      heading: "wolf",
      about: `Some quick example text to build on the card title and make up the
      bulk of the card's content`,
    },
    
  ];


app.get('/blogs', (req, res) => {
    
    res.render('blogs/index', { blogs });
})

// Getting a form for adding new comment
app.get('/blogs/new', (req, res) => {
    
    res.render('blogs/new');
})


// Creates a new comments
app.post('/blogs', (req, res) => {
    const { image,heading,about } = req.body;
    // const id = blogs.length;
    blogs.push({ image,heading, about,id:uuid()});
    res.redirect('/blogs');
})

// Show particular comment
app.get('/blogs/:id', (req, res) => {
    const { id } = req.params;
    const foundBlog = blogs.find(c => c.id===id);
    res.render('blogs/show',{blog:foundBlog});
})

// Get a form for editing comment

app.get('/blogs/:id/edit', (req, res) => {
    const { id } = req.params;
    const foundBlog = blogs.find(c => c.id === id);
    
    res.render('blogs/edit', { blog: foundBlog });
})


app.patch('/blogs/:id', (req, res) => {
    
    const { id } = req.params;
    const foundBlog = blogs.find(c => c.id === id);

    const updatedBlog = req.body.about;
    
    console.log(updatedBlog);

    foundBlog.about = updatedBlog;

    res.redirect('/blogs');
})

app.delete('/blogs/:id',(req,res)=>{
    
    const {id} = req.params;
    const temp = blogs.filter(c=>c.id!==id)
    blogs = temp;
    res.redirect('/blogs');
})

app.listen(3000, () => {
    console.log('server running at port 3000');
})

