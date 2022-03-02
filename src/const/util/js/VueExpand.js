import axios from 'axios';

export default {
  install(Vue, options) {
    Vue.prototype.axiosConfig = axiosConfig;
    Vue.prototype.setForm = setForm;
    Vue.prototype.setDefaultForm = setDefaultForm;
    Vue.prototype.timeDifference = timeDifference;
    Vue.prototype.IdentityCodeValid = IdentityCodeValid;
    Vue.prototype.phonesValid = phonesValid;
    Vue.prototype.drawTableBorder = drawTableBorder;
    Vue.prototype.filterAcronym = filterAcronym;
    Vue.prototype.compareDate = compareDate;
    Vue.prototype.locCascadeWard = locCascadeWard;
    Vue.prototype.getItmInData = getItmInData;
    Vue.prototype.getIndexOfData = getIndexOfData;
    Vue.prototype.getPosition = getPosition;
    Vue.prototype.axiosConfig2 = axiosConfig2;
    Vue.prototype.sortSelrow = sortSelrow;
  }
}
function axiosConfig() {
  let array = {};
  //array["url"] = arguments[0];
  let array1 = {};
  for (let i = 1; i < arguments.length; i++) {
    if (arguments[i] == "") continue;
    let key = arguments[i].split('$')[0];
    let val = arguments[i].split('$')[1];
    array[key] = val;
  }
  let postData = this.$qs.stringify(array);
  let con = {
    method: 'post',
    url: '/Screening' + arguments[0],
    //params: array,
    data: postData
  }
  return con;
}

function axiosConfig2(arg) {
  let array = {};
  for (let i = 1; i < arg.length; i++) {
    if (arg[i] == "") continue;
    let key = arg[i].split('$')[0];
    let val = arg[i].split('$')[1];
    array[key] = val;
  }
  let postData = this.$qs.stringify(array);
  let con = {
    method: 'post',
    url: '/Screening' + arg[0],
    data: postData
  }
  return con;
}

function setForm(form, model, data) {
  var array = new Array();
  if (!form) return;
  for (var i in form.$children) {
    var itm = form.$children[i].$children[0];
    if (!itm) continue;
    var itmid = itm.$parent.prop;
    //if(itmid==undefined||!data[itmid]) continue;
    if (itmid == undefined) continue;
    if (!data[itmid] && data[itmid] != 0) data[itmid] = "";
    var itmtyp = itm.$options._componentTag;
    array.push(itmid);
    if (itmtyp == "el-input") {
      model[itmid] = data[itmid];
    }
    if (itmtyp == "el-select") {
      if (itm.multiple) {
        if (data[itmid].toString() != "") {
          model[itmid] = data[itmid].toString().split(',');
        } else {
          model[itmid] = new Array();
        }
      } else {
        model[itmid] = data[itmid];
      }
    }
    if (itmtyp == "el-input-number") {
      if (data[itmid] != "") {
        if (typeof (data[itmid]) == "string") {
          model[itmid] = parseInt(data[itmid])
        } else if (typeof (data[itmid]) == "number") {
          model[itmid] = data[itmid];
        }
      }
    }
    if (itmtyp == "el-date-picker") {
      if (data[itmid] != "") {
        if (data[itmid] instanceof Date) {
          model[itmid] = new Date(data[itmid]);
        } else if (typeof (data[itmid]) == "string") {
          model[itmid] = new Date(data[itmid].replace(/-/g, '/'));
        }
      }
    }
    if (itmtyp == "el-radio") {
      if (data[itmid] != "") {
        model[itmid] = data[itmid];
      }
    }
    if (itmtyp == "el-radio-group") {
      if (data[itmid] != "") {
        model[itmid] = data[itmid];
      }
    }
    if (itmtyp == "el-checkbox") {

    }
    if (itmtyp == "el-cascader") {
      if (data[itmid] != "") {
        model[itmid] = data[itmid].split(',');
      } else {
        model[itmid] = new Array();
      }
    }
    if (itmtyp == "el-switch") {
      if (data[itmid] != "") {
        model[itmid] = data[itmid];
      }
    }
    if (itmtyp == "el-slider") {

    }
    if (itmtyp == "el-time-select") {
      if (data[itmid] != "") {
        model[itmid] = data[itmid];
      }
    }
    if (itmtyp == "el-upload") {
      if (data[itmid] != "") {
        let aUpload = data[itmid].toString().split(',');
        let oUpload = new Array();
        for (let i = 0; i < aUpload.length; i++) {
          if (!aUpload[i]) continue;
          let oUploadUrl = aUpload[i]
          let oUploadNmae = oUploadUrl.substring(oUploadUrl.lastIndexOf("/") + 1);
          oUpload.push({name: oUploadNmae, url: oUploadUrl});
        }
        model[itmid] = oUpload;
      }
    }
    if (itmtyp == "el-rate") {

    }
    if (itmtyp == "el-color-picker") {
      if (data[itmid] != "") {
        model[itmid] = data[itmid];
      }
    }
    if (itmtyp == "el-transfer") {

    }
  }
  for (var itm in model) {
    if (array.indexOf(itm) != -1) continue;
    model[itm] = data[itm];
  }
}

