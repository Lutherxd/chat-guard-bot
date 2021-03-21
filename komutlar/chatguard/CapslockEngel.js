const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const client = new Discord.Client();
const database = require("../../database/korumalar")
const ayarlar = require('../../ayarlar.json');
exports.run = async (receivedMessage, message, args) => {  
    const data = await database.findOne({guildID: message.guild.id});
    let embed = new MessageEmbed().setColor(ayarlar.embedrenk).setAuthor('Davet Engel Sistem', message.author.avatarURL({ dynamic: true }));
if(message.author.id !== message.guild.owner.user.id && !ayarlar.sahip) return message.channel.send(embed.setDescription(`<a:unlem:822522470925336646> Merhaba bu komutu sadece ${message.guild.owner.user.tag} kullanabilir.`))
if(!args[0]) {
    message.channel.send(embed.setDescription(`\`\`\`Davet Engel Sistem Bilgisi\`\`\`
    **\`${ayarlar.prefix}capslockengel aç\`**
    **\`${ayarlar.prefix}capslockengel kapat\`**
    
    <:luffy:822519742110760960> **\`.capslockengel aç\` komutunu kullanarak sunucunuzda \`Büyük Harf\` kullanımını engelleyebilirsiniz 1 Mesajda 10 adet büyük harf 8 adet küçük harf bulunuyorsa engellemektedir sistem bu şekilde çalışmaktadır.**
    
    <:luffy:822519742110760960> **\`.capslockengel kapat\` komutunu kullanarak bu sistemi kapatabilirsiniz ama bu sistemi kapatmak sunucuda \`Büyük Harf\` kullanımını engellemiyicektir.**
    
    <a:unlem:822522470925336646> **Davet Engel Sistemi :** ${data.CapslockEngel ? "**\`✅\`** Açık" : "<:kapali:822759611471233035> Kapalı"}`))}
if(args[0] == 'aç') {
    if(data && data.CapslockEngel === true) return message.channel.send(embed.setDescription(`<:tik:822557127767621683> Davet engel sistemi zaten **aktif!**`))
    message.channel.send(embed.setDescription(`<:tik:822557127767621683> Davet engel sistemi başarıyla **aktif** edildi!`))
    await database.findOneAndUpdate({guildID: message.guild.id}, {CapslockEngel: true}, {upsert: true});
} 
if(args[0] == 'kapat') {
    if(data && data.CapslockEngel === false) return message.channel.send(embed.setDescription(`<:altinred:822569045668790303> Davet engel sistemi zaten **deaktif!**`))
    message.channel.send(embed.setDescription(`<:tik:822557127767621683> Davet engel sistemi başarıyla **deaktif** edildi!`))
    await database.findOneAndUpdate({guildID: message.guild.id}, {CapslockEngel: false}, {upsert: true});
}}

exports.conf = {
enabled: true,
guildOnly: true,
aliases: ["capslock", "capslockengel"],
permLevel: 4
};

exports.help = { 
name: 'capslockengel', 
description: 'eval.',
usage: 'evals',
kategori: 'kullanıcı'
};