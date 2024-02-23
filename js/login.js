import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

createApp({
  data() {
    return {
      isStoreAccount:false,
      user: {
        username: '',
        password: '',
      },
    }
  },
  mounted() {
    
    const username = document.cookie.replace(/(?:(?:^|.*;\s*)username\s*=\s*([^;]*).*$)|^.*$/, '$1');
    const isStoreAccount = document.cookie.replace(/(?:(?:^|.*;\s*)isStoreAccount\s*=\s*([^;]*).*$)|^.*$/, '$1');
    this.user.username = username;
    this.isStoreAccount = isStoreAccount;
  },
  
  methods: {
    login() {
     
      const api = 'https://vue3-course-api.hexschool.io/v2/admin/signin';
      axios.post(api, this.user).then((response) => {
      const { token, expired } = response.data;
        // 寫入 cookie token  expires 設置有效時間
       
        document.cookie = (this.isStoreAccount)
        ?`isStoreAccount=${this.isStoreAccount};username=${this.user.username};hexToken=${token};expires=${new Date(expired)}; path=/`
        :`hexToken=${token};expires=${new Date(expired)}; path=/`;
        window.location = 'products.html';
      }).catch((err) => {
        console.log(err)
        alert(err.response.data.message);
      });
    },
  },
}).mount('#app');