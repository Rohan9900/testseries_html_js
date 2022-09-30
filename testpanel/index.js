


window.onload = async () => {

    document.getElementById("name_stu").innerHTML = " " + JSON.parse(localStorage.getItem("register")).username;


    let curr = new Date();
    curr.setSeconds(curr.getSeconds() + 30);

    var deadline = new Date(curr).getTime();

    var x = setInterval(function () {
        let str = "";
        var now = new Date().getTime();
        var t = deadline - now;
        console.log(t);

        var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((t % (1000 * 60)) / 1000);
        str += minutes + ":" + seconds;

        if (t < 0) {
            str = "00:00";

            clearInterval(x);

            onSubmit();

        }
        document.getElementById("time").innerHTML = str;

    }, 1000);





    const response = await fetch('../test.json');
    const data = await response.json();


    let score_p = data.reduce(function (sum, item) {
        return sum + parseInt(item.marks);
    }, 0);


    document.getElementById('score_full').innerHTML = score_p;

    let activeQuestion = 0;
    let isSubmit = false;

    const changeVal = (indexes, val) => {


        data[indexes].marked = val + 1;
        console.log(data);


    }


    document.getElementById('prev').onclick = () => {
        if (activeQuestion > 0) {
            setQuestions(activeQuestion - 1);
        }
    }

    document.getElementById('next').onclick = () => {
        if (activeQuestion < data.length - 1) {
            setQuestions(activeQuestion + 1);
        }
    }

    function setQuestions(index) {
        document.getElementById('ques').innerHTML = data[index].question;
        document.getElementById('mcq').innerHTML = "";


        data[index].option.map((item, indexes) => {


            let divInput = `
        <div>
        <input ${isSubmit ? "disabled" : ""} class="mcqopt" value=${indexes} id="item${indexes}" type="radio" name="options" />
        <label for="item${indexes}">${item}</label>
        ${isSubmit && indexes + 1 == data[index]?.answer ? "✅" : ""}

        </div>
        `


            var wrapper = document.createElement('div');
            wrapper.innerHTML = divInput;

            document.getElementById('mcq').appendChild(wrapper);

            document.getElementsByClassName('mcqopt')[indexes].onclick = () => { changeVal(index, indexes) };





        });

        if (isSubmit) {
            var wrapper = document.createElement('div');
            wrapper.innerHTML = data[index]?.answer == data[index]?.marked ? `<span style="color:#6CBD7D;">Hurray! Correct Answer</span>` : `<span style="color:red;">You are fucked! Wrong Answer</span>`;

            document.getElementById('mcq').appendChild(wrapper);
        }


        if (parseInt(data[index].marked) != 0) {
            document.getElementsByClassName('mcqopt')[parseInt(data[index].marked) - 1].checked = true;
        }

        activeQuestion = index;



    }



    setQuestions(activeQuestion);

    data?.map((item, index) => {
        let div = `
        <div
              class="test_left"
              style="
                padding: 10px;
                width: 100%;
                align-items: center;
                color: rgb(84, 84, 84);
                cursor:pointer;
              "
              
            >
              <div>
                <img
                  class="test_img"
                  src="/assets/puzzle-icon.png"
                  alt="puzzle"
                />
                <span style="color: rgb(84, 84, 84)">${item?.title}</span>
              </div>
              <div>${item?.answer == item?.marked ? 10 : 0}/${item?.marks}</div>
            </div>
        
        `

        var wrapper = document.createElement('div');
        wrapper.innerHTML = div;
        wrapper.style.display = 'flex';
        wrapper.style.flexDirection = 'column';
        wrapper.style.width = '100%';

        document.getElementById('test_screen').appendChild(wrapper);

        document.getElementsByClassName('test_left')[index].onclick = () => {
            setQuestions(index);


        };





    });


    document.getElementById('submit_test').onclick = () => { onSubmit() }



    const onSubmit = () => {
        isSubmit = true;

        document.getElementById('test_screen').innerHTML = '';

        data?.map((item, index) => {
            let div = `
            <div
                  class="test_left"
                  style="
                    padding: 10px;
                    width: 100%;
                    align-items: center;
                    color: rgb(84, 84, 84);
                    cursor:pointer;
                  "
                  
                >
                  <div>
                    <img
                      class="test_img"
                      src="/assets/puzzle-icon.png"
                      alt="puzzle"
                    />
                    <span style="color: rgb(84, 84, 84)">${item?.title}</span>
                    <div class="${item?.answer == item?.marked ? "is_correct" : "is_incorrect"}"
                  ></div>
                  </div>
                  <div>${item?.answer == item?.marked ? item?.marks : 0}/${item?.marks}</div>
                </div>
            
            `

            var wrapper = document.createElement('div');
            wrapper.innerHTML = div;
            wrapper.style.display = 'flex';
            wrapper.style.flexDirection = 'column';
            wrapper.style.width = '100%';

            document.getElementById('test_screen').appendChild(wrapper);

            document.getElementsByClassName('test_left')[index].onclick = () => {
                setQuestions(index);


            };





        });

        let score = data.reduce(function (sum, item) {
            console.log(sum, item);
            return (item?.answer == item?.marked) ? sum + parseInt(item.marks) : sum;
        }, 0);

        console.log(score)

        document.getElementById('score').innerHTML = score;

    }









}




