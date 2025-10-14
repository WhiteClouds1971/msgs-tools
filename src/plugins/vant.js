import { setNotifyDefaultOptions } from 'vant';

const vant = {
  install(app) {
    setNotifyDefaultOptions({ duration: 550 });
  },
};

export { vant };
