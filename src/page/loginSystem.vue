<template>
    <div class="login_page fillcontain">
        <transition name="form-fade" mode="in-out">
            <section class="form_contianer">
                <div class="manage_tip">
                    <p>Real-time Automated Lending System</p>
                </div>
                <el-form :model="loginSystemForm" :rules="rules" ref="loginSystemForm">
                    <el-form-item prop="username">
                        <el-input v-model="loginSystemForm.username" placeholder="UserName"><span>dsfsf</span></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" placeholder="Password" v-model="loginSystemForm.password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <router-link :to="{name :'mainPage'}">
                            <el-button type="primary" @click="submitForm('loginSystemForm')" class="submit_btn">Login</el-button>
                        </router-link>
                    </el-form-item>
                </el-form>
            </section>
        </transition>
    </div>
</template>

<script>
    export default {
        data() {
            var validatePsw = (rule, value, callback) => {
                if (value === ''){
                    callback(new Error('Please input password!'));
                }else{
                    callback();
                }
            };
            return{
                loginSystemForm: {
                    username: 'fintech',
                    password: '123456'
                },
                rules: {
                    password: [
                        {validator: validatePsw, trigger: 'blur'}
                    ],
                    username: [
                        {required: true, message:'Please input username!',trigger: 'blur'}
                    ]
                }
            }
        },
        created(){
            var data = ''
            this.$store.commit('SET_TOKEN', token)
        },
        methods: {
            submitForm(formName) {
                // this.$router.push('mainPage')
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        const _this = this;
                        // 连接后端
                        this.$axios.put("/v1/enterprise/login",
                            this.loginSystemForm).then((res)=>{
                            const token = res.data.data
                            // 将该用户的token存到本地
                            _this.$store.commit('SET_TOKEN', token)
                            console.log(res)
                            console.log(res.data)
                            console.log(localStorage.getItem(token))
                            _this.$router.push("/mainPage")
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
        // methods:{
        //     postdata:function () {
        //         var url="http://49.234.85.135:7001/v1/enterprise/login";
        //         //传到服务器的请求文体的数据， emulateJSON:true固定写法
        //         this.$http.post(url,{
        //                 "username": username,
        //                 "password": password
        //             },
        //             {
        //                 emulateJSON:true
        //             })
        //             .then(function(response){
        //                 console.log(response)
        //             })
        //
        //     }
        // }


    }
</script>

<style lang="less" scoped>
    @import '../style/mixin';
    .login_page{
        background-color: #324057;
    }
    .manage_tip{
        position: absolute;
        width: 100%;
        top: -100px;
        left: 0;
        p{
            font-size: 34px;
            color: #fff;
        }
    }
    .form_contianer{
        .wh(320px, 210px);
        .ctp(320px, 210px);
        padding: 25px;
        border-radius: 5px;
        text-align: center;
        background-color: #fff;
        .submit_btn{
            width: 100%;
            font-size: 16px;
        }
    }
    .tip{
        font-size: 12px;
        color: red;
    }
    .form-fade-enter-active, .form-fade-leave-active {
        transition: all 1s;
    }
    .form-fade-enter, .form-fade-leave-active {
        transform: translate3d(0, -50px, 0);
        opacity: 0;
    }
</style>
