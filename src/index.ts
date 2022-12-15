/* eslint-disable  @typescript-eslint/no-explicit-any */
import { Injector, webpack } from "replugged";
import { AnyFunction } from "replugged/dist/types/util";

const inject = new Injector();

export async function start(): Promise<void> {
  const spotify = (await webpack.waitForModule(
    webpack.filters.byProps("getActiveSocketAndDevice"),
  )) as {
    getActiveSocketAndDevice: AnyFunction;
  };

  if (spotify) {
    inject.after(spotify, "getActiveSocketAndDevice", (_, ret) => {
      if (ret) (ret as any).socket.isPremium = true;
      return ret;
    });
  }
}

export function stop(): void {
  inject.uninjectAll();
}
