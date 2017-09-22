/**
 * Created by zxy on 2017/9/20.
 */
// d3.selectAll('p').style('color', 'red');
// d3.select('body').style('background-color', 'blue');
d3.selectAll('p').style('color', function () {
    return `hsl(${Math.random() * 360}, 100%, 50%)`;
});
d3.select('body')
    .selectAll('p')
    .data([12,16,20])
    .enter().append('p')
    .text(function (d) {
        return `Hello ${d}`;
    }).style('color', function () {
        return `hsl(${Math.random() * 360}, 100%, 50%)`;
    }).style('font-size', function (d) {
        return `${d}px`;
    });

// d3.select("body")
//     .selectAll("p")
//     .data([4, 8, 15, 16, 23, 42])
//     .enter().append("p")
//     .text(function(d) { return "I’m number " + d + "!"; });

// d3.select(".axis")
    // .call(d3.axisBottom([0,1]));

let str = "china";
let p = d3.select('body').selectAll('p');
p.datum(str);
p.text(function (d, i) {
    return `this is ${i} ${d}`
});


//线性比例尺
let dataLinearScale = [ 2.5 , 2.1 , 1.7 , 1.3 , 0.9 ];
//将 dataset 中最小的值，映射成 0；将最大的值，映射成 300。
let linear = d3.scaleLinear()
    .domain([0, d3.max(dataLinearScale)])
    .range([0, 300]);

//序列比例尺
let index = [0, 1, 2, 3, 4];
let color = ["red", "blue", "green", "yellow", "black"];
let ordinal = d3.scaleOrdinal()
    .domain(index)
    .range(color);

console.log(ordinal(0), ordinal(2), ordinal(4)); //返回 red，green，black


//矩形
let rectWidth = [250, 210, 170, 130, 100];
let rectHeight = 25;
let svg = d3.select('.rect');
svg.selectAll('rect')
    .data(dataLinearScale)
    .enter().append('rect')
    .attr('x', 0)
    .attr('y', function (d, i) {
        return i * rectHeight;
    })
    .attr('width', function (d, i) {
        return linear(d);
    })
    .attr('height', rectHeight - 2)
    .attr('fill', 'steelblue');

//坐标轴
// let axisData = [ 2.5 , 2.1 , 1.7 , 1.3 , 0.9 ];
let axis = d3.axisLeft(linear)
        .tickValues([2.5 , 2.1 , 1.7 , 1.3 , 0.9])
        .tickSizeInner(2);

d3.select("body").select("svg.axisY")
    .attr("width", 60)
    .attr("height", 400)
    .append("g")
    .attr("transform", "translate(40,6)")
    .call(axis);

//line
let lineData = [
    {date: new Date(2007, 3, 24), value: 93.24},
    {date: new Date(2007, 3, 25), value: 95.35},
    {date: new Date(2007, 3, 26), value: 98.84},
    {date: new Date(2007, 3, 27), value: 99.92},
    {date: new Date(2007, 3, 30), value: 99.80},
    {date: new Date(2007, 4,  1), value: 99.47}
];

let lineD = [2,3,6];
let x = d3.scaleTime()
    .range([0, 20]);

let y = d3.scaleLinear()
    .range([20, 0]);
let line = d3.line().x([1,2,3,6]).y([1,2,3,6]);

let lineData2 = line(lineD);

let lineCont = d3.select('body').select('svg.line')
    .attr('width', 300).attr('height', 300)
    .append('path')
    .attr('d', lineData2)
    .attr('transform', `translate(8,0)`);

//arc
//第一步 创建生成器
let arc = d3.arc();
//第二步 转换数据
//原始数据
//存在一个对象之中，假设我们要接受后台的数据，接受了直接放在对象中也很方便。
let myData = {
    innerRadius: 80,//内半径，如果要画圆，设为0
    outerRadius: 100,//外半径
    startAngle: 0,//起始角度，此处使用弧度表示
    endAngle: 2*Math.PI//结束角度
};
//数据转化
let outData = arc(myData);
//如果想查看转换之后的数据，可以添加一个alert方法进行查看。
//alert(outData);
//第三步
d3.select('body').select('svg.arc')
    .attr('width', 400)
    .attr('height', 400)
    .style('background', '#7789dd')
    .append('g')
    .attr('transform', `translate(${400/2}, ${400/2})`)
    .append('path')
    .attr('fill', '#000')
    .attr('d', outData);