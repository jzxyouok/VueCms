<template>
    <header id="header-navbar" class="content-mini content-mini-full">
        <!-- Header Navigation Right -->
        <ul class="nav-header pull-right">
            <li>
                <a href="/" class="btn btn-default pull-right" data-toggle="tooltip" title="返回首页" data-placement="bottom">
                    <i class="si si-grid"></i>
                </a>
            </li>
            <li>
                <div class="btn-group">
                    <button class="btn btn-default btn-image dropdown-toggle" data-toggle="dropdown" type="button">
                        <img  :src="thisUser.avatar" :alt="thisUser.name">
                        <span class="caret"></span>
                    </button>
                    <ul class="dropdown-menu dropdown-menu-right">
                        <li class="dropdown-header">Profile</li>
                        <li>
                            <a tabindex="-1" href="base_pages_inbox.html">
                                <i class="si si-envelope-open pull-right"></i>
                                <span class="badge badge-primary pull-right">3</span>收件箱
                            </a>
                        </li>
                        <li>
                            <router-link tabindex="-1" :to="'/dashboard/profile'">
                                <i class="si si-user pull-right"></i>个人中心
                            </router-link>
                        </li>
                        <li class="divider"></li>
                        <li class="dropdown-header">Actions</li>
                        <li>
                            <a tabindex="-1" href="base_pages_lock.html">
                                <i class="si si-lock pull-right"></i>锁定账户
                            </a>
                        </li>
                        <li>
                            <a tabindex="-1" @click.prevent="doLogout" href="javascript:;">
                                <i class="si si-logout pull-right"></i>注销账户
                            </a>
                        </li>
                    </ul>
                </div>
            </li>
        </ul>
        <!-- END Header Navigation Right -->

        <!-- Header Navigation Left -->
        <ul class="nav-header pull-left">
            <li class="hidden-md hidden-lg">
                <!-- Layout API, functionality initialized in App() -> uiLayoutApi() -->
                <button class="btn btn-default" data-toggle="layout" data-action="sidebar_toggle" type="button">
                    <i class="fa fa-navicon"></i>
                </button>
            </li>
            <li class="hidden-xs hidden-sm">
                <!-- Layout API, functionality initialized in App() -> uiLayoutApi() -->
                <button class="btn btn-default" type="button" @click= 'sidebarMiniToggle'>
                    <i class="fa fa-ellipsis-v"></i>
                </button>
            </li>
            <li>
                <router-link :to="{ name: 'createPost' }" active-class='none' class="btn btn-default" data-toggle="tooltip" title="新增文章" data-placement="bottom">
                    <i class="si si-note"></i>
                </router-link>
            </li>
        </ul>
        <!-- END Header Navigation Left -->
    </header>
</template>

<script>
    export default {
        computed: {
            thisUser() {
                return this.$store.state.theUser;
            }
        },
        methods: {
            doLogout() {
                axios.post('/api/logout')
                    .then(function (res) {
                        if (res.data.code == 10000){
                            localStorage.removeItem("token");
                            window.location.href = "/login";
                        }else{
                            sweetAlert.error();
                        }
                    });
            },
            sidebarMiniToggle() {
                let winW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
                if (winW > 991){
                    $(this).toggleClass('sidebar-mini');
                }
                this.$store.commit('sidebarMiniToggle');
            }
        }
    }
</script>

<style>

</style>
