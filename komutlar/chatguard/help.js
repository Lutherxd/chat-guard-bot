const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const client = new Discord.Client();
const database = require("../../database/korumalar")
const ayarlar = require('../../ayarlar.json');
exports.run = async (receivedMessage, message, args) => {  
    let embed = new MessageEmbed().setColor(ayarlar.embedrenk).setAuthor('Davet Engel Sistem', message.author.avatarURL({ dynamic: true }));
    const data = await database.findOne({guildID: message.guild.id});
const muteembed = new Discord.MessageEmbed()
.setColor(ayarlar.embedrenk)
.setAuthor('Chat Guard', 'https://cdn.discordapp.com/avatars/759567625880731649/2cb6d8fa539d25ed9e17b2292c7523bd.webp')
//.setFooter(ayarlar.durum)
.setDescription(`\`\`\`Chat Guard Komut Listesi\`\`\`
» ${ayarlar.prefix}capslock      
» ${ayarlar.prefix}davet       
» ${ayarlar.prefix}link         
» ${ayarlar.prefix}küfür         
» ${ayarlar.prefix}etiketengel  

<:yildiz:822452163510534154> **Kısayoldan tüm \`chatkoruma\` sistemini aktif etmek için \`.chatguard aç\` komutunu kullanabilirsiniz hepsini kapatmak istiyorsanız \`.chatguard kapat\` ile kapatabilirsiniz.** 
`)
.addField('Davet Engel', data && data.davetEngel ? "**\`✅\`** Açık" : "<:kapali:822759611471233035> Kapalı", true)
.addField('Link Engel', data && data.LinkEngel ? "**\`✅\`** Açık" : "<:kapali:822759611471233035> Kapalı", true)
.addField('Küfür Engel', data && data.kufurEngel ? "**\`✅\`** Açık" : "<:kapali:822759611471233035> Kapalı", true)
.addField('Etiket Engel', data && data.EtiketEngel ? "**\`✅\`** Açık" : "<:kapali:822759611471233035> Kapalı", true)
.addField('Capslock Engel', data && data.CapslockEngel ? "**\`✅\`** Açık" : "<:kapali:822759611471233035> Kapalı", true)
.addField('Tüm Sistemler', data && data.CapslockEngel && data.davetEngel && data.kufurEngel && data.LinkEngel && data.EtiketEngel ? "**\`✅\`** Açık" : "<:kapali:822759611471233035> Kapalı", true)

.setTimestamp()
//.setImage('https://cdn.discordapp.com/attachments/758512666813005869/822451324528361562/standard.gif')

if(!args[0]) 
{message.channel.send(muteembed)
}

if(args[0] == 'aç') {
    if(message.author.id !== message.guild.owner.user.id && !ayarlar.sahip) return message.channel.send(embed.setDescription(`<a:unlem:822522470925336646> Merhaba bu komutu sadece ${message.guild.owner.user.tag} kullanabilir.`))
if(data) return message.channel.send(embed.setDescription(`<:tik:822557127767621683> Tüm sistemler zaten **aktif!**`))
message.channel.send(embed.setDescription(`<:tik:822557127767621683> Tüm sistemler başarıyla **aktif** edildi!`))
await database.findOneAndUpdate({guildID: message.guild.id}, {davetEngel: true, kufurEngel: true, CapslockEngel: true, LinkEngel: true, EtiketEngel: true}, {upsert: true});
}
if(args[0] == 'kapat') {
    if(message.author.id !== message.guild.owner.user.id && !ayarlar.sahip) return message.channel.send(embed.setDescription(`<a:unlem:822522470925336646> Merhaba bu komutu sadece ${message.guild.owner.user.tag} kullanabilir.`))
    if(!data) return message.channel.send(embed.setDescription(`<:tik:822557127767621683> Tüm sistemler zaten **deaktif!**`))
    message.channel.send(embed.setDescription(`<:tik:822557127767621683> Tüm sistemler başarıyla **deaktif** edildi!`))
    await database.findOneAndUpdate({guildID: message.guild.id}, {davetEngel: false, kufurEngel: false, CapslockEngel: false, LinkEngel: false, EtiketEngel: false}, {upsert: true});
}

}

exports.conf = {
enabled: true,
guildOnly: true,
aliases: ["yardım", "help"],
permLevel: 0
};

exports.help = { 
name: 'chatguard', 
description: 'eval.',
usage: 'evals',
kategori: 'kullanıcı'
};