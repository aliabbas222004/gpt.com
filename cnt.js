window.onload = function () {
    let s=10*60;
    let x=0;
    let arr=new Array(10);
    const incre = document.getElementById('countdown'), 
        mabo = document.getElementById('m'), 
        okbtn = document.getElementById('okbtn'), 
        alr = document.getElementById('alr'),
        m2=document.getElementById('m2'),
        m3=document.getElementById('Submit');

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
    
    const a1=document.getElementById('a1'),
        a2=document.getElementById('a2'),
        a3=document.getElementById('a3'),
        a4=document.getElementById('a4');

    const buttons = [b1, b2, b3, b4, b5, b6, b7, b8, b9, b10];

    let arr2 = new Array(10).fill(0);
    
    let counter;

    let submitted=false;

    okbtn.addEventListener('click',async function () {
        alr.style.display = 'none';
        

        const numbers = new Set();
    
        while (numbers.size < 10) {
            const randomNumber = Math.floor(Math.random() * 10);
            numbers.add(randomNumber);
        }

        arr = Array.from(numbers);
        await initQuiz();
        start();
    });

    function start() {
        mabo.style.filter = 'none';
        m2.style.filter='none';
        m3.style.filter='none';
        b1.style.backgroundColor='rgb(113, 111, 120)';
        loadmcq(arr[x]);
        counter=setInterval(update, 1000);
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

    function loadmcq(idx,m) {
        q.innerHTML = 'Question : ' + quizQuestions[idx].question;
        a11.innerHTML = quizQuestions[idx].options[0];
        a12.innerHTML = quizQuestions[idx].options[1];
        a13.innerHTML = quizQuestions[idx].options[2];
        a14.innerHTML = quizQuestions[idx].options[3];

        a1.checked=false;
        a2.checked=false;
        a3.checked=false;
        a4.checked=false;
        switch (arr2[m]) {
            case 1:
                a1.checked = true;
                if(submitted) disableRadioButtons(1);
                break;
            case 2:
                a2.checked = true;
                if(submitted) disableRadioButtons(2);
                break;
            case 3:
                a3.checked = true;
                if(submitted) disableRadioButtons(3);
                break;
            case 4:
                a4.checked = true;
                if(submitted) disableRadioButtons(4);
                break;
            default:
                if(submitted) disableRadioButtons(0);
                break;
        }
    }

    function setActiveButton(index) {
        buttons.forEach((btn, i) => {
            btn.style.backgroundColor = i === index ? 'rgb(113, 111, 120)' : '';
        });
        if(!submitted){
            if(a1.checked){
                arr2[x]=1;
                
            }
            else if(a2.checked){
                arr2[x]=2;
            }
            else if(a3.checked){
                arr2[x]=3;
            }
            else if(a4.checked){
                arr2[x]=4;
            }
        }
        x = index;
        loadmcq(arr[x],x);
    }

    buttons.forEach((btn, idx) => {
        btn.addEventListener('click', () => {
            setActiveButton(idx);
            if(submitted){
                showans(idx);
            }
        });
    });
    

    p.addEventListener('click', function () {
        if (x > 0) {
            setActiveButton(x - 1);
        }
        else if(x==0){
            setActiveButton(9);
        }
        if(submitted){
            // if(x>=0){
                showans(x);
            // }
        }
    });

    n.addEventListener('click', function () {
        if (x < buttons.length - 1) {
            setActiveButton(x + 1);
        }
        else if(x==9){
            setActiveButton(0);
        }
        if(submitted){
            // if(x <= buttons.length - 1){
                showans(x);
            // }
        }
    });

    
    
    document.getElementById('Submit').addEventListener('click',()=>{
        let y=confirm("Are you sure you want to submit?");
        if(y){
            setActiveButton(x);
            document.getElementById('Submit').disabled=true;
            submitted=true;
            clearInterval(counter);
            calscore();
            showans(x);
        }
    })

    function calscore(){
        let score=0;
        for(let i=0;i<=9;i++){
            let correctAnswer = quizQuestions[arr[i]].correct;
            
            if (arr2[i]== correctAnswer){
                score+=1;
            }
            document.querySelector('.mks').innerHTML=`You scored ${score} out of 10 marks`;
        }
    }

    function disableRadioButtons(idx) {

        const radioButtons = [a1, a2, a3, a4];
        radioButtons.forEach((radio, index) => {
            if (index + 1 !== idx) {  
                radio.disabled = true;
            } else {
                radio.disabled = false; 
            }
        });
    }

    function showans(idx){
        document.querySelector('.a1').style.border="2px solid rgba(255, 255, 255, 0.501)"
        document.querySelector('.a1').style.boxShadow="none"
        document.querySelector('.a2').style.border="2px solid rgba(255, 255, 255, 0.501)"
        document.querySelector('.a2').style.boxShadow="none"
        document.querySelector('.a3').style.border="2px solid rgba(255, 255, 255, 0.501)"
        document.querySelector('.a3').style.boxShadow="none"
        document.querySelector('.a4').style.border="2px solid rgba(255, 255, 255, 0.501)"
        document.querySelector('.a4').style.boxShadow="none"
        let correctAnswer = quizQuestions[arr[idx]].correct,
            correctClass = `a${correctAnswer}`,
            correctElement = document.querySelector(`.${correctClass}`);
        if(arr2[idx]==0){

        }
        else if (arr2[idx]!= correctAnswer) {
            let selectedAnswer = arr2[idx],
                selectedClass = `a${selectedAnswer}`,
                selectedElement = document.querySelector(`.${selectedClass}`);
            selectedElement.style.border = "2px solid red";
            selectedElement.style.boxShadow = "0 0 10px red";
        }
        correctElement.style.border = "2px solid green";
        correctElement.style.boxShadow = "0 0 10px green";        
    }
};