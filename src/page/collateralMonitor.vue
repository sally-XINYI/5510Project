<template>
    <div>
        <head-top></head-top>
        <div style="width: 100%;height: 50px">
            <p style="margin-top: 20px; position:absolute; right:30px">{{systemDate}}</p>
        </div>
        <el-row style="margin-top: 20px;">
            <el-row :gutter="20">
                <el-col :span="6" style="margin-left: 50px">
                    Outstanding Terms<h3>{{repaymentForm.outstandingTerms}}</h3>
                </el-col>
                <el-col :span="6" style="margin-left: 50px">
                    New Balance<h3>{{repaymentForm.newBalance}}</h3>
                </el-col>
                <el-col :span="6" style="margin-left: 50px">
                    Ratio<h3>{{repaymentForm.ratio}}%</h3>
                </el-col>
                <el-button type="primary" @click="repay">Repay</el-button>
            </el-row>
        </el-row>
        <el-row style="margin-top: 20px;">
            <el-row :gutter="20">
                <el-col :span="3" style="margin-left: 20px">
                    <el-button @click="authenticate" type="primary">Authenticate</el-button>
                </el-col>
                <el-col :span="3">
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
            </el-row>
            <el-table
                :data="assetData"
                stripe
                style="width: 100%; margin-top: 30px">
                <el-table-column
                    prop="type"
                    label="Type"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="_id"
                    label="ID"
                    width="250">
                </el-table-column>
                <el-table-column
                    prop="presentvalue"
                    label="Present Value"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="collateralvalue"
                    label="Collateral Value"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="status"
                    label="Status"
                    width="180">
                </el-table-column>
            </el-table>
        </el-row>
<!--        <div id="chartLineBox" style="width: 90%;height: 70vh;"></div>-->
    </div>
</template>

