<template>
    <div id="page-container" class="sidebar-l sidebar-o side-scroll header-navbar-fixed" :class="{ 'sidebar-mini' : isMini }">

        <Sidebar></Sidebar>
        <HeaderBar></HeaderBar>
        <main id="main-container">
            <transition mode="out-in" enter-active-class="animated lightSpeedIn" leave-active-class="animated lightSpeedOut">
                <router-view></router-view>
            </transition>
        </main>
        <FooterBar></FooterBar>
    </div>
</template>

<script>
    import Sidebar from '../components/layouts/Sidebar.vue';
    import HeaderBar from '../components/layouts/HeaderBar.vue';
    import FooterBar from '../components/layouts/FooterBar.vue';

    export default {
        components: {
            Sidebar,
            HeaderBar,
            FooterBar,
        },
        created() {
            let _self = this;
            // 获取当前用户信息
            axios.get('/api/profile')
                .then(function (res) {
                    _self.$store.state.theUser = res.data.data;
                })
                .catch(function (res) {
                    console.log(res);
                });            
        },
        mounted() {
            let hWindow     = $(window).height();
            let hHeader     = $('#header-navbar').outerHeight();
            let hFooter     = $('#page-footer').outerHeight();

            if ($('#page-container').hasClass('header-navbar-fixed')) {
                $('#main-container').css('min-height', hWindow - hFooter);
            } else {
                $('#main-container').css('min-height', hWindow - (hHeader + hFooter));
            }
        },
        computed: {
            isMini() {
                return this.$store.state.isMini;
            }
        }
    }
</script>