import javascript from './javascript';
import python from './python';
import cli from './cli';

const handlers = {
  javascript,
  python,
  cli,
};

export default function (option, language) {
  const handler = handlers[language];
  if (handler) handler(option);
}