<script>
    // import {cityGuess, addShop, searchplace, foodCategory} from '@/api/getData'
    // import {baseUrl, baseImgPath} from '@/config/env'
    import echarts from 'echarts'
    export default {
        data() {
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
                assetData: [{
                    type: '',
                    _id: '',
                    presentvalue: '',
                    collateralvalue: '',
                    status: ''
                }],
                billForm: {
                    amount_total: '',
                    term_id: '',
                    captial: '',
                    interest: '',
                    _id: '',
                    loan: ''
                },
                total_amount: '',
                uploadFiles: [],
                collateralList: [],
                systemDate: '',
                termList: [],
                ratioList: [],
                axisList: [{
                    ratio: '',
                    term: ''
                }],
                storageList: []
            }
        },
        created(){
            const _this = this
            console.log(localStorage.token)
            _this.storageList.push(_this.axisList)
            _this.$axios({
                method: 'get',
                url: 'v1/loan/all',
                headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`},
            }).then(res => {
                console.log(res.data.data)
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
                        // 获取抵押物总价值
                        _this.$axios.get("/v1/loan/collateral-value",{
                            headers :{'Authorization': `Bearer ${localStorage.getItem("token")}`}
                        }).then(res => {
                            console.log(res.data.data)
                            _this.total_amount = res.data.data
                            _this.repaymentForm.ratio = (1 - _this.repaymentForm.outstandingBalance / _this.total_amount) *100
                            if(_this.repaymentForm.ratio <= 5 && _this.repaymentForm.ratio >1 ){
                                this.$notify({
                                    title: 'Alert',
                                    message: 'Your asset ratio is low. Please supplement the collateral!',
                                    type: 'warning'
                                });
                            }else if(_this.repaymentForm.ratio <= 1 && _this.repaymentForm.ratio >0 ){
                                this.$notify({
                                    title: 'Alert',
                                    message: 'Your loan has been forcibly settled.',
                                    type: 'warning'
                                });
                            }
                        })
                    })
                    // 剩余还款期数
                    for(var i = 0; i < res.data.data.length; i++){
                        console.log(i)
                        console.log("look at me")
                    }
                    _this.repaymentForm.outstandingTerms = i
                    console.log(_this.repaymentForm.outstandingBalance)
                    console.log(_this.repaymentForm.outstandingTerms)
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
                        // 默认贷款申请时间2020-1-1, 进行第一期还款时就位2020-2-1
                        let date = {
                            year : '2020',
                            month: '2',
                            date: '1'
                        }
                        console.log(date);
                        console.log(already_term)
                        if((2 + already_term) <= 12){
                            date.month = 2 + already_term
                            _this.systemDate = date.year + '-' +  date.month + '-' +  date.date;
                        }if((2 + already_term) > 12 && (2 + already_term) <= 24){
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
                for(let i = 0; i < res.data.data.length; i++){
                    console.log(res.data.data[i].settle)
                    if (res.data.data[i].settle = 'false'){
                        // 获取全部抵押的资产信息
                        console.log(res.data.data[i].collateral)
                        // _this.assetData = res.data.data[i].collateral
                        console.log(res.data.data[i].collateral.length)
                        for (let k= 0;k < res.data.data[i].collateral.length; k++){
                            console.log("action!!")
                            _this.$set(_this.assetData, k, {type: res.data.data[i].collateral[k].type, _id: res.data.data[i].collateral[k]._id})
                            // 获取抵押资产的type
                            console.log(res.data.data[i].collateral[k].type)
                            if (res.data.data[i].collateral[k].type === 'real-estate'){
                                var asset_id = res.data.data[i].collateral[k]._id
                                var presentvalue = 0
                                var collateralvalue = 0
                                var status = 0
                                // 获取当前价值
                                _this.$axios({
                                    method: 'get',
                                    url: 'v1/enterprise/estate/' + asset_id + '/value',
                                    headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`},
                                    params: {raw: 'true'},
                                    data :{assetid : 'asset_id'}
                                }).then(res => {
                                    console.log(res.data.data)
                                    presentvalue = res.data.data
                                    console.log(asset_id)
                                    console.log(_this.assetData[k]._id)
                                    // 获取抵押时价值
                                    _this.$axios({
                                        method: 'get',
                                        url: 'v1/enterprise/estate/' + asset_id + '/value',
                                        headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`},
                                        params: {raw: 'false'},
                                        data :{assetid : 'asset_id'}
                                    }).then(res => {
                                        console.log(res.data.data)
                                        collateralvalue = res.data.data
                                        console.log(asset_id)
                                        console.log(_this.assetData[k]._id)
                                        console.log(presentvalue)
                                        // 获取押品状态
                                        _this.$axios.get("/v1/enterprise/estate",
                                            {
                                                headers :{'Authorization': `Bearer ${localStorage.getItem("token")}`}
                                            }).then(res => {
                                            console.log(res.data.data)
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
                                            for(var a = 0; a < res.data.data.length; a++){
                                                console.log(asset_id)
                                                if(res.data.data[a]._id === asset_id){
                                                    status = res.data.data[a].status
                                                    console.log("我真的找不到了")
                                                    console.log(status)
                                                }
                                            }
                                            if(asset_id = _this.assetData[k]._id){
                                                _this.$set(_this.assetData, k, {
                                                    type: 'real-estate',
                                                    _id: asset_id,
                                                    presentvalue: presentvalue,
                                                    collateralvalue: collateralvalue,
                                                    status: status
                                                })
                                            }
                                        })
                                    })
                                })
                            }else{
                                let assetType = res.data.data[i].collateral[k].type
                                let asset_id = res.data.data[i].collateral[k]._id
                                let presentvalue = 0
                                let collateralvalue = 0
                                let status = 0
                                // 获取当前价值
                                _this.$axios({
                                    method: 'get',
                                    url: 'v1/enterprise/'+ assetType + '/' + asset_id + '/value',
                                    headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`},
                                    params: {raw: 'true'},
                                    data :{assetid : 'asset_id'}
                                }).then(res => {
                                    console.log(res.data.data)
                                    presentvalue = res.data.data
                                    console.log(asset_id)
                                    console.log(_this.assetData[k]._id)
                                    // 获取抵押时价值
                                    _this.$axios({
                                        method: 'get',
                                        url: 'v1/enterprise/'+ assetType + '/' + asset_id + '/value',
                                        headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`},
                                        params: {raw: 'false'},
                                        data: {assetid: 'asset_id'}
                                    }).then(res => {
                                        console.log(res.data.data)
                                        collateralvalue = res.data.data
                                        console.log(asset_id)
                                        console.log(_this.assetData[k]._id)
                                        console.log(presentvalue)
                                        // 获取押品状态
                                        _this.$axios.get("/v1/enterprise/" + assetType,
                                            {
                                                headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`}
                                            }).then(res => {
                                            console.log(res.data.data)
                                            console.log(_this.repaymentForm.alreadyTerm)
                                            console.log(_this.repaymentForm.ratio)
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
                                            console.log(_this.axisList)
                                            console.log(_this.axisList.length)
                                            for (var a = 0; a < res.data.data.length; a++) {
                                                console.log(asset_id)
                                                if (res.data.data[a]._id === asset_id) {
                                                    status = res.data.data[a].status
                                                    console.log("我真的找不到了")
                                                    console.log(status)
                                                }
                                            }
                                            if (asset_id = _this.assetData[k]._id) {
                                                _this.$set(_this.assetData, k, {
                                                    type: assetType,
                                                    _id: asset_id,
                                                    presentvalue: presentvalue,
                                                    collateralvalue: collateralvalue,
                                                    status: status
                                                })
                                            }
                                        })
                                    })
                                })

                            }
                        }
                    }
                }
            })
        },
        methods :{
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
                            for (var i = 0; i < this.uploadFiles.length; i++) {
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
                                        if (res.data.data !== null) {
                                            this.$axios({
                                                method: 'put',
                                                url: 'v1/loan/' + this.billForm.loan + '/coll',
                                                headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`},
                                                data: {collateral: this.collateralList}
                                            }).then(res => {
                                                location.reload()
                                            })
                                            this.$notify({
                                                title: 'Success',
                                                message: h('p', null, [
                                                    h('i', {style: 'word-break: break-all'}, file.name + ' supplement successful.')]),
                                                type: 'success'
                                            });
                                        } else {
                                            this.$notify.error({
                                                title: 'Error',
                                                message: h('p', null, [
                                                    h('i', {style: 'word-break: break-all'}, file.name + ' is verify fail.')]),
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
            repay(){
                this.$axios({
                    method: 'put',
                    url: 'v1/bill/' + this.billForm._id,
                    headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`}
                }).then(res => {
                    console.log(res.data.data)
                    if (res.data.data != null) {
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
                    } else {
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
            }
        },
        mounted() {
            // 数据预处理
            // 读取现在localstorage中的数组arr
            var arr = JSON.parse(localStorage.getItem("axis"))
            var hash = [];
            for (var i = 0; i < arr.length; i++) {
                for (var j = i + 1; j < arr.length; j++) {
                    if (arr[i].ratio === arr[j].ratio && arr[i].term === arr[j].term ) {
                        ++i;
                    }
                }
                hash.push(arr[i])
            }
            console.log("我在mounted")
            console.log(hash)
            // this.chartLine = echarts.init(document.getElementById('chartLineBox'));
            // // 指定图表的配置项和数据
            // var option = {
            //     tooltip: {              //设置tip提示
            //         trigger: 'axis'
            //     },
            //     legend: {               //设置区分（哪条线属于什么）
            //         data:['ratio']
            //     },
            //     color: ['#FA6F53'],       //设置区分（每条线是什么颜色，和 legend 一一对应）
            //     xAxis: {                //设置x轴
            //         type: 'category',
            //         boundaryGap: false,     //坐标轴两边不留白
            //         // data: this.timeList,
            //         data: ['2019-1-1', '2019-2-1', '2019-3-1', '2019-4-1', '2019-5-1', '2019-6-1', '2019-7-1',],
            //         name: 'DATE',           //X轴 name
            //         nameTextStyle: {        //坐标轴名称的文字样式
            //             color: '#FA6F53',
            //             fontSize: 16,
            //             padding: [0, 0, 0, 20]
            //         },
            //         axisLine: {             //坐标轴轴线相关设置。
            //             lineStyle: {
            //                 color: '#FA6F53',
            //             }
            //         }
            //     },
            //     yAxis: {
            //         name: 'RATIO CHANGE',
            //         nameTextStyle: {
            //             color: '#FA6F53',
            //             fontSize: 16,
            //             padding: [0, 0, 10, 0]
            //         },
            //         axisLine: {
            //             lineStyle: {
            //                 color: '#FA6F53',
            //             }
            //         },
            //         type: 'value'
            //     },
            //     series: [
            //         {
            //             name: 'ratio',
            //             data:  [220, 232, 201, 234, 290, 230, 220],
            //             // 类型为折线图
            //             type: 'line',
            //             lineStyle: {
            //                 normal: {
            //                     color: '#8AE09F',
            //                 }
            //             },
            //         }
            //     ]
            // };
            // // 使用刚指定的配置项和数据显示图表。
            // this.chartLine.setOption(option);
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
