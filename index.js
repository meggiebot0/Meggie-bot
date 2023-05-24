// DADOS DO DONO E BOT
const p = '.' //prefixo
const dono = 'Lost'  //seu nome
const NumDono = '5521998383493' //seu numero
const bot = 'Saturn-Base' //nome do seu bot
const numeroBot = 'numero do bot' //numero do bot
// FIM DOS DADOS

/*wiki

`${NumDono}`: retorna o numero do dono em formato padrão tipo "5521998383493"
`${owner}`: retorna em formato @s.whatsapp.com tipo "5521998383493@s.whatsapp.com"
`${dono}`: retorna o nome do dono
`${bot}`: retorna o nome do bot
`${numeroBot}`: retorna o numero do bot
`${p}`: retorna o prefixo
`${q}`: retorna o q foi digitado apos o comando tipo "/say a", só sera retornado o "a"

*///fim da wiki

//IMPORTAÇÃO DOS ARQUIVOS DE CONEXÃO
const fs = require ('fs')
const Pino = require ('pino')
const cfonts = require ('cfonts') 
const moment = require('moment-timezone')

const logoTermux = cfonts.render(('Saturn|Base'), {
font : "block",
align: "center",
colors: ["white","gray"]
})

const {default: makeWASocket,DisconnectReason,useSingleFileAuthState } = require ('@adiwajshing/baileys')

const { state, saveState } = useSingleFileAuthState('SaturnConnect.json')
// FIM DOS ARQUIVOS DE CONEXÃO

//  ❱❱ FUNCTION HORAS  ❰❰  

function kyun(seconds){

  function pad(s){
return (s < 10 ? '0' : '') + s;
  }
var hours = Math.floor(seconds / (60*60));
var minutes = Math.floor(seconds % (60*60) / 60);
var seconds = Math.floor(seconds % 60);

return `${pad(hours)} Jam ${pad(minutes)} Menit ${pad(seconds)} Detik`
}
const hora = moment.tz('America/Sao_Paulo').format('HH:mm:ss') 
const data = moment.tz('America/Sao_Paulo').format('DD/MM/YY')


//  ❱❱ ARQUIVOS DATABASE  ❰❰  


