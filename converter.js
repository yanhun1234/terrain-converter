/*(async function(){
document.found=[];
function load(number){
    var url="https://api.codemao.cn/web/forums/posts/all?ids="+number;
    var request = new XMLHttpRequest();
    request.open("get",url);
    request.send(null);
    request.onload = function(){
        if(request.status == 200){
            // console.log("respond:"+request.responseText);
            // if(request.responseText.toString().includes(`"r-community-r-detail--forum_title"`)){
            //     console.log(number+"有东西！")
            // }else{
            //     console.log("没找到东西》。。")
            // }
            // // console.log(json);
            var json=JSON.parse(request.responseText);
            try{
            if(json.items[0].user.nickname!=null){
                if(json.items[0].user.nickname=="Yue.S"){
                    document.found.push(number);
                }
                
            }
        }catch(e){

        }
            
        }
    }
}
    for(let i=1;i<2500;i++){
        try{
        load(i);
        }catch(e){}
    }
    console.log(document.found)
})()
/*











function load(number){
    var url="https://trainer.codemao.cn/trainer/friendships/search?name="+number+"&page=1&size=20";
    var request = new XMLHttpRequest();
    request.open("get",url);
    request.send(null);
    request.onload = function(){
        if(request.status == 200){
            var json=JSON.parse(request.responseText);
            document.body.innerHTML="";
            for(let i=0;i<json.length;i++){
                document.body.innerHTML+="<style>h1,h3{float:left;}</style><h3>用户id:"+json[i].user_id+"<br>用户名:"+json[i].nick_name+"</h3><br><br><br><br>";
            }
            
            
        }
    }
}
    load(prompt("请输入你要查询的训练师的名称的一部分"))


*/




















/*
function fake_click(obj) {
    var ev = document.createEvent("MouseEvents");
    ev.initMouseEvent(
        "click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null
    );
    obj.dispatchEvent(ev);
}
function download(name, data) {
    var urlObject = window.URL || window.webkitURL || window;

    var downloadData = new Blob([data]);

    var save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a")
    save_link.href = urlObject.createObjectURL(downloadData);
    save_link.download = name;
    fake_click(save_link);
}
lst=document.querySelectorAll("._1lc2JYbd9MxtVX4fv1cNWY");var lst1=document.querySelectorAll("._22Egkuvwle29o4-xuAKcoQ");var retu="";
for(let i=0;i<lst.length;i++){retu+=lst1[i].innerHTML+"："+lst[i].innerHTML+"\n"};
download("test",retu);
*/

var cvs=document.getElementById("cvs");
var ctx=cvs.getContext('2d');


window.onload = async function(){
    var lst=[];
    const size=256;
    for(let i=0;i<size;i++){
        lst[i]=[];
        for(let j=0;j<size;j++){
            lst[i][j]=[0,0];
        }
    }

    // 内存中先加载，然后当内存加载完毕时，再把内存中的数据填充到我们的 dom元素中，这样能够快速的去
    // 反应，比如网易的图片
    var img = new Image();
    img.src = "./height.png";
    img.onload = function(){
        alert('加载完毕')
        
        // 将图片画到canvas上面上去！
        ctx.drawImage(img,0,0);


    }
    var img2 = new Image();
    img2.src = "./slope.png";
    img2.onload = function(){
        
        // 将图片画到canvas上面上去！
        


    }
    
    setTimeout(()=>{
    var imgData=ctx.getImageData(0,0,256,256)
    for(let i=0;i<262144;i+=4){
        var x=i%(size*4)/4;
        var y=(i-i%(size*4))/size/4;
        lst[x][y][0]=Math.round(imgData.data[i+""]/4.1);
        if(lst[x][y][0]==null)console.log(i)
    }
    // document.getElementById("writeIn").innerHTML=JSON.stringify(imgData)
    ctx.drawImage(img2,0,0);
    },1000)


    
    
    setTimeout(()=>{
    var imgData2=ctx.getImageData(0,0,256,256)
    for(let i=0;i<262144;i+=4){
        var x=i%(size*4)/4;
        var y=(i-i%(size*4))/size/4;
        if(imgData2.data[i+""]<128)
        lst[x][y][1]=0;
        else lst[x][y][1]=1;
    }
    function fake_click(obj) {
        var ev = document.createEvent("MouseEvents");
        ev.initMouseEvent(
            "click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null
        );
        obj.dispatchEvent(ev);
    }
    function download(name, data) {
        var urlObject = window.URL || window.webkitURL || window;
    
        var downloadData = new Blob([data]);
    
        var save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a")
        save_link.href = urlObject.createObjectURL(downloadData);
        save_link.download = name;
        fake_click(save_link);
    }
    var dddddd=`
    (async()=>{
        var data=${JSON.stringify(lst)};
        for(let i=0;i<256;i++){
            for(let j=0;j<256;j++){
                var vxs=data[i][j][1]==1?"grass":(Math.random()<0.5?"stone":"rock");
                voxels.setVoxel(i,data[i][j][0],j,vxs);
                for(let s=0;s<data[i][j][0];s++)
                voxels.setVoxel(i,s,j,vxs=="grass"?"dirt":"rock");
            }
                
            await sleep(20)
        }
    })()
    `
    download("terrainFromWorldMachine",dddddd)
    
    // document.getElementById("writeIn").innerHTML+="<br><br><br><br><br><br><br><br><br>"+JSON.stringify(imgData2)
    },1000)
    

}

