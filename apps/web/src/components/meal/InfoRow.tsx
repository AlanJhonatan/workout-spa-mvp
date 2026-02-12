export const InfoRow = ({ icon, label, value, unit }: { icon: React.ReactNode, label: string, value: string | number, unit: string }) => (
  <div className="flex items-center gap-2 text-sm text-neutral-600">
    {icon}
    <span>{label}:</span>
    <span className="font-semibold text-neutral-800">{value}{unit}</span>
  </div>
);