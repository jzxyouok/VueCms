<template>
	<div>
        <page-heading title="所有文章" subTitle="All Articles" :crumbs="crumbs"></page-heading>
        <div class="content">
	     	<div class="block">
	     		<div class="block-header">
	     			<div class="row">
	     				<div class="col-sm-6 filter-bar">
		     				<filter-bar></filter-bar>
		     			</div>
		     			<div class="col-sm-6">
		     				<router-link to="/dashboard/post/create" class="btn btn-minw btn-info pull-right">
								写文章
		     				</router-link>	
		     			</div>	
	     			</div>
	     		</div>

	     		<div class="block-content">
	     			<div class="table-responsive">
						<vuetable ref="vuetable"
						    api-url="/api/post"
						    :fields="fields"
						    :sort-order="sortOrder"
						    @vuetable:pagination-data="onPaginationData"
						    :append-params="moreParams">
							<template slot="publishSwitch" scope="props">
								<el-switch v-model="props.rowData.is_publish" on-text="ON" off-text="OFF" @change="changePublish(props.rowData)"></el-switch>
						    </template>
							<template slot="actions" scope="props">
						    	<div class="custom-actions">
		        					<button class="btn btn-sm btn-default" @click="itemAction('edit-item', props.rowData)"><i class="fa fa-pencil"></i> 编辑</button>
		        					<button class="btn btn-sm btn-danger" @click="itemAction('delete-item', props.rowData)"><i class="fa fa-times"></i> 删除</button>
						    	</div>
						    </template>
						</vuetable> 
					</div>
					<div class="row">
						<div class="col-sm-6 pagination-info">
							<vuetable-pagination-info ref="paginationInfo" info-class="pagination-info"></vuetable-pagination-info>
						</div>
						<div class="col-sm-6">
							<vuetable-pagination ref="pagination" @vuetable-pagination:change-page="onChangePage"></vuetable-pagination>
						</div>
					</div>
			    </div>  		
	     	</div>        	
        </div>
	</div>
</template>

<script> 
    export default {
    	props: {
	        rowData: {
	            type: Object,
	        },
	        rowIndex: {
	            type: Number
	        }
	    },
		data () {
		    return {
		    	crumbs: [
		    		{to: '/dashboard/post', text: '文章管理'},
		    		{to: null, text: '所有文章'},
		    	],
		      	fields: [
			        {
			          title: '标题',
			          name: 'title',
			          sortField: 'title',
			        },
			        {
			          title: '作者',
			          name: 'last_user',
			          titleClass: 'text-center',
			          dataClass: 'text-center',
			        },
			        {
			          name: '__slot:publishSwitch',
			          title: '发布状态',
			          titleClass: 'text-center',
			          dataClass: 'text-center'
			        },
			        {
			          title: '创建时间',
			          name: 'created_at',
			          sortField: 'updated_at',
			          titleClass: 'text-center',
			          dataClass: 'text-center',
			          callback: 'dateFormat'
			        },
			        {
			          name: '__slot:actions',
			          title: '操作',
			          titleClass: 'text-center',
			          dataClass: 'text-center'
			        }
		      	],
		      	sortOrder: [
		        	{ field: 'created_at', sortField: 'created_at', direction: 'desc'}
		      	],
		      	moreParams: {},
		    }
		},
		mounted() {
			eventBus.$on('filter-set', (filterText) => {
		      	this.moreParams = {
		        	filter: filterText
		      	};
		      	Vue.nextTick( () => this.$refs.vuetable.refresh() );
		    });
		    eventBus.$on('filter-reset', () => {
		      	this.moreParams = {};
		      	Vue.nextTick( () => this.$refs.vuetable.refresh() );
		    });
		},
		beforeDestroy() {
			eventBus.$off('filter-set');
			eventBus.$off('filter-reset');
		},
        methods: {
        	dateFormat (value) {
        		return (value == null) ? '' : value.date.substring(0,10);
        	},
		    onPaginationData (paginationData) {
		      	this.$refs.pagination.setPaginationData(paginationData);
		      	this.$refs.paginationInfo.setPaginationData(paginationData);
		    },
		    onChangePage (page) {
		      	this.$refs.vuetable.changePage(page)
		    },
		    deleteSuccess() {
		    	Vue.nextTick( () => this.$refs.vuetable.refresh() )
		    },
		    changePublish(data) {
		    	let _self = this;
		    	data.is_publish = !data.is_publish;
		    	axios.post('/api/post/'+data.id+'/change',{is_publish: data.is_publish})
		    		.catch(function (res) {
		    			sweetAlert.error();
		    		})
		    },
	        itemAction (action, data) {
	            if (action == 'delete-item'){
	            	let _self = this;
	                sweetAlert({
	                    title: "危险操作",
	                    text: "您确认删除该项信息吗？",
	                    type: "warning",
	                    showCancelButton: true,
	                    confirmButtonColor: "#d26a5c",
	                    confirmButtonText: "删  除",
	                    cancelButtonText: "取  消",
	                    closeOnConfirm: false,
	                    showLoaderOnConfirm: true,
	                },
	                function(isConfirm){
	                    if (isConfirm){
	                        let deleteUrl = '/api/post/' + data.id;
	                        axios.delete(deleteUrl)
	                            .then(function(response){
	                            	if (response.status == 200){
										sweetAlert.success();
		                                _self.$refs.vuetable.refresh();
	                            	}
	                            })
	                            .catch(function (error) {
	                            	sweetAlert.error();
								});
	                    }
	                });                
	            }else{
					this.$router.push({ name: 'editPost', params: { id: data.id }});
	            }
	        }
        }
    }
</script>

<style>
	.label{
		font-weight: normal;
		padding: 3px 7px;
	}
	.pagination-info,.filter-bar{
		display: none;
	}
	@media screen and (min-width: 768px) {
		.pagination-info,.filter-bar{
			display: block;
		}
	}
</style>


