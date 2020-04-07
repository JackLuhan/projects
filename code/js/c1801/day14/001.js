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

//定义输出图书作者和名称的函数
//定义函数 传递形参
function Book_Name(book,zuozhe) {
    document.write("图书名称为："+book+"<br>")
    document.write("作者名称为："+zuozhe+"<br>")
}

// 模拟淘宝网计算购物车中商品总价的功能。假设购物车中有如下商品信息：
// ①苹果手机：单价5000元，购买数量2台；
// ②联想笔记本电脑：单价4000元，购买数量10台。
// 定义一个带有两个参数的函数price()，将商品单价和商品数量作为参数进行传递。
// 通过调用函数并传递不同的参数分别计算苹果手机和联想笔记本电脑的总价，
// 最后计算购物车中所有商品的总价并输出。
function price(danjia,num) {
    var sum =0;
    sum=danjia*num;
    return sum;
}
