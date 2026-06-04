/**
 * Espera una Promesa durante el tiempo dado en milisegundos
 * @param {number} time en ms, por defecto = 10 ms (Menos podría causar errores en timeouts y promesas, etc.)
 * @returns {Promise<2>} Promesa del tiempo dado
 */
const delay = (time = 10) => {
	return new Promise((resolve) => setTimeout(() => resolve(2), time));
};

/**
 * Formatea la duración en segundos
 * @param {number} duration en ms
 * @returns {string} Tiempo formateado en segundos
 */
const onlySecondDuration = (duration) => {
	const time = Math.floor((duration / 1000) * 100) / 100;
	return `${time} Sec${time !== 1 ? 's' : ''}`;
};

/**
 * Formatea un intervalo de tiempo en segundos/minutos/horas a dos dígitos
 * @param {number} n si no se proporciona, se devolverá "00"
 * @returns {string} Devuelve una cadena de número menor que 10 formateada a 2 letras de longitud
 */
const set2string = (n) => {
	if (!n) return '00';
	return (n < 10 ? '0' : '') + n;
};

/**
 * Formatea un intervalo de tiempo en milisegundos a tres dígitos
 * @param {number} n si no se proporciona, se devolverá "000"
 * @returns {string} Milisegundos formateados con una longitud de 3
 */
const formatMS = (n) => {
	if (!n) return '000';
	return n + (Number(n) < 100 ? '0' : '');
};

/**
 * Obtiene la hora actual formateada
 * @param {number} timestamp Tiempo en ms
 * @returns {string} Hora formateada como: "ddd DD-MM-YYYY HH:mm:ss.SSSS"
 */
const getDateTimeString = (timestamp = Date.now()) => {
	const date = new Date(timestamp);
	const days = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
	const DD = set2string(date.getDate());
	const MM = set2string(date.getMonth() + 1);
	const YYYY = date.getFullYear();
	const HH = set2string(date.getHours());
	const mm = set2string(date.getMinutes());
	const ss = set2string(date.getSeconds());
	const SSSS = formatMS(date.getMilliseconds());
	const ddd = days[date.getDay()];
	return `${ddd} ${DD}-${MM}-${YYYY} ${HH}:${mm}:${ss}.${SSSS}`;
};

/**
 * Parsea el tiempo en segundos con funciones de utilidad
 */
const Second = {
	Minute: (time = 1) => time * 60,
	Hour: (time = 1) => time * 60 * 60,
	Day: (time = 1) => time * 60 * 60 * 24,
	Week: (time = 1) => time * 60 * 60 * 24 * 7,
};

/**
 * Parsea el tiempo en milisegundos con funciones de utilidad
 */
const Millisecond = {
	Second: (time = 1) => time * 1000,
	Minute: (time = 1) => time * 1000 * 60,
	Hour: (time = 1) => time * 1000 * 60 * 60,
	Day: (time = 1) => time * 1000 * 60 * 60 * 24,
	Week: (time = 1) => time * 1000 * 60 * 60 * 24 * 7,
};

/**
 * Formatea una duración en segundos a [ 'X días', 'X horas', 'X minutos', 'X segundos' ]
 * Formatea una duración en milisegundos a [ 'X días', 'X horas', 'X minutos', 'X segundos', 'X ms' ]
 * @param {number} value tiempo en segundos/ms
 * @param {boolean} inputAsMs si el valor está en milisegundos
 * @returns {string[]} tiempo formateado
 */
const formatDuration = (value, inputAsMs) => {
	let times = [86400, 3600, 60, 1];
	if (inputAsMs) times = [...times.map((x) => x * 1000), 1];
	return times
		.reduce((acc, cur) => {
			const res = ~~(value / cur);
			value -= res * cur;
			return [...acc, res];
		}, [])
		.map((x, i) => {
			if (!x) return undefined;
			const text = ['Day', 'Hr', 'Min', 'Sec', 'ms'][i];
			return `${x} ${text}${i <= 3 && x !== 1 ? 's' : ''}`;
		})
		.filter(Boolean);
};

/**
 * Formatea una duración en segundos a HH:MM:SS
 * @param {number} value
 * @returns {string} duración formateada
 */
const durationSeconds = (value) => {
	const values = [3600, 60, 1].reduce((acc, cur) => {
		const res = ~~(value / cur);
		value -= res * cur;
		return [...acc, res];
	}, []);

	if (values[0] === 0) values.shift();
	return values.map((v) => `${v < 10 ? `0${v}` : v}`).join(':');
};

module.exports = { getDateTimeString, onlySecondDuration };

