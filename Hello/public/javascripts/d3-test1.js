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
let axis = d3.axisTop(linear);
d3.select("body").append("svg")
    .attr('class', 'axis')
    .attr("width", 600)
    .attr("height", 30)
    .append("g")
    .attr("transform", "translate(0,20)")
    .call(axis);

//等价于
// let axis = d3.axisTop(linear);
// axis(d3.select("body").append("svg")
//     .attr('class', 'axis')
//     .attr("width", 600)
//     .attr("height", 30)
//     .append("g")
//     .attr("transform", "translate(0,20)"));