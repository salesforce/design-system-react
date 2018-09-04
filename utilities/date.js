/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

const DateUtil = {
	firstDayOfMonth(date) {
		const newDate = new Date(date);
		newDate.setDate(1);
		return newDate;
	},

	isFirstDayOfMonth(date) {
		return date.getDate() === 1;
	},

	isLastDayOfMonth(date) {
		return !DateUtil.isSameMonth(date, DateUtil.addDays(date, 1));
	},
	isSameMonth(d1, d2) {
		if (!d1 || !d2) {
			return false;
		}
		return (
			d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth()
		);
	},
	isSameDay(d1, d2) {
		if (!d1 || !d2) {
			return false;
		}
		return (
			d1.getFullYear() === d2.getFullYear() &&
			d1.getMonth() === d2.getMonth() &&
			d1.getDate() === d2.getDate()
		);
	},
	isCurrentMonth(date) {
		if (!date) {
			return false;
		}
		return DateUtil.isSameMonth(date, new Date());
	},
	isToday(date) {
		if (!date) {
			return false;
		}
		return DateUtil.isSameDay(date, new Date());
	},
	isEqual(d1, d2) {
		return d1.getTime() === d2.getTime();
	},
	addDays(date, deltaDays) {
		const newDate = new Date(date);
		newDate.setDate(newDate.getDate() + parseInt(deltaDays, 10));
		return newDate;
	},
	addWeeks(date, deltaWeeks) {
		return DateUtil.addDays(date, parseInt(deltaWeeks, 10) * 7);
	},
	nearestWeekDay(date, weekDayIndex) {
		let delta = weekDayIndex - date.getDay();
		if (delta < 0) {
			delta += 7;
		}
		return DateUtil.addDays(date, delta);
	},
	isLeapYear(year) {
		return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
	},

	getDaysInMonth(year, month) {
		return [
			31,
			DateUtil.isLeapYear(year) ? 29 : 28,
			31,
			30,
			31,
			30,
			31,
			31,
			30,
			31,
			30,
			31,
		][month];
	},

	addMonths(date, value) {
		const newDate = new Date(date);
		const dateOfNewDate = newDate.getDate();
		newDate.setDate(1);
		newDate.setMonth(newDate.getMonth() + value);
		newDate.setDate(
			Math.min(
				dateOfNewDate,
				DateUtil.getDaysInMonth(newDate.getFullYear(), newDate.getMonth())
			)
		);
		return newDate;
	},
};

export default DateUtil;
