import { setNotifyDefaultOptions, Lazyload } from 'vant';

const vant = {
  install(app) {
    setNotifyDefaultOptions({ duration: 550 });
    app.use(Lazyload, {
      lazyComponent: true,
    });
  },
};

export { vant };
