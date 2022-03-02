//import { getLodop } from "../utils/js/LodopPrinter.js"
export function create_excel(columns, data, columnsLength, remark, type, title, filename, subtitle, loadingInstance) {
  let Promise = XlsxPopulate.Promise;
  return XlsxPopulate.fromBlankAsync().then(function (workbook) {
    let headRow = 1;
    /// 表格标题
    if (!!title) {
      workbook.sheet(0).row(1).height(30);
      workbook.sheet(0).range("A1:" + getColCode(columnsLength) + "1").merged(true);
      workbook.sheet(0).cell("A1").value(title || "列表");
      workbook.sheet(0).cell("A1").style({
        bold: true,
        fontSize: 14,
        verticalAlignment: 'center',
        horizontalAlignment: 'center'
      });
      headRow = headRow + 1;
    }
    subtitle = subtitle || new Array();
    workbook.sheet(0).row(headRow).height(20);
    for (let i = 0; i < subtitle.length; i++) {
      let cell = workbook.sheet(0).row(headRow).cell(i + 1);
      cell.value(subtitle[i]);
    }
    if (subtitle.length != 0) {
      headRow = headRow + 1;
    }
    let realHeadRow = setHeader(columns, workbook, 0, headRow);
    headRow = headRow + realHeadRow
    for (let row = 0; row < data.length; row++) {
      workbook.sheet(0).row(row + headRow).height(24);
      setData(columns, data[row], workbook, 0, row + headRow - 1);
    }
    if (!!remark) {
      workbook.sheet(0).range("A" + (headRow + data.length) + ":" + getColCode(columnsLength) + (headRow + data.length)).merged(true);
      workbook.sheet(0).row(headRow + data.length).cell(1).value("备注：" + remark);
      workbook.sheet(0).row(headRow + data.length).height(remark.split('\n').length * 24);
      workbook.sheet(0).cell("A" + (headRow + data.length)).style({verticalAlignment: 'top'});
    }
    if (!!loadingInstance) {
      loadingInstance.close();
    }
    /// 另存为
    if (type == "export") {
      workbook.outputAsync().then(function (blob) {
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(blob, "out.xlsx");
        } else {
          let url = window.URL.createObjectURL(blob);
          let a = document.createElement("a");
          document.body.appendChild(a);
          a.href = url;
          a.download = filename || "列表" + ".xlsx";
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
        }
      }).catch(function (err) {
        alert(err.message || err);
        throw err;
      });
    }
    // if (type == "print") {
    //     workbook.outputAsync().then(function (blob) {
    //         let url = window.URL.createObjectURL(blob);
    //         debugger;
    //         let LODOP = getLodop();
    //         LODOP.PRINT_INIT("打印控件功能演示_Lodop功能_按网址打印");
    //         // LODOP.ADD_PRINT_URL(30, 20, 746, "95%", url + "/科室护士工作安排表.xlsx");
    //         LODOP.SET_PRINT_STYLEA(0, "HOrient", 3);
    //         LODOP.SET_PRINT_STYLEA(0, "VOrient", 3);
    //         //		LODOP.SET_SHOW_MODE("MESSAGE_GETING_URL",""); //该语句隐藏进度条或修改提示信息
    //         //		LODOP.SET_SHOW_MODE("MESSAGE_PARSING_URL","");//该语句隐藏进度条或修改提示信息
    //         // LODOP.PREVIEW();
    //         LODOP.ADD_PRINT_HTM(88, 200, 350, 600, document.getElementById("table-list").innerHTML);
    //         LODOP.PREVIEW();
    //     });
    // }
  });
}

export function setData(columns, data, workbook, collen, row) {
  for (let key in columns) {
    collen++;
    let col = columns[key];
    if (!col.children || col.children.length == 0) {
      if (!data[col.prop]) data[col.prop] = "";
      let cell = workbook.sheet(0).row(row).cell(collen);
      cell.value(data[col.prop]);
      cell.style({border: true, verticalAlignment: 'center'});
    } else {
      setData(col.children, data, workbook, collen - 1, row);
      collen += col.colspan - 1;
    }
  }
}

export function setHeader(columns, workbook, collen, headRow) {
  let tHeadRow = headRow;
  for (let key in columns) {
    collen++;
    let col = columns[key];
    if (!col.children || col.children.length == 0) {
      workbook.sheet(0).range(getColCode(collen) + tHeadRow + ":" + getColCode(collen) + (tHeadRow + col.rowspan - 1)).merged(true);
      let cell = workbook.sheet(0).row(tHeadRow).cell(collen);
      cell.value(col.label);
      if (!!col.width) {
        workbook.sheet(0).column(collen).width(col.width / 10 + 2);
      }
      workbook.sheet(0).range(getColCode(collen) + tHeadRow + ":" + getColCode(collen) + (tHeadRow + col.rowspan - 1)).style({
        bold: true,
        border: true
      });
    } else {
      workbook.sheet(0).range(getColCode(collen) + tHeadRow + ":" + getColCode(collen + col.colspan - 1) + (tHeadRow + col.rowspan - 1)).merged(true);
      let cell = workbook.sheet(0).row(tHeadRow).cell(collen);
      cell.value(col.label);
      workbook.sheet(0).range(getColCode(collen) + tHeadRow + ":" + getColCode(collen + col.colspan - 1) + (tHeadRow + col.rowspan - 1)).style({
        bold: true,
        border: true
      });
      headRow = setHeader(col.children, workbook, collen - 1, tHeadRow + 1);
      collen += col.colspan - 1;
    }
  }
  return headRow;
}

export function getColCode(col1) {
  if (col1 == null || col1 == undefined || col1 == "" || col1 <= 0) return "";
  if (col1 <= 26) return String.fromCharCode(64 + col1);
  else {
    let quotient = Math.floor((col1 - 1) / 26); //商
    let surplus = (col1 - 1) % 26; // 余数
    return getColCode(quotient) + String.fromCharCode(65 + surplus);
  }
}

export function fixdata(data) { //文件流转BinaryString
  let o = "",
    l = 0,
    w = 10240;
  for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
  o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
  return o;
}
