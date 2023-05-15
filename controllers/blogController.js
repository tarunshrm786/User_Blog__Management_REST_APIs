const Blog = require('../models/blog');
const mongoose = require('mongoose');


const getBlogs = async (req, res) => {
    try {
      // Retrieve all blogs using the Blog model
      const blogs = await Blog.find();
      
      // Return the list of blogs in the response
      res.json({ message: 'Retrieved list of all blogs', blogs });
    } catch (error) {
      // If an error occurs during retrieval, return a 500 error
      res.status(500).json({ error: 'Failed to retrieve blogs' });
    }
  };
  
  
  const getBlogById = async (req, res) => {
    try {
      const blogId = req.params.id;
      
      // Find the blog by its ID using the Blog model
      const blog = await Blog.findById(blogId);
      
      if (!blog) {
        // If the blog is not found, return a 404 error
        return res.status(404).json({ error: 'Blog not found' });
      }
      
      // If the blog is found, return it in the response
      res.json({ message: 'Retrieved blog', blog });
    } catch (error) {
      // If an error occurs during retrieval, return a 500 error
      res.status(500).json({ error: 'Failed to retrieve blog' });
    }
  };
  
  
  const createBlog = async (req, res) => {
    try {
      const { title, content, images } = req.body;
  
      // Assuming you are using the Blog model
      const newBlog = new Blog({
        title,
        content,
        images
      });
  
      console.log(newBlog);

      // Save the new blog to the database
      const savedBlog = await newBlog.save();
  
      res.status(201).json({ message: 'Created a new blog', blog: savedBlog });
    }
     catch (error) {
        console.error('Failed to create blog:', error);
      res.status(500).json({ error: 'Failed to create blog'});
    }
  };
  
  
  const updateBlogById = async (req, res) => {
    try {
      const blogId = req.params.id;
      const { title, content, images } = req.body;
      
      // Find the blog by its ID and update its properties
      const updatedBlog = await Blog.findByIdAndUpdate(
        blogId,
        { title, content, images },
        { new: true }
      );
      
      if (updatedBlog) {
        // If the blog was found and updated, return the updated blog
        res.json({ message: `Updated blog with ID: ${blogId}`, blog: updatedBlog });
      } else {
        // If the blog was not found, return a 404 error
        res.status(404).json({ error: 'Blog not found' });
      }
    } catch (error) {
      // If an error occurs during the update, return a 500 error
      res.status(500).json({ error: 'Failed to update blog' });
    }
  };

  
  
  const deleteBlogById = async (req, res) => {
    try {
      const blogId = req.params.id;
      
      // Find the blog by its ID and delete it
      const deletedBlog = await Blog.findByIdAndDelete(blogId);
      
      if (deletedBlog) {
        // If the blog was found and deleted, return a success message
        res.json({ message: `Deleted blog with ID: ${blogId}` });
      } else {
        // If the blog was not found, return a 404 error
        res.status(404).json({ error: 'Blog not found' });
      }
    } catch (error) {
      // If an error occurs during deletion, return a 500 error
      res.status(500).json({ error: 'Failed to delete blog' });
    }
  };
  
  
  module.exports = {
    getBlogs,
    getBlogById,
    createBlog,
    updateBlogById,
    deleteBlogById
  };

