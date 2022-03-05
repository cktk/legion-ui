<style lang="less">
@import "./home.less";
</style>

<template>
  <div>


    <div class="home">
      <Row :gutter="10">
        <Col :xs="24" :sm="24" :lg="24" :xl="8">
          <Row :gutter="10">
            <Col style="margin-bottom: 10px; width: 100%">
              <Card :padding="0">
                <div class="welcome-card">
                  <div class="left">
                    <div class="user">
                      <Avatar
                        v-if="avatar"
                        :src="avatar"
                        size="60"
                        class="avator-img"
                      ></Avatar>
                      <Avatar
                        v-else
                        icon="md-person"
                        size="60"
                        class="avator-icon"
                      ></Avatar>
                      <div class="info">
                        <p class="username">Hi, {{ nickname }} !</p>
                        <p class="welcome">欢迎回到Legion快速开发平台</p>
                      </div>
                    </div>
                    <div class="list">
                      <div class="p">
                        <div class="dot"></div>
                        您当前所在的部门为：{{ departmentTitle }}
                      </div>
                      <div class="p">
                        <div class="dot"></div>
                        您当前的用户类型为：{{ userType }}
                      </div>
                      <div class="p">
                        <div class="dot"></div>
                        本次登录地点：{{ city }}
                      </div>
                    </div>
                  </div>

                </div>
              </Card>
            </Col>
          </Row>
        </Col>
        <!-- 右上侧 -->

      </Row>
      <Row :gutter="10">
        <Col
          :xs="12"
          :sm="12"
          :lg="12"
          :xl="12"
          :style="{ marginBottom: '10px' }"
        >
          <Card>
            <p slot="title">CPU</p>
            <table class="table">
              <tr>
                <th style="text-align: left">属性</th>
                <th style="text-align: left">值</th>
              </tr>
              <tr>
                <td style="">核心数</td>
                <td>{{ systemInfoList.cpu.cpuNum }}</td>
              </tr>
              <tr>
                <td>用户使用率</td>
                <td>{{ systemInfoList.cpu.used }}%</td>
              </tr>
              <tr>
                <td>系统使用率</td>
                <td>{{ systemInfoList.cpu.sys }}%</td>
              </tr>
              <tr>
                <td>当前空闲率</td>
                <td>{{ systemInfoList.cpu.free }}%</td>
              </tr>
            </table>
          </Card>
        </Col>

        <Col
          :xs="12"
          :sm="12"
          :lg="12"
          :xl="12"
          :style="{ marginBottom: '10px' }"
        >
          <Card>
            <p slot="title">内存</p>
            <table class="table">
              <tr>
                <th style="text-align: left">属性</th>
                <th style="text-align: left">内存</th>
                <th style="text-align: left">JVM</th>
              </tr>
              <tr>
                <td style="">总内存</td>
                <td>{{ systemInfoList.mem.total }}G</td>
                <td>{{ systemInfoList.jvm.total }}M</td>
              </tr>
              <tr>
                <td>已用内存</td>
                <td>{{ systemInfoList.mem.used }}G</td>
                <td>{{ systemInfoList.jvm.used }}M</td>
              </tr>
              <tr>
                <td>剩余内存</td>
                <td>{{ systemInfoList.mem.free }}G</td>
                <td>{{ systemInfoList.jvm.free }}M</td>
              </tr>
              <tr>
                <td>使用率</td>
                <td>{{ systemInfoList.mem.usage }}%</td>
                <td>{{ systemInfoList.jvm.usage }}%</td>
              </tr>
            </table>
          </Card>
        </Col>
      </Row>

      <Row :gutter="10"
        ><Col
          :xs="24"
          :sm="24"
          :lg="24"
          :xl="24"
          :style="{ marginBottom: '10px' }"
        >
          <Card>
            <p slot="title">服务器信息</p>
            <table class="table">
              <tr>
                <td>服务器名称</td>
                <td>{{ systemInfoList.sys.computerName }}</td>
                <td>操作系统</td>
                <td>{{ systemInfoList.sys.osName }}</td>
              </tr>
              <tr>
                <td>服务器IP</td>
                <td>{{ systemInfoList.sys.computerIp }}</td>
                <td>操作系统</td>
                <td>{{ systemInfoList.sys.osArch }}</td>
              </tr>
            </table>
          </Card>
        </Col></Row
      >


      <Row :gutter="10"
        ><Col
          :xs="24"
          :sm="24"
          :lg="24"
          :xl="24"
          :style="{ marginBottom: '10px' }"
        >
          <Card>
            <p slot="title">Java虚拟机信息</p>
            <table class="table">
              <tr>
                <td>Java名称</td>
                <td>{{ systemInfoList.jvm.name }}</td>
                <td>Java版本</td>
                <td>{{ systemInfoList.jvm.version }}</td>
              </tr>
              <tr>
                <td>启动时间</td>
                <td>{{ systemInfoList.jvm.startTime }}</td>
                <td>运行时长</td>
                <td colspan="3">{{ systemInfoList.jvm.runTime }}</td>
              </tr>
              <tr>
                <td>安装路径</td>
                <td colspan="3">{{ systemInfoList.jvm.home }}</td>
              </tr>
              <tr>
                <td>项目路径</td>
                <td colspan="3">{{ systemInfoList.sys.userDir }}</td>
              </tr>
            </table>
          </Card>
        </Col></Row
      >

      <Row :gutter="10">
        <Col
          :xs="24"
          :sm="24"
          :lg="24"
          :xl="24"
          :style="{ marginBottom: '10px' }"
        >
          <Card :bordered="false">
            <p slot="title">磁盘状态</p>
            <Table
              size="large"
              :columns="sysFilescolumns"
              :data="systemInfoList.sysFiles"
            >
              <template slot-scope="{ row }" slot="usage">
                <span>{{ row.usage }}%</span>
              </template>
            </Table>
          </Card>
        </Col>
      </Row>

    </div>
    <div v-if="currNav == 'app'">
      <dashboard2 />
    </div>

  </div>
