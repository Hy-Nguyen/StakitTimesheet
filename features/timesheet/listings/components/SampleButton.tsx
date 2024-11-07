'use client';

export default function SampleButton({ data }: { data: any }) {
  function copyData() {
    navigator.clipboard.writeText(JSON.stringify(data));
  }
  return (
    <button onClick={copyData} className="rounded-lg border border-green-600 p-2">
      hello
    </button>
  );
}
