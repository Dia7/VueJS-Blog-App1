 <template>
  <div v-theme:column="'wide'" id="show-blogs">
    <h1>List Blog Titles</h1>
    <input type="text" v-model="search" placeholder="search blogs" />
    <div v-for="blog in searchBlog"  class="single-blog"> 
      <h2 >{{ blog.title | to-uppercase }}</h2>
    </div>
  </div>
</template>

<script>
import searchMixin from '../mixins/searchMixin'

export default {
 
  components: {
 
  },
  
  data () {
    return { 
       blogs: [],
       search:''
    }
  },  

  created() {
    this.$http.get('https://vuejs-first-project-3ba8c.firebaseio.com/posts.json').then((data) => {
      console.log(data);
      this.blogs = data.body.slice(0, 10);
    });
  }, 

  computed: {

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
