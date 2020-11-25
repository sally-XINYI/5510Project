<template>
    <div>
        <head-top></head-top>
        <div style="width: 100%;height: 50px">
            <p style="margin-top: 20px; position:absolute; right:30px">{{systemDate}}</p>
        </div>
        <el-row style="margin-top: 20px;">
            <el-row :gutter="20">
                <el-col :span="8" style="margin-left: 200px">
                    Outstanding Terms<h3>{{repaymentForm.outstandingTerms}}</h3>
                </el-col>
<!--                <el-col :span="6" style="margin-left: 50px">-->
<!--                    New Balance<h3>{{repaymentForm.newBalance}}</h3>-->
<!--                </el-col>-->
<!--                <el-col :span="6" style="margin-left: 50px">-->
<!--                    Ratio<h3>{{repaymentForm.ratio}}%</h3>-->
<!--                </el-col>-->
                <el-button type="primary" @click="repay">Next</el-button>
            </el-row>
        </el-row>
        <el-row style="margin-top: 20px;">
            <el-row :gutter="20">
                <el-col :span="4" style="margin-left: 20px">
                    <el-button @click="authenticate" type="primary">Authenticate Center</el-button>
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
                    prop="id"
                    label="ID"
                    width="200">
                </el-table-column>
                <el-table-column
                    prop="type"
                    label="Type"
                    width="250">
                </el-table-column>
                <el-table-column
                    prop="collateralvalue"
                    label="Collateral Value"
                    width="250">
                </el-table-column>
                <el-table-column
                    prop="presentvalue"
                    label="Present Value"
                    show-overflow-tooltip>
                </el-table-column>
            </el-table>
        </el-row>
        <div style="margin-top: 20px">
            <div id="chartLineBox" style="width: 90%;height: 70vh;"></div>
        </div>
    </div>
</template>

<script>
    import headTop from '@/components/headTop'
    import echarts from 'echarts'
    import authenticCenter from "./authenticCenter";
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
                    _id: '',
                    id: '',
                    type: '',
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
                        if(already_term < 1){
                            already_term = 0
                        }
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
                    console.log(res.data.data[i])
                    console.log("看")
                    if (res.data.data[i].settle === false){
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
                                let asset_id = res.data.data[i].collateral[k]._id
                                console.log("看id")
                                console.log(asset_id)
                                let presentvalue = 0
                                let collateralvalue = 0
                                let status = 0
                                let id = 0
                                // 获取当前价值
                                _this.$axios({
                                    method: 'get',
                                    url: 'v1/enterprise/estate/' + asset_id + '/value',
                                    headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`},
                                    params: {raw: 'true'},
                                    data :{assetid : 'asset_id'}
                                }).then(res => {
                                    console.log("获取完当前价值后的ID")
                                    console.log(asset_id)
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
                                        console.log("获取完抵押价值后的ID")
                                        console.log(asset_id)
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
                                            if(JSON.parse(localStorage.getItem("axis")) != null){
                                                var arr = JSON.parse(localStorage.getItem("axis"))
                                                console.log(arr)
                                                for (var n = 0; n < arr.length; n++){
                                                    _this.axisList.push(arr[n])
                                                }
                                            }
                                            // 将数据重新写入localstorage的axis中
                                            _this.$store.commit('SET_AXIS',JSON.stringify(_this.axisList))
                                            for (var a = 0; a < res.data.data.length; a++) {
                                                console.log(asset_id)
                                                if (res.data.data[a]._id === asset_id) {
                                                    id = res.data.data[a].id
                                                    status = res.data.data[a].status
                                                    console.log("我真的找不到了")
                                                    console.log(status)
                                                }
                                            }
                                            console.log("房产debug")
                                            console.log(id)
                                            if (asset_id = _this.assetData[k]._id) {
                                                _this.$set(_this.assetData, k, {
                                                    id : id,
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
                                let id = 0
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
                                            if(JSON.parse(localStorage.getItem("axis")) != null){
                                                var arr = JSON.parse(localStorage.getItem("axis"))
                                                console.log(arr)
                                                for (var n = 0; n < arr.length; n++){
                                                    _this.axisList.push(arr[n])
                                                }
                                            }
                                            // 将数据重新写入localstorage的axis中
                                            _this.$store.commit('SET_AXIS',JSON.stringify(_this.axisList))
                                            console.log(_this.axisList)
                                            console.log(_this.axisList.length)
                                            for (var a = 0; a < res.data.data.length; a++) {
                                                console.log(asset_id)
                                                if (res.data.data[a]._id === asset_id) {
                                                    id = res.data.data[a].id
                                                    status = res.data.data[a].status
                                                    console.log("我真的找不到了")
                                                    console.log(status)
                                                }
                                            }
                                            if (asset_id = _this.assetData[k]._id) {
                                                _this.$set(_this.assetData, k, {
                                                    id : id,
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
        components: {
            headTop,
        },
        methods :{
            authenticate(){
              this.$router.push('authenticCenter')
            },
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
                        location.reload()
                        // const h = this.$createElement
                        // this.$msgbox({
                        //     title: 'Success',
                        //     message: h('p', null, [
                        //         h('span', null, 'Your repayment is success'),
                        //     ]),
                        //     confirmButtonText: 'Confirm',
                        //     beforeClose: (action, instance, done) => {
                        //         if (action === 'confirm') {
                        //             done()
                        //             location.reload()
                        //         }
                        //     }
                        // })
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
            var arr = []
            console.log(arr)
            arr = JSON.parse(localStorage.getItem("axis"))
            // var hash = [];
            for(var i = 0; i < arr.length; i++){
                for(var j = i + 1; j < arr.length; j++){
                    if(arr[i].ratio === arr[j].ratio){
                        arr.splice(j,1)
                        j--
                    }
                }
            }
            console.log(arr)
            var chartList = []
            var ratio = []
            var term = []
            for (var k = 0; k < arr.length; k++) {
                if(arr[k].ratio != ''){
                    chartList.push(arr[k])
                }
            }
            for(var c = 0; c < chartList.length; c++){
                ratio.push(chartList[c].ratio)
                term.push(chartList[c].term)
            }
            // console.log(hash)
            console.log(chartList)
            console.log("hiiii")
            console.log(ratio)
            console.log(term)
            this.chartLine = echarts.init(document.getElementById('chartLineBox'));
            // 指定图表的配置项和数据
            var option = {
                //设置tip提示
                tooltip: {
                    trigger: 'axis'
                },
                // 设置区分（哪条线属于什么）
                legend: {
                    data:['ratio']
                },
                color: ['#a1bbd0'],
                // 设置X轴
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: term,
                    name: 'term',
                    nameTextStyle: {
                        color: '#a1bbd0',
                        fontSize: 16,
                        padding: [0, 0, 0, 20]
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#a1bbd0',
                        }
                    }
                },
                // 设置y轴
                yAxis: {
                    name: 'RATIO CHANGE',
                    nameTextStyle: {
                        color: '#a1bbd0',
                        fontSize: 16,
                        padding: [0, 0, 10, 0]
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#a1bbd0',
                        }
                    },
                    type: 'value'
                },
                series: [
                    {
                        name: 'ratio',
                        data: ratio,
                        // 类型为折线图
                        type: 'line',
                        lineStyle: {
                            normal: {
                                color: '#4c5867',
                            }
                        },
                    }
                ]
            };
            // 使用刚指定的配置项和数据显示图表。
            this.chartLine.setOption(option);
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
