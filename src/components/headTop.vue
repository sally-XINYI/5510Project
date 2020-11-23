<template>
    <div class="header_container">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/mainPage' }">MainPage</el-breadcrumb-item>
<!--			<el-breadcrumb-item v-for="(item, index) in $route.meta" key="index">{{item}}</el-breadcrumb-item>-->
		</el-breadcrumb>
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            MyPage<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command = "a">myPage</el-dropdown-item>
                <el-dropdown-item command="b">LogOut</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
<!--		<el-dropdown @command="handleCommand" menu-align='start'>-->
<!--&lt;!&ndash;			<img :src="baseImgPath + adminInfo.avatar" class="avator">&ndash;&gt;-->
<!--			<el-dropdown-menu slot="dropdown">-->
<!--				<el-dropdown-item command="home">myPage</el-dropdown-item>-->
<!--				<el-dropdown-item command="singout">Logout</el-dropdown-item>-->
<!--			</el-dropdown-menu>-->
<!--		</el-dropdown>-->
    </div>
</template>

<script>
    export default {
        data(){
            return {
                user: {
                    username: '请先登录',
                },
            }
        },
        methods: {
            handleCommand(command) {
                if(command === 'a'){
                    this.$router.push('myPage')
                }else if (command === 'b'){
                    this.$router.push('loginSystem')
                }
            },
        }
    }
	// import {signout} from '@/api/getData'
	// import {baseImgPath} from '@/config/env'
	// import {mapActions, mapState} from 'vuex'
    //
    // export default {
    // 	data(){
    // 		return {
    // 			baseImgPath,
    // 		}
    // 	},
    // 	created(){
    // 		if (!this.adminInfo.id) {
    // 			this.getAdminData()
    // 		}
    // 	},
    // 	computed: {
    // 		...mapState(['adminInfo']),
    // 	},
	// 	methods: {
	// 		...mapActions(['getAdminData']),
	// 		async handleCommand(command) {
	// 			if (command == 'home') {
	// 				this.$router.push('/myPage');
	// 			}else if(command == 'singout'){
	// 				const res = await signout()
	// 				if (res.status == 1) {
	// 					this.$message({
	//                         type: 'success',
	//                         message: '退出成功'
	//                     });
	//                     this.$router.push('/');
	// 				}else{
	// 					this.$message({
	//                         type: 'error',
	//                         message: res.message
	//                     });
	// 				}
	// 			}
	// 		},
	// 	}
    // }
</script>

<style lang="less">
	@import '../style/mixin';
	.header_container{
		background-color: #EFF2F7;
		height: 60px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 20px;
	}
	.avator{
		.wh(36px, 36px);
		border-radius: 50%;
		margin-right: 37px;
	}
	.el-dropdown-menu__item{
        text-align: center;
    }
</style>
