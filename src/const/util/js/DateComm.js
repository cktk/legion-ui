/// 日期格式转化
Date.prototype.Format = function (fmt) { //author: meizz
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "H+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "i+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "w+": this.getDay(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+|Y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}
/// 获取星期
Date.prototype.getWeek = function () {
  var weeknum = this.getDay();
  switch (weeknum) {
    case 1:
      weekdesc = "星期一";
      break;
    case 2:
      weekdesc = "星期二";
      break;
    case 3:
      weekdesc = "星期三";
      break;
    case 4:
      weekdesc = "星期四";
      break;
    case 5:
      weekdesc = "星期五";
      break;
    case 6:
      weekdesc = "星期六";
      break;
    case 0:
      weekdesc = "星期日";
      break;
    default:
      weekdesc = "";
  }
  return weekdesc;
}
// 获据和当前日期的相差某个天数的日期
Date.prototype.addDate = function (num) {
  var date = new Date(this);
  return new Date(date.setDate(date.getDate() + num));
}
// 获取当前周的某一天
Date.prototype.getWeekDate = function (num) {
  var date = new Date(this);
  num = Math.abs(num);
  if (+num == 0) num == 1;
  if (+num > 7) num = 7;
  var week = date.getDay();
  if (week == 0) week = 7;
  return new Date(date.setDate(date.getDate() + num - week));
}
// 获取当前月的某一天
Date.prototype.getMonthDate = function (num) {
  var date = new Date(this);
  return new Date(date.setDate(num));
}
// 获取当前月的天数
Date.prototype.getMonthDay = function () {
  var month = this.getMonth() + 1;
  var days = 0;
  switch (month) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      days = 31;
      break;
    case 4:
    case 6:
    case 9:
    case 11:
      days = 30;
      break;
    case 2:
      days = (this.isLeapYear() ? 29 : 28);
      break;
    default:
      days = "";
  }
  return days;
}
//闰年
Date.prototype.isLeapYear = function () {
  var year = this.getFullYear();
  if (year % 4 == 0 && year % 100 > 0) return true;
  if (year % 400 == 0) return true;
  return false;
}
// 判断日期是否在两个日期之间
Date.prototype.between = function (stdate, enddate) {
  var datetime = this.Format('yyyy-MM-dd HH:ii:ss');
  var stdatetime = stdate.Format('yyyy-MM-dd HH:ii:ss');
  var enddatetime = enddate.Format('yyyy-MM-dd HH:ii:ss');
  return (datetime >= stdatetime && datetime <= enddatetime);
}

// 获取一年中的第几天
Date.prototype.getYearDay = function () {
  // var days=this.getDate();
  // var month=this.getMonth()+1;
  // for(var i=1;i<month;i++)
  // {
  //     days+=new Date(i+"/01/"+this.getFullYear()).getMonthDay();
  // }
  var days = Math.ceil((parseInt(this.valueOf()) - parseInt(new Date("01/01/" + this.getFullYear()).valueOf())) / 24 / 60 / 60 / 1000);
  return days;
}

// 获取当前周数
Date.prototype.getWeekNum = function () {
  var firstdate = new Date("01/01/" + this.getFullYear());
  // alert(this.getYearDay() - firstdate.getWeekDate(7).getYearDay())
  var weeknum = Math.ceil(parseInt(this.getYearDay() - firstdate.getWeekDate(7).getYearDay()) / 7);
  return weeknum;
}
