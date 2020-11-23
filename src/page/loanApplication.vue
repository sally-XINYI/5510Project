<template>
    <div>
        <head-top></head-top>
        <div style="width: 100%;height: 50px">
            <p style="margin-top: 20px; position:absolute; right:30px">{{systemDate}}</p>
        </div>
        <el-row style="margin-top: 20px;">
            <el-col :span="12" :offset="6" style="margin-top: 20px">
                <el-form label-width="110px" class="demo-formData">
                    <el-form-item label-width="200px" label="Your maximum loanable" prop="max_amount">
                        <h4>{{this.max_amount}}</h4>
                    </el-form-item>
                </el-form>
                <el-form :model="enterpriseLoanData" ref="loanData" label-width="110px" class="demo-formData">
                    <el-form-item label-width="200px" label="Business Registration No." prop="businessregistration">
                        <h3>{{enterpriseLoanData.credict_code}}</h3>
                    </el-form-item>
                    <el-form-item label-width="200px" label="Enterprise Name" prop="enterprisename">
                        <h3>{{enterpriseLoanData.name}}</h3>
                    </el-form-item>
                </el-form>
                <el-form :model="loanData" ref="loanData" label-width="110px" class="demo-formData">
                    <el-form-item label-width="200px" label="Loan Amount" prop="loanamount">
                        <el-input v-model="loanData.loan_amount"></el-input>
                    </el-form-item>
                    <el-form-item label-width="200px" label="Period">
                        <el-select v-model="value" placeholder="Please select">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label-width="200px" label="Repayment Type">
                        <el-select v-model="value1" placeholder="Please select">
                            <el-option
                                v-for="item in options1"
                                :key="item.value1"
                                :label="item.label1"
                                :value="item.value1">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <el-row>
                    <el-col :span="12" style="margin-top: 20px; margin-left: 50px">
                        <el-upload
                            ref="upload"
                            action="alert"
                            multiple
                            :limit="3"
                            :auto-upload="false"
                            :file-list="uploadFiles"
                            :on-change="loadJsonFromFile"
                            :on-remove="removeFile">
                            <el-button type="primary">Upload Asset</el-button>
                        </el-upload>
                    </el-col>
                    <el-col :span="6" style="margin-top: 20px">
                        <el-button @click="submitLoan" type="primary">Submit</el-button>
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
    const request = require('superagent');
    export default {
        data(){
            return {
                city: {},
                enterpriseLoanData: {
                  credict_code: '',
                  name: ''
                },
                loanData: {
                    loan_amount:'',
                },
                options: [{
                    value: '7 days',
                    label: '7 days'
                }, {
                    value: '14 days',
                    label: '14 days'
                }, {
                    value: '30 days',
                    label: '30 days'
                }, {
                    value: '60 days',
                    label: '60 days'
                }, {
                    value: '90 days',
                    label: '90 days'
                }, {
                    value: '180 days',
                    label: '180 days'
                }, {
                    value: '270 days',
                    label: '270 days'
                }, {
                    value: '1 year',
                    label: '1 year'
                }, {
                    value: '2 years',
                    label: '2 years'
                }, {
                    value: '3 years',
                    label: '3 years'
                }],
                value: '',
                options1: [{
                    value1: 'Lump Sum',
                    label1: 'Lump Sum'
                }, {
                    value1: 'By Installment',
                    label1: 'By Installment'
                }],
                value1: '',
                uploadFiles: [],
                collateralList: [],
                max_amount: '0',
                systemDate: ''
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
                _this.enterpriseLoanData = res.data.data
            })
            _this.$axios.get("/v1/loan/current",
                {
                    headers :{'Authorization': `Bearer ${localStorage.getItem("token")}`}
                }).then(res => {
                console.log(res.data.data)
                if(res.data.data !== null){
                    const h = this.$createElement
                    this.$msgbox({
                        title: 'Alert',
                        message: h('p', null, [
                            h('span', null, 'You have unsettle loan! '),
                        ]),
                        confirmButtonText: 'Confirm',
                        beforeClose: (action, instance, done) => {
                            done()
                        }
                    })
                }
            })

            // 用2020-1-1初始化贷款申请时间
            let nowDate = new Date();
            let date = {
                year : '2020',
                month: '1',
                date: '1'
                // // 系统年
                // year: nowDate.getFullYear(),
                // // 系统月
                // month: nowDate.getMonth() + 1,
                // // 系统天
                // date: nowDate.getDate(),
            }
            _this.systemDate = date.year + '-' +  date.month + '-' +  date.date;
            console.log(_this.systemDate)
        },
        components: {
            headTop,
        },
        methods: {
            loadJsonFromFile(file, fileList) {
                this.uploadFiles = fileList
                this.collateralList = []
                console.log(fileList)
                const h = this.$createElement
                this.$msgbox({
                    title: 'Success',
                    message: h('p', null, [
                        h('span', null, 'Submit Success. '),
                    ]),
                    confirmButtonText: 'Verify',
                    beforeClose: (action, instance, done) => {
                        if (action === 'confirm') {
                            done()
                            this.max_amount = 0
                            // 对文件列表进行资产认证
                            for(var i = 0; i<this.uploadFiles.length; i++) {
                                let file = this.uploadFiles[i]
                                let reader = new FileReader()
                                reader.readAsText(file.raw)
                                reader.onload = (e) => {
                                    // 读取文件内容
                                    const fileString = e.target.result
                                    // 控制台打印文件内容
                                    console.log(fileString)
                                    console.log("action!!")
                                    this.collateralList.push(fileString)
                                    console.log(this.collateralList)
                                    this.$axios.put("/v1/cert/signature/verify",
                                        {
                                            data: fileString
                                        }
                                    ).then((res) => {
                                        console.log(res.data.data)
                                        if(res.data.data !== null){
                                            if(res.data.data.data.type === 'real-estate'){
                                                type = 'estate'
                                            }else{
                                                var type = res.data.data.data.type
                                            }
                                            this.$axios.get("/v1/enterprise/" + type + "/" + file.name + "/value",
                                                {
                                                    headers :{'Authorization': `Bearer ${localStorage.getItem("token")}`}
                                                }
                                            ).then((res) => {
                                                console.log(res.data.data)
                                                this.max_amount = this.max_amount + res.data.data
                                            })
                                            this.$notify({
                                                title: 'Success',
                                                message: h('p', null, [
                                                    h('i', { style: 'word-break: break-all' }, file.name + ' is verify successful.')]),
                                                type: 'success'
                                            });
                                        } else{
                                            this.$notify.error({
                                                title: 'Error',
                                                message: h('p', null, [
                                                    h('i', { style: 'word-break: break-all' }, file.name + ' is verify fail.')]),
                                            });
                                        }
                                    })
                                    setTimeout(() => {
                                        done();
                                        setTimeout(() => {
                                            instance.confirmButtonLoading = false;
                                        }, 300);
                                    }, 3000);
                                }
                            }
                        }
                    }
                });
            },
            removeFile(file, fileList){
                this.uploadFiles = fileList
                this.collateralList = []
                const h = this.$createElement
                this.$msgbox({
                    title: 'Warning',
                    message: h('p', null, [
                        h('span', null, 'Do you really want to remove the file?'),
                    ]),
                        confirmButtonText: 'Yes',
                    beforeClose: (action, instance, done) => {
                        if (action === 'confirm') {
                            done()
                            this.max_amount = 0
                            // 对文件列表进行资产认证
                            if(this.uploadFiles.length !== 0) {
                                for (var i = 0; i < this.uploadFiles.length; i++) {
                                    let file = this.uploadFiles[i]
                                    let reader = new FileReader()
                                    reader.readAsText(file.raw)
                                    reader.onload = (e) => {
                                        // 读取文件内容
                                        const fileString = e.target.result
                                        // 控制台打印文件内容
                                        console.log(fileString)
                                        console.log("finish delete")
                                        this.collateralList.push(fileString)
                                        console.log(this.collateralList)
                                        this.$axios.put("/v1/cert/signature/verify",
                                            {
                                                data: fileString
                                            }
                                        ).then((res) => {
                                            console.log(res.data.data)
                                            if (res.data.data !== null) {
                                                if(res.data.data.data.type === 'real-estate'){
                                                    type = 'estate'
                                                }else{
                                                    var type = res.data.data.data.type
                                                }
                                                this.$axios.get("/v1/enterprise/" + type + "/" + file.name + "/value",
                                                    {
                                                        headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`}
                                                    }
                                                ).then((res) => {
                                                    console.log(res.data.data)
                                                    this.max_amount = this.max_amount + res.data.data
                                                })
                                            }
                                        })
                                    }
                                }
                            }else{
                                this.max_amount = 0
                                this.collateralList = []
                                console.log(this.collateralList)
                            }
                        }
                    }
                })
            },
            submitLoan(){
                var period = 0
                // 期限格式转换
                if(this.value === '7 days'){
                    period = 0.25
                }else if(this.value === '14 days'){
                    period = 0.5
                }else if(this.value === '30 days'){
                    period = 1
                }else if(this.value === '60 days'){
                    period = 2
                }else if(this.value === '90 days'){
                    period =3
                }else if(this.value === '180 days'){
                    period = 6
                }else if(this.value === '270 days'){
                    period = 9
                }else if(this.value === '1 year'){
                    period = 12
                }else if(this.value === '2 years'){
                    period = 24
                }else if(this.value === '3 years'){
                    period = 36
                }
                // 校验申请字段是否为空
                if(this.loanData.loan_amount === '' || this.value === '' || this.value1 === '') {
                    const h1 = this.$createElement
                    this.$msgbox({
                        title: 'Alert',
                        message: h1('p', null, [
                            h1('span', null, 'Please check your information'),
                        ]),
                        confirmButtonText: 'Confirm',
                        beforeClose: (action, instance, done) => {
                            if (action === 'confirm') {
                                done()
                            }
                        }
                    })
                }else{
                    // 校验申请金额是否大于上限
                    if(this.max_amount >= this.loanData.loan_amount) {
                        this.$axios({
                            method: 'post',
                            url: 'v1/loan',
                            headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`},
                            data: {
                                amount: parseInt(this.loanData.loan_amount),
                                period: period,
                                type: this.value1,
                                collateral: this.collateralList
                            }
                        }).then(res => {
                            console.log(res.data.data)
                            // 校验贷款申请是否成功
                            if(res.data.data !== null){
                                const h = this.$createElement
                                this.$msgbox({
                                    title: 'Success',
                                    message: h('p', null, [
                                        h('span', null, 'Your application has been submitted the loan amount is '+this.loanData.loan_amount),
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
                                const h2 = this.$createElement
                                this.$msgbox({
                                    title: 'Alert',
                                    message: h2('p', null, [
                                        h2('span', null, 'Your application is fail.'),
                                    ]),
                                    confirmButtonText: 'Confirm',
                                    beforeClose: (action, instance, done) => {
                                        if (action === 'confirm') {
                                            done()
                                        }
                                    }
                                })
                            }
                        })
                    }else{
                        const h1 = this.$createElement
                        this.$msgbox({
                            title: 'Alert',
                            message: h1('p', null, [
                                h1('span', null, 'Please check your information'),
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
        },
        mounted(){
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
