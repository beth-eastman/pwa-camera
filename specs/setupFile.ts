import { configure } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });


Object.defineProperty((global as any).navigator, 'app',
  {
      value: {exitApp: () => {}},
      configurable: true,
      writable: true
  });
