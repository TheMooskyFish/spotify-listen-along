import { Injector, webpack } from "replugged";

const inject = new Injector();

export async function start(): Promise<void> {
  const spotify = await webpack.waitForModule<{
    getActiveSocketAndDevice: () => void;
  }>(webpack.filters.byProps("getActiveSocketAndDevice"));
  interface spotifysocket {
    isPremium: boolean;
  }
  if (spotify) {
    inject.after(spotify, "getActiveSocketAndDevice", (_, ret: { socket: spotifysocket }) => {
      if (ret) ret.socket.isPremium = true;
      return ret;
    });
  }
}

export function stop(): void {
  inject.uninjectAll();
}
