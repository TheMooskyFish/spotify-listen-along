import { Injector, webpack } from "replugged";
import { AnyFunction } from "replugged/dist/types/util";

const inject = new Injector();

export async function start(): Promise<void> {
  const spotify = await webpack.waitForModule<{
    getActiveSocketAndDevice: AnyFunction;
  }>(webpack.filters.byProps("getActiveSocketAndDevice"));

  if (spotify) {
    inject.after(spotify, "getActiveSocketAndDevice", (_, ret) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (ret) (ret as any).socket.isPremium = true;
      return ret;
    });
  }
}

export function stop(): void {
  inject.uninjectAll();
}
