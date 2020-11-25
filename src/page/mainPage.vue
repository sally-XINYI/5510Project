<template>
    <div>
        <head-top></head-top>
        <el-row style="margin-top: 20px;">
            <el-col :span="12" :offset="6">
                <el-row :gutter="50">
                    <el-col :span="20">
                        <el-form :model="mainData" :rules="rules" ref="formData" label-width="110px" class="demo-formData" style="margin-top: 20px">
                            <el-form-item label-width="200px" label="Name" prop="name">
                                <h3>{{enterpriseLoanData.name}}</h3>
<!--                                <el-input v-modeL="mainData.name"></el-input>-->
<!--                                <p>{{username.name}}</p>-->
                            </el-form-item>
                            <el-form-item label-width="200px" label="Unified Social Credit Code" prop="credict_code">
                                <h3>{{enterpriseLoanData.credict_code}}</h3>
<!--                                <el-input v-modeL="mainData.credict_code"></el-input>-->
<!--                                <p>{{username.credict_code}}</p>-->
                            </el-form-item>
                            <el-form-item label-width="200px" label="Collaterals Present Value" prop="legal_person">
                                <h3>{{collateral_value}}</h3>
                                <el-button type="primary"  @click="collateralMonitor">Collaterals Present Value</el-button>
<!--                                <p>{{username.lcollaterals_pv}}</p>-->
                            </el-form-item>
                            <el-form-item label-width="200px" label="Loan Amount" prop="reg_time">
                                <h3>{{loanData.amount}}</h3>
<!--                                <el-input v-modeL="mainData.loan_amount"></el-input>-->
<!--                                <p>{{username.loan_amount}}</p>-->
                            </el-form-item>
                            <el-form-item label-width="200px" label="Loan Term" prop="reg_capital">
                                <h3>{{loanData.term}}</h3>
<!--                                <el-input v-modeL="mainData.loan_term"></el-input>-->
<!--                                <p>{{username.loan_term}}</p>-->
                            </el-form-item>
                            <el-form-item label-width="200px" label="Total Amount Due" prop="reg_addr">
                                <h3>{{loanData.amount_due}}</h3>
<!--                                <el-input v-modeL="mainData.total_amount_due"></el-input>-->
<!--                                <p>{{username.total_amount_due}}</p>-->
                            </el-form-item>
                            <el-form-item label-width="200px" label="Repayment Method" prop="industry">
                                <h3>{{loanData.repay_method}}</h3>
<!--                                <el-input v-modeL="mainData.repayment_method"></el-input>-->
<!--                                <p>{{username.repayment_method}}</p>-->
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>
                <el-row style="margin-top: 20px">
                    <el-col :span="8">
                        <router-link :to="{name :'authenticCenter'}">
                            <el-button type="primary">Authentic Center</el-button>
                        </router-link>
                    </el-col>
                    <el-col :span="8">
                        <router-link :to="{name :'loanApplication'}">
                            <el-button type="primary">Loan Application</el-button>
                        </router-link>
                    </el-col>
                    <el-col :span="8">
                        <router-link :to="{name :'repayment'}">
                            <el-button type="primary">Repayment</el-button>
                        </router-link>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import headTop from '@/components/headTop'
    // import {cityGuess, addShop, searchplace, foodCategory} from '@/api/getData'
    // import {baseUrl, baseImgPath} from '@/config/env'
    export default {
        data() {
            return {
                squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
                // sizeList: ["large", "medium", "small"],
                mainData: {
                    // name: '',
                    // credict_code: '',
                    // collateral_pv: '',
                    // loan_amount : '',
                    // loan_term : '',
                    // total_amount_due: '',
                    // repayment_method: ''
                },
                enterpriseLoanData: {
                    credict_code: '',
                    name: ''
                },
                loanData: {
                    amount: '',
                    term: '',
                    repay_method: '',
                    amount_due: ''
                },
                collateral_value: ''
            }
        },
        components: {
            headTop,
        },
        created() {
            const _this = this
            console.log(localStorage.token)
            _this.$axios.get("/v1/enterprise/info",
                {
                    headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`}
                }).then(res => {
                console.log(res.data.data)
                _this.enterpriseLoanData = res.data.data
                if(res.data.data === null){
                    location.reload()
                }
            })
            _this.$axios({
                method: 'get',
                url: 'v1/loan/all',
                headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`},
            }).then(res => {
                for(let i = 0; i < res.data.data.length; i++){
                    console.log(res.data.data[i])
                    if(res.data.data[i].settle === false){
                        console.log("看")
                        console.log(res.data.data[i])
                        _this.loanData = res.data.data[i]
                    }
                }
            })
            _this.$axios.get("/v1/loan/collateral-value",{
                headers :{'Authorization': `Bearer ${localStorage.getItem("token")}`}
            }).then(res => {
                console.log(res.data.data)
                _this.collateral_value = res.data.data
            })
        },
        methods :{
            errorHandler(){
                return true
            },
            getMainPage(username){
                const _this = this
                _this.$axios.get("/"+username).then(res => {
                    console.log(res.data.mainData.name)
                    _this.name = res.data.mainData.name
                    _this.credict_code = res.data.mainData.credict_code
                    _this.collateral_pv = res.data.mainData.collateral_pv
                    _this.loan_amount = res.data.mainData.loan_amount
                    _this.loan_term = res.data.mainData.loan_term
                    _this.total_amount_due = res.data.mainData.total_amount_due
                    _this.repayment_method = res.data.mainData.repayment_method
                })
            },
            authentic(){
                this.$router.push('authenticCenter')
            },
            loanapplication(){
                this.$router.push('loanApplication')
            },
            repayment(){
                this.$router.push('repayment')
            },
            collateralMonitor(){
                this.$router.push('collateralMonitor')
            }
        },
        mounted() {
            this.initData();
        }
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
