<template>
  <div class="search">
    <Card>
        <Row v-show="openSearch" @keydown.enter.native="handleSearch">
          <Form ref="searchForm" :model="searchForm" inline :label-width="70" class="search-form">
            <FormItem label="模板类型" prop="templateType">
              <Input type="text" v-model="searchForm.templateType" placeholder="请输入模板类型" clearable style="width: 200px"/>
            </FormItem>
            <FormItem label="短信内容" prop="content">
              <Input type="text" v-model="searchForm.content" placeholder="请输入短信内容" clearable style="width: 200px"/>
            </FormItem>
            <span v-if="drop">
              <FormItem label="接收人手机号" prop="phone">
                <Input type="text" v-model="searchForm.phone" placeholder="请输入接收人手机号" clearable style="width: 200px"/>
              </FormItem>
              <FormItem label="接收人手机号" prop="sendTime">
                <DatePicker :options="options" v-model="selectDate" type="daterange" format="yyyy-MM-dd" clearable @on-change="selectDateRange" placeholder="选择起始时间" style="width: 200px"></DatePicker>
              </FormItem>
              <FormItem label="送人id" prop="sendUserId">
                <Input type="text" v-model="searchForm.sendUserId" placeholder="请输入送人id" clearable style="width: 200px"/>
              </FormItem>
              <FormItem label="送人名字" prop="sendUserName">
                <Input type="text" v-model="searchForm.sendUserName" placeholder="请输入送人名字" clearable style="width: 200px"/>
              </FormItem>
              <FormItem label="引起发送短信业务ID" prop="workId">
                <Input type="text" v-model="searchForm.workId" placeholder="请输入引起发送短信业务ID" clearable style="width: 200px"/>
              </FormItem>
              <FormItem label="是否重发" prop="retrySend">
                <Input type="text" v-model="searchForm.retrySend" placeholder="请输入是否重发" clearable style="width: 200px"/>
              </FormItem>
              <FormItem label="重发记录id" prop="retryId">
                <Input type="text" v-model="searchForm.retryId" placeholder="请输入重发记录id" clearable style="width: 200px"/>
              </FormItem>
              <FormItem label="运营商回执ID" prop="bizId">
                <Input type="text" v-model="searchForm.bizId" placeholder="请输入运营商回执ID" clearable style="width: 200px"/>
              </FormItem>
              <FormItem label="业务类型" prop="workType">
                <Input type="text" v-model="searchForm.workType" placeholder="请输入业务类型" clearable style="width: 200px"/>
              </FormItem>
              <FormItem label="发送状态" prop="sendStatus">
                <Input type="text" v-model="searchForm.sendStatus" placeholder="请输入发送状态" clearable style="width: 200px"/>
              </FormItem>
              <FormItem label="运营商返回的状态码" prop="code">
                <Input type="text" v-model="searchForm.code" placeholder="请输入运营商返回的状态码" clearable style="width: 200px"/>
              </FormItem>
              <FormItem label="运营商返回的原始数据" prop="sendRes">
                <Input type="text" v-model="searchForm.sendRes" placeholder="请输入运营商返回的原始数据" clearable style="width: 200px"/>
              </FormItem>
              <FormItem label="系统判断是否成功的状态" prop="status">
                <Input type="text" v-model="searchForm.status" placeholder="请输入系统判断是否成功的状态" clearable style="width: 200px"/>
              </FormItem>
              <FormItem label="错误代码" prop="errCode">
                <Input type="text" v-model="searchForm.errCode" placeholder="请输入错误代码" clearable style="width: 200px"/>
              </FormItem>
              <FormItem label="错误信息" prop="errMsg">
                <Input type="text" v-model="searchForm.errMsg" placeholder="请输入错误信息" clearable style="width: 200px"/>
              </FormItem>
              <FormItem label="错误类型 网络超时 什么的错误类型" prop="errType">
                <Input type="text" v-model="searchForm.errType" placeholder="请输入错误类型 网络超时 什么的错误类型" clearable style="width: 200px"/>
              </FormItem>
            </span>
            <FormItem style="margin-left:-35px;" class="br">
              <Button @click="handleSearch" type="primary" icon="ios-search">搜索</Button>
              <Button @click="handleReset">重置</Button>
              <a class="drop-down" @click="dropDown">
                {{dropDownContent}}
                <Icon :type="dropDownIcon"></Icon>
              </a>
            </FormItem>
          </Form>
        </Row>
      <Row class="operation">
        <!-- <Button @click="add" type="primary" icon="md-add">添加</Button> -->
        <!-- <Button @click="delAll" icon="md-trash">批量删除</Button> -->
        <Button @click="getDataList" icon="md-refresh">刷新</Button>
        <Button type="dashed" @click="openSearch=!openSearch">{{openSearch ? "关闭搜索" : "开启搜索"}}</Button>
        <Button type="dashed" @click="openTip=!openTip">{{openTip ? "关闭提示" : "开启提示"}}</Button>
      </Row>
      <Alert show-icon v-show="openTip">
        已选择
        <span class="select-count">{{selectList.length}}</span> 项
        <a class="select-clear" @click="clearSelectAll">清空</a>
      </Alert>
      <Table
        :loading="loading"
        border
        :columns="columns"
        :data="data"
        ref="table"
        sortable="custom"
        @on-sort-change="changeSort"
        @on-selection-change="changeSelect"
      ></Table>
      <Row type="flex" justify="end" class="page">
        <Page
          :current="searchForm.pageNumber"
          :total="total"
          :page-size="searchForm.pageSize"
          @on-change="changePage"
          @on-page-size-change="changePageSize"
          :page-size-opts="[10,20,50]"
          size="small"
          show-total
          show-elevator
          show-sizer
        ></Page>
      </Row>

      <!-- <addEdit :data="form" :type="showType" v-model="showDrawer" @on-submit="getDataList" /> -->
    </Card>
  </div>