</template>

<script>
import { ipInfo, getNotice, systemInfo } from "@/api/index";
import visitVolume from "./components/visitVolume.vue";
import visitSeparation from "./components/visitSeparation.vue";
import sysFiles from "./components/sysFiles.vue";

import cardApp from "./components/cardApp.vue";
import dashboard2 from "../legion-charts/dashboard2/dashboard2.vue";
import Cookies from "js-cookie";
import Gitalk from "gitalk";

export default {
  name: "home",
  components: {
    visitVolume,
    visitSeparation,
    sysFiles,
    cardApp,
  },
  data() {
    return {
      // showVideo: false,
      count: {
        data1: 5396,
        data2: 68,
        data3: 19305,
        data4: 39503498,
      },
      city: "未知",
      departmentTitle: "无",
      userType: "无",
      time: "",
      price: "...",
      systemInfoList: {
        cpu: {
          cpuNum: "",
          free: "",
          sys: "",
          total: "",
          used: "",
          wait: "",
        },
        jvm: {
          free: "",
          home: "",
          max: "",
          name: "",
          runTime: "",
          startTime: "",
          total: "",
          usage: "",
          used: "",
          version: "",
        },
        mem: { free: "", total: "", usage: "", used: "" },
        sys: {
          computerIp: "",
          computerName: "",
          osArch: "",
          osName: "",
          userDir: "",
        },
        sysFiles: [],
      },
      sysFilescolumns: [
        { title: "盘符路径", key: "dirName" },
        { title: "文件系统", key: "sysTypeName" },
        { title: "盘符类型", key: "typeName" },
        { title: "总大小", key: "total" },
        { title: "可用大小", key: "free" },
        { title: "已用大小", key: "used" },
        { title: "已用百分比", slot: "usage" },
      ],
    };
  },
  computed: {
    currNav() {
      return this.$store.state.app.currNav;
    },
    nickname() {
      return this.$store.state.user.nickname;
    },
    avatar() {
      return this.$store.state.user.avatar;
    },
  },
  methods: {
    init() {
      let userInfo = this.getUserInfo();
      this.departmentTitle = userInfo.departmentTitle;
      if (userInfo.type == "0") {
        this.userType = "普通用户";
      } else if (userInfo.type == "1") {
        this.userType = "管理员";
      }
      ipInfo().then((res) => {
        if (res.success) {
          this.city = res.result;
        }
      });
      this.time = this.format(new Date(), "yyyy年MM月dd日");

      // 获取系统信息
      systemInfo().then((res) => {
        // console.log(res);
        if (res.success) {
          this.systemInfoList = res.result
            ? res.result
            : {
                cpu: {
                  cpuNum: "",
                  free: "",
                  sys: "",
                  total: "",
                  used: "",
                  wait: "",
                },
                jvm: {
                  free: "",
                  home: "",
                  max: "",
                  name: "",
                  runTime: "",
                  startTime: "",
                  total: "",
                  usage: "",
                  used: "",
                  version: "",
                },
                mem: { free: "", total: "", usage: "", used: "" },
                sys: {
                  computerIp: "",
                  computerName: "",
                  osArch: "",
                  osName: "",
                  userDir: "",
                },
                sysFiles: [],
              };
        } else {
        }
      });
    },
    showNotice() {
      getNotice().then((res) => {
        if (res.success) {
          if (!res.result) {
            return;
          }
          let data = res.result;
          if (
            data.open &&
            (data.title || data.content) &&
            data.position == "HOME"
          ) {
            this.$Notice.info({
              title: data.title,
              desc: data.content,
              duration: data.duration,
            });
          }
        }
      });
    },
  },
  mounted() {
    this.init();
    // 通知
    let noticeFlag = "noticeShowed";
    let notice = Cookies.get(noticeFlag);
    if (notice != noticeFlag) {
      this.showNotice();
      Cookies.set(noticeFlag, noticeFlag);
    }
  },
};
</script>
<style lang="less" scoped>
/deep/.ivuListStyle {
  ul {
    li {
      justify-content: space-between;
      .ivu-list-item-extra {
        display: none;
      }
    }
  }
}
.table {
  position: relative;
  overflow: hidden;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  width: 100%;
  max-width: 100%;
  background-color: #fff;
  font-size: 14px;
  color: #606266;
  tr {
    td,
    th {
      border-bottom: 1px solid #dfe6ec;
      padding: 10px 0;

      overflow: hidden;
      text-overflow: ellipsis;
      white-space: normal;
      word-break: break-all;
      line-height: 23px;
      padding-left: 10px;
      padding-right: 10px;
      box-sizing: border-box;
    }
  }
}
</style>
