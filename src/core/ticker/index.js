import Ticker from './Ticker';

const shared = new Ticker();

shared.autoStart = true;

export { shared, Ticker }