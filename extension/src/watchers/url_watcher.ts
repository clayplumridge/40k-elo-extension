type TeardownFn = () => void;

export function urlWatcher(
  onChange: (newValue: string) => TeardownFn | undefined
) {
  let teardownFn: TeardownFn | undefined = onChange(location.href);

  const handleNavigate = (ev: NavigateEvent) => {
    teardownFn && teardownFn();
    teardownFn = onChange(ev.destination.url);
  }

  navigation.addEventListener("navigate", handleNavigate);
  return () => navigation.removeEventListener("navigate", handleNavigate);
}
