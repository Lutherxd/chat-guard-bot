const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const client = new Discord.Client();
const ayarlar = require('../../ayarlar.json');
exports.run = async (receivedMessage, message, args) => {  
    let embed = new MessageEmbed().setColor(ayarlar.embedrenk).setAuthor('Bot Davet', message.author.avatarURL({ dynamic: true }));
    message.channel.send(embed.setDescription(`**Merhaba botumuz şuanda yeni açılmıştır şuanda sadece chat guard komutları bulunmaktadır daha fazla komut isteklere göre eklenicektir. sizde bu botu sunucuya eklemek isterseniz [buraya tıklayarak](https://discord.com/oauth2/authorize?client_id=759567625880731649&scope=bot&permissions=8) ekleyebilirsiniz.**`))
}

exports.conf = {
enabled: true,
guildOnly: true,
aliases: ["invite", "botdavet", "invites"],
permLevel: 0
};

exports.help = { 
name: 'davetlink', 
description: 'eval.',
usage: 'evals',
kategori: 'kullanıcı'
};