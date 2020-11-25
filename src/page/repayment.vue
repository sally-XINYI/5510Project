<template>
    <div>
        <head-top></head-top>
        <div style="width: 100%;height: 50px">
            <p style="margin-top: 20px; position:absolute; right:30px">{{systemDate}}</p>
        </div>
        <el-row style="margin-top: 20px;">
            <el-col :span="12" :offset="5">
                <el-form :model="repaymentForm" :rules="rules" ref="formData" label-width="110px" class="demo-formData">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label-width="220px" label="Outstanding Balance" prop="outstandingBalance">
                                <h3>{{repaymentForm.outstandingBalance}}</h3>
<!--                                <el-input v-model="repaymentForm.remainrepaymentamount"></el-input>-->
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label-width="220px" label="Outstanding Terms" prop="outstandingTerms">
                                <h3>{{repaymentForm.outstandingTerms}}</h3>
<!--                                <el-input v-model.number="repaymentForm.remaininginstallments"></el-input>-->
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label-width="220px"label="Payable" prop="newBalance">
                                <h3>{{repaymentForm.newBalance}}</h3>
<!--                                <el-input v-model.number="repaymentForm.nextrepaymentamount"></el-input>-->
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label-width="220px" label="Next Repayment Date" prop="nextrepaymentdate">
                                <h3>{{systemDate}}</h3>
<!--                                <el-input v-model.number="repaymentForm.nextrepaymentdate"></el-input>-->
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label-width="220px" label="Repayment Amount" prop="repaymentamount">
                        <el-input v-model.number="repaymentForm.repaymentamount"></el-input>
                    </el-form-item>
                </el-form>
                <el-button style="margin-top: 30px;margin-left: 200px" @click="onSubmit" type="primary">Submit</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import headTop from '@/components/headTop'
    // import {getRepyament} from '@/api/getData'
    // import {baseUrl, baseImgPath} from '@/config/env'
    export default {
        data(){
            return {
                repaymentForm: {
                    outstandingBalance: '',
                    outstandingTerms: '',
                    newBalance: '',
                    paymentDueDate: '',
                    repaymentamount: '',
                    ratio: '',
                    alreadyTerm :''
                },
                billForm: {
                    amount_total: '',
                    term_id: '',
                    captial: '',
                    interest: '',
                    _id: ''
                },
                systemDate: '',
            }
        },
        components: {
            headTop,
        },
        mounted(){
            this.initData();
        },
        created(){
            const _this = this
            // 由于要进行第一期还款 还款时间为2020-2-1
            let nowDate = new Date();
            console.log(_this.systemDate)
            console.log(localStorage.token)
            this.$axios({
                method: 'get',
                url: 'v1/bill',
                headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`},
                params: {
                    status: 'unsettle'
                }
            }).then(res => {
                // 全部还款计划
                console.log(res.data.data)
                // 本期还款计划
                console.log(res.data.data[0])
                _this.billForm = res.data.data[0]
                _this.repaymentForm.newBalance = _this.billForm.amount_total
                _this.repaymentForm.repaymentamount = _this.billForm.amount_total
                // 剩余还款金额
                _this.$axios.get("/v1/bill/rest",
                    {
                        headers :{'Authorization': `Bearer ${localStorage.getItem("token")}`}
                    }).then(res => {
                        _this.repaymentForm.outstandingBalance = res.data.data.amount
                })
                // 剩余还款期数
                for(var i = 0; i < res.data.data.length; i++){
                    console.log(i)
                }
                _this.repaymentForm.outstandingTerms = i
                console.log(_this.repaymentForm.outstandingBalance)
                console.log(_this.repaymentForm.outstandingTerms)
                _this.$axios.get("/v1/loan/current",
                    {
                        headers :{'Authorization': `Bearer ${localStorage.getItem("token")}`}
                    }).then(res => {
                    // 获取总摊还期限
                    console.log(res.data.data.term)
                    // 已经还的期限
                    var already_term = res.data.data.term - _this.repaymentForm.outstandingTerms
                    _this.repaymentForm.alreadyTerm = already_term
                    _this.$axios.get("/v1/loan/collateral-value",{
                        headers :{'Authorization': `Bearer ${localStorage.getItem("token")}`}
                    }).then(res => {
                        console.log(res.data.data)
                        _this.total_amount = res.data.data
                        _this.repaymentForm.ratio = (1 - _this.repaymentForm.outstandingBalance / _this.total_amount) * 100
                        // 绘制图像
                        _this.axisList = [{
                            ratio: _this.repaymentForm.ratio,
                            term: _this.repaymentForm.alreadyTerm
                        }]
                        console.log("画不出来的折线图")
                        // 读取现在localstorage中的数组arr
                        var arr = JSON.parse(localStorage.getItem("axis"))
                        console.log(arr)
                        for (var n = 0; n < arr.length; n++){
                            _this.axisList.push(arr[n])
                        }
                        // 将数据重新写入localstorage的axis中
                        _this.$store.commit('SET_AXIS',JSON.stringify(_this.axisList))
                    })
                    // 默认贷款申请时间2020-1-1, 进行第一期还款时就位2020-2-1
                    let date = {
                        year : '2020',
                        month: '2',
                        date: '1'
                    }
                    console.log(date);
                    console.log(already_term)
                    if(already_term < 1){
                        already_term = 0
                    }
                    if((2 + already_term) <= 12){
                        date.month = 2 + already_term
                        _this.systemDate = date.year + '-' +  date.month + '-' +  date.date;
                    }if((2 + already_term) > 12 && (2 + already_term) <= 24){
                        console.log("shijiandebug")
                        date.month = 2 + already_term -12
                        date.year = 2020 + 1
                        _this.systemDate = date.year + '-' +  date.month + '-' +  date.date;
                    }if((2 + already_term) > 24 && (2 + already_term) <= 36){
                        date.month = 2 +already_term -24
                        date.year = 2020 + 2
                        _this.systemDate = date.year + '-' +  date.month + '-' +  date.date;
                    }if((2 + already_term) > 36){
                        date.month = 2 +already_term -36
                        date.year = 2020 + 3
                        _this.systemDate = date.year + '-' +  date.month + '-' +  date.date;
                    }
                })
            })
        },
        methods: {
            submitcategoryForm(repaymentForm) {
                this.$refs[repaymentForm].validate(async (valid) => {
                    if (valid) {
                        const params = {
                        }
                        try{
                            const result = await addCategory(params);
                            if (result.status == 1) {
                                this.initData();
                                this.categoryForm.name = '';
                                this.categoryForm.description = '';
                                this.showAddCategory = false;
                                this.$message({
                                    type: 'success',
                                    message: '添加成功'
                                });
                            }
                        }catch(err){
                            console.log(err)
                        }
                    } else {
                        this.$notify.error({
                            title: '错误',
                            message: '请检查输入是否正确',
                            offset: 100
                        });
                        return false;
                    }
                });
            },
            onSubmit(){
                if(this.repaymentForm.newBalance === this.repaymentForm.repaymentamount){
                    this.$axios({
                        method: 'put',
                        url: 'v1/bill/' + this.billForm._id,
                        headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`}
                    }).then(res => {
                        console.log(res.data.data)
                        if(res.data.data != null){
                            const h = this.$createElement
                            this.$msgbox({
                                title: 'Success',
                                message: h('p', null, [
                                    h('span', null, 'Your repayment is success'),
                                ]),
                                confirmButtonText: 'Confirm',
                                beforeClose: (action, instance, done) => {
                                    if (action === 'confirm') {
                                        done()
                                        location.reload()
                                    }
                                }
                            })
                        }else{
                            const h = this.$createElement
                            this.$msgbox({
                                title: 'Alert',
                                message: h('p', null, [
                                    h('span', null, 'Your repayment is fail'),
                                ]),
                                confirmButtonText: 'Confirm',
                                beforeClose: (action, instance, done) => {
                                    if (action === 'confirm') {
                                        done()
                                        location.reload()
                                    }
                                }
                            })
                        }
                    })
                }else{
                    const h = this.$createElement
                    this.$msgbox({
                        title: 'Alert',
                        message: h('p', null, [
                            h('span', null, 'The repayment amount should equal to the Outstanding Balance.'),
                        ]),
                        confirmButtonText: 'Confirm',
                        beforeClose: (action, instance, done) => {
                            if (action === 'confirm') {
                                done()
                            }
                        }
                    })
                }
            }
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
