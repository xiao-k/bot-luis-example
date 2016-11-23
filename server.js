var restify = require('restify');
var builder = require('botbuilder');

var bot = new builder.BotConnectorBot({
                appId: process.env.MICROSOFT_APP_ID,
                appSecret: process.env.MICROSOFT_APP_PASSWORD });
var url = 'https://api.projectoxford.ai/luis/v1/application?id=' + process.env.LUIS_ID
    + '&subscription-key=' + process.env.LUIS_SUBSCRIPTION_KEY
var dialog = new builder.LuisDialog(url);

bot.add('/', dialog);

// Intent="what_day"の場合の処理
dialog.on('what_day_of_week', function(session, args) {
    console.log('message:');
    console.log(session.message);

    var date = builder.EntityRecognizer.findEntity(args.entities, 'builtin.datetime.date');
    console.log('date:');
    console.log(date);

    if (date != undefined && date.resolution != undefined) {
        var d = new Date(date.resolution.date);
        var day = '日月火水木金土'[d.getDay()];
        session.send(day + '曜日だよ(๑•̀ㅁ•́๑)✧');
    } else {
        session.send("ちょっと失敗しちゃったから、もう一度質問してほしいなあ(｡>﹏<｡)");
    }
});

// Intent="None"の場合の処理
// dialog.onDefault([
//     function (session, args, next) {
//         console.log("testQ");
//         if (!session.userData.name) {
//             builder.Prompts.text(session, 'はじめまして、ヒカリです！ご主人様のお名前をおしえてください(๑˃̵ᴗ˂̵)');
//         }
//         else {
//             next();
//         }
//     },
//     function (session, results) {
//         console.log("testQQQ");
//         if(!session.userData.name){
//             session.userData.name = results.response;
//         }
//         next();
//     },
//     function (session, results) {
//         console.log("testQQQQ");
//         session.send('%sって呼んでも、いいかなあ・・？よし、呼んじゃおう(◍•ᴗ•◍) ♪', session.userData.name);
//     }
// ]);

dialog.onDefault(function(session, args) {
    console.log('args:');
    console.log(args);

    console.log('message:');
    console.log(session.message);

    console.log("session:");
    console.log(session.send);
    session.send("ごめんね、もうちょっとやさしく言い直してくれたらうれしいなあ(ﾉ_･｡)ｸｽﾝ")
});

var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url);
});
server.post('/api/messages', bot.listen());
// server.listen(process.env.port || 8080, function () {
//     console.log('%s listening to %s', server.name, server.url);
// });

// var restify = require('restify');
// var builder = require('botbuilder');
//
// //=========================================================
// // Bot Setup
// //=========================================================
//
// // Setup Restify Server
// var server = restify.createServer();
// server.listen(process.env.port || process.env.PORT || 3978, function () {
//    console.log('%s listening to %s', server.name, server.url);
// });
//
// // Create chat bot
// var connector = new builder.ChatConnector({
//     appId: process.env.MICROSOFT_APP_ID,
//     appPassword: process.env.MICROSOFT_APP_PASSWORD
// });
// var bot = new builder.UniversalBot(connector);
// server.post('/api/messages', connector.listen());
//
// //=========================================================
// // Bots Dialogs
// //=========================================================
//
// bot.dialog('/', [
//     function (session, args, next) {
//         if (!session.userData.name) {
//             session.beginDialog('/tellName');
//         }
//         else {
//             next();
//         }
//     },
//     function (session, results) {
//         session.send('%sって呼んでも、いいかなあ・・？よし、呼んじゃおう(◍•ᴗ•◍) ♪', session.userData.name);
//     }
// ]);
//
// bot.dialog('/tellName', [
//     function (session) {
//         builder.Prompts.text(session, 'はじめまして、ヒカリです！ご主人様のお名前をおしえてください(๑˃̵ᴗ˂̵)');
//     },
//     function (session, results) {
//         session.userData.name = results.response;
//         session.endDialog();
//     }
// ]);
