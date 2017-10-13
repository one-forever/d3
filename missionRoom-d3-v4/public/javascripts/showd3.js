/**
 * Created by zxy on 2017/9/27.
 */
let oTabs,
    newData,
    objectID,
    timeline, items, tempTimer = 0,
    auto = true,  //是否自动
    // initUrl = 'http://' + window.location.host + '/synergy/show/new',  // 初始化链接
    initUrl = '/synergy/show/range',  // 初始化链接
    meetingUrl = '/synergy/show/meeting/new',
    isQuery = false, // 查询是否成功的标志
    meetingInfo = null, // 会战信息
    newId = 0;  // 新消息id
customTimeOut = NaN;
// let beginTime = Date.now();
let beginTime = 0;

let rightClickobjectID;

varconfigSVG = {
    0: ' 创建了会战',
    1: ' 创建了对象',
    2: ' 使用了业务系统右键跳转',
    3: ' 调用业务系统',
    4: ' 使用了会战平台跳转',
    5: ' 使用了业务平台回传',
    6: ' 删除了会战',
    7: ' 停止会战',
    8: ' 创建了人工业务分析'
};

varconfig = {
    0: '创建会战',
    1: '创建对象',
    2: '业务系统右键跳转',
    3: '调用业务系统',
    4: '会战平台跳转',
    5: '业务平台回传',
    6: '删除会战',
    7: '停止会战',
    8: '人工业务分析'
};

cssconfig = {
    0: "cm",
    1: "co",
    2: "b2m",
    3: "b2api",
    4: "b2b",
    5: "b2m",
    6: "dm",
    7: "cm"

};

