import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

let productModal = null;
let delProductModal = null;

createApp({
  data() {
    return {
      apiUrl: 'https://vue3-course-api.hexschool.io/v2',
      apiPath: 'lobinda',
      toastMsg:'',
      successAlert:false,
      products: [],
      isNew: false,
      tempProduct: {
        imagesUrl: [],
      },
    }
  },
  mounted() {
    productModal = new bootstrap.Modal(document.getElementById('productModal'), {
      keyboard: false
    });
    delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'), {
      keyboard: false
    });
    // 取出 Token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    axios.defaults.headers.common.Authorization = token;
    
    this.checkAdmin();
  },
  methods: {
    alertShow(){
      this.successAlert=true;
            setTimeout(() => 
            {
              this.successAlert=false;
            }
            , 3000); 
    },

    checkAdmin() {
      const url = `${this.apiUrl}/api/user/check`;
      axios.post(url)
        .then(() => {
          this.getProductData();
        })
        .catch((err) => {
          alert(err.response.data.message)
          window.location = 'login.html';
        })
    },
    getProductData() {
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/products/all`;
      axios.get(url).then((response) => {
        this.products = response.data.products;
      }).catch((err) => {
        alert(err.response.data.message);
      })
    },
    updateProduct() {
        //create Data
      this.toastMsg = '產品新增成功';
      let url = `${this.apiUrl}/api/${this.apiPath}/admin/product`;
      let http = 'post';
      if (!this.isNew) {
        //update Data
        url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`;
        http = 'put';
        this.toastMsg = '產品更新成功';
      }
      console.log(this.tempProduct);
      axios[http](url, { data: this.tempProduct }).then((response) => {
        this.alertShow();
        productModal.hide();
        this.getProductData();
      }).catch((err) => {
        alert(err.response.data.message);
      })
    },
    delProduct() {
      this.toastMsg = '產品刪除成功';      
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`;
      axios.delete(url).then((response) => {
        this.alertShow();
        delProductModal.hide();
        this.getProductData();
      }).catch((err) => {
        alert(err.response.data.message);
      })
    },
    createImages() {
      this.tempProduct.imagesUrl = [];
      this.tempProduct.imagesUrl.push('');
    },
    openModal(isNew, item) {
      this.isNew = false;
      if (isNew === 'new') {
        this.tempProduct = {
          imagesUrl: [],
        };
        this.tempProduct = {};
        this.isNew = true;
        productModal.show();
      }
      else if (isNew === 'edit') {
        this.tempProduct = { ...item };       
        productModal.show();
      }
      else if (isNew === 'delete') {
        this.tempProduct = { ...item };
        delProductModal.show()
      }
    },
  
  },
}).mount('#app');

