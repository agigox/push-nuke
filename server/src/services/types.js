import Joi from 'joi';
import moment from 'moment-timezone';

const DateInput = Joi.object({
  date: Joi.date().default(() => moment().toISOString(), 'now'),
});
/*
const OtherUnavalabiliesInput = Joi.object({
  date: Joi.date().default(() => moment().toISOString(), 'now'),
  eicCode: Joi.string()
    .length(16)
    .default(null),
  skip: Joi.number()
    .min(0)
    .default(0),
  limit: Joi.number()
    .min(0)
    .max(50)
    .default(10),
});
*/
export default DateInput;
