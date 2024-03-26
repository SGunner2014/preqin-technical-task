import { AssetClassPicker } from "@/components/AssetClassPicker";
import { AssetTable } from "@/components/AssetTable";
import { Container } from "@/components/container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { api } from "@/misc/api";
import { INITIAL_ASSET_CLASS } from "@/misc/constants";
import { Firm } from "@/misc/types";
import { formatDate } from "@/misc/utils";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const InvestorPage = () => {
  const router = useRouter();
  const [firm, setFirm] = useState<Firm>();
  const [selectedAsset, setSelectedAsset] =
    useState<string>(INITIAL_ASSET_CLASS);
  const [commitments, setCommitments] = useState([]);

  useEffect(() => {
    const { investorId } = router.query as { investorId: string };

    if (investorId) {
      // No way to get specific investor, so we filter the list of all investors
      api.get("/investors").then((res) => {
        const firm = res.data.find(
          (firm: Firm) => firm.firm_id === Number.parseInt(investorId),
        );
        setFirm(firm);
      });
    }
  }, [router.query]);

  useEffect(() => {
    console.log("Ran");

    if (firm) {
      api
        .get(
          `/investor/commitment/${selectedAsset.toLowerCase()}/${firm.firm_id}`,
        )
        .then((res) => {
          setCommitments(res.data);
        });
    }
  }, [firm, selectedAsset]);

  return (
    <div className="mt-16">
      <Container>
        <div className="grid grid-cols-2 gap-4">
          {firm && (
            <Card>
              <CardHeader>
                <CardTitle id={`__investor-${firm.firm_id}-title`}>
                  {firm.firm_name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Property</TableHead>
                      <TableHead>Value</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Firm ID</TableCell>
                      <TableCell>{firm.firm_id}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Address</TableCell>
                      <TableCell>{firm.address}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>City</TableCell>
                      <TableCell>{firm.city}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Country</TableCell>
                      <TableCell>{firm.country}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Date Added</TableCell>
                      <TableCell>{formatDate(firm.date_added)}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
          {commitments && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Commitments</CardTitle>
                <AssetClassPicker
                  defaultValue={INITIAL_ASSET_CLASS}
                  onChange={(assetClass) => setSelectedAsset(assetClass)}
                />
              </CardHeader>
              <CardContent className="max-h-[300px] overflow-y-scroll">
                <AssetTable commitments={commitments} />
              </CardContent>
            </Card>
          )}
        </div>
      </Container>
    </div>
  );
};

export default InvestorPage;
