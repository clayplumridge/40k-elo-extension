type TeardownFn = () => void;

export function urlWatcher(
  onChange: (newValue: string) => TeardownFn | undefined
) {
  let lastKnownValue: string | undefined = undefined;
  let teardownFn: TeardownFn | undefined = undefined;

  const handleNavigate = (ev: NavigateEvent) => {
    if (location.href !== lastKnownValue) {
      lastKnownValue = ev.destination.url;
      teardownFn && teardownFn();
      teardownFn = onChange(lastKnownValue);
    }
  }

  navigation.addEventListener("navigate", handleNavigate);
  return () => navigation.removeEventListener("navigate", handleNavigate);
}
