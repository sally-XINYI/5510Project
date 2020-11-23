<template>
    <div>
        <head-top></head-top>
        <el-row style="margin-top: 20px;">
            <el-col :span="12" :offset="6">
                <el-row :gutter="50">
                    <el-col :span="20">

                        <el-form :model="enterpriseData" :rules="rules" ref="formData" label-width="110px" class="demo-formData" style="margin-top: 20px">
                            <el-form-item label-width="200px" label="Name" prop="name">
<!--                                <el-input v-modeL="enterpriseData.name"></el-input>-->
                                <h3>{{enterpriseData.name}}</h3>
                            </el-form-item>
                            <el-form-item label-width="200px" label="Credict Code" prop="credict_code">
<!--                                <el-input v-modeL="enterpriseData.credict_code"></el-input>-->
                                <h3>{{enterpriseData.credict_code}}</h3>
                            </el-form-item>
                            <el-form-item label-width="200px" label="Legal Person" prop="legal_person">
<!--                                <el-input v-modeL="enterpriseData.legal_person"></el-input>-->
                                <h3>{{enterpriseData.legal_person}}</h3>
                            </el-form-item>
                            <el-form-item label-width="200px" label="Registration Time" prop="reg_time">
<!--                                <el-input v-modeL="enterpriseData.reg_time"></el-input>-->
                                <h3>{{enterpriseData.reg_time}}</h3>
                            </el-form-item>
                            <el-form-item label-width="200px" label="Registration Capital" prop="reg_capital">
<!--                                <el-input v-modeL="enterpriseData.reg_captial"></el-input>-->
                                <h3>{{enterpriseData.reg_captial}}</h3>
                            </el-form-item>
                            <el-form-item label-width="200px" label="Registration Address" prop="reg_addr">
<!--                                <el-input v-modeL="enterpriseData.reg_addr"></el-input>-->
                                <h3>{{enterpriseData.reg_addr}}</h3>
                            </el-form-item>
                            <el-form-item label-width="200px" label="Industry" prop="industry">
<!--                                <el-input v-modeL="enterpriseData.industry"></el-input>-->
                                <h3>{{enterpriseData.industry}}</h3>
                            </el-form-item>
                        </el-form>
                    </el-col>
<!--                    <el-col :span="4" style="margin-top: 150px">-->
<!--                        <div class="demo-type" @click="collateralMonitor">-->
<!--                            <p>Remain Repayment Amount</p>-->
<!--                            &lt;!&ndash;                            <p>{{username.next_repayment_amount}}</p>&ndash;&gt;-->
<!--                        </div>-->
<!--                    </el-col>-->
                </el-row>
<!--                <el-row style="margin-top: 20px">-->
<!--                    <el-col :span="8">-->
<!--                        <router-link :to="{name :'authenticCenter'}">-->
<!--                            <el-button type="primary">Authentic Center</el-button>-->
<!--                        </router-link>-->
<!--                    </el-col>-->
<!--                    <el-col :span="8">-->
<!--                        <router-link :to="{name :'loanApplication'}">-->
<!--                            <el-button type="primary">Loan Application</el-button>-->
<!--                        </router-link>-->
<!--                    </el-col>-->
<!--                    <el-col :span="8">-->
<!--                        <router-link :to="{name :'repayment'}">-->
<!--                            <el-button type="primary">Repayment</el-button>-->
<!--                        </router-link>-->
<!--                    </el-col>-->
<!--                </el-row>-->
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    // import {cityGuess, addShop, searchplace, foodCategory} from '@/api/getData'
    // import {baseUrl, baseImgPath} from '@/config/env'
    export default {
        components: {
            headTop,
        },
        data() {
            return {
                squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
                // sizeList: ["large", "medium", "small"],
                enterpriseData: {
                    name: '',
                    credict_code: '',
                    legal_person: '',
                    reg_time: '',
                    reg_captial: '',
                    reg_addr: '',
                    industry: ''
                }
            }
        },
        created(){
            const _this = this
            console.log(localStorage.token)
            _this.$axios.get("/v1/enterprise/info",
                {
                    headers :{'Authorization': `Bearer ${localStorage.getItem("token")}`}
                }).then(res => {
                console.log(res.data.data)
                _this.enterpriseData = res.data.data
            })
        },
        methods :{
            errorHandler(){
                return true
            },
            // authentic(){
            //     this.$router.push('authenticCenter')
            // },
            // loanapplication(){
            //     this.$router.push('loanApplication')
            // },
            // repayment(){
            //     this.$router.push('repayment')
            // },
            // collateralMonitor(){
            //     this.$router.push('collateralMonitor')
            // }
        },
        // mounted() {
        //     this.initData();
        // }
    }
</script>

<style lang="less">
    @import '../style/mixin';
    .button_submit{
        text-align: center;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #20a0ff;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 120px;
        height: 120px;
        line-height: 120px;
        text-align: center;
    }
    .avatar {
        width: 120px;
        height: 120px;
        display: block;
    }
    .el-table .info-row {
        background: #c9e5f5;
    }

    .el-table .positive-row {
        background: #e2f0e4;
    }
</style>