function setDefaultForm(model, data) {
  for (let itm in model) {
    if (model[itm] instanceof Array) {
      model[itm] = data[itm].split(",");
    } else {
      model[itm] = data[itm];
    }
  }
}

function timeDifference(sttime, endtime) {
  if (sttime == undefined || endtime == undefined || sttime == "" || endtime == "") return 0;
  var sthour = parseInt(sttime.split(':')[0]);
  var stminute = parseInt(sttime.split(':')[1]);
  var endhour = parseInt(endtime.split(':')[0]);
  var endminute = parseInt(endtime.split(':')[1]);
  var hour = (((endhour * 60 + endminute) - (sthour * 60 + stminute)) / 60).toFixed(2);
  return hour;
}

/*
根据〖中华人民共和国国家标准 GB 11643-1999〗中有关公民身份号码的规定，公民身份号码是特征组合码，由十七位数字本体码和一位数字校验码组成。排列顺序从左至右依次为：六位数字地址码，八位数字出生日期码，三位数字顺序码和一位数字校验码。
    地址码表示编码对象常住户口所在县(市、旗、区)的行政区划代码。
    出生日期码表示编码对象出生的年、月、日，其中年份用四位数字表示，年、月、日之间不用分隔符。
    顺序码表示同一地址码所标识的区域范围内，对同年、月、日出生的人员编定的顺序号。顺序码的奇数分给男性，偶数分给女性。
    校验码是根据前面十七位数字码，按照ISO 7064:1983.MOD 11-2校验码计算出来的检验码。

出生日期计算方法。
    15位的身份证编码首先把出生年扩展为4位，简单的就是增加一个19或18,这样就包含了所有1800-1999年出生的人;
    2000年后出生的肯定都是18位的了没有这个烦恼，至于1800年前出生的,那啥那时应该还没身份证号这个东东，⊙﹏⊙b汗...
下面是正则表达式:
 出生日期1800-2099  (18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])
 身份证正则表达式 /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i
 15位校验规则 6位地址编码+6位出生日期+3位顺序号
 18位校验规则 6位地址编码+8位出生日期+3位顺序号+1位校验位

 校验位规则     公式:∑(ai×Wi)(mod 11)……………………………………(1)
                公式(1)中：
                i----表示号码字符从由至左包括校验码在内的位置序号；
                ai----表示第i位置上的号码字符值；
                Wi----示第i位置上的加权因子，其数值依据公式Wi=2^(n-1）(mod 11)计算得出。
                i 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1
                Wi 7 9 10 5 8 4 2 1 6 3 7 9 10 5 8 4 2 1

身份证号合法性验证
支持15位和18位身份证号
支持地址编码、出生日期、校验位验证
*/