</template>

<script>
// 根据你的实际请求api.js位置路径修改
import { getMessageSmsSendList } from "./api";
// 根据你的实际添加编辑组件位置路径修改
// import addEdit from "./addEdit.vue";
import { shortcuts } from "@/libs/shortcuts";
export default {
  name: "messageSmsSend",
  components: {
    // addEdit,
  },
  data() {
    return {
      openSearch: true, // 显示搜索
      openTip: true, // 显示提示
      showType: "0", // 添加或编辑标识
      showDrawer: false, // 显示添加编辑抽屉
      loading: true, // 表单加载状态
      drop: false,
      dropDownContent: "展开",
      dropDownIcon: "ios-arrow-down",
      searchForm: { // 搜索框初始化对象
        pageNumber: 1, // 当前页数
        pageSize: 10, // 页面大小
        sort: "createTime", // 默认排序字段
        order: "desc", // 默认排序方式
        startDate: "", // 起始时间
        endDate: "", // 终止时间
      },
      selectDate: null,
      options: {
        shortcuts: shortcuts,
      },
      selectList: [], // 多选数据
      form: {},
      columns: [
      // 表头
      {
        type: "selection",
        width: 60,
        align: "center"
      },
      {
        type: "index",
        width: 60,
        align: "center"
      },
      {
        title: "模板类型",
        key: "templateType",
        minWidth: 120,
        sortable: true,
      },
      {
        title: "模板id",
        key: "templateId",
        minWidth: 120,
        sortable: true,
      },
      {
        title: "类型",
        key: "type",
        minWidth: 120,
        sortable: true,
      },
      {
        title: "发送短信配置id",
        key: "settingId",
        minWidth: 120,
        sortable: true,
      },
      {
        title: "短信内容",
        key: "content",
        minWidth: 120,
        sortable: true,
      },
      {
        title: "接收人手机号",
        key: "phone",
        minWidth: 120,
        sortable: true,
      },
      {
        title: "接收人手机号",
        key: "sendTime",
        minWidth: 120,
        sortable: true,
      },
      {
        title: "送人id",
        key: "sendUserId",
        minWidth: 120,
        sortable: true,
      },
      {
        title: "送人名字",
        key: "sendUserName",
        minWidth: 120,
        sortable: true,
      },
      {
        title: "引起发送短信业务ID",
        key: "workId",
        minWidth: 120,
        sortable: true,
      },
      {
        title: "是否重发",
        key: "retrySend",
        minWidth: 120,
        sortable: true,
      },
      {
        title: "重发记录id",
        key: "retryId",
        minWidth: 120,
        sortable: true,
      },
      {
        title: "运营商回执ID",
        key: "bizId",
        minWidth: 120,
        sortable: true,
      },
      {
        title: "业务类型",
        key: "workType",
        minWidth: 120,
        sortable: true,
      },
      {
        title: "发送状态",
        key: "sendStatus",
        minWidth: 120,
        sortable: true,
      },
      {
        title: "运营商返回的状态码",
        key: "code",
        minWidth: 120,
        sortable: true,
      },
      {
        title: "运营商返回的原始数据",
        key: "sendRes",
        minWidth: 120,
        sortable: true,
      },
      {
        title: "系统判断是否成功的状态",
        key: "status",
        minWidth: 120,
        sortable: true,
      },
      {
        title: "错误代码",
        key: "errCode",
        minWidth: 120,
        sortable: true,
      },
      {
        title: "错误信息",
        key: "errMsg",
        minWidth: 120,
        sortable: true,
      },
      {
        title: "错误类型 网络超时 什么的错误类型",
        key: "errType",
        minWidth: 120,
        sortable: true,
      },
      // {
      //   title: "操作",
      //   key: "action",
      //   align: "center",
      //   width: 150,
      //   render: (h, params) => {
      //     return h("div", [
      //       h(
      //         "a",
      //         {
      //           on: {
      //             click: () => {
      //               this.edit(params.row);
      //             }
      //           }
      //         },
      //         "编辑"
      //       ),
      //       h("Divider", {
      //         props: {
      //           type: "vertical",
      //         },
      //       }),
      //       h(
      //         "a",
      //         {
      //           on: {
      //             click: () => {
      //               this.remove(params.row);
      //             }
      //           }
      //         },
      //         "删除"
      //       )
      //     ]);
      //   }
      // }
    ],
      data: [], // 表单数据
      pageNumber: 1, // 当前页数
      pageSize: 10, // 页面大小
      total: 0 // 表单数据总数
    };
  },
  methods: {
    init() {
      this.getDataList();
    },
    changePage(v) {
      this.searchForm.pageNumber = v;
      this.getDataList();
      this.clearSelectAll();
    },
    changePageSize(v) {
      this.searchForm.pageSize = v;
      this.getDataList();
    },
    handleSearch() {
      this.searchForm.pageNumber = 1;
      this.searchForm.pageSize = 10;
      this.getDataList();
    },
    handleReset() {
      this.$refs.searchForm.resetFields();
      this.searchForm.pageNumber = 1;
      this.searchForm.pageSize = 10;
      this.selectDate = null;
      this.searchForm.startDate = "";
      this.searchForm.endDate = "";
      // 重新加载数据
      this.getDataList();
    },
    changeSort(e) {
      this.searchForm.sort = e.key;
      this.searchForm.order = e.order;
      if (e.order === "normal") {
        this.searchForm.order = "";
      }
      this.getDataList();
    },
    selectDateRange(v) {
      if (v) {
        this.searchForm.startDate = v[0];
        this.searchForm.endDate = v[1];
      }
    },
    dropDown() {
      if (this.drop) {
        this.dropDownContent = "展开";
        this.dropDownIcon = "ios-arrow-down";
      } else {
        this.dropDownContent = "收起";
        this.dropDownIcon = "ios-arrow-up";
      }
      this.drop = !this.drop;
    },
    clearSelectAll() {
      this.$refs.table.selectAll(false);
    },
    changeSelect(e) {
      this.selectList = e;
    },
    getDataList() {
      this.loading = true;
        getMessageSmsSendList(this.searchForm).then(res => {
          this.loading = false;
          if (res.success) {
            this.data = res.result.records;
            this.total = res.result.total;
            if (this.data.length == 0 && this.searchForm.pageNumber > 1) {
              this.searchForm.pageNumber -= 1;
              this.getDataList();
            }
          }
        });
    },
  },
  mounted() {
    this.init();
  }
};
</script>
<style lang="less">
@import "@/styles/table-common.less";
</style>
