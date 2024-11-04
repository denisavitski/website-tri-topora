import { automizer } from "automizer";

automizer({
  sourceFolder: "optimize/source",
  destinationFolder: "public",
  settings: {
    favicon: () => {
      return {
        appName: "Три Топора",
        appShortName: "Три Топора",
        appDescription: "Строительство дачных домов и коттеджей",
        destinationHtmlPath: "src/layout/Favicon.astro",
        path: "favicon",
        icons: {
          android: true,
          appleIcon: true,
          appleStartup: false,
          favicons: true,
          windows: true,
          yandex: true,
        },
      };
    },
    sprite: () => {
      return {
        removeFill: true,
        removeStroke: true,
      };
    },
  },
});
