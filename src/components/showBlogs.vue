<template>
  <div v-theme:column="'wide'" id="show-blogs">
    <h1>All Blog Articles</h1>
    <input type="text" v-model="search" placeholder="search blogs" />
    <div v-for="blog in searchBlog"  class="single-blog"> 
      <router-link v-bind:to="'/blog/' + blog.id"><h2 v-rainbow>{{ blog.title | to-uppercase }}</h2></router-link>
      <article>{{ blog.content | snippet }}</article>
    </div>
  </div>
</template>

<script>
import searchMixin from '../mixins/searchMixin'

export default {
 
  components: {
 
  },
  
  data() {
    return { 
       blogs: [],
       search:''
    }
  },  

  created() {
    this.$http.get('https://vuejs-first-project-3ba8c.firebaseio.com/posts.json').then(function(data) {
      return data.json();
    }).then(function(data) {
      var blogsArray = [];
      for (let key in data){
        data[key].id = key;
        blogsArray.push(data[key]);
      }
      this.blogs = blogsArray;
    });
  }, 



  filters: {
    'to-uppercase':function(value) {
      return value.toUpperCase();
    }, 
    'snippet': function(value) {
      return value.slice(0, 100) + '...';
    }
  },
  directives: {
    'rainbow':{
      bind(el, binding, vnode){
          el.style.color = "#" + Math.random().toString().slice(2,8);
      }
    }
  },
  mixins: [searchMixin]
  
}
</script>

<style scoped>
  #show-blogs {
    max-width: 800px;
    margin: 0 auto;
  }

  .single-blog{
    padding: 20px;
    margin: 20px 0;
    box-sizing: border-box;
    background: #eee;
  }
</style>
