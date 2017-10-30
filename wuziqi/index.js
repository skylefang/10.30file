$(function(){
    let start =$('.start');
    let chong =$('.chong');
    let renji =$('.renji');
    let wanjia =$('.wanjia');



    let hei={};
    let bai={};
    let baiqi =$('.baipi');
    let heiqi =$('.heipi');
    let kongbai ={};
    let isAi ;


    for(let i=0;i<15;i++){
        $('<div>').addClass('hang').appendTo('.qipan');
        $('<span>').addClass('shu').appendTo('.qipan');

        for(let j=0;j<15;j++){
            kongbai[i+'_'+j] = {x:i,y:j};
            $('<li>').addClass('qizi').attr('id',i+'_'+j).data('pos',{x:i,y:j}).appendTo('.qipan');
        }
    }

    $(renji).on('click',function(){
        isAi = true;
    });
    $(wanjia).on('click',function(){
        isAi = false;
    })
    $(start).on('click',function(){
        star();
    });
    $(chong).on('click',function(){
        $('.qipan .qizi').removeClass('hei');
        $('.qipan .qizi').removeClass('bai');
        $(heiqi).css({opacity:0});
        $(baiqi).css({opacity:0});
        hei ={};
        bai={};
        kongbai={};
        star();
    });

    function star(){

    let flag = true;
    $('.qipan .qizi').on('click',function(){
        if($(this).hasClass('hei') || $(this).hasClass('bai')){
            return;
        }
        let data = $(this).data('pos');
        if(flag){
            $(this).addClass('hei');
            hei[data.x+'_'+data.y]=true;
            delete kongbai [data.x+'_'+data.y];
           if( panduan(data,hei)>=5){
               $('.qipan .qizi').off();
               $(heiqi).css({opacity:1});
           }
           if(isAi){
               let pos =ai();
               $(`#${pos.x}_${pos.y}`).addClass('bai');
               $(this).addClass('hei');
               bai[pos.x+'_'+pos.y]=true;
               delete kongbai [pos.x+'_'+pos.y];
               if( panduan(pos,bai)>=5){
                   $('.qipan .qizi').off();
                   $(baiqi).css({opacity:1});
               }
               return
           }
        }else {
            $(this).addClass('bai');
            bai[data.x+'_'+data.y]=true;
            delete kongbai [data.x+'_'+data.y];
            if( panduan(data,bai)>=5){
                $('.qipan .qizi').off();
                $(baiqi).css({opacity:1});
            }
        }
        flag=!flag;
    });
    function ai() {
        let max =-Infinity;
        let max1 = -Infinity;
        let zuobiao =null;
        let zuobiao1 =null;
        //白
        for(let i in kongbai){
            let scroe =panduan(kongbai[i],bai)
           if( scroe > max){
               max =scroe;
               zuobiao =kongbai[i];
           }
        }
        //黑
        for(let i in kongbai){
            let scroe =panduan(kongbai[i],hei)
            if( scroe > max1){
                max1 =scroe;
                zuobiao1 =kongbai[i];
            }
        }

        return (max >= max1) ? zuobiao : zuobiao1;
    }
    function panduan(pos,obj) {
        let rows =1, cols =1 , zx =1 , zy =1;
        let i =pos.x ,j=pos.y+1;
        //行
        while (obj[i+'_'+j]){
            rows++;
            j++;
        }
        j = pos.y -1;
        while (obj[i+'_'+j]){
            rows++;
            j--;
        }
    //    竖
        i=pos.x+1 ,j=pos.y;
        while (obj[i+'_'+j]){
            cols++;
            i++;
        }
        i=pos.x -1;
        while (obj[i+'_'+j]){
            cols++;
            i--;
        }
    //    左斜
        i=pos.x ,j=pos.y;
        while (obj[i+'_'+j]){
            zx++;
            i++;
            j++;
        }
        i=pos.x-1,j = pos.y -1;
        while (obj[i+'_'+j]){
           zx++;
           i--;
           j--;

        }
    //    右斜
        i=pos.x ,j=pos.y;
        while (obj[i+'_'+j]){
            zy++;
            i--;
            j++;
        }
        i=pos.x+1, j = pos.y -1;
        while (obj[i+'_'+j]) {
            zy++;
            i++;
            j--;
        }
        return Math.max(rows,cols,zx,zy)

    }

    }
    console.log(hei,bai,kongbai)
});