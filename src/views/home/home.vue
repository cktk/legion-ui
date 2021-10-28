<style lang="less">
@import "./home.less";
</style>

<template>
  <div>
    <div class="home">
      <Row :gutter="10">
        <!-- 左上侧 用户信息及github链接 -->
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
                  <img
                    class="pic"
                    :src="require('@/assets/icon/computer.svg')"
                  />
                </div>
              </Card>
            </Col>
            <Col style="margin-bottom: 10px; width: 100%">
              <Card>
                <p slot="title">
                  <Icon
                    type="logo-github"
                    size="20"
                    style="margin-right: 5px"
                  />
                  CPU
                </p>
                <p slot="extra"></p>
                <div style="height: 266px; overflow: auto">
                  <List border class="ivuListStyle">
                    <ListItem v-for="(value, key, index) in systemInfoList.cpu"
                      ><span style="float: left">{{ key }}</span>
                      <span style="float: right">{{ value }}</span></ListItem
                    >
                  </List>
                </div>
              </Card>
            </Col>
          </Row>
        </Col>
        <!-- 右上侧 -->
        <Col :lg="24" :xl="16">
          <Row :gutter="10">
            <Col
              :xs="24"
              :sm="24"
              :lg="24"
              :xl="12"
              style="margin-bottom: 10px"
            >
              <Card>
                <p slot="title" style="overflow: visible">
                  <!-- <a href="http://www.baidu.com" target="_blank">
                    <Icon
                      type="ios-star"
                      size="20"
                      style="margin-right: 5px"
                    ></Icon>
                    <Badge dot>立即获取 Legion 完整版</Badge>
                  </a> -->
                  JVM
                </p>
                <div class="buy-content">
                  <div class="qr">
                    <img src="@/assets/qr.png" width="130" />
                    <!-- {{ systemInfoList.jvm }} -->
                    <List border class="ivuListStyle">
                      <ListItem
                        v-for="(value, key, index) in systemInfoList.jvm"
                        ><span style="float: left">{{ key }}</span>
                        <span style="float: right">{{ value }}</span></ListItem
                      >
                    </List>
                  </div>
                </div>
              </Card>
            </Col>
            <Col :xs="24" :sm="24" :xl="12" style="margin-bottom: 10px">
              <Row :gutter="10">
                <Col style="margin-bottom: 10px; width: 100%">
                  <Card>
                    <p slot="title">
                      <Icon
                        type="logo-github"
                        size="20"
                        style="margin-right: 5px"
                      />
                      mem
                    </p>
                    <div style="height: 130px; overflow: hidden">
                      <!-- {{ systemInfoList.mem }} -->
                      <List border class="ivuListStyle">
                        <ListItem
                          v-for="(value, key, index) in systemInfoList.mem"
                          ><span style="float: left">{{ key }}</span>
                          <span style="float: right">{{
                            value
                          }}</span></ListItem
                        >
                      </List>
                    </div>
                  </Card>
                </Col>
                <Col style="margin-bottom: 10px; width: 100%">
                  <Card>
                    <p slot="title">
                      <Icon
                        type="logo-github"
                        size="20"
                        style="margin-right: 5px"
                      />
                      sys
                    </p>
                    <p slot="extra"></p>
                    <div style="height: 233px; overflow: auto">
                      <!-- {{ systemInfoList.sys }} -->
                      <List border class="ivuListStyle">
                        <ListItem
                          v-for="(value, key, index) in systemInfoList.sys"
                          ><span style="float: left">{{ key }}</span>
                          <span style="float: right">{{
                            value
                          }}</span></ListItem
                        >
                      </List>
                    </div>
                  </Card>
                </Col>
              </Row>
              <!-- 下面的card把上面的Row替换下来的 -->
              <!-- <Card>
                <p slot="title">
                  <Icon type="md-bookmark" style="margin-right: 5px"></Icon>MEM
                </p>
                <div id="comments" class="comment-container">{{systemInfoList.mem}}</div>
              </Card> -->
            </Col>
          </Row>
        </Col>
      </Row>
      <Row :gutter="10">
        <Col
          :xs="24"
          :sm="24"
          :lg="24"
          :xl="24"
          :style="{ marginBottom: '10px' }"
        >
          <Table
            size="large"
            :columns="sysFilescolumns"
            :data="systemInfoList.sysFiles"
          ></Table>
        </Col>
      </Row>
      <Row :gutter="10">
        <Col
          :xs="24"
          :sm="24"
          :md="12"
          :lg="6"
          :style="{ marginBottom: '10px' }"
        >
          <card1
            id="card1"
            prefix="￥"
            :end-val="count.data1"
            title="card1"
            :image="require('@/assets/icon/money.png')"
            width="34px"
            height="34px"
          />
        </Col>
        <Col
          :xs="24"
          :sm="24"
          :md="12"
          :lg="6"
          :style="{ marginBottom: '10px' }"
        >
          <card2
            id="card2"
            suffix="%"
            :end-val="count.data2"
            color="#f90"
            title="card2"
            description="相比昨日"
          />
        </Col>
        <Col
          :xs="24"
          :sm="24"
          :md="12"
          :lg="6"
          :style="{ marginBottom: '10px' }"
        >
          <card4
            title="待办事项"
            :time="time"
            description="您有一个新的待审批任务，请前往查看"
          />
        </Col>
        <Col
          :xs="24"
          :sm="24"
          :md="12"
          :lg="6"
          :style="{ marginBottom: '10px' }"
        >
          <card3
            title="应用中心"
            description="销量统计，用户统计，日活分析"
            :image="require('@/assets/icon/app.png')"
            width="34px"
            height="34px"
            titleSize="18px"
          />
        </Col>
      </Row>
      <Row :gutter="10">
        <Col
          :xs="24"
          :sm="24"
          :md="12"
          :lg="4"
          :style="{ marginBottom: '10px' }"
        >
          <cardApp icon="logo-buffer" title="SaaS应用" />
        </Col>
        <Col
          :xs="24"
          :sm="24"
          :md="12"
          :lg="4"
          :style="{ marginBottom: '10px' }"
        >
          <cardApp activeColor="#2db7f5" icon="md-bookmarks" title="日志分析" />
        </Col>
        <Col
          :xs="24"
          :sm="24"
          :md="12"
          :lg="4"
          :style="{ marginBottom: '10px' }"
        >
          <cardApp activeColor="#19be6b" icon="md-cloud" title="云运维" />
        </Col>
        <Col
          :xs="24"
          :sm="24"
          :md="12"
          :lg="4"
          :style="{ marginBottom: '10px' }"
        >
          <cardApp activeColor="#f90" icon="md-film" title="视频监控" />
        </Col>
        <Col
          :xs="24"
          :sm="24"
          :md="12"
          :lg="4"
          :style="{ marginBottom: '10px' }"
        >
          <cardApp activeColor="#8950fc" icon="md-stats" title="数据分析"
        /></Col>
        <Col
          :xs="24"
          :sm="24"
          :md="12"
          :lg="4"
          :style="{ marginBottom: '10px' }"
        >
          <cardApp activeColor="#ed4014" icon="md-people" title="用户分析"
        /></Col>
      </Row>
      <Row :gutter="10">
        <Col
          :xs="24"
          :sm="24"
          :md="12"
          :lg="6"
          :style="{ marginBottom: '10px' }"
        >
          <card1
            id="card5"
            :bordered="false"
            :end-val="126778"
            title="今日新增互动数"
            backgroundColor="#fff4df"
            :image="require('@/assets/icon/comment.png')"
            width="34px"
            height="34px"
          />
        </Col>
        <Col
          :xs="24"
          :sm="24"
          :md="12"
          :lg="6"
          :style="{ marginBottom: '10px' }"
        >
          <card1
            id="card6"
            :bordered="false"
            :end-val="68893"
            backgroundColor="#6993fe"
            countColor="#fff"
            icon="md-person-add"
            iconColor="#fff"
            titleColor="#fff"
            title="今日新增用户"
          />
        </Col>
        <Col
          :xs="24"
          :sm="24"
          :md="12"
          :lg="6"
          :style="{ marginBottom: '10px' }"
        >
          <card1
            id="card7"
            :bordered="false"
            :end-val="count.data4"
            backgroundColor="#8950fe"
            countColor="#fff"
            icon="md-cloud-download"
            iconColor="#fff"
            titleColor="#fff"
            title="今日下载量"
          />
        </Col>
        <Col
          :xs="24"
          :sm="24"
          :md="12"
          :lg="6"
          :style="{ marginBottom: '10px' }"
        >
          <card1
            id="card8"
            :bordered="false"
            :end-val="13507632434"
            backgroundColor="#f64e61"
            countColor="#fff"
            icon="md-calendar"
            iconColor="#fff"
            titleColor="#fff"
            title="月活"
          />
        </Col>
      </Row>
      <!-- 这两个是那个apexchart图表的 -->
      <!--       <Row :gutter="10">
        <Col
          :xs="24"
          :sm="24"
          :lg="24"
          :xl="16"
          :style="{ marginBottom: '10px' }"
        >
          <visit-volume />
        </Col>
        <Col
          :xs="24"
          :sm="24"
          :lg="24"
          :xl="8"
          :style="{ marginBottom: '10px' }"
        >
          <visit-separation />
        </Col>
      </Row> -->

      <Row :gutter="10">
        <Col
          :xs="24"
          :sm="24"
          :lg="24"
          :xl="16"
          :style="{ marginBottom: '10px' }"
        >
          <sys-files></sys-files>
        </Col>
        <Col
          :xs="24"
          :sm="24"
          :lg="24"
          :xl="8"
          :style="{ marginBottom: '10px' }"
        >
          2
        </Col>
      </Row>
    </div>
    <div v-if="currNav == 'app'">
      <dashboard2 />
    </div>

    <!-- <Modal
      v-model="showVideo"
      title="作者亲自制作Legion炫酷文字快闪宣传片"
      :styles="{ top: '30px' }"
      footer-hide
      width="1000"
    >
      <iframe
        src="//player.bilibili.com/player.html?aid=30284667&cid=52827707&page=1"
        scrolling="no"
        border="0"
        frameborder="no"
        framespacing="0"
        allowfullscreen="true"
        style="width: 100%; height: 550px"
      ></iframe>
    </Modal> -->
  </div>
