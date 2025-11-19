type TeardownFn = () => void;

export function urlWatcher(
  onChange: (newValue: string) => TeardownFn | undefined
) {
  let lastKnownValue: string | undefined = undefined;
  let teardownFn: TeardownFn | undefined = undefined;

  setInterval(() => {
    if (location.href !== lastKnownValue) {
      lastKnownValue = location.href;
      teardownFn && teardownFn();
      teardownFn = onChange(lastKnownValue);
    }
  }, 100);
}
