(function () {
    /* 
    * 语法正则 
    */
    var regMap = [
        // if语句开始 
        { reg: /^if\s+(.+)/i, val: "if($1) {" },
        // elseif 语句开始 
        { reg: /^else\s+if\s+(.+)/i, val: "} else if($1) {" },
        // else语句结束 
        { reg: /^else/i, val: '} else {' },
        // if语句结束 
        { reg: /^\/if/i, val: '};' },
        // list语句开始 
        {
            reg: /^each\s+([\S]+)\s+as\s+([\S]+)/i,
            val: "var argument = arguments[0];"
            + "for(var __INDEX__=0;__INDEX__<argument.$1.length;__INDEX__++)"
            + "{var $2 = argument.$1[__INDEX__];var index=__INDEX__;"
        },
        // list语句结束 
        { reg: /^\/\s*each/i, val: '};' },
        // var 语句 
        { reg: /^var\s+(.+)/i, val: "var $1;" }
    ];

    function parseHtml(tpl, data) {
        tpl = tpl.replace(/\t/g, '  ').replace(/\n/g, '').replace(/\r/g, '').replace(/\"/g, "\'");
        var body = ["var out = [];", "", "var result = out.join('');return result;"];
        var content = [];
        while (true) {
            var start = tpl.indexOf("{{");
            //转义
            if (tpl.substr(start - 1, 1) == "\\") {
                content.push("out.push(\"" + tpl.substring(0, start + 2) + "\");");
                tpl = tpl.substring(start + 2);
                continue;
            }
            if (start == -1) {
                content.push("out.push(\"" + tpl + "\");");
                break;
            } else {
                content.push("out.push(\"" + tpl.substring(0, start) + "\");");
                tpl = tpl.substring(start + 2);
                var end = tpl.indexOf("}}");
                var express = tpl.substring(0, end);
                var flag = 0;
                for (var i = 0; i < regMap.length; i++) {
                    var item = regMap[i];
                    if (item.reg.test(express)) {
                        content.push(express.replace(item.reg, item.val));
                        flag = 1;
                        break;
                    }
                }
                if (flag == 0) {
                    content.push("out.push(" + express + ");");
                }
                tpl = tpl.substring(end + 2);
            }
        }
        body[1] = content.join("\r\n");
        var func = new Function("data", body.join(""));
        console.log(body[1]);
        var result = func(data);
        return result;
    }

    template = function (id, data) {
        var html = document.getElementById(id).innerHTML;
        return parseHtml(html, data);
    }
})();
