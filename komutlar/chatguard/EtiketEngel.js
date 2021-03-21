const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const client = new Discord.Client();
const database = require("../../database/korumalar")
const ayarlar = require('../../ayarlar.json');
exports.run = async (receivedMessage, message, args) => {  
    const data = await database.findOne({guildID: message.guild.id});
    let embed = new MessageEmbed().setColor(ayarlar.embedrenk).setAuthor('Etiket Engel Sistem', message.author.avatarURL({ dynamic: true }));
    if(message.author.id !== message.guild.owner.user.id && !ayarlar.sahip) return message.channel.send(embed.setDescription(`<a:unlem:822522470925336646> Merhaba bu komutu sadece ${message.guild.owner.user.tag} kullanabilir.`))
if(!args[0]) {
    message.channel.send(embed.setDescription(`\`\`\`Etiket Engel Sistem Bilgisi\`\`\`
    **\`${ayarlar.prefix}etiketengel aç\`**
    **\`${ayarlar.prefix}etiketengel kapat\`**
    
    <:luffy:822519742110760960> **\`.etiketengel aç\` komutunu kullanarak sunucunuzda \`Etiket\` kullanımını engelleyebilirsiniz.**
    
    <:luffy:822519742110760960> **\`.etiketengel kapat\` komutunu kullanarak bu sistemi kapatabilirsiniz ama bu sistemi kapatmak sunucuda Etiket kullanımını engellemiyicektir.**
    
    <a:unlem:822522470925336646> **Etiket Engel Sistemi :** ${data.EtiketEngel ? "**\`✅\`** Açık" : "<:kapali:822759611471233035> Kapalı"}`))}
if(args[0] == 'aç') {
    if(data && data.EtiketEngel == true) return message.channel.send(embed.setDescription(`<:tik:822557127767621683> Etiket engel sistemi zaten **aktif!**`))
    message.channel.send(embed.setDescription(`<:tik:822557127767621683> Etiket engel sistemi başarıyla **aktif** edildi!`))
    await database.findOneAndUpdate({guildID: message.guild.id}, {EtiketEngel: true}, {upsert: true});
} 
if(args[0] == 'kapat') {
    if(data && data.EtiketEngel == true) return message.channel.send(embed.setDescription(`<:altinred:822569045668790303> Etiket engel sistemi zaten **deaktif!**`))
    message.channel.send(embed.setDescription(`<:tik:822557127767621683> Etiket engel sistemi başarıyla **deaktif** edildi!`))
    await database.findOneAndUpdate({guildID: message.guild.id}, {EtiketEngel: false}, {upsert: true});
}}

exports.conf = {
enabled: true,
guildOnly: true,
aliases: [],
permLevel: 0
};

exports.help = { 
name: 'etiketengel', 
description: 'eval.',
usage: 'evals',
kategori: 'kullanıcı'
};