// SISTEMA DE CONEXÃO
async function SaturnConnect () {
console.log(logoTermux.string)
const saturn = makeWASocket({
logger: Pino({ level: 'silent' }),printQRInTerminal: true,auth: state})
saturn.ev.on('connection.update', (update) => {
const { connection, lastDisconnect } = update
if(connection === 'close') {
const shouldReconnect = (lastDisconnect.error)?.output?.statusCode !== DisconnectReason.loggedOut
console.log ('connection closed due to ', lastDisconnect.error)
if(shouldReconnect) {
SaturnConnect()
}
} else if(connection === 'open') {
console.log('Conectado !')}})
saturn.ev.on('messages.upsert', async m => {

try {
const mek = m.messages[0]
await saturn.sendReadReceipt(mek.key.remoteJid, mek.key.participant, [mek.key.id])
if (!mek.key.participant) mek.key.participant = mek.key.remoteJid
mek.key.participant = mek.key.participant.replace(/:[0-9]+/gi, "")
if (!mek.message) return
const fromMe = mek.key.fromMe
const content = JSON.stringify(mek.message)
const from = mek.key.remoteJid
const type = Object.keys(mek.message).find((key) => !["senderKeyDistributionMessage", "messageContextInfo"].includes(key))

const body = (type === "conversation" &&
mek.message.conversation.startsWith(p)) ?
mek.message.conversation: (type == "imageMessage") &&
mek.message[type].caption.startsWith(p) ?
mek.message[type].caption: (type == "videoMessage") &&
mek.message[type].caption.startsWith(p) ?
mek.message[type].caption: (type == "extendedTextMessage") &&
mek.message[type].text.startsWith(p) ?
mek.message[type].text: (type == 'buttonsResponseMessage') ? mek.message.buttonsResponseMessage.selectedButtonId : 
(type == "listResponseMessage") &&
mek.message[type].singleSelectReply.selectedRowId ?
mek.message.listResponseMessage.singleSelectReply.selectedRowId: (type == "templateButtonReplyMessage") ?
mek.message.templateButtonReplyMessage.selectedId: (type === "messageContextInfo") ?
mek.message[type].singleSelectReply.selectedRowId: (type == "saturn.sendMessageButtonMessage") &&
mek.message[type].selectedButtonId ?
mek.message[type].selectedButtonId: (type == "stickerMessage") && ((mek.message[type].fileSha256.toString("base64")) !== null && (mek.message[type].fileSha256.toString("base64")) !== undefined) ? (mek.message[type].fileSha256.toString("base64")): ""
const budy = (type === "conversation") ?
mek.message.conversation: (type === "extendedTextMessage") ?
mek.message.extendedTextMessage.text: ""

const args = body.trim().split(/ +/).slice(1)
const q = args.join(' ')
const comando = body.slice(1).trim().split(/ +/).shift().toLowerCase()
const isCmd = body.startsWith(p)
const enviar = (text) => {saturn.sendMessage(from, {text: text}, { quoted: mek})}
const reply = (text) => {saturn.sendMessage(from, {text: text}, { quoted: mek})}

const getGroupAdmins = (participants) => {
admins = []
for (let i of participants) {
if(i.admin == 'admin') admins.push(i.id)
if(i.admin == 'superadmin') admins.push(i.id)
}
return admins
}
const isGroup = from.endsWith("@g.us")
const groupMetadata = isGroup ? await saturn.groupMetadata(from): ""
const groupName = isGroup ? groupMetadata.subject: ""
const sender = isGroup ? mek.key.participant: mek.key.remoteJid
const pushname = mek.pushName ? mek.pushName: `${bot}`
const groupMembers = isGroup ? groupMetadata.participants : ''
const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
const isGroupAdmins = isGroup ? groupAdmins.includes(sender) : ''
const groupDesc = isGroup ? groupMetadata.desc : ''
const owner = `${NumDono}@s.whatsapp.net`
const isOwner = owner.includes(sender)
var mathSelo = Math.floor(Math.random() * (8 - 2) + 2);
const readmore = require("./src/readmore").readmore;
const timeHours = moment.tz('America/Sao_Paulo').format('HH:mm');
hours = timeHours;
const axios = require('axios')
const getBuffer = (url, options) => new Promise(async (resolve, reject) => { 
options ? options : {}
await axios({method: "get", url, headers: {"DNT": 1, "Upgrade-Insecure-Request": 1}, ...options, responseType: "arraybuffer"}).then((res) => {
resolve(res.data)
}).catch(reject)
})
const runtime = function(seconds) {
    seconds = Number(seconds);
    var d = Math.floor(seconds / (3600 * 24));
    var h = Math.floor(seconds % (3600 * 24) / 3600);
    var m = Math.floor(seconds % 3600 / 60);
    var s = Math.floor(seconds % 60);
    var dDisplay = d > 0 ? d + (d == 1 ? " dia, " : " Dia, ") : "";
    var hDisplay = h > 0 ? h + (h == 1 ? " hora, " : " Hora, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minuto, " : " Minuto, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " segundos" : " Segundos") : "";
    return dDisplay + hDisplay + mDisplay + sDisplay;
   }

//selos

//adicione seus selos aki (opcional)

//fim dos selos
if(!isGroup && isCmd) console.log(
'Comando no pv','\n','nome :',pushname,'\n','comando :',comando,'\n')

if(!isCmd && !isGroup) console.log(
'mensagem no pv','\n','nome :',pushname,'\n','mensagem :',budy,'\n')

if(isCmd && isGroup) console.log(
'comando em grupo','\n','grupo :',groupName,'\n','nome :',pushname,'\n','comando :',comando,'\n')

if(!isCmd && isGroup) console.log(
'mensagem em grupo','\n','grupo :',groupName,'\n','nome :',pushname,'\n','mensagem :',budy,'\n')

// FIM COMANDOS DE CONEXÃO 

const isBotGroupAdmins = groupAdmins.includes(numeroBot) || false

const sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}
const vcard = "BEGIN:VCARD\n"
+ "VERSION:3.0\n" 
+ "FN:Lostzin.Mp4\n" // Nome completo
+ "ORG:saturn-Base;\n" // A organização do contato
+ "TEL;type=CELL;type=VOICE;waid=5521998383493:+55 21 99838-3493\n" // WhatsApp ID + Número de telefone
+ "END:VCARD" // Fim do ctt

switch(comando) {

case 'reiniciar':
case 'restart':
saturn.sendMessage(from,{text: `Reiniciando...`}, {quoted: mek})
setTimeout(() => {process.exit(0)}, 3000)
break

case 'menu1':
const sections = [
    {
	title: "saturn-base",
	rows: [
	    {title: "opção 1!", rowId: `${p}` + "lista1", description: "description"},
	    {title: "opção 2!", rowId: `${p}` + "lista1", description: "description"},
		]
    },
]

const listMessage = {
  text: "Selecione Abaixo!",
  footer: "saturn-Base",
  title: "Menu De Lista",
  buttonText: "saturn-Md",
  sections
}

saturn.sendMessage(from, listMessage,{quoted : mek})
break

case 'menu2':
const buttons1 = [
    {index: 1, urlButton: {displayText: 'Meu Numero!', url: `https://wa.me/+${NumDono}`}},
    {index: 3, quickReplyButton: {displayText: 'opção 1', id: `${p}` + "lista1"}},
    {index: 3, quickReplyButton: {displayText: 'opção 2', id: `${p}` + "lista1"}},
    {index: 3, quickReplyButton: {displayText: 'opção 3', id: `${p}` + "lista1"}},
]

const menu21 = {
    text: '*Menu com Botoes!*',
    footer: `${bot}`,
    templateButtons: buttons1
}
saturn.sendMessage(from, menu21,{quoted :mek})
break

case 'menu':
const botoesmenu = [
    {index: 1, urlButton: {displayText: 'Meu Numero!', url: `https://wa.me/+${NumDono}`}},
    {index: 3, quickReplyButton: {displayText: 'menu de lista', id: `${p}` + "menu1"}},
    {index: 3, quickReplyButton: {displayText: 'menu com botões', id: `${p}` + "menu2"}},
    {index: 3, quickReplyButton: {displayText: 'pack de quoteds adaptados', id: `${p}` + "quoted"}},
]

const menu = {
    text: `*Menu Principal!* \n`,
    footer: `${bot}`,
    templateButtons: botoesmenu
}
saturn.sendMessage(from, menu,{quoted :mek})
break

case 'lista1':
enviar('voce selecionou uma opção')
break

case 'reply':
reply('saturn')
break

case 'enviar':
enviar("saturn")
break

case 'wait':
await sleep(5000)
enviar("saturn")
break

case 'info':
reply(`\nNome Do Bot: ${bot}\nHora onde foi Iniciado: ${hora}\nData Onde Foi Iniciado: ${data}\nNumero Do Dono: ${owner}\nNome Do Dono: ${dono}`)
break

case "quoted":
saturn.sendMessage(from, {text: "no arquivo contem tudo que voce precisa pra adicionar!"}, { quoted: mek})  
await sleep(2000)
saturn.sendMessage(from, {text: "https://4br.me/selos"}, { quoted: mek})  
break

}} catch(e) {
console.log(e)}
})}
SaturnConnect()