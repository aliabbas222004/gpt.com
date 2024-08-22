window.onload = function () {
    let s=10*60;
    let x=0;
    let arr=new Array(10);
    const incre = document.getElementById('countdown'), 
        mabo = document.getElementById('m'), 
        okbtn = document.getElementById('okbtn'), 
        alr = document.getElementById('alr'),
        m2=document.getElementById('m2'),
        m3=document.getElementById('m3');

    const q = document.getElementsByClassName('q')[0],
        a11 = document.getElementsByClassName('a11')[0], 
        a12 = document.getElementsByClassName('a12')[0], 
        a13 = document.getElementsByClassName('a13')[0], 
        a14 = document.getElementsByClassName('a14')[0];

    let rawData,questions,quizQuestions;

    const p=document.getElementById('p'),
        b1=document.getElementById('b1'),
        b2=document.getElementById('b2'),
        b3=document.getElementById('b3'),
        b4=document.getElementById('b4'),
        b5=document.getElementById('b5'),
        b6=document.getElementById('b6'),
        b7=document.getElementById('b7'),
        b8=document.getElementById('b8'),
        b9=document.getElementById('b9'),
        b10=document.getElementById('b10'),
        n=document.getElementById('n');


    const allQuestions = {
        'If f(x) is odd periodic function then Fourier series of f(x) contains ______' : ['Only a0','Only an','Only bn','a0 and an',0],

        'If f(x) is an even periodic function then it is symmetric with respect to ________' :['X axis','Y axis','Origin','none of these',0],

        'If f(x)=|x| is expanded as a fourie series in (-π,π) then a0 is : ':['π','π/2','π/3','π/4',1],

        'If f(x)=-π ; -π<x<0 and f(x)=x ; 0<x<π . And f(x+2π)=f(x) elsewhere. Then fourier series of f(x) converges to ______ at x=0.' : ['π/2','-π/2','0','-π',1],

        'Which of the following is not Dirichlet\'s condition for the fourier series expansion ?' : ['f(x) is periodic, single valued and finite','f(x) has finite number of discontinues in only one period','f(x) has finite number of minima and maxima','f(x) is periodic, infinite number of discontinuity',1],

        ' If y\'\' + 4y = sin3t , y(0)= y\'(0)= 0 then laplace transform is ____':['3/5 [1/(s^2+4)-1/(s^2+9)]','[1/(s^2+4)-1/(s^2+9)]','3/5 [1/(s^2+4)+1/(s^2+9)]','5/3 [1/(s^2+4)-1/(s^2+9)]',0],

        'To find volume _____ integration can be used.':['single','double','triple','double and triple',3],

        'Using the polar co-ordinates , find the volume of the cylinder with radius a and height h.':['8a3 π/3','4a3 π/3','2a3 π/3','a3 π/3',1],

        'The volume of a cube with side a is _____ ':['a3/ 8','a2','a3','a2/4',2],

       'Gama function of n+1 is ______':['n!','n','n+1','1']

    };


    const buttons = [b1, b2, b3, b4, b5, b6, b7, b8, b9, b10];

    okbtn.addEventListener('click', function () {
        alr.style.display = 'none';
        

        const numbers = new Set();
    
        while (numbers.size < 10) {
            const randomNumber = Math.floor(Math.random() * 10);
            numbers.add(randomNumber);
        }

        arr = Array.from(numbers);
        start();
    });

    function start() {
        mabo.style.filter = 'none';
        m2.style.filter='none';
        m3.style.filter='none';
        b1.style.backgroundColor='rgb(113, 111, 120)';
        loadmcq(arr[x]);
        setInterval(update, 1000);
    }
    

    function update() {
        
        let m=Math.floor(s/60);
        let se=s%60;
        se = (se < 10) ? '0' + se : se;
        m=(m<10)? '0'+m:m;
        incre.innerHTML = `${m}`+ ':' +`${se}`;
        if (m == 0) {
            incre.style.color = 'red';
            incre.style.border = '1px solid red';
        }
        if (s> 0) {
            s--;
        }
    }




    





    function loadmcq(idx) {
        // const keys = Object.keys(allQuestions),
        //     question = keys[idx],
        //     options = allQuestions[question];

        // q.innerHTML = 'Question : ' + question;
        // a11.innerHTML = options[0];
        // a12.innerHTML = options[1];
        // a13.innerHTML = options[2];
        // a14.innerHTML = options[3];

        q.innerHTML = 'Question : ' + quizQuestions[idx].question;
        a11.innerHTML = quizQuestions[idx].options[0];
        a12.innerHTML = quizQuestions[idx].options[1];
        a13.innerHTML = quizQuestions[idx].options[2];
        a14.innerHTML = quizQuestions[idx].options[3];

        
    }

    function setActiveButton(index) {
        buttons.forEach((btn, i) => {
            btn.style.backgroundColor = i === index ? 'rgb(113, 111, 120)' : '';
        });
        x = index;
        loadmcq(arr[x]);
    }

    p.addEventListener('click', function () {
        if (x > 0) {
            setActiveButton(x - 1);
        }
    });

    n.addEventListener('click', function () {
        if (x < buttons.length - 1) {
            setActiveButton(x + 1);
        }
    });
    
};


document.addEventListener('DOMContentLoaded',()=>{
    async function loadQuestions() {
        const response = await fetch('ali.txt');
        const data = await response.text();
        return data.split('\n'); 
    }

    function parseQuestions(data) {
        const questions = data.map(line => {
            const parts = line.split('|');
            return {
                question: parts[0],
                options: parts.slice(1, 5),
                correct: parts[5]
            };
        });
        return questions;
    }

    function getRandomQuestions(questions, num = 10) {
        const shuffled = questions.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, num);
    }

    async function initQuiz() {
        rawData = await loadQuestions();
        questions = parseQuestions(rawData);
        quizQuestions = getRandomQuestions(questions);
    }

    initQuiz();
});