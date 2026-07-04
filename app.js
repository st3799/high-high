let current = [];
let index = 0;

let done = 0;
let correct = 0;

const app = document.getElementById("app");

const menuButtons = document.querySelectorAll("button[data-id]");

menuButtons.forEach(btn=>{
btn.addEventListener("click",()=>{
load(btn.dataset.id);
});
});

function load(id){

if(!questionBank[id]){
alert("该章节没有题");
return;
}

current = questionBank[id];
index = 0;

render();

}

function render(){

const q = current[index];

app.innerHTML = `
<h2>第 ${index+1} 题</h2>
<p>${q.q}</p>

${q.options.map((o,i)=>
`<div class="option" data-i="${i}">${o}</div>`
).join("")}
`;

document.querySelectorAll(".option").forEach(el=>{
el.addEventListener("click",()=>{
check(Number(el.dataset.i));
});
});

}

function check(i){

const q = current[index];

done++;

if(i === q.a){
correct++;
alert("✔ 正确");
}else{
alert("❌ 错误：" + q.explain);
}

update();

index++;

if(index < current.length){
render();
}else{
app.innerHTML = "本章完成";
}

}

function update(){

document.getElementById("done").innerText = done;

let rate = done?Math.round(correct/done*100):0;

document.getElementById("rate").innerText = rate + "%";

}
