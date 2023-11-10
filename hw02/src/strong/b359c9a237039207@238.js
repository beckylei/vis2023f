function _1(md){return(
md`# HW2 Strong baseline`
)}

function _data(FileAttachment){return(
FileAttachment("data.json").json()
)}

function _star(){return(
[]
)}

function _xlabel(){return(
["牡羊座","金牛座","雙子座","巨蟹座","獅子座","處女座","天秤座","天蠍座","射手座","摩羯座","水瓶座","雙魚座"]
)}

function _starnumber(data){return(
data.map(item => item.Constellation)
)}

function _6(star,starnumber,data)
{
  star.length = 0; //將yCounts清空
  var minStar = Math.min(...starnumber); //最早出生年
  var maxStar = Math.max(...starnumber); //最晚出生年
  for (var y=minStar; y<=maxStar; y++) { 
    //所有年份都建立兩個Object，一個存放男性資料，一個存放女性資料
    star.push({star:y, gender:"male", count:0}); 
    //Object包含：1. 出生年，2.男性，3.人數(設為0)
    star.push({star:y, gender:"female", count:0}); 
    //Object包含：1. 出生年，2.女性，3.人數(設為0)
  }
  data.forEach (x=> {
    var i = (x.Constellation-minStar)*2 + (x.Gender== "男" ? 0 : 1); 
    star[i].count++;
    //讀取data array，加總每個年份出生的人
  })
  return star
}


function _7(Plot,xlabel,star){return(
Plot.plot({
  marginTop: 50,
  marginRight: 50,
  marginBottom: 50,
  marginLeft: 50,
  
  grid: true,
  y: {label: "count"},
  x:{tickFormat: (d,i) => xlabel[i]},
  marks: [
    Plot.ruleY([0]),
    Plot.barY(star, {x: "star", y: "count",
                     title: (d,i) => `count: ${d.count} \n Constellation: ${xlabel[d.star]}\n Gender: ${d.gender}`,
                     tip: true , fill:"gender"}), //y: d => d.frequency * 100
  ]
})
)}

function _8(Plot,xlabel,data){return(
Plot.plot({  
	marginTop: 50, 
	marginRight: 50, 
	marginBottom: 50, 
	marginLeft: 50,   
	y: {grid: true, label: "count",  title: 1},  
  x:{tickFormat: (d,i) => xlabel[i],ticks: 12},
	marks: [    
		Plot.rectY(data, Plot.binX({y:"count"}, { x:"Constellation", interval:1, fill:"Gender", 
              title: (d,i) => `Constellation: ${xlabel[d.Constellation]}\n Gender: ${d.Gender}`, tip: true})),    
		Plot.gridY({ interval: 1, stroke: "white", strokeOpacity: 0.1 }),
	 ],
})
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["data.json", {url: new URL("../data.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("data")).define("data", ["FileAttachment"], _data);
  main.variable(observer("star")).define("star", _star);
  main.variable(observer("xlabel")).define("xlabel", _xlabel);
  main.variable(observer("starnumber")).define("starnumber", ["data"], _starnumber);
  main.variable(observer()).define(["star","starnumber","data"], _6);
  main.variable(observer()).define(["Plot","xlabel","star"], _7);
  main.variable(observer()).define(["Plot","xlabel","data"], _8);
  return main;
}
