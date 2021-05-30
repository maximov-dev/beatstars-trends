export default {
  webpack(config, env, helpers) {
    const [css] = helpers.getLoadersByName(config, "css-loader");
    css.loader.options.modules = false;
  },
};
