
var msgs = []

var a = "sk-94QZcSO7FJm"
var p = "cK8pW4p03T3BlbkFJVFJu"
var i = "YN1efRDWbeEjyqOs"

function showMessages(destination) {
    var d = document.getElementById(destination);
    d.innerHTML = '';
    msgs.forEach((msg) => {
        const p = document.createElement('p');
        p.innerHTML = '<b>'+msg['role']+'</b>:' + msg['content'];
        d.appendChild(p);
    });
    //msgs = [];
}

function chat(prompt, destination) {
    msgs = [];
    const m = {role: 'user', content: prompt};
    msgs.push(m);
    showMessages(destination);

    var req = 'https://api.openai.com/v1/chat/completions';
    var xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            const json = JSON.parse(xmlhttp.response);
            msgs.push(json['choices'][0]['message'])

            showMessages(destination);
        }
    }
    xmlhttp.open("post", req, true);
    xmlhttp.setRequestHeader('Authorization', 'Bearer ' + a + p + i);
    xmlhttp.setRequestHeader('Content-Type', 'application/json');
    const params = {
        model: 'gpt-3.5-turbo',
        messages: msgs
    }
    xmlhttp.send(JSON.stringify(params));
}