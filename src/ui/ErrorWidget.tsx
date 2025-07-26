import { useAppStore } from '@/state/appStore';

export default function ErrorWidget() {
  const { globalError } = useAppStore();

  return (
    <div className="flex flex-col gap-4 w-1/2 items-center overflow-y-auto">
      <div className="flex flex-col gap-4 w-3/6 rounded-md border border-red-500 p-4 items-center justify-center">
        <h1>Error</h1>
        <p>{globalError}</p>
      </div>
    </div>
  );
}
