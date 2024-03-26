import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ASSET_CLASSES } from "@/misc/constants";
import { Commitment } from "@/misc/types";

export interface AssetTableProps {
  commitments: Commitment[];
}

export const AssetTable = ({ commitments }: AssetTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Class</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Currency</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {commitments.map((commitment) => (
          <TableRow key={commitment.id} id="__commitment-row">
            <TableCell>{commitment.id}</TableCell>
            <TableCell>
              {commitment.asset_class.toUpperCase()} (
              {ASSET_CLASSES[commitment.asset_class.toUpperCase()]})
            </TableCell>
            <TableCell>{commitment.amount}</TableCell>
            <TableCell>{commitment.currency}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
