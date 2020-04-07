//计算任意值的和
//定义函数
function JiSuan(num) {
    var sum =0;
    for (var i = 0; i <= num; i++) {
        sum+=i;
    }
    return sum;
}
//电影院买票

//定义外层循环
//形参：形式参数（定义函数时传递的参数，可变的，只需和函数体的参数一致即可）
function DianY(pai,zuo) {
    document.write("<table align='center'>")
    for (var i = 1; i <=pai ; i++) {
        //定义四排
        document.write("<tr height='70'>")
        //定义内层循环 定义座位号
        for (var j = 1; j <= zuo ; j++) {
            //跳过已售作业
            if(i%2!=0 && j%2==0){
                document.write("<td background='yes.png' width='80' align='center'>"+"已售"+"</td>")
                continue;
            }
            // if(i==3 && j==9){
            //     document.write("<td background='yes.png' width='80' align='center'>"+"已售"+"</td>")
            //     continue;
            // }
            document.write("<td background='no.png' width='80' align='center'>"+i+"排"+j+"座"+"</td>")
            // break;

        }
        document.write("</tr>")
        // break;
    }
    document.write("</table>")
}