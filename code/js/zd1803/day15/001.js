//输出金字塔
// for (var i = 1; i <=5 ; i++) {
//     for (var j = 1; j <=5-i ; j++) {
//         document.write("&nbsp")
//     }
//     for (var j = 1; j <=2*i-1 ; j++) {
//         document.write("*")
//     }
//     document.write("<br>")
// }

//输出100以内5的倍数的和
var sum =0;
debugger
for (var i = 1; i <=1000 ; i++) {
    //判断是否是五的倍数
    if (i%5!=0){
        continue;
    }
    sum+=i;
}
alert(sum)