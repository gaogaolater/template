(function () {
    /* 
    * 语法正则 
    */
    var regMap = [
        // if语句开始 
        { reg: /^if\\s+(.+)/i, val: function(condition) { return "if("+condition+") {"; } },
        // elseif 语句开始 
        { reg: /^elseif\\s+(.+)/i, val: function(condition){ return "} else if("+condition+") {" } },
        // else语句结束 
        { reg: /^else/i, val: '} else {' },
        // if语句结束 
        { reg: /^\/if/i, val: '}'}, 
        // list语句开始 
        {reg: /^each\\s+([\\S]+)\\s+as\\s+([\\S]+)/i, val: (all, arr, item) => { return `for(var __INDEX__=0;__INDEX__<${arr}.length;__INDEX__++) {var ${item}=${arr}[__INDEX__];var ${item}_index=__INDEX__;`; } },
        // list语句结束 
        { reg: /^\/\\s*list/i, val: '}' },
        // var 语句 
        { reg: /^var\\s+(.+)/i, val: (all, expr) => { return `var ${expr};`; } }
    ];

    template = function (id, data) {
        var out = [];
        var html = document.getElementById(id).innerHTML;
        var arr = html.split("\n");
        for(var i=0;i<arr.length;i++){
            var row = arr[i].trim();
            if(row.indexOf("{{")==0){
                console.log(row);
            }
            else{
                out.push(row);
            }
        }
        return out.join('\n');
    }
})();