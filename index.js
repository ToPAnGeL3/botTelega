const TelegramApi = require('node-telegram-bot-api')
const {gameOphions, againOphions} = require('./options')
const token = '5482512876:AAE4zmhR-oGKQ6dLuVwt4nhWdSZsZkAKEpY'

const bot = new TelegramApi(token, { polling: true })

const chats = {}



const startGame = async (chatId) => {
    await bot.sendMessage(chatId, 'Сейчас я загадаю цифру от 0 до 9')
            const randomNumber = Math.floor(Math.random() * 10)
            chats[chatId] = randomNumber;
            await bot.sendMessage(chatId, `Я загадал число, отгадывая, кожанный мешок!`, gameOphions,);

}

const start = () => {

    bot.setMyCommands([
        { command: '/start', description: 'Приветсвие' },
        { command: '/info', description: 'Информация' },
        { command: '/game', description: 'Игра отгада число' },
    ])

    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
        if (text === '/start') {
            await bot.sendSticker(chatId, 'CAACAgIAAxkBAAIKPmNMzlshSyVwU9PwpRQhKVu0U2BYAAJ6HwAC8lnwSBur-hVtXtvVKgQ')
            return bot.sendMessage(chatId, `Добро пожаловать на моего бота`)

        }

        if (text === '/info') {

            return bot.sendMessage(chatId, `тебя зовут ${msg.from.first_name} ${msg.from.last_name}`)
        }
        if (text === '/game') {
            return startGame(chatId)
            
        }
        return bot.sendMessage(chatId, 'Я тебя не понимать!')
    })
    bot.on('callback_query', async msg => {

        const data = msg.data;
        const chatId = msg.message.chat.id;
        if(data === 'again') {
            return startGame(chatId)
        }
        if(+data === chats[chatId]) {
            return await bot.sendMessage(chatId, `Тск, в это раз тебе повезло, вот твоя цифра ${chats[chatId]}`, againOphions);
        } else {
            return await bot.sendMessage(chatId, `Неа, не угадал, это не ${data} `, againOphions)
        }
    })
}
start()