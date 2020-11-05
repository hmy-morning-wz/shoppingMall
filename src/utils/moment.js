export const clone = (d) => {
    return new Date(d.getTime());
};

export const pad = (v) => {
    return (`0${v}`).slice(-2);
};

const Moment = function (d) {
    if (d instanceof Moment) {
        this.d = clone(d.d);
        return;
    }
    if (!d) {
        this.d = new Date();
        return;
    }
    this.d = new Date(d);
};
Moment.prototype = {
    addMonths(n) {
        const d = this.d;
        this.d.setMonth(d.getMonth() + n);
        return this;
    },
    addDate(n) {
        const d = this.d;
        this.d.setDate(d.getDate() + n);
        return this;
    },
    format(str) {
        if (!str) {
            str = 'YYYY-MM-DD';
        }
        const d = this.d;
        return str.replace('YYYY', d.getFullYear())
            .replace('MM', pad(d.getMonth() + 1))
            .replace('DD', pad(d.getDate()))
            .replace('d', d.getDay());
    },
    year(n) {
        if (n) {
            this.d.setYear(n);
            return this;
        }
        return this.d.getFullYear();
    },
    month(n) {
        if (n) {
            this.d.setMonth(n);
            return this;
        }
        return this.d.getMonth();
    },

    date(n) {
        if (n) {
            this.d.setDate(n);
            return this;
        }
        return this.d.getDate();
    },
    day() {
        return this.d.getDay();
    },
};

/**
 * 日期对象封装
 * @example:
 *      moment().format()
 */
export default (d) => {
    return new Moment(d);
};
