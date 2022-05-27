import moment from 'moment';

export const dateFormat = (string) => {
    const date = moment(string).format("DD-MM-YY");
    const hour = moment(string).format("HH:mm ");
    const message = `Envoyé le ${date} à ${hour}`
    return message;
};
