<template>
    <div>
        <head-top></head-top>
        <div style="margin-top:5px">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/mainPage' }">back</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-row style="margin-top: 20px;">
            <el-row :gutter="20">
                <el-col :span="8" style="margin-left: 50px">
                    Enterprise Name<h3>{{enterpriseBasicData.name}}</h3>
                </el-col>
                <el-col :span="8" style="margin-left: 100px">
                    Unified Social Credit Code<h3>{{enterpriseBasicData.credict_code}}</h3>
                </el-col>
            </el-row>
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick" style="margin-top: 30px">
                <el-tab-pane label="deposit" name="first">
                    <el-table
                        ref="multipleSelection2"
                        :data="depositData"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleSelectionChange2">
                        <el-table-column
                            type="selection"
                            width="55">
                        </el-table-column>
                        <el-table-column
                            prop="id"
                            label="ID"
                            width="100">
                        </el-table-column>
                        <el-table-column
                            prop="bank"
                            label="Bank"
                            width="100">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="Name"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="account"
                            label="Account"
                            width="150">
                        </el-table-column>
                        <el-table-column
                            prop="amount"
                            label="Amount"
                            width="100">
                        </el-table-column>
                        <el-table-column
                            prop="deposit_date"
                            label="Deposit Date"
                            width="150">
                        </el-table-column>
                        <el-table-column
                            prop="expiration_date"
                            label="Expiration Date"
                            width="150">
                        </el-table-column>
                        <el-table-column
                            prop="status"
                            label="Status"
                            width="150">
                        </el-table-column>
                        <el-table-column
                            fixed="right"
                            label="Operation"
                            show-overflow-tooltip>
                            <template slot-scope="scope">
                                <el-button @click="downloadDeposit" type="text" size="small">Download</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div style="margin-top: 30px">
                        <el-button @click="authentic2()">Authenticate</el-button>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="Real Estate" name="second">
                    <el-table
                        ref="multipleSelection1"
                        :data="realEstateData"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleSelectionChange1">
                        <el-table-column
                            type="selection"
                            width="55">
                        </el-table-column>
                        <el-table-column
                            prop="id"
                            label="ID"
                            width="100">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="Name"
                            width="200">
                        </el-table-column>
                        <el-table-column
                            prop="nature"
                            label="Nature"
                            width="150">
                        </el-table-column>
                        <el-table-column
                            prop="purchase_price"
                            label="Purchase Price"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="address"
                            label="Address"
                            width="120">
                        </el-table-column>
                        <el-table-column
                            prop="purchase_date"
                            label="Purchase Date"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="status"
                            label="Status"
                            width="150">
                        </el-table-column>
                        <el-table-column
                            fixed="right"
                            label="Operation"
                            show-overflow-tooltip>
                            <template slot-scope="scope">
                                <el-button @click="downloadRealEstate" type="text" size="small">Download</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div style="margin-top: 30px">
                        <el-button @click="authentic1()">Authenticate</el-button>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="receivables" name="third">
                    <el-table
                        ref="multipleSelection3"
                        :data="receivabelsData"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleSelectionChange3">
                        <el-table-column
                            type="selection"
                            width="55">
                        </el-table-column>
                        <el-table-column
                            prop="id"
                            label="ID"
                            width="100">
                        </el-table-column>
                        <el-table-column
                            prop="payer_name"
                            label="Payer Name"
                            width="140">
                        </el-table-column>
                        <el-table-column
                            prop="payer_industry"
                            label="Payer Industry"
                            width="140">
                        </el-table-column>
                        <el-table-column
                            prop="payer_nature"
                            label="Payer Nature"
                            width="140">
                        </el-table-column>
                        <el-table-column
                            prop="payee_name"
                            label="Payee Name"
                            width="130">
                        </el-table-column>
                        <el-table-column
                            prop="amount"
                            label="Amount"
                            width="100">
                        </el-table-column>
                        <el-table-column
                            prop="invoice_date"
                            label="Invoice Date"
                            width="135">
                        </el-table-column>
                        <el-table-column
                            prop="payment_due"
                            label="Payment Due"
                            width="135">
                        </el-table-column>
                        <el-table-column
                            prop="status"
                            label="Status"
                            width="150">
                        </el-table-column>
                        <el-table-column
                            fixed="right"
                            label="Operation"
                            show-overflow-tooltip>
                            <template slot-scope="scope">
                                <el-button @click="downloadReceivables" type="text" size="small">Download</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div style="margin-top: 30px">
                        <el-button @click="authentic3()">Authenticate</el-button>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </el-row>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                credict_code :'',
                name: '',
                enterpriseBasicData: [{
                    credit_code:'',
                    name:''
                }],
                realEstateData: [{
                    id: '1',
                    name: '1',
                    nature: '1',
                    purchase_price: '1',
                    address: '1',
                    purchase_date: '1',
                    status: '1',
                    is_authentic: ''
                }],
                depositData:[{
                    id: '2',
                    bank: '2',
                    name: '2',
                    account: '2',
                    amount: '2',
                    deposit_date: '2',
                    expiration_date: '2',
                    status: '2',
                    is_authentic: ''
                }],
                receivabelsData: [{
                    id: '3',
                    payer_name: '3',
                    payer_industry: '3',
                    payer_nature: '3',
                    payee_name: '3',
                    amount: '3',
                    invoice_date: '3',
                    payment_due: '3',
                    status: '3',
                    is_authentic: ''
                }],
                activeName:'first',
                input1: '',
                input2: '',
                multipleSelection1: [],
                multipleSelection2: [],
                multipleSelection3: [],
                year: '',
                month: '',
                day: ''
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
                    _this.enterpriseBasicData= res.data.data
            })
            _this.$axios.get("/v1/enterprise/deposit",
                {
                    headers :{'Authorization': `Bearer ${localStorage.getItem("token")}`}
                }).then(res => {
                console.log(res.data.data)
                _this.depositData = res.data.data
                // deposit_date expiration_date时间戳转换
                for(var i = 0; i < _this.depositData.length; i++){
                    _this.depositData[i].deposit_date = _this.depositData[i].deposit_date+'';
                    _this.depositData[i].expiration_date = _this.depositData[i].expiration_date+'';
                    _this.depositData[i].deposit_date = _this.depositData[i].deposit_date.length==10?_this.depositData[i].deposit_date*1000:_this.depositData[i].deposit_date
                    _this.depositData[i].expiration_date = _this.depositData[i].expiration_date.length==10?_this.depositData[i].expiration_date*1000:_this.depositData[i].expiration_date
                    var date = new Date(parseInt(_this.depositData[i].deposit_date));
                    var date1 = new Date(parseInt(_this.depositData[i].expiration_date));
                    console.log(date)
                    var y = date.getFullYear();
                    var m = date.getMonth() + 1;
                    m = m < 10 ? ('0' + m) : m;
                    var d = date.getDate();
                    d = d < 10 ? ('0' + d) : d;
                    var y1 = date1.getFullYear();
                    var m1 = date1.getMonth() + 1;
                    m1 = m1 < 10 ? ('0' + m1) : m1;
                    var d1 = date1.getDate();
                    d1 = d1 < 10 ? ('0' + d1) : d1;
                    _this.depositData[i].deposit_date = y + '-' + m + '-' + d
                    _this.depositData[i].expiration_date = y1 + '-' + m1 + '-' + d1
                    console.log(_this.depositData[i].deposit_date)
                }
            })
            _this.$axios.get("/v1/enterprise/estate",
                {
                    headers :{'Authorization': `Bearer ${localStorage.getItem("token")}`}
                }).then(res => {
                console.log(res.data.data)
                _this.realEstateData = res.data.data
                console.log("时间戳")
                console.log(_this.realEstateData.length)
                // purchase_date时间戳转换
                for(var i = 0; i < _this.realEstateData.length; i++){
                    console.log(_this.realEstateData[i].purchase_date)
                    _this.realEstateData[i].purchase_date = _this.realEstateData[i].purchase_date+'';
                    _this.realEstateData[i].purchase_date = _this.realEstateData[i].purchase_date.length==10?_this.realEstateData[i].purchase_date*1000:_this.realEstateData[i].purchase_date
                    var date = new Date(parseInt(_this.realEstateData[i].purchase_date));
                    console.log(date)
                    var y = date.getFullYear();
                    var m = date.getMonth() + 1;
                    m = m < 10 ? ('0' + m) : m;
                    var d = date.getDate();
                    d = d < 10 ? ('0' + d) : d;
                    _this.realEstateData[i].purchase_date = y + '-' + m + '-' + d
                    console.log(_this.realEstateData[i].purchase_date)
                }
            })
            _this.$axios.get("/v1/enterprise/receivable",
                {
                    headers :{'Authorization': `Bearer ${localStorage.getItem("token")}`}
                }).then(res => {
                console.log(res.data.data)
                _this.receivabelsData = res.data.data
                // invoice_date payment_due时间戳转换
                for(var i = 0; i < _this.receivabelsData.length; i++){
                    _this.receivabelsData[i].invoice_date = _this.receivabelsData[i].invoice_date+'';
                    _this.receivabelsData[i].payment_due = _this.receivabelsData[i].payment_due+'';
                    _this.receivabelsData[i].invoice_date = _this.receivabelsData[i].invoice_date.length==10?_this.receivabelsData[i].invoice_date*1000:_this.receivabelsData[i].invoice_date
                    _this.receivabelsData[i].payment_due = _this.receivabelsData[i].payment_due==10?_this.receivabelsData[i].payment_due*1000:_this.receivabelsData[i].payment_due
                    var date = new Date(parseInt(_this.receivabelsData[i].invoice_date));
                    var date1 = new Date(parseInt(_this.receivabelsData[i].payment_due));
                    console.log(date)
                    var y = date.getFullYear();
                    var m = date.getMonth() + 1;
                    m = m < 10 ? ('0' + m) : m;
                    var d = date.getDate();
                    d = d < 10 ? ('0' + d) : d;
                    var y1 = date1.getFullYear();
                    var m1 = date1.getMonth() + 1;
                    m1 = m1 < 10 ? ('0' + m1) : m1;
                    var d1 = date1.getDate();
                    d1 = d1 < 10 ? ('0' + d1) : d1;
                    _this.receivabelsData[i].invoice_date = y + '-' + m + '-' + d
                    _this.receivabelsData[i].payment_due = y1 + '-' + m1 + '-' + d1
                }
            })
        },
        methods :{
            download(){

            },
            handleSelectionChange1(val) {
                this.multipleSelection1 = val;
            },
            handleSelectionChange2(val) {
                this.multipleSelection2 = val;
            },
            handleSelectionChange3(val) {
                this.multipleSelection3 = val;
            },
            // real-estate资产认证
            authentic1(data, filename) {
                const _this = this
                this.$axios.get("/v1/cert/token").then(res => {
                    console.log(res.data.data)
                    const token1 = res.data.data
                    _this.$store.commit('SET_TOKEN1', token1)
                    // 用户点击认证后，认证中心首先会调用银行的随机数生成接口，随机生成一串带有时间信息的随机数
                    // 此处为了展示，我们要将生成的结果返回至前端
                    const h = this.$createElement;
                    this.$msgbox({
                        title: 'Success',
                        message: h('p', null, [
                            h('span', null, 'Your authentic code is '),
                            h('i', { style: 'color: teal; word-break: break-all' }, token1)
                        ]),
                        confirmButtonText: 'Next',
                        beforeClose: (action, instance, done) => {
                            for (var i = 0; i < this.multipleSelection1.length; i++) {
                                let halo = this.multipleSelection1[i];
                                console.log(halo)
                                console.log(i)
                                console.log(halo._id)
                                if (action === 'confirm') {
                                    this.$axios.post(
                                        "/v1/cert/signature/real-estate/" + halo._id,
                                        {
                                            token: localStorage.getItem(token1)
                                        }
                                    ).then(res => {
                                        console.log(res.data.data)
                                        console.log(i)
                                        console.log(halo._id)
                                        done()
                                        instance.confirmButtonText = 'loading...';
                                        setTimeout(() => {
                                            done();
                                            // 认证成功后系统弹出对话框提醒用户认证成功并下载证书，以及提醒用户1小时之内需要回到银行进行贷款申请
                                            if (res.data.data != 404) {
                                                // 将is_authentic标志设置为真
                                                halo.is_authentic = true
                                                this.$refs.multipleSelection1.clearSelection()
                                                this.$notify({
                                                    title: halo.id + '\n' + 'Authentic Success',
                                                    message: 'Please download the verification and apply for a loan in one hour.',
                                                    type: 'success'
                                                });
                                            } else {
                                                // 将is_authentic标志设置为假
                                                halo.is_authentic = false
                                                this.$notify.error({
                                                    title: halo.id + '\n' + 'Authentic Fail',
                                                    message: 'Please check your asset.',
                                                })
                                            }
                                            setTimeout(() => {
                                                instance.confirmButtonLoading = false;
                                            }, 100);
                                        }, 1000);
                                    })
                                }
                            }
                        }
                    });
                })
            },

            // deposit资产认证
            authentic2() {
                const _this = this
                this.$axios.get("/v1/cert/token").then(res => {
                    console.log(res.data.data)
                    const token1 = res.data.data
                    _this.$store.commit('SET_TOKEN1', token1)
                    // 用户点击认证后，认证中心首先会调用银行的随机数生成接口，随机生成一串带有时间信息的随机数
                    // 此处为了展示，我们要将生成的结果返回至前端
                    const h = this.$createElement;
                    this.$msgbox({
                        title: 'Success',
                        message: h('p', null, [
                            h('span', null, 'Your authentic code is '),
                            h('i', { style: 'color: teal; word-break: break-all' }, token1)
                        ]),
                        confirmButtonText: 'Next',
                        beforeClose: (action, instance, done) => {
                            // 用户点击next，系统生成带数字签名的证书，并把证书链接在download字段上
                            for (var i = 0; i < this.multipleSelection2.length; i++) {
                                let halo = this.multipleSelection2[i];
                                console.log(halo)
                                console.log(i)
                                console.log(halo._id)
                                if (action === 'confirm') {
                                    this.$axios.post(
                                        "/v1/cert/signature/deposit/" + halo._id,
                                        {
                                            token: localStorage.getItem(token1)
                                        }
                                    ).then(res => {
                                        console.log(res.data.data)
                                        console.log(i)
                                        console.log(halo._id)
                                        done()
                                        instance.confirmButtonText = 'loading...';
                                        setTimeout(() => {
                                            done();
                                            // 认证成功后系统弹出对话框提醒用户认证成功并下载证书，以及提醒用户1小时之内需要回到银行进行贷款申请
                                            if (res.data.data != 404) {
                                                // 将is_authentic标志设置为真
                                                halo.is_authentic = true
                                                this.$refs.multipleSelection2.clearSelection()
                                                this.$notify({
                                                    title: halo.id + '\n' + 'Authentic Success',
                                                    message: 'Please download the verification and apply for a loan in one hour.',
                                                    type: 'success'
                                                });
                                            } else {
                                                // 将is_authentic标志设置为假
                                                halo.is_authentic = false
                                                this.$notify.error({
                                                    title: halo.id + '\n' + 'Authentic Fail',
                                                    message: 'Please check your asset.',
                                                })
                                            }
                                            setTimeout(() => {
                                                instance.confirmButtonLoading = false;
                                            }, 100);
                                        }, 1000);
                                    })
                                }
                            }
                        }
                    });
                })
            },

            // receivable资产认证
            authentic3() {
                const _this = this
                this.$axios.get("/v1/cert/token").then(res => {
                    console.log(res.data.data)
                    const token1 = res.data.data
                    _this.$store.commit('SET_TOKEN1', token1)
                    // 用户点击认证后，认证中心首先会调用银行的随机数生成接口，随机生成一串带有时间信息的随机数
                    // 此处为了展示，我们要将生成的结果返回至前端
                    const h = this.$createElement;
                    this.$msgbox({
                        title: 'Success',
                        message: h('p', null, [
                            h('span', null, 'Your authentic code is '),
                            h('i', { style: 'color: teal; word-break: break-all' }, token1)
                        ]),
                        confirmButtonText: 'Next',
                        beforeClose: (action, instance, done) => {
                            for (var i = 0; i < this.multipleSelection3.length; i++) {
                                let halo = this.multipleSelection3[i];
                                console.log(halo)
                                console.log(i)
                                console.log(halo._id)
                                if (action === 'confirm') {
                                    this.$axios.post(
                                        "/v1/cert/signature/receivable/" + halo._id,
                                        {
                                            token: localStorage.getItem(token1)
                                        }
                                    ).then(res => {
                                        console.log(res.data.data)
                                        this.$refs.multipleSelection3.clearSelection()
                                        console.log(i)
                                        console.log(halo._id)
                                        done()
                                        instance.confirmButtonText = 'loading...';
                                        setTimeout(() => {
                                            done();
                                            // 认证成功后系统弹出对话框提醒用户认证成功并下载证书，以及提醒用户1小时之内需要回到银行进行贷款申请
                                            if (res.data.data != 404) {
                                                // 将is_authentic标志设置为真
                                                halo.is_authentic = true
                                                this.$notify({
                                                    title: halo.id + '\n' + 'Authentic Success',
                                                    message: 'Please download the verification and apply for a loan in one hour.',
                                                    type: 'success'
                                                });
                                            } else {
                                                // 将is_authentic标志设置为假
                                                halo.is_authentic = false
                                                this.$notify.error({
                                                    title: halo.id + '\n' + 'Authentic Fail',
                                                    message: 'Please check your asset.',
                                                })
                                            }
                                            setTimeout(() => {
                                                instance.confirmButtonLoading = false;
                                            }, 100);
                                        }, 1000);
                                    })
                                }
                            }
                        }
                    });
                })
            },
            // 下载real-estate认证
            downloadRealEstate(data, filename){
                const _this = this
                for (var i = 0; i < this.multipleSelection1.length; i++) {
                    var halo = this.multipleSelection1[i];
                    console.log(halo)
                    console.log(halo._id)
                    this.$axios.post(
                        "/v1/cert/signature/real-estate/" + halo._id,
                        {
                            token: localStorage.getItem("token1")
                        }
                    ).then(res => {
                        console.log(res.data.data)
                        const element = document.createElement('a')
                        // 当is_authentic为真时才能下载
                        if (halo.is_authentic === true) {
                            var blob = new Blob([res.data.data], {type: 'text/json'}),
                                e = document.createEvent('MouseEvents'),
                                a = document.createElement('a')
                            filename = halo.id
                            a.download = filename
                            a.href = window.URL.createObjectURL(blob)
                            a.dataset.downloadurl = ['text/json', a.download, a.href].join(':')
                            e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
                            a.dispatchEvent(e)
                        } else {
                            alert("Please Authenticate first!")
                        }
                    })
                }
            },

            // 下载deposit认证
            downloadDeposit(data, filename){
                const _this = this
                for (var i = 0; i < this.multipleSelection2.length; i++) {
                    var halo = this.multipleSelection2[i];
                    console.log(halo)
                    console.log(halo._id)
                    this.$axios.post(
                        "/v1/cert/signature/deposit/" + halo._id,
                        {
                            token: localStorage.getItem("token1")
                        }
                    ).then(res => {
                        console.log(res.data.data)
                        const element = document.createElement('a')
                        // 当is_authentic为真时才能下载
                        if(halo.is_authentic === true) {
                            var blob = new Blob([res.data.data], {type: 'text/json'}),
                                e = document.createEvent('MouseEvents'),
                                a = document.createElement('a')
                            filename = halo.id
                            a.download = filename
                            a.href = window.URL.createObjectURL(blob)
                            a.dataset.downloadurl = ['text/json', a.download, a.href].join(':')
                            e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
                            a.dispatchEvent(e)
                        }else{
                            alert("Please Authenticate first!")
                        }
                    })
                }
            },
            //下载receivable认证
            downloadReceivables(data, filename){
                const _this = this
                for (var i = 0; i < this.multipleSelection3.length; i++) {
                    var halo = this.multipleSelection3[i];
                    console.log(halo)
                    console.log(halo._id)
                    this.$axios.post(
                        "/v1/cert/signature/receivable/" + halo._id,
                        {
                            token: localStorage.getItem("token1")
                        }
                    ).then(res => {
                        console.log(res.data.data)
                        // 当is_authentic为真时才能下载
                        if(halo.is_authentic === true) {
                            const element = document.createElement('a')
                            var blob = new Blob([res.data.data], {type: 'text/json'}),
                                e = document.createEvent('MouseEvents'),
                                a = document.createElement('a')
                            filename = halo.id
                            a.download = filename
                            a.href = window.URL.createObjectURL(blob)
                            a.dataset.downloadurl = ['text/json', a.download, a.href].join(':')
                            e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
                            a.dispatchEvent(e)
                        }else{
                            alert("Please Authenticate first!")
                        }
                    })
                }
            }
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
    .el-table{
        font-size: 10px;
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