let d3Data = `[{"eventID":"939","eventTime":"1500105711222","eventType":"0","info":"{\\"id\\":146,\\"uid\\":1,\\"uname\\":\\"admin\\",\\"name\\":\\"123e534etwdfbvx\\",\\"pid\\":\\"\\",\\"desc\\":\\"sdfgsdfbwrgfb\\"}"},{"eventID":"940","eventTime":"1500105904962","eventType":"1","info":"{\\"type\\":\\"1111\\",\\"id\\":\\"object-011c945f30ce2cbafc452f39840f025693339c42-146-1-1-0\\",\\"name\\":\\"1111\\",\\"uid\\":1,\\"uname\\":\\"admin\\",\\"mid\\":\\"146\\",\\"msgid\\":1,\\"data\\":\\"{\\\\\\"id\\\\\\":\\\\\\"011c945f30ce2cbafc452f39840f025693339c42\\\\\\",\\\\\\"label\\\\\\":\\\\\\"1111\\\\\\",\\\\\\"params\\\\\\":[{\\\\\\"id\\\\\\":\\\\\\"34139ab68d7ab605434d283cfe7aa68bc9e30f0f\\\\\\",\\\\\\"label\\\\\\":\\\\\\"222\\\\\\",\\\\\\"value\\\\\\":\\\\\\"123123123\\\\\\"}],\\\\\\"objectName\\\\\\":\\\\\\"1111\\\\\\",\\\\\\"objectId\\\\\\":0}\\"}"},{"eventID":"942","eventTime":"1500105888804","eventType":"8","info":"{\\"uname\\":\\"admin\\",\\"uid\\":1,\\"desc\\":\\"admin 查询了【11】的【22】\\",\\"nodes\\":{\\"customResults-165\\":{\\"nodeType\\":\\"custom\\",\\"label\\":\\"结果\\",\\"nodeID\\":\\"customResults-165\\",\\"info\\":{\\"properties\\":{\\"123\\":\\"2d533b9d9f0f06ef4e3c23fd496cfeb2780eda7f\\"}}},\\"app-custom-17ba0791499db908433b80f37c5fbc89b870084b\\":{\\"nodeType\\":\\"customapp\\",\\"label\\":\\"11\\",\\"nodeID\\":\\"app-custom-17ba0791499db908433b80f37c5fbc89b870084b\\",\\"info\\":{\\"properties\\":{}}}},\\"links\\":[{\\"from\\":\\"object-011c945f30ce2cbafc452f39840f025693339c42-146-1-1-0\\",\\"to\\":\\"app-custom-17ba0791499db908433b80f37c5fbc89b870084b\\",\\"label\\":\\"电话号码\\",\\"linkType\\":\\"\\",\\"info\\":[{\\"from\\":[{\\"id\\":\\"34139ab68d7ab605434d283cfe7aa68bc9e30f0f\\",\\"value\\":\\"123123123\\",\\"objectID\\":\\"object-011c945f30ce2cbafc452f39840f025693339c42-146-1-1-0\\",\\"objectType\\":\\"customobject\\"}],\\"id\\":\\"34139ab68d7ab605434d283cfe7aa68bc9e30f0f\\",\\"desc\\":\\"电话号码\\"}]},{\\"from\\":\\"app-custom-17ba0791499db908433b80f37c5fbc89b870084b\\",\\"to\\":\\"customResults-165\\",\\"label\\":\\"22\\",\\"linkType\\":\\"\\",\\"info\\":\\"\\"}]}"},{"eventID":"944","eventTime":"1500105917712","eventType":"8","info":"{\\"uname\\":\\"admin\\",\\"uid\\":1,\\"desc\\":\\"admin 查询了【444】的【555】\\",\\"nodes\\":{\\"customResults-166\\":{\\"nodeType\\":\\"custom\\",\\"label\\":\\"结果\\",\\"nodeID\\":\\"customResults-166\\",\\"info\\":{\\"properties\\":{\\"123123\\":\\"e645477f66e745ec37b00fdc6d45d4196a39d1b0\\"}}},\\"app-custom-9a3e61b6bcc8abec08f195526c3132d5a4a98cc0\\":{\\"nodeType\\":\\"customapp\\",\\"label\\":\\"444\\",\\"nodeID\\":\\"app-custom-9a3e61b6bcc8abec08f195526c3132d5a4a98cc0\\",\\"info\\":{\\"properties\\":{}}}},\\"links\\":[{\\"from\\":\\"customResults-165\\",\\"to\\":\\"app-custom-9a3e61b6bcc8abec08f195526c3132d5a4a98cc0\\",\\"label\\":\\"null\\",\\"linkType\\":\\"\\",\\"info\\":[{\\"from\\":[{\\"id\\":\\"123\\",\\"value\\":\\"123\\",\\"objectID\\":\\"customResults-165\\",\\"objectType\\":\\"customobject\\"}],\\"id\\":\\"123\\",\\"desc\\":null}]},{\\"from\\":\\"app-custom-9a3e61b6bcc8abec08f195526c3132d5a4a98cc0\\",\\"to\\":\\"customResults-166\\",\\"label\\":\\"555\\",\\"linkType\\":\\"\\",\\"info\\":\\"\\"}]}"},{"eventID":"968","eventTime":"1500108063538","eventType":"8","info":"{\\"uname\\":\\"admin\\",\\"uid\\":1,\\"desc\\":\\"admin 查询了【123】的【123123】\\",\\"nodes\\":{\\"customResults-167\\":{\\"nodeType\\":\\"custom\\",\\"label\\":\\"结果\\",\\"nodeID\\":\\"customResults-167\\",\\"info\\":{\\"properties\\":{\\"123\\":\\"e009dfc00cc2c7ddf9ddf1f2a262e913b8f31687\\"}}},\\"app-custom-40bd001563085fc35165329ea1ff5c5ecbdbbeef\\":{\\"nodeType\\":\\"customapp\\",\\"label\\":\\"123\\",\\"nodeID\\":\\"app-custom-40bd001563085fc35165329ea1ff5c5ecbdbbeef\\",\\"info\\":{\\"properties\\":{}}}},\\"links\\":[{\\"from\\":\\"object-011c945f30ce2cbafc452f39840f025693339c42-146-1-1-0\\",\\"to\\":\\"app-custom-40bd001563085fc35165329ea1ff5c5ecbdbbeef\\",\\"label\\":\\"电话号码\\",\\"linkType\\":\\"\\",\\"info\\":[{\\"from\\":[{\\"id\\":\\"34139ab68d7ab605434d283cfe7aa68bc9e30f0f\\",\\"value\\":\\"123123123\\",\\"objectID\\":\\"object-011c945f30ce2cbafc452f39840f025693339c42-146-1-1-0\\",\\"objectType\\":\\"customobject\\"}],\\"id\\":\\"34139ab68d7ab605434d283cfe7aa68bc9e30f0f\\",\\"desc\\":\\"电话号码\\"}]},{\\"from\\":\\"app-custom-40bd001563085fc35165329ea1ff5c5ecbdbbeef\\",\\"to\\":\\"customResults-167\\",\\"label\\":\\"123123\\",\\"linkType\\":\\"\\",\\"info\\":\\"\\"}]}"},{"eventID":"970","eventTime":"1500108088956","eventType":"8","info":"{\\"uname\\":\\"admin\\",\\"uid\\":1,\\"desc\\":\\"admin 查询了【123】的【123】\\",\\"nodes\\":{\\"customResults-168\\":{\\"nodeType\\":\\"custom\\",\\"label\\":\\"结果\\",\\"nodeID\\":\\"customResults-168\\",\\"info\\":{\\"properties\\":{\\"123123\\":\\"8f372577ef1a7024bcfb8ad104e86abae34717f6\\"}}},\\"app-custom-40bd001563085fc35165329ea1ff5c5ecbdbbeef\\":{\\"nodeType\\":\\"customapp\\",\\"label\\":\\"123\\",\\"nodeID\\":\\"app-custom-40bd001563085fc35165329ea1ff5c5ecbdbbeef\\",\\"info\\":{\\"properties\\":{}}}},\\"links\\":[{\\"from\\":\\"customResults-167\\",\\"to\\":\\"app-custom-40bd001563085fc35165329ea1ff5c5ecbdbbeef\\",\\"label\\":\\"null\\",\\"linkType\\":\\"\\",\\"info\\":[{\\"from\\":[{\\"id\\":\\"123\\",\\"value\\":\\"123123123\\",\\"objectID\\":\\"customResults-167\\",\\"objectType\\":\\"customobject\\"}],\\"id\\":\\"123\\",\\"desc\\":null}]},{\\"from\\":\\"app-custom-40bd001563085fc35165329ea1ff5c5ecbdbbeef\\",\\"to\\":\\"customResults-168\\",\\"label\\":\\"123\\",\\"linkType\\":\\"\\",\\"info\\":\\"\\"}]}"},{"eventTime":"1500108131812","eventType":"1","info":"{\\"type\\":\\"样本信息\\",\\"id\\":\\"object-8151325dcdbae9e0ff95f9f9658432dbedfdb209-146-2-1-0\\",\\"name\\":\\"666666\\",\\"uid\\":1,\\"uname\\":\\"admin\\",\\"mid\\":\\"146\\",\\"msgid\\":2,\\"data\\":\\"{\\\\\\"id\\\\\\":\\\\\\"8151325dcdbae9e0ff95f9f9658432dbedfdb209\\\\\\",\\\\\\"label\\\\\\":\\\\\\"样本信息\\\\\\",\\\\\\"params\\\\\\":[{\\\\\\"id\\\\\\":\\\\\\"2d533b9d9f0f06ef4e3c23fd496cfeb2780eda7f\\\\\\",\\\\\\"label\\\\\\":\\\\\\"hash\\\\\\",\\\\\\"value\\\\\\":\\\\\\"123123\\\\\\"}],\\\\\\"objectName\\\\\\":\\\\\\"样本信息\\\\\\",\\\\\\"objectId\\\\\\":0}\\"}","eventID":"971"},{"eventTime":"1500108117093","eventType":"3","info":"{\\"uname\\":\\"admin\\",\\"uid\\":1,\\"desc\\":\\"admin 查询了【多维分析】的【根据Hash获取样本信息】\\",\\"nodes\\":{\\"resultObjects-549\\":{\\"nodeType\\":\\"result\\",\\"label\\":\\"的沙发地方\\",\\"nodeID\\":\\"resultObjects-549\\",\\"info\\":{\\"properties\\":{\\"resultInfo\\":{\\"ret\\":200,\\"msg\\":\\"\\",\\"retOffset\\":0,\\"retCount\\":1,\\"total\\":1}}}},\\"app-多维分析\\":{\\"nodeType\\":\\"app\\",\\"label\\":\\"多维分析\\",\\"nodeID\\":\\"app-多维分析\\",\\"info\\":{\\"properties\\":{}}}},\\"links\\":[{\\"from\\":\\"object-8151325dcdbae9e0ff95f9f9658432dbedfdb209-146-2-1-0\\",\\"to\\":\\"app-多维分析\\",\\"label\\":\\"hash\\",\\"linkType\\":\\"\\",\\"info\\":[{\\"id\\":\\"6e9f5a2bb497fcf3dc4c3cf937c8bcac09d264c8\\",\\"from\\":[{\\"value\\":\\"123123\\",\\"id\\":\\"2d533b9d9f0f06ef4e3c23fd496cfeb2780eda7f\\",\\"objectID\\":\\"object-8151325dcdbae9e0ff95f9f9658432dbedfdb209-146-2-1-0\\",\\"objectType\\":\\"resultobject\\"}],\\"desc\\":\\"hash\\"}]},{\\"from\\":\\"app-多维分析\\",\\"to\\":\\"resultObjects-549\\",\\"label\\":\\"根据Hash获取样本信息\\",\\"linkType\\":\\"\\",\\"info\\":\\"\\"}]}","eventID":"973"},{"eventID":"1411","eventTime":"1504248485688","eventType":"3","info":"{\\"uname\\":\\"admin\\",\\"uid\\":1,\\"desc\\":\\"admin 查询了【多维分析】的【根据Hash获取样本信息】\\",\\"nodes\\":{\\"resultObjects-607\\":{\\"nodeType\\":\\"result\\",\\"label\\":\\"结果\\",\\"nodeID\\":\\"resultObjects-607\\",\\"info\\":{\\"properties\\":{\\"resultInfo\\":{\\"ret\\":200,\\"msg\\":\\"\\",\\"retOffset\\":0,\\"retCount\\":1,\\"total\\":1}}}},\\"app-多维分析\\":{\\"nodeType\\":\\"app\\",\\"label\\":\\"多维分析\\",\\"nodeID\\":\\"app-多维分析\\",\\"info\\":{\\"properties\\":{}}}},\\"links\\":[{\\"from\\":\\"object-8151325dcdbae9e0ff95f9f9658432dbedfdb209-146-2-1-0\\",\\"to\\":\\"app-多维分析\\",\\"label\\":\\"hash\\",\\"linkType\\":\\"\\",\\"info\\":[{\\"id\\":\\"6e9f5a2bb497fcf3dc4c3cf937c8bcac09d264c8\\",\\"from\\":[{\\"value\\":\\"123123\\",\\"id\\":\\"id\\",\\"objectID\\":\\"object-8151325dcdbae9e0ff95f9f9658432dbedfdb209-146-2-1-0\\",\\"objectType\\":\\"standardobject\\"}],\\"desc\\":\\"hash\\"}]},{\\"from\\":\\"app-多维分析\\",\\"to\\":\\"resultObjects-607\\",\\"label\\":\\"根据Hash获取样本信息\\",\\"linkType\\":\\"\\",\\"info\\":\\"\\"}]}"},{"eventID":"1414","eventTime":"1504862985331","eventType":"1","info":"{\\"type\\":\\"样本信息\\",\\"id\\":\\"object-8151325dcdbae9e0ff95f9f9658432dbedfdb209-146-4-1-0\\",\\"name\\":\\"样本信息\\",\\"uid\\":1,\\"uname\\":\\"admin\\",\\"mid\\":\\"146\\",\\"msgid\\":4,\\"data\\":\\"{\\\\\\"id\\\\\\":\\\\\\"8151325dcdbae9e0ff95f9f9658432dbedfdb209\\\\\\",\\\\\\"label\\\\\\":\\\\\\"样本信息\\\\\\",\\\\\\"params\\\\\\":[{\\\\\\"id\\\\\\":\\\\\\"2d533b9d9f0f06ef4e3c23fd496cfeb2780eda7f\\\\\\",\\\\\\"label\\\\\\":\\\\\\"hash\\\\\\",\\\\\\"value\\\\\\":\\\\\\"21321321321\\\\\\"}],\\\\\\"objectName\\\\\\":\\\\\\"样本信息\\\\\\",\\\\\\"objectId\\\\\\":0}\\"}"},{"eventID":"1416","eventTime":"1505116408748","eventType":"3","info":"{\\"uname\\":\\"admin\\",\\"uid\\":1,\\"desc\\":\\"admin 查询了【多维分析】的【根据Hash获取样本信息】\\",\\"nodes\\":{\\"resultObjects-609\\":{\\"nodeType\\":\\"result\\",\\"label\\":\\"结果\\",\\"nodeID\\":\\"resultObjects-609\\",\\"info\\":{\\"properties\\":{\\"resultInfo\\":{\\"ret\\":200,\\"msg\\":\\"\\",\\"retOffset\\":0,\\"retCount\\":1,\\"total\\":1}}}},\\"app-多维分析\\":{\\"nodeType\\":\\"app\\",\\"label\\":\\"多维分析\\",\\"nodeID\\":\\"app-多维分析\\",\\"info\\":{\\"properties\\":{}}}},\\"links\\":[{\\"from\\":\\"object-8151325dcdbae9e0ff95f9f9658432dbedfdb209-146-4-1-0\\",\\"to\\":\\"app-多维分析\\",\\"label\\":\\"hash\\",\\"linkType\\":\\"\\",\\"info\\":[{\\"id\\":\\"6e9f5a2bb497fcf3dc4c3cf937c8bcac09d264c8\\",\\"from\\":[{\\"value\\":\\"21321321321\\",\\"id\\":\\"id\\",\\"objectID\\":\\"object-8151325dcdbae9e0ff95f9f9658432dbedfdb209-146-4-1-0\\",\\"objectType\\":\\"standardobject\\"}],\\"desc\\":\\"hash\\"}]},{\\"from\\":\\"app-多维分析\\",\\"to\\":\\"resultObjects-609\\",\\"label\\":\\"根据Hash获取样本信息\\",\\"linkType\\":\\"\\",\\"info\\":\\"\\"}]}"},{"eventID":"1417","eventTime":"1505116419881","eventType":"5","info":"{\\"time\\":1505116419881,\\"mid\\":\\"146\\",\\"mname\\":\\"\\",\\"did\\":\\"\\",\\"dname\\":\\"\\",\\"objid\\":\\"resultObjects-609\\",\\"lastEventID\\":\\"\\",\\"uid\\":1,\\"uname\\":\\"admin\\",\\"callbackdata\\":{\\"id\\":\\"resultObjects-609\\",\\"type\\":\\"resultobject\\"},\\"callbackdataid\\":\\"backobject-146-5\\"}"}]`;
$(function () {
    successHandler(JSON.parse(d3Data));
    /**
     * 成功处理
     * @param result
     */
    function successHandler(result) {
        if (!result || result[0] == null) {
            isQuery = false;
            return
        }
        console.log(result);
        let index = result.length - 1;
        if (meetingInfo != null) {
            meetingEventParserHandler(result);
            addNodeAndEdge(result);
            init(forceNodes, forceLinks);
            result = result.sort(function (f, s) {
                return f.eventTime - s.eventTime;
            });
        } else {
            index = eventsParserHandler(result);
        }
        newId = result[index].eventID;
        isQuery = false;
        // let tabID = getURLParams('tabID');
        // if (tabID != null) {
        //     // let data = returnTimelineEventID(tabID);
        //     // addTab(data)
        // }

    }
    function eventsParserHandler(events) {
        let tmp_items = [];
        let events4d3 = [];
        let index;
        for (index in events) {
            let event = events[index];
            if (meetingInfo != null && event.eventType == 0) {
                break;
            }

            // 处理meetingInfo
            if (meetingInfo == null && event.eventType == 0) {
                events4d3.push(event);
                // changeAnimate();
                console.debug(event);
                meetingInfo = JSON.parse(event.info);
                if (location.pathname != '/') {
                    $(".single-animent").addClass("single-page-delay").removeClass("z-index");
                    $(".svg").addClass("single-page single-page-delay300").addClass("z-index");
                    //createMemberTable(meetingInfo);
                }
                let style = cssconfig[event.eventType];
                tmp_items.push({
                    className: style,
                    id: event.eventID,
                    title: varconfig[event.eventType],
                    start: new Date(parseInt(event.eventTime)),
                    description: JSON.stringify(event.info),
                    content: JSON.stringify(event),
                    type: 'box'
                });

                continue;

            }

            if (meetingInfo != null) {
                events4d3.push(event);
                let style = cssconfig[event.eventType];
                tmp_items.push({
                    className: style,
                    id: event.eventID,
                    title: varconfig[event.eventType],
                    start: new Date(parseInt(event.eventTime)),
                    description: JSON.stringify(event.info),
                    content: JSON.stringify(event),
                    type: 'box'
                });
            }
        }

        addNodeAndEdge(events4d3);

        init(forceNodes, forceLinks);

        // items.add(tmp_items);
        return index;
    }

});

function descEvent(event) {
    let info = JSON.parse(event.info);
    switch (event.eventType) {
        case '0':
            return info.uname + ' 创建了会战【' + info.name + '】';
        case '1':
            return info.uname + ' 输入了数据【' + info.name + '】';
        case '3':
            return info.desc;
        case '4':
            return info.uname + ' 跳转到【' + info.dname + '】的【' + info.dapiname + '】';
        case '5':
            return info.uname + ' 将结果数据回传';
        case '8':
            return `${ info.uname } 进行了人工业务分析`;
        default:
            return info.uname + ' 进行了操作';
    }
}

$("#changelayout_btn").click(function () {
    if (init == renderTreeW) {
        init = renderForceW;
    } else {
        init = renderTreeW;
    }

    init(forceNodes, forceLinks);
});