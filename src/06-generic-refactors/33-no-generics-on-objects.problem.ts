interface ConfigObj<TRoutes extends string[]> {
  routes: TRoutes;
  fetchers: {
    [K in TRoutes[number]]: () => {};
  };
}

const makeConfigObject = <TRoute extends string>(config: ConfigObj<TRoute[]>) =>
  config;

export const configObj = makeConfigObject({
  routes: ["/", "/about", "/contact"],
  /**
   * fetchers is an object where you can optionally
   * pass keys that match the route names.
   *
   * BUT - how do we prevent the user from passing
   * fetchers that don't exist in the routes array?
   *
   * Note - the solutions both SIGNIFICANTLY refactor
   * this code.
   */
  fetchers: {
    // @ts-expect-error
    "/does-not-exist": () => {
      return {};
    },
  },
});
