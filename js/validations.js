const EMPTY = 1;
const MINIMUM_LENGTH = 2;
const SPECIAL_CHARACTERS = 3;
const INVALID_FORMAT = 4;
const VALID = 5;

/*export default */class Validations {
	static isEmpty(value) {
		if (value.trim() === '') {
			return true;
		}

		return false;
	}

	static minimumLength(length) {
		if (value.length < length) {
			return false;
		}

		return true;
	}

	static isValidEmail(email, format) {
		let name = '';
		let domain = '';
		let formatName = '';
		let formatDomain = '';

		if (this.isEmpty(email)) {
			return {status: false, code: EMPTY};
		}

		if (email.search('@') === -1) {
			return {status: false, code: INVALID_FORMAT};
		}

		if (format === undefined) {
			format = 'xxx@xx.xx';
		}

		name = email.slice(0, email.search('@'));
		domain = email.substr(email.search('@') + 1);
		formatName = format.slice(0, format.search('@'));
		formatDomain = format.substr(format.search('@') + 1);


		if (name.length < formatName.length) {
			return {status: false, code: INVALID_FORMAT};

		}
		else if (domain.search('\\.') === -1) {
			return {status: false, code: INVALID_FORMAT};

		}
		else if (domain.slice(0, domain.search('\\.')).length < formatDomain.slice(0, formatDomain.search('\\.')).length) {
			return {status: false, code: INVALID_FORMAT};

		} else if (domain.slice(domain.search('\\.') + 1).length < formatDomain.slice(formatDomain.search('\\.') + 1).length) {
			return {status: false, code: INVALID_FORMAT};

		}

		return {status: true, code: VALID};

	}

	static isValidPassword(value, minimumLength, specialCharacters) {
		minimumLength = minimumLength === undefined ? 1 : minimumLength;
		specialCharacters = specialCharacters === undefined ? '' : specialCharacters.split('');

		if (this.isEmpty(value)) {
			return {status: false, code: EMPTY};
		}

		if (value.length < minimumLength) {
			return {status: false, code: MINIMUM_LENGTH};
		}

		for (let letter of specialCharacters) {
			letter = '\\' + letter;
			if (value.search(letter) !== -1) {
				return {status: true, code: VALID}
			}
		}

		return {status:false, code:SPECIAL_CHARACTERS};
	}
}