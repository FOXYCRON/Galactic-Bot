const { getDateTimeString } = require ('./TimeUtils.js');
const { validColors, validColorsStrings } = require('../data/ValidColors.js');

const getColorString = (colors) => {
	return colors.map(col => validColorsStrings.includes(col) ? validColors[col] : validColors.FgWhite).join('');
};

const logWithColor = (Colordisplay = ['FgGreen'], text = ['No se ha agregado texto'], dateEnabled = false, marker = '', title = '') => {
	const color = getColorString(Colordisplay);

	if (dateEnabled && title) {
		console.log(
			`${validColors.FgCyan}${getDateTimeString()}${validColors.Reset}`,
			`${validColors.FgRed}${marker} ${validColors.Reset}`,
			`${validColors.FgYellow}${title} ${validColors.Reset}`,
			`${validColors.FgRed}${marker}${validColors.Reset}`,
			`${color}${text.join(' ')}${validColors.Reset}`,
		);
	} else if (dateEnabled) {
		console.log(
			`${validColors.FgCyan}${getDateTimeString()}${validColors.Reset}`,
			marker ? `${validColors.FgRed}${marker}${validColors.Reset}` : '',
			`${color}${text.join(' ')}${validColors.Reset}`,
		);
	} else if (title) {
		console.log(
			`${validColors.FgYellow}${title} ${validColors.Reset}`,
			marker ? `${validColors.FgRed}${marker} ${validColors.Reset}` : '',
			`${color}${text.join(' ')}${validColors.Reset}`,
		);
	} else {
		console.log(
			`${color}${text.join(' ')}${validColors.Reset}`,
		);
	}
};

function setupColorProperties() {
	const colorProperties = {
		reset: validColors.Reset,
		bright: validColors.Bright,
		dim: validColors.Dim,
		italic: validColors.Italic,
		underline: validColors.Underline,
		inverse: validColors.Inverse,
		hidden: validColors.Hidden,
		Strikethrough: validColors.Strikethrough,

		black: validColors.FgBlack,
		red: validColors.FgRed,
		green: validColors.FgGreen,
		yellow: validColors.FgYellow,
		blue: validColors.FgBlue,
		magenta: validColors.FgMagenta,
		cyan: validColors.FgCyan,
		white: validColors.FgWhite,
		gray: validColors.FgGray,

		brightRed: validColors.FgBrightRed,
		brightGreen: validColors.FgBrightGreen,
		brightYellow: validColors.FgBrightYellow,
		brightBlue: validColors.FgBrightBlue,
		brightMagenta: validColors.FgBrightMagenta,
		brightCyan: validColors.FgBrightCyan,
		brightWhite: validColors.FgBrightWhite,

		blackBG: validColors.BgBlack,
		redBG: validColors.BgRed,
		greenBG: validColors.BgGreen,
		yellowBG: validColors.BgYellow,
		blueBG: validColors.BgBlue,
		magentaBG: validColors.BgMagenta,
		cyanBG: validColors.BgCyan,
		whiteBG: validColors.BgWhite,
		grayBG: validColors.BgGray,
		brightRedBG: validColors.BgBrightRed,
		brightGreenBG: validColors.BgBrightGreen,
		brightYellowBG: validColors.BgBrightYellow,
		brightBlueBG: validColors.BgBrightBlue,
		brightMagentaBG: validColors.BgBrightMagenta,
		brightCyanBG: validColors.BgBrightCyan,
		brightWhiteBG: validColors.BgBrightWhite,
	};

	Object.keys(colorProperties).forEach(colorName => {
		Object.defineProperty(String.prototype, colorName, {
			get: function() {
				return `${colorProperties[colorName]}${this}${validColors.Reset}`;
			},
		});
	});

	Object.defineProperty(String.prototype, 'rainbow', {
		get: function() {
			let rainbowText = '';
			const rainbowColors = [
				validColors.FgRed,
				validColors.FgGreen,
				validColors.FgYellow,
				validColors.FgBlue,
				validColors.FgMagenta,
				validColors.FgCyan,
			];

			for (let i = 0; i < this.length; i++) {
				const color = rainbowColors[i % rainbowColors.length];
				rainbowText += `${color}${this.charAt(i)}`;
			}

			return `${rainbowText}${validColors.Reset}`;
		},
	});
}

setupColorProperties();

/* function setupColorMethods() {
	const colorMethods = {
		red: validColors.FgRed,
		green: validColors.FgGreen,
		blue: validColors.FgBlue,
	};

	Object.keys(colorMethods).forEach(colorName => {
		String.prototype[colorName] = function() {
			return `${colorMethods[colorName]}${this}${validColors.Reset}`;
		};
	});
}
setupColorMethods(); */

class Logger {
	constructor(options = {}) {
		this.dateEnabled = options.dateEnabled ?? false;
		this.marker = options.marker ?? '';
		this.title = options.title ?? '';
	}

	red(...text) {
		logWithColor(['FgRed'], text, this.dateEnabled, this.marker, this.title);
	}

	black(...text) {
		logWithColor(['FgBlack'], text, this.dateEnabled, this.marker, this.title);
	}

	debug(...text) {
		logWithColor(['Dim'], text, this.dateEnabled, this.title && typeof this.title === 'string' ? `${this.title}` : 'Debug');
	}

	info(...text) {
		logWithColor(['FgGreen'], text, this.dateEnabled, this.title && typeof this.title === 'string' ? `${this.title}` : 'Info');
	}

	log(...text) {
		logWithColor(['FgWhite'], text, this.dateEnabled, this.title && typeof this.title === 'string' ? `${this.title}` : 'Log');
	}

	success(...text) {
		logWithColor(['FgGreen', 'Bright'], text, this.dateEnabled, this.title && typeof this.title === 'string' ? `${this.title}` : 'Success');
	}

	warn(...text) {
		logWithColor(['FgYellow'], text, this.dateEnabled, this.title && typeof this.title === 'string' ? `${this.title}` : 'Warn');
	}

	error(...text) {
		console.error(
			this.dateEnabled ? `${getDateTimeString()}` : '',
			`${validColors.FgRed} Error: ${validColors.Reset}`,
			...text,
		);
	}
}

module.exports = { Logger };