<template>
  <div>
    <div class="item">
      <div>
        <div class="title">账户密码</div>
        <div v-if="form.passStrength" class="desc">
          当前密码强度：
          <span v-if="form.passStrength == '弱'" class="red">{{
            form.passStrength
          }}</span>
          <span v-if="form.passStrength == '中'" class="middle">{{
            form.passStrength
          }}</span>
          <span v-if="form.passStrength == '强'" class="green">{{
            form.passStrength
          }}</span>
        </div>
      </div>
      <div>
        <a @click="showChangePass = true">修改</a>
      </div>
    </div>

    <!-- 修改密码 -->
    <changePass v-model="showChangePass" />
    <!-- 验证密码 -->
    <check-password ref="checkPassMobile" @on-success="checkSuccessMobile" />
    <!-- 验证密码 -->
    <check-password ref="checkPassEmail" @on-success="checkSuccessEmail" />
  </div>
</template>

<script>
import {
  sendEditEmail,
  editEmail,
  sendEditMobileSms,
  changeMobile,
} from "@/api/index";
import { validateMobile } from "@/libs/validate";
import CountDownButton from "@/views/my-components/legion/count-down-button";
import checkPassword from "@/views/my-components/legion/check-password";
import changePass from "@/views/change-pass/change-pass";
import Cookies from "js-cookie";
export default {
  components: {
    changePass,
    checkPassword,
    CountDownButton,
  },
  name: "security",
  data() {
    return {
      showChangePass: false,
      form: {},
      mobileEditForm: {
        mobile: "",
        code: "",
      },
      emailEditForm: {
        email: "",
        code: "",
      },
      codeError: "",
      initPhone: "",
      initEmail: "",
      saveLoading: false,
      sending: false,
      getSms: "获取验证码",
      canSendMobileCode: true, // 是否可点获取验证码
      checkCodeLoading: false,
      checkPassLoading: false,
      editEmailLoading: false,
      mobileEditValidate: {
        mobile: [
          { required: true, message: "请输入手机号码" },
          { validator: validateMobile },
        ],
      },
      emailEditValidate: {
        email: [
          { required: true, message: "请输入邮箱地址" },
          { type: "email", message: "邮箱格式不正确" },
        ],
      },
      editMobileVisible: false, // 显示填写验证码box
      editEmailVisible: false,
      canSendEditEmail: true,
    };
  },
  methods: {
    init() {
      let v = JSON.parse(Cookies.get("userInfo"));
      // 转换null为""
      for (let attr in v) {
        if (v[attr] == null) {
          v[attr] = "";
        }
      }
      let str = JSON.stringify(v);
      let userInfo = JSON.parse(str);
      this.form = userInfo;
      this.initPhone = userInfo.mobile;
      this.mobileEditForm.mobile = userInfo.mobile;
      this.initEmail = userInfo.email;
      this.emailEditForm.email = userInfo.email;
    },
    // showChangeMobile() {
    //   this.$refs.checkPassMobile.show();
    // },
    checkSuccessMobile() {
      this.editMobileVisible = true;
    },
    showChangeEmail() {
      this.$refs.checkPassEmail.show();
    },
    checkSuccessEmail() {
      this.editEmailVisible = true;
    },
    cancelInputCodeBox() {
      this.editMobileVisible = false;
      this.form.mobile = this.initPhone;
    },
    cancelEditEmail() {
      this.editEmailVisible = false;
      this.emailEditForm.email = this.initEmail;
    },
    sendEditMobileCode() {
      this.$refs["mobileEditForm"].validate((valid) => {
        if (valid) {
          this.getSms = "发送中";
          this.sending = true;
          sendEditMobileSms(this.mobileEditForm.mobile).then((res) => {
            this.getSms = "获取验证码";
            this.sending = false;
            if (res.success) {
              this.$Message.success("发送短信验证码成功");
              // 开始倒计时
              this.$refs.countDownMobile.startCountDown();
            }
          });
        }
      });
    },
    submitEditMobile() {
      this.$refs["mobileEditForm"].validate((valid) => {
        if (valid) {
          if (!this.mobileEditForm.code) {
            this.codeError = "请填写短信验证码";
            return;
          } else {
            this.codeError = "";
          }
          this.checkCodeLoading = true;
          changeMobile(this.mobileEditForm).then((res) => {
            this.checkCodeLoading = false;
            if (res.success) {
              this.$Message.success("修改成功");
              this.form.mobile = this.mobileEditForm.mobile;
              this.initPhone = this.mobileEditForm.mobile;
              this.editMobileVisible = false;
              this.$emit("on-success", true);
            }
          });
        }
      });
    },
    hasChangePhone() {
      if (this.mobileEditForm.mobile == this.initPhone) {
        this.canSendMobileCode = true;
      } else {
        this.$refs["mobileEditForm"].validate((valid) => {
          if (valid) {
            this.canSendMobileCode = false;
          } else {
            this.canSendMobileCode = true;
          }
        });
      }
    },
    hasChangeEmail() {
      if (this.emailEditForm.email == this.initEmail) {
        this.canSendEditEmail = true;
      } else {
        this.canSendEditEmail = false;
      }
    },
    sendVerifyEmail() {
      this.$refs["emailEditForm"].validate((valid) => {
        if (valid) {
          this.getSms = "发送中";
          this.sending = true;
          sendEditEmail(this.emailEditForm.email).then((res) => {
            this.getSms = "获取验证码";
            this.sending = false;
            if (res.success) {
              this.$Message.success("发送邮件验证码成功，请注意查收");
              // 开始倒计时
              this.$refs.countDownEmail.startCountDown();
            }
          });
        }
      });
    },
    submitEditEmail() {
      this.$refs["emailEditForm"].validate((valid) => {
        if (valid) {
          if (!this.emailEditForm.code) {
            this.codeError = "验证码不能为空";
            return;
          } else {
            this.codeError = "";
          }
          this.editEmailLoading = true;
          editEmail(this.emailEditForm).then((res) => {
            this.editEmailLoading = false;
            if (res.success) {
              this.initEmail = this.emailEditForm.email;
              this.form.email = this.emailEditForm.email;
              this.$Message.success("修改邮件成功");
              this.editEmailVisible = false;
              this.$emit("on-success", true);
            }
          });
        }
      });
    },
  },
  mounted() {
    this.init();
  },
};
</script>
