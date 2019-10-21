<template>
  <div id="add-blog">
    <form v-show="!submitted">
      <h2>Add a New Blog Post</h2>
      <label>Blog Title:</label>
      <input type="text" v-model.lazy="blog.title" required="true">
      <label>Blog content:</label>
      <textarea v-model.lazy="blog.content"></textarea>
      <!-- Checkbox section -->
      <div id="checkboxes"> 
        <label>1</label>
        <input type="checkbox" value="1" v-model="blog.categories">
        <label>2</label>
        <input type="checkbox" value="2" v-model="blog.categories">
        <label>3</label>
        <input type="checkbox" value="3" v-model="blog.categories">
        <label>4</label>
        <input type="checkbox" value="4" v-model="blog.categories">
      </div>
      <!-- Select box for authors -->
      <label>Authors:</label>
      <select v-model="blog.author">
        <option v-for="author of authors">{{ author }}</option>
      </select>

      <button v-on:click.prevent="post">Send form</button>
    </form>
    <div v-if="submitted">
      <h2>Thanks for submitting the form!</h2>
    </div>
    <!-- Preview for the blog -->
    <div id="preview">
      <h3>Preview Blog</h3>
      <p>Blog title: {{ blog.title }}</p>
      <p>Blog content:</p>
      <p>{{ blog.content }}</p>
      <p>Blog categories:</p>
      <ul>
        <li v-for="category of blog.categories">{{ category }}</li>
      </ul>
      <p>Blog author: {{ blog.author }}</p>
      
    </div>
    

  </div>
</template>

<script>
export default {

  components: {
  },
  
  data () {
    return {
       blog: {
        title: "",
        content: "", 
        categories: [], 
        author: ''
       }, 
       authors: ['The Net Ninja' , 'next1', 'next2'], 
       submitted: false
    }
  }, 

  methods: {
   post () {
    this.$http.post('https://vuejs-first-project-3ba8c.firebaseio.com/posts.json',this.blog).then((data) => {
      console.log(data);
      this.submitted = true;
    });
   }
  }
}
</script>

<style scoped>
  #add-blog *{
      box-sizing: border-box;
  }
  #add-blog{
      margin: 20px auto;
      max-width: 500px;
  }
  label{
      display: block;
      margin: 20px 0 10px;
  }
  input[type="text"], textarea{
      display: block;
      width: 100%;
      padding: 8px;
  }
  #preview{
      padding: 10px 20px;
      border: 1px dotted #ccc;
      margin: 30px 0;
  }
  h3{
      margin-top: 10px;
    }
  #checkboxes input {
    display: inline-block;
    margin-right: 10px;
  }
  #checkboxes label {
    display: inline-block;
  }
</style>
