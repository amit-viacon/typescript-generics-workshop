import { expect, it } from "vitest";
import { Equal, Expect } from "../helpers/type-utils";

const appConfig = {
  apiEndpoint: "https://api.example.com",
  apiVersion: "v1",
  apiKey: "1234567890",
  rawConfig: {
    featureFlags: {
      homePage: {
        showBanner: true,
        showLogOut: false,
      },
      loginPage: {
        showCaptcha: true,
        showConfirmPassword: false,
      },
    },
  },
};

type TBaseConfig<HomeFlags> = {
  rawConfig: {
    featureFlags: {
      homePage: HomeFlags;
    };
  };
};

export const getFeatureFlags = <TFlags>(
  config: TBaseConfig<TFlags>,
  override: (flags: TFlags) => TFlags
) => {
  return override(config.rawConfig.featureFlags.homePage);
};

it.only("Should return the homePage flag object", () => {
  const flags = getFeatureFlags(appConfig, (flags) => flags);

  expect(flags).toEqual({
    showBanner: true,
    showLogOut: false,
  });

  type tests = [
    Expect<Equal<typeof flags, { showBanner: boolean; showLogOut: boolean }>>
  ];
});

it("Should allow you to modify the result", () => {
  const flags = getFeatureFlags(appConfig, (flags) => ({
    ...flags,
    showBanner: false,
  }));

  expect(flags).toEqual({
    showBanner: false,
    showLogOut: false,
  });

  type tests = [
    Expect<Equal<typeof flags, { showBanner: boolean; showLogOut: boolean }>>
  ];
});
