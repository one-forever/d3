
/*
   * 创建时间轴
   * param - opt object
   *   property
   *   - selector: string  如id="timeline" => selector: "#timeline" 选择器
   *   - starttime: string  如：'2014-1-3 12:0:0' 初始化时起始时间
   *   - endtime: string 如：'2014-1-6 12:0:0' 初始话时的结束时间
   *   - mintime: string 如：'2014-0-3 12:0:0' 缩放的最小范围边缘时间
   *   - maxtime: string (可选，默认为Infinity) 如：'2014-2-6 12:0:0' 缩放的最大范围边缘时间
   *   - mintick: number （毫秒，可选, 默认1分钟 60*1000) 缩放到最小的刻度间距
   *   - maxtick: number （毫秒，可选, 默认1天 24*60*60*1000) 缩放到最小的刻度间距
   *
   * param - callback function 回调函数 参数为起始时间和结束时间(start, end) 精确到秒
   * */

function createTimeAxis(opt, callback) {
    //简体中文本地化
    let zh = d3.timeFormatDefaultLocale({
        decimal: ".",
        thousands: ",",
        grouping: [3],
        currency: ["¥", ""],
        dateTime: "%a %b %e %X %Y",
        date: "%Y/%-m/%-d",
        time: "%H:%M:%S",
        periods: ["上午", "下午"],
        days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
        shortDays: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
        months: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
        shortMonths: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
    });
    //设置时间格式
    let formatMillisecond = d3.timeFormat(".%L"),
        formatSecond = d3.timeFormat(":%S"),
        formatMinute = d3.timeFormat("%H:%M"),
        formatHour = d3.timeFormat("%H:00"),
        formatDay = d3.timeFormat("%B%d"),
        formatWeek = d3.timeFormat("%B%d"),
        formatMonth = d3.timeFormat("%B"),
        formatYear = d3.timeFormat("%Y");
    function multiFormat(date) {
        return (d3.timeSecond(date) < date ? formatMillisecond
            : d3.timeMinute(date) < date ? formatSecond
                : d3.timeHour(date) < date ? formatMinute
                    : d3.timeDay(date) < date ? formatHour
                        : d3.timeMonth(date) < date ? (d3.timeWeek(date) < date ? formatDay : formatWeek)
                            : d3.timeYear(date) < date ? formatMonth
                                : formatYear)(date);
    }
    //svg宽，高
    let container = document.querySelector(opt.selector),
        width = container.offsetWidth,
        height = container.offsetHeight,
        brushPos = {};


    let startTime = new Date(opt.starttime),
        endTime = new Date(opt.endtime),

        minScaleTime = new Date(opt.mintime),
        maxScaleTime = opt.maxtime ? new Date(opt.maxtime) : Infinity,

        minTickLen = opt.mintick ? opt.mintick : 60 * 1000, //默认一分钟
        maxTickLen = opt.maxtick ? opt.maxtick : 24 * 60 * 60 * 1000; //默认一天

    console.log(startTime, endTime);
    //时间比例尺
    let timeScale = d3.scaleTime()
        .domain([startTime, endTime]).nice()
        .range([0, width]);

    let scaleLinear = d3.scaleLinear().domain([0, width]).range([0, width]).clamp(true);
    let zoom = d3.zoom()
        .on('zoom', zoomed)
        .on("start", zoomStart)
        .on("end", zoomEnd);

    //添加时间轴
    let timeline = d3.select(opt.selector).append("svg")
        .attr("width", width + 32)
        .attr("height", height + 16)
        .style('margin-left', '-16px')
        .style('padding-left', '16px')
        .attr('id', 'time-axis-svg')
        .append('g')
        .attr('class', 'zoom')
        .call(zoom);

    let axis = d3.axisBottom(timeScale)
        .tickSize(-height)
        .tickFormat(function (date) {
            return multiFormat(date);
        }).tickPadding(-10);

    let timeAxis = timeline.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0, " + (height) + ")")
        .call(axis);

    let brush = d3.brushX()
        .extent([[0,0], [width, height]])
        .on('brush', brushing)
        .on("end", brushend);

    let timeBrush = timeline.append('g')
        .attr('class', 'brush')
        .call(brush);

    timeBrush.select('.selection').on('mouseover', function () {

        let time = `${ formatTime(brushPos.start) } 到 ${ formatTime(brushPos.end) }`;
        timeline.select('.tips').attr('text-anchor', "middle");
        tips.filter('.center').text(time)
            .attr('x', function () {
                let center = (d3.brushSelection(timeBrush.node())[0] + d3.brushSelection(timeBrush.node())[1]) / 2;
                let left = center - this.getBBox().width  / 2;
                let right = center + this.getBBox().width  / 2;
                if (left < 0) {
                    return center - left + 6;
                } else if (right > width) {
                    return center - right + width - 6;
                } else {
                    return center;
                }
            })
            .attr('y', 20);

    });
    timeBrush.select('.selection').on('mouseout', function () {

        tips.filter('.center').text('');
        timeline.select('.tips').attr('text-anchor', "start");
    });
    let formatTime = d3.timeFormat("%Y-%b-%d %H:%M:%S");
    let handle = timeBrush.selectAll('.handle').nodes();
    let tips = timeline.append('g').attr('class', 'tips').attr('font-size', 12)
        .selectAll('tip').data(['left', 'right', 'center']).enter()
        .append('text').attr('class', function (d) { return d; }).attr('fill', '#fff');

    function brushing() {
        //写入tip时间
        tips.filter(function (d, i) {
            return i < 2;
        }).attr('x', function (d, i) {
            return i === 0 ? handle[1].getBBox().x + 6 : handle[0].getBBox().x - this.getBBox().width;
        }).attr('y', function (d, i) {
            return i === 0 ? 20 : height - 20;
        }).text(function (d, i) {
            return formatTime(NewScale.invert(d3.event.selection[i]));
        }).each(function (d, i) {
            let BBox = this.getBBox();
            let cha = BBox.x + BBox.width - width;
            if (cha > 0) d3.select(this).attr('x', BBox.x - cha - 6);
            else if (BBox.x <= 0) d3.select(this).attr('x', 6);
        });
    }

    function brushend() {
        if (!d3.event.selection) return;
        let isSameStart = Date.parse(brushPos.start) === Date.parse(NewScale.invert(d3.event.selection[0]));
        let isSameEnd = Date.parse(brushPos.end) === Date.parse(NewScale.invert(d3.event.selection[1]));
        if (isSameStart && isSameEnd) return;
        brushPos.start = NewScale ? NewScale.invert(d3.event.selection[0]) : timeScale.invert(d3.event.selection[0]);
        brushPos.end = NewScale ? NewScale.invert(d3.event.selection[1]) : timeScale.invert(d3.event.selection[1]);
        let transTimeStart = Math.floor(Date.parse(brushPos.start) / 1000); //精确到秒
        let transTimeEnd = Math.floor(Date.parse(brushPos.end) / 1000);
        callback(transTimeStart, transTimeEnd);
        //console.log('brushed', brushPos, transTimeStart, transTimeEnd);
        tips.text('');
    }

    function zoomStart() {
        brush.on('end', null);
        brush.on('brush', null);
    }

    //zoom进行时处理函数
    let NewScale = timeScale;
    let isSelectionRemove = false;
    function zoomed() {
        zoom.scaleExtent([0, Infinity]);//恢复缩放最小化限制
        let newScale = d3.event.transform.rescaleX(timeScale).nice();

        //设置缩放边缘极限
        let leftLimit = newScale(Date.parse(minScaleTime)) > 0;
        let rightLimit = maxScaleTime === Infinity ? false : newScale(Date.parse(maxScaleTime)) < width;

        if (leftLimit) {
            let cha = Date.parse(minScaleTime) - Date.parse(newScale.domain()[0]);
            let newDomain = newScale.domain().map(function (d) {
                return Date.parse(d) + cha;
            });
            //console.log('已到达左边缘极限');
            newScale.domain(newDomain);
        }

        if (rightLimit) {
            let cha =  Date.parse(newScale.domain()[1]) - Date.parse(maxScaleTime);
            let newDomain = newScale.domain().map(function (d) {
                return Date.parse(d) - cha;
            })
            //console.log('已到达右边缘极限');
            newScale.domain(newDomain);
        }

        leftLimit = newScale(Date.parse(minScaleTime)) > 0;
        rightLimit = maxScaleTime === Infinity ? false : newScale(Date.parse(maxScaleTime)) < width;

        if (leftLimit || rightLimit) {
            //console.log('已达到缩放最小化极限');
            newScale.domain([minScaleTime, maxScaleTime]);
            zoom.scaleExtent([d3.event.transform.k, Infinity]);//缩放最小化限制
        }

        //设置缩放最小刻度极限
        let ticks = newScale.ticks();
        if (Date.parse(ticks[1]) - Date.parse(ticks[0]) === minTickLen && ticks.length < 12) { //默认1分钟
            //console.log('已达到最小刻度');
            zoom.scaleExtent([0, d3.event.transform.k]);
        }

        //设置缩放最大刻度极限
//            if (Date.parse(ticks[1]) - Date.parse(ticks[0]) === maxTickLen && ticks.length < 10) { //默认一天
//                console.log('已达到最大刻度');
//                zoom.scaleExtent([d3.event.transform.k, Infinity]);
//            }

        timeAxis.call(axis.scale(newScale));
        NewScale = newScale;

        //设置brush跟随缩放移动
        if (d3.keys(brushPos).length && d3.brushSelection(timeBrush.node()) || isSelectionRemove) {
            let start = newScale(Date.parse(brushPos.start));
            let end = newScale(Date.parse(brushPos.end));
            let a = scaleLinear(start);
            let b = scaleLinear(end);
            //在left边缘消失
            if (start <= a && end <= a) {
                isSelectionRemove = true;
            } else if (start >= b && end >= b) { //在right边缘消失
                isSelectionRemove = true;
            } else {
                isSelectionRemove = false;
            }
            brush.move(d3.select('.brush'), [a,b]);
        }

        setAxisStyle();
    }

    setAxisStyle();
    function setAxisStyle () {
        timeAxis.selectAll('.tick').each(function (d, i) {
            d3.select(this).select('text').attr('fill', '#fff');
        });
    }

    function zoomEnd() {
        brush.on('end', brushend);
        brush.on('brush', brushing);
    }
}