function IdentityCodeValid(code) {
  var city = {
    11: "北京",
    12: "天津",
    13: "河北",
    14: "山西",
    15: "内蒙古",
    21: "辽宁",
    22: "吉林",
    23: "黑龙江 ",
    31: "上海",
    32: "江苏",
    33: "浙江",
    34: "安徽",
    35: "福建",
    36: "江西",
    37: "山东",
    41: "河南",
    42: "湖北 ",
    43: "湖南",
    44: "广东",
    45: "广西",
    46: "海南",
    50: "重庆",
    51: "四川",
    52: "贵州",
    53: "云南",
    54: "西藏 ",
    61: "陕西",
    62: "甘肃",
    63: "青海",
    64: "宁夏",
    65: "新疆",
    71: "台湾",
    81: "香港",
    82: "澳门",
    91: "国外 "
  };
  var tip = "";
  var pass = true;
  var reg = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i
  if (!code || !reg.test(code)) {
    tip = "身份证号格式错误";
    pass = false;
  } else if (!city[code.substr(0, 2)]) {
    tip = "地址编码错误";
    pass = false;
  } else {
    //18位身份证需要验证最后一位校验位
    if (code.length == 18) {
      code = code.split('');
      //∑(ai×Wi)(mod 11)
      //加权因子
      var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
      //校验位
      var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
      var sum = 0;
      var ai = 0;
      var wi = 0;
      for (var i = 0; i < 17; i++) {
        ai = code[i];
        wi = factor[i];
        sum += ai * wi;
      }
      var last = parity[sum % 11];
      if (parity[sum % 11] != code[17]) {
        tip = "校验位错误";
        pass = false;
      }
    }
  }
  // if(!pass) alert(tip);
  return pass;
}

function drawTableBorder(objSheet, row1, row2, c1, c2) {
  objSheet.Range(objSheet.Cells(row1, c1), objSheet.Cells(row2, c2)).Borders(1).LineStyle = 1;
  objSheet.Range(objSheet.Cells(row1, c1), objSheet.Cells(row2, c2)).Borders(2).LineStyle = 1;
  objSheet.Range(objSheet.Cells(row1, c1), objSheet.Cells(row2, c2)).Borders(3).LineStyle = 1;
  objSheet.Range(objSheet.Cells(row1, c1), objSheet.Cells(row2, c2)).Borders(4).LineStyle = 1;
}

///
///根据输入值进行检索【首拼或者汉字】
///val:输入值  stores:为v-molde的数组  bakstore:备份数组 desc:数组中的字段描述 code：数组中首拼字段
function filterAcronym(val, stores, bakstore, desc, code, row) {
  if (val) {
    this[stores] = this[bakstore].filter((item) => {
      if (!!~item[desc].indexOf(val.toUpperCase()) || !!~item[code].indexOf(val.toUpperCase())) {
        return true;
      }
    })
  } else {
    this[stores] = this[bakstore];
  }
  return this[stores];
}

function getItmInData(data, key, val, itm) {
  let value = "";
  if (!data) return value;
  data.forEach(row => {
    if (row[key] == val) {
      value = row[itm];
    }
  });
  return value;
}

function getIndexOfData(data, key, val) {
  let index = -1;
  if (!data) return index;
  data.forEach(row => {
    if (row[key] == val) {
      index = data.indexOf(row);
    }
  });
  return index;
}

///比较两个日期的大小
function compareDate(itm, d1, d2) {
  if (d1 == undefined || d2 == undefined) return false;
  var flag = false;
  if (d1 && d2) {
    if ((d1.Format('YYYY-MM-dd')) !== (d2.Format('YYYY-MM-dd'))) {
      flag = true;
    }
  } else if ((!d1 && d2) || (d1 && !d2)) {
    flag = true;
  } else {
    flag = false;
  }
  return flag;
}

function locCascadeWard(val, arr1, arr2, fun) {
  if (arr1) {
    arr1 = [];
  }
  if (arr2) {
    arr2 = [];
  }
  fun(val);
}

function getPosition(o) //取元素坐标
{
  var x = 0, y = 0;
  do {
    x += o.offsetLeft;
    y += o.offsetTop;
  } while (o = o.offsetParent);
  return {'x': x, 'y': y};
}

function sortSelrow(selRows, tableData) { //对所选内容根据一个表格排序
  for (let i = 0; i < selRows.length; i++) {
    for (let j = 0; j < selRows.length - i - 1; j++) {
      let index = tableData.indexOf(selRows[j]);
      let next = tableData.indexOf(selRows[j + 1]);
      if (index > next) {
        let tmp = selRows[j];
        selRows[j] = selRows[j + 1];
        selRows[j + 1] = tmp;
      }
    }
  }
  return selRows;
}

function phonesValid(phone) {
  var reg = /^0?1[3|4|5|6|7|8][0-9]\d{8}$/;
  var gphone = /^(\d3,4|\d{3,4}-)?\d{7,8}$/;
  var a;
  if (reg.test(phone) == true || gphone.test(phone) == true) {
    a = true
  } else {
    a = false;
  }
  return a;
}
