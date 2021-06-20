////////////////////////////////////////////
const Discord = require('discord.js')
const client = new Discord.Client()
const { readdirSync } = require('fs');
const { join } = require('path');
const ayarlar = require('./ayarlar.json')
////////////////////////////////////////////
client.commands = new Discord.Collection();
const prefix = ayarlar.prefix
const token = ayarlar.token
////////////////////////////////////////////
////////////////////////////////////////////
const commandFiles = readdirSync(join(__dirname, "komutlar")).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(join(__dirname, "komutlar", `${file}`));
    client.commands.set(command.code, command);
}
////////////////////////////////////////////
client.on("error", console.error);
client.on('ready', () => {
    console.log('o')
    client.user.setStatus('dnd')
    const durumlar = [
      "Xolen ♥️ Draclus"
    ]
    setInterval(function () {
      let durum = durumlar[Math.floor(Math.random()*durumlar.length)]
      client.user.setActivity(durum, { type: 'LISTENING' })
    }, 10000);
});
////////////////////////////////////////////
client.on("message", async message => {

    if(message.author.bot) return;

    if(message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).trim().split(/ +/);

        const command = args.shift().toLowerCase();

        if(!client.commands.has(command)) return;


        try {
            client.commands.get(command).run(client, message, args);

        } catch (error){
            console.error(error);
        }
    }
})
////////////////////////////////////////////
client.on("guildMemberAdd", member => {
  try {
      let role = member.guild.roles.cache.find(role => role.id === '856156637492281354')
  member.roles.add(role);
} catch(e) {
  console.log(e)
}
});
////////////////////////////////////////////
client.on('guildMemberAdd', member => {
const kanal1 = member.guild.channels.cache.find(channel => channel.id === '856140802987917402');

        var güven;
        var emoji;

        var oluşturma = new Date().getTime() - member.user.createdAt.getTime()
        if (oluşturma > 2629800000){
            güven = "Güvenli"
            emoji = "<:onaylanms:856153641961259061>"
        }
        if (oluşturma < 2629800000){
            güven = "Tehlikeli"
            emoji = "<:onaylanmams:856153641995862056>"
        }

kanal1.send(`Aramıza Yeni Bir Üye Katıldı! Aramıza Hoşgeldin ${member} \n\nHesap Durumu **${güven} ${emoji}** \nYetkililerimiz Seninle İlgilenecektir. Ses Teyit Kanallarına Geçip Kayıt Olabilir, Tagımızı Alarak Bize Destek Olabilirsin! İyi Eğlenceler \n\nÜye Sayımız **${member.guild.memberCount}** \nİsim Tagımız: Xoe\nEtiket Tagımız: #6007`);
});
////////////////////////////////////////////
// client.on("ready", () => {
//   client.channels.cache.get("SES ID").join();
// })
////////////////////////////////////////////
client.login(token)
////////////////////////////////////////////
