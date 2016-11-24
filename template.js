(function () {
    /* 
    * 语法正则 
    */
    var regMap = [
        // if语句开始 
        { reg: /^if\\s+(.+)/i, val: function (condition) { return "if(" + condition + ") {"; } },
        // elseif 语句开始 
        { reg: /^elseif\\s+(.+)/i, val: function (condition) { return "} else if(" + condition + ") {" } },
        // else语句结束 
        { reg: /^else/i, val: '} else {' },
        // if语句结束 
        { reg: /^\/if/i, val: '}' },
        // list语句开始 
        { reg: /^each\\s+([\\S]+)\\s+as\\s+([\\S]+)/i, val: (all, arr, item) => { return `for(var __INDEX__=0;__INDEX__<${arr}.length;__INDEX__++) {var ${item}=${arr}[__INDEX__];var ${item}_index=__INDEX__;`; } },
        // list语句结束 
        { reg: /^\/\\s*list/i, val: '}' },
        // var 语句 
        { reg: /^var\\s+(.+)/i, val: (all, expr) => { return `var ${expr};`; } }
    ];

    function html() {
        var arr = [];
        arr.push("<ul class=\"list\">");
        for (var i = 0; i < list.length; i++) {
            var item = list[i];
            if (item.state == 1) {
                arr.push("<li class=\"red\">" + item.name + "</li>");
            } else if (item.state == 2) {
                arr.push("<li class=\"blue\">" + item.name + "</li>");
            } else {
                arr.push("<li class=\"green\">" + item.name + "</li>");
            }
        }
        arr.push("</ul>");
        return arr.join("");
    }

    function parseHtml(tpl, data){
        tpl = tpl.replace(/\t/g, '  ').replace(/\n/g, '').replace(/\r/g, '').replace(/\"/g,"\'");
        console.log(tpl);
        var body = ["var out = [];","","return out.join('')"];
        var content = [];
        while(true){
            var start = tpl.indexOf("{{");
            if(start==-1){
                content.push("out.push(\""+tpl+"\");");
                break;
            }else{
                content.push("out.push(\""+tpl.substring(0,start)+"\");");
                tpl = tpl.substring(start+2);
                var end = tpl.indexOf("}}");
                var express = tpl.substring(0,end);
                console.log(express);
                tpl = tpl.substring(end+2);
            }
        }
        body[1] = content.join("");
        var func = new Function("data",body.join(""));
        return func(data);
    }

    template = function (id, data) {
        var html = document.getElementById(id).innerHTML;
        return parseHtml(html,data);
    }
})();