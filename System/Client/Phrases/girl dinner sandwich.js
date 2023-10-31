module.exports = {
    name: 'girl dinner sandwich',
    aliases: [],
    execute(message) {
        return message.reply(`<@` + message.author.id  + `> my subway order.\n\n1. Italian herbs and cheese or white bread\n2. Turkey meat\n3. American or provolone cheese\n4. Not toasted\n5. Small amount of lettuce\n6. Tomato\n7. Banana peppers\n8. Pickles\n9. Jalapeños\n10. Onions\n11. Lots of Mayo\n12. Spicy Chipotle sauce\n13. Olive oil\n14. Salt and pepper`)
    }
}