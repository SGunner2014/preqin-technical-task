import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ASSET_CLASSES } from "@/misc/constants";

export interface CommitmentsPickerProps {
  onChange: (selectedCommitment: string) => void;
  defaultValue?: string;
}

export const AssetClassPicker = ({
  onChange,
  defaultValue,
}: CommitmentsPickerProps) => {
  return (
    <Select
      defaultValue={defaultValue}
      onValueChange={(value) => onChange(value)}
    >
      <SelectTrigger className="w-[220px]">
        <SelectValue placeholder="Select asset class" />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(ASSET_CLASSES).map(([value, name]) => (
          <SelectItem value={value} key={value} onClick={() => onChange(value)}>
            {name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