</template>

<script>
import { ipInfo, getNotice, systemInfo } from "@/api/index";
import visitVolume from "./components/visitVolume.vue";
import visitSeparation from "./components/visitSeparation.vue";
import sysFiles from "./components/sysFiles.vue";

import card1 from "@/views/my-components/widget/card1.vue";
import card2 from "./components/card2.vue";
import card3 from "@/views/my-components/widget/card3.vue";
import card4 from "@/views/my-components/widget/card4.vue";
import cardApp from "./components/cardApp.vue";
import dashboard2 from "../legion-charts/dashboard2/dashboard2.vue";
import Cookies from "js-cookie";
// import "gitalk/dist/gitalk.css";
import Gitalk from "gitalk";

export default {
  name: "home",
  components: {
    visitVolume,
    visitSeparation,
    sysFiles,
    card1,
    card2,
    card3,
    card4,
    cardApp,
    dashboard2,
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
      systemInfoList: {},
      sysFilescolumns: [],
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
      let userInfo = JSON.parse(Cookies.get("userInfo"));
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
        console.log(res);
        if (res.success) {
          this.systemInfoList = res.result ? res.result : {};
          const aaa = Object.keys(
            this.systemInfoList.sysFiles[0]
              ? this.systemInfoList.sysFiles[0]
              : []
          );
          this.sysFilescolumns = [];
          for (let i = 0; i < aaa.length; i++) {
            this.sysFilescolumns.push({
              title: aaa[i],
              key: aaa[i],
            });
          }
          console.log(this.sysFilescolumns);
        } else {
          this.systemInfoList = [];
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
    // 价格
    AV.init({
      appId: "6Bstbxl4NDU69I77D3nzf61h-gzGzoHsz",
      appKey: "gaFTnYlTul3M8qdiGlbfvoJK",
      serverURL: "https://6bstbxl4.lc-cn-n1-shared.com",
    });
    const query = new AV.Query("Price");
    query.equalTo("objectId", "6080216c2a5bb23590bcaedb");
    query.first().then((e) => {
      this.price = e.attributes.price;
    });
    // Gitalk
    // 这像是渲染用的
    /*    var gitalk = new Gitalk({
      clientID: "a128de2dd7383614273a",
      clientSecret: "a77691ecb662a8303a6c686ae651ae035868da6e",
      repo: "legion-comments",
      owner: "Exrick",
      admin: ["Exrick"],
      distractionFreeMode: false, // 遮罩效果
    });
    // 渲染到带这个id 的盒子上
    gitalk.render("comments"); */
    // 宣传视频
    let videoFlag = "videoShowed";
    let xbootVideo = Cookies.get(videoFlag);
    if (xbootVideo != videoFlag) {
      // this.showVideo = true;
      Cookies.set(videoFlag, videoFlag);
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
</style>