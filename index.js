const TelegramApi = require('node-telegram-bot-api')

const {gameOptions, againOptions} = require('./options')

const token = '2120676466:AAGVrRy_TsAnFJDE1AlYktDlXCCiAmtVLks'

const bot = new TelegramApi(token, {polling:true})

//bot is ready

const chats = {}



const startGame = async (chatId) => {
    await bot.sendMessage(chatId, `Сейчас я загадаю цифру от 0 до 9... `)
    const randomNumber = Math.floor(Math.random() * 10)
    chats[chatId] = randomNumber
    await bot.sendMessage(chatId, 'Отгадывай', gameOptions)
}

const start = () => {
    bot.on('message', async msg => {
        const text = msg.text
        const chatId = msg.chat.id
        // send your msg back
        /*bot.sendMessage(chatId, `You wrote me this " ${text} "`)*/
        //console.log(msg)
        bot.setMyCommands([
            {command: "/start", description: "welcome message"},
            {command: "/info", description: "info message"},
            {command: "/game", description: "Ультрамодная игра с ИИ"}
        ])

        if (msg.text === "/start"){
            await bot.sendSticker(chatId,"https://tlgrm.ru/_/stickers/436/eca/436ecaef-3edc-4a3f-83d7-e0306564f827/1.webp")
            return bot.sendMessage(chatId, `Good day, ${msg.from.first_name}, welcome in the best of the best bot ever. Use /info command to look, that do this bot `)
        }
        if (msg.text === "/info"){
            return bot.sendMessage(chatId, `This bot do nothing, ${msg.from.first_name}, as you now `)
        }
        if (msg.text === "/game"){
            return startGame(chatId)
        }
        return bot.sendMessage(chatId,"I don't understand you...")
        
        })

    bot.on('callback_query', async msg => {
        //console.log(msg)
        const data = msg.data
        const chatId = msg.message.chat.id
        if(data === '/again'){
            return startGame(chatId)

        }
        if(+data === chats[chatId]){
                return bot.sendMessage(chatId, `Ты угадал! Я загадал цифру ${chats[chatId]}`, againOptions)
            }
            else {
                return bot.sendMessage(chatId, `Ты не угадал... Вообще-то я загадывал цифру ${chats[chatId]}`, againOptions)

            }
    
        //bot.sendMessage(chatId, `Ты выбрал число ${data}`)
    })
}

start()