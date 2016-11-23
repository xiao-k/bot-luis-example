var builder = require('botbuilder');

// Create bot and bind to console
var connector = new builder.ConsoleConnector().listen();
var bot = new builder.UniversalBot(connector);

// Create LUIS recognizer that points at our model and add it as the root '/' dialog for our Cortana Bot.
var model = 'https://api.projectoxford.ai/luis/v1/application?id=' + process.env.LUIS_ID
    + '&subscription-key=' + process.env.LUIS_SUBSCRIPTION_KEY;
var recognizer = new builder.LuisRecognizer(model);
var dialog = new builder.IntentDialog({ recognizers: [recognizer] });
bot.dialog('/', dialog);

// Add intent handlers
dialog.matches('builtin.intent.what_day_of_week', [
    function (session, args, next) {
        console.log('message:');
        console.log(session.message);

        var date = builder.EntityRecognizer.findEntity(args.entities, 'builtin.datetime');
        console.log('date:');
        console.log(date);

        if (date != undefined && date.resolution != undefined) {
            var d = new Date(date.resolution.date);
            var day = '日月火水木金土'[d.getDay()];
            session.send(day + '曜日だよ(๑•̀ㅁ•́๑)✧');
        } else {
            session.send("ちょっと失敗しちゃったから、もう一度質問してほしいなあ(｡>﹏<｡)");
        }

    }
]);

dialog.onDefault(
    function(session, args) {
        console.log('args:');
        console.log(args);

        console.log('message:');
        console.log(session.message);

        session.send("ごめんね、もうちょっとやさしく言い直してくれたらうれしいなあ(ﾉ_･｡)ｸｽﾝ")
    }
);
