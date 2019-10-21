export default {
	computed: {
		searchBlog() {
        	return this.blogs.filter((blog) => {
          		return blog.title.match(this.search);
        }); 
      }
	}
}