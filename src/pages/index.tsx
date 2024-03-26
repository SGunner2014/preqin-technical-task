import { useEffect, useState } from "react";
import Link from "next/link";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { api } from "@/misc/api";
import { Firm } from "@/misc/types";
import { Container } from "@/components/container";
import { formatDate } from "@/misc/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  const [firms, setFirms] = useState<Firm[]>([]);

  useEffect(() => {
    api.get("/investors").then((res) => {
      setFirms(res.data);
    });
  }, []);

  return (
    <div className="mt-16">
      <Container>
        <Card>
          <CardHeader>
            <CardTitle>Investors</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Firm ID</TableHead>
                  <TableHead>Firm Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date Added</TableHead>
                  <TableHead>Address</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {firms.map((firm) => (
                  <TableRow key={firm.firm_id}>
                    <TableCell>
                      <Link href={`/investors/${firm.firm_id}`}>
                        <p className="text-blue-500 hover:text-blue-700">
                          {firm.firm_id}
                        </p>
                      </Link>
                    </TableCell>
                    <TableCell>{firm.firm_name}</TableCell>
                    <TableCell>{firm.firm_type}</TableCell>
                    <TableCell>{formatDate(firm.date_added)}</TableCell>
                    <TableCell>{firm.address}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}
