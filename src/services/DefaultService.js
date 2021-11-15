import Service from './InternalAPI';
import MockService from './MockInternalAPI';

const DefaultService =
  process.env.NODE_ENV === 'development' ? MockService : Service;

export default new DefaultService();
