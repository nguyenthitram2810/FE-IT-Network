export default {
  layout: "admin",
  data() {
    return {
      form: {
        name: '', 
        email: '',
      }
    };
  }, 
  created() {
    this.$store.commit("admin/SET_BREADCRUMB", ["Profile"])
    //getProfile()
  },
  methods: {
    // getProfile(){
      
    // }
  },
}