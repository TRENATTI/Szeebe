const letters = {
	σ: "a",
	"£": "b",
	Ǝ: "c",
	"₳": "d",
	ε: "e",
	"┘": "f",
	Γ: "g",
	μ: "h",
	"∩": "i",
	ſ: "j",
	"≡": "k",
	Œ: "l",
	ß: "m",
	þ: "n",
	"⌐": "o",
	Æ: "p",
	"¶": "q",
	Ω: "r",
	Φ: "s",
	"┼": "t",
	"↨": "u",
	"‡": "v",
	w: "w",
	"¥": "y",
	idk: "x",
	"√": "z",
};
const letters1 = {
	a: "σ",
	b: "£",
	c: "Ǝ",
	d: "₳",
	e: "ε",
	f: "┘",
	g: "Γ",
	h: "μ",
	i: "∩",
	j: "ſ",
	k: "≡",
	l: "Œ",
	m: "ß",
	n: "þ",
	o: "⌐",
	p: "Æ",
	q: "¶",
	r: "Ω",
	s: "Φ",
	t: "┼",
	u: "↨",
	v: "‡",
	w: "w",
	x: "idk",
	y: "¥",
	z: "√",
};

module.exports = {
	name: "ltran",
	description: "Translates English to Latex.",
	execute(message, args) {
		if (args[0]) {
			const prefix = process.env.PREFIX;
			const text = message.content.slice(prefix.length + 6).toLowerCase();

			var translated = "";

			for (var i = 0; i < text.length; i++) {
				if (letters1[text.charAt(i)] == undefined) {
					translated = translated + text.charAt(i);
				} else {
					translated = translated + letters1[text.charAt(i)];
				}
				console.log(letters1[text.charAt(i)]);
			}
			return message.reply(translated);
		}
	},
};
