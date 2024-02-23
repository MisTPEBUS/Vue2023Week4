
export default{
    props:['pagination','getProductData'],
    data() {
      return {
      };
    },
    mounted() {
    },
    methods: {      
    },
    template:` <div class="container" v-if="pagination.total_pages">
    <nav aria-label="Page navigation example" >
      <ul class="pagination justify-content-start">
        <li class="page-item disabled " :class="{myNavigation: pagination.has_pre}" @click="getProductData(pagination.current_page-1,'')" :disabled="!pagination.has_pre">
          <a class="page-link" tabindex="-1" >Previous</a>
        </li>
        <li :class="{active : page == pagination.current_page}" class="page-item myNavigation" v-for="page in pagination.total_pages" :key="page"><a class="page-link" @click="getProductData(page,'')">{{page}}</a></li>
        <li :class="{myNavigation: pagination.has_next}" class="page-item "  @click="getProductData(pagination.current_page+1,'')" :disabled="!pagination.has_next">
          <a class="page-link"  >Next</a>
        </li>
      </ul>
    </nav>
</div>`,
}