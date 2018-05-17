import { AppRegistry } from 'react-native';
import App from './app/App';
import MessageQueue from 'react-native/Libraries/BatchedBridge/MessageQueue'

MessageQueue.spy(true);
AppRegistry.registerComponent('coinsinfo', () => App);
