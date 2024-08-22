function createSpark() {
    const spark = document.createElement('div');
    spark.className = 'spark';

    const size = Math.random() * 5 + 5 + 'px';
    const positionX = Math.random() * window.innerWidth + 'px';
    const animationDuration = Math.random() * 2 + 2 + 's';
    const moveX = Math.random() * 100 - 50;  // Random horizontal movement

    spark.style.width = size;
    spark.style.height = size;
    spark.style.left = positionX;
    spark.style.animationDuration = animationDuration;
    spark.style.animationName = 'rise';
    spark.style.animationTimingFunction = 'linear';
    spark.style.animationIterationCount = '1';
    spark.style.setProperty('--moveX', moveX);

    document.body.appendChild(spark);

    spark.addEventListener('animationend', () => {
        spark.remove();
    });
}

function startChingari() {
    t=setInterval(createSpark, 40);
    func1();
    
}

function func1(){
    $('.d1').fadeIn(3000,func2);
    $('.d1').css('display','flex');
    $('.im1').css('border-radius','50%');

}

function func2(){
    j=setInterval(func3,1);
    
}

function func3(){
    cnt++;
    $('.d1').css('left','-=4px').css('height','-=3.6px');
    $('.im1').css('height','-=1px').css('width','-=1px');

    if(cnt==170){
        clearInterval(j);
        clearInterval(t);
        
        document.querySelector('.d2').style.display='flex';
        k=setInterval(func4,300);
        $('.nav').fadeIn(2000);
        $('body').css('overflow','visible');
        
    }
}

function func4(){
    if(cnt2>=str.length){
        clearInterval(k);
        $('.bdy').fadeIn(2000);
        
    }
    else{
        document.querySelector('.d2').innerText=document.querySelector('.d2').innerText+ str[cnt2];      
        cnt2++;
    }
    
}

document.addEventListener('DOMContentLoaded', startChingari);
let t,j,k;
let cnt=0;
let cnt2=0;
let str="GPT";