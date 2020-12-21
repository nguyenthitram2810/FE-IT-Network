import { mapState } from 'vuex'
import moment from 'moment'

export default {
  async fetch() {
    this.fetchData()
  },

  computed: {
    ...mapState({
      user: (state) => state.auth.user,
      data: (state) => state.category.list, 
      listCity: (state) => state.city.listCity
    }),
  },

  data() {
    let validateHighestWage = (rule, value, callback) => {
      if (!parseInt(value)) {
        callback(new Error('Please input highest wage'));
      } else if (parseInt(value) < parseInt(this.form.lowestWage)) {
        callback(new Error("Highest wage must greater than lowest wage"));
      } else {
        callback();
      }
    };

    let validateLowestWage = (rule, value, callback) => {
      if (!parseInt(value)) {
        callback(new Error('Please input lowest wage'));
      } else if (parseInt(value) > parseInt(this.form.highestWage)) {
        callback(new Error("Lowest wage must less than highest wage"));
      } else {
        callback();
      }
    };

    return {
      listCate: [],
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
      other: '',
      upload: true,
      form: {
        name: null,
        lowestWage: '',
        highestWage: '',
        type: undefined,
        experience: '',
        cateIds: undefined,
        deadline: undefined,
        city: undefined,
        street: null,
        introImg: null,
        content: '',
      },
      rules: {
        name: [
          { required: true, message: 'Please input name job', trigger: 'blur' },
        ],
        highestWage: [
          { 
            required: true,
            validator: validateHighestWage, 
          },
        ],

        lowestWage: [
          { 
            required: true,
            validator: validateLowestWage, 
          },
        ],
        type: [{ required: true, message: 'Please select type job', trigger: 'change' }],
        cateIds: [{ required: true, message: 'Please select category job', trigger: 'change' }],
        deadline: [{ required: true, message: 'Please pick a date', trigger: 'change' }],
        city: [{ required: true, message: 'Please select city', trigger: 'change' }],
        street: [{ required: true, message: 'Please input street', trigger: 'blur' }],
        introImg: [{ required: true, message: 'Please select image', trigger: 'change' }],
        content: [{ required: true, message: 'Please input content job', trigger: 'blur' }],
      },
    }
  }, 

  methods: {
    handleError(err) {
      if(err.response) {
        this.$notification["error"]({
          message: 'ERROR',
          description:
            err.response.data.message
        });
      }
      else {
        this.$notification["error"]({
          message: 'ERROR',
          description:
            err.message
        });
      }
    },
    
    async fetchData() {
      try {
        await this.$store.dispatch('category/fetchListData')
        await this.$store.dispatch('city/getCity')
      }
      catch(error) {
        this.handleError(error)
      }
    },

    changeStringToTime(valueToChange){
      return moment(String(valueToChange)).format('YYYY-MM-DD')
    },

    onSubmit() {
      console.log(this.changeStringToTime(this.form.deadline));
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          console.log(this.form);
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    resetForm() {
      this.$refs.ruleForm.resetFields();
    },

    removeImage() {
      
    },

    previewFiles() {
      console.log("hihi");
    }
  }
}