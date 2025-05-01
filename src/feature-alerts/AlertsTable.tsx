import { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import {
  getAlertColorMap,
  getFormatedNumber,
  OrderMessage,
} from "@crypto-stream/utils";
import { useTranslation } from "react-i18next";

interface AlertsTableProps {
  alerts: OrderMessage[];
}

interface Column {
  id: string;
  label: string;
  render: (alert: OrderMessage) => React.ReactNode;
}

const ROWS_PER_PAGE = 10;

/**
 *
 * @description Alerts table
 * @param alerts as OrderMessage[]
 */
export const AlertsTable = ({ alerts }: AlertsTableProps) => {
  const [page, setPage] = useState(0);
  const { t } = useTranslation();

  const handleChangePage = (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const alertsToShow = alerts.slice(
    page * ROWS_PER_PAGE,
    page * ROWS_PER_PAGE + ROWS_PER_PAGE
  );

  const columns: Column[] = [
    {
      id: "price",
      label: `${t("price")} ($)`,
      render: (alert) => getFormatedNumber(alert.price),
    },
    {
      id: "quantity",
      label: `${t("quantity")} (BTC)`,
      render: (alert) => getFormatedNumber(alert.quantity),
    },
    {
      id: "total",
      label: `${t("total")} ($)`,
      render: (alert) => getFormatedNumber(alert.price * alert.quantity),
    },
    {
      id: "alertMessage",
      label: `${t("alertMessage")}`,
      render: (alert) => alert.alertMessage,
    },
  ];

  return (
    <Paper>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id}>{column.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {alertsToShow.length > 0 ? (
              alertsToShow.map((alert) => (
                <TableRow hover key={alert.ccseq}>
                  {columns.map((column) => {
                    const cellColor = alert.alertMessage
                      ? getAlertColorMap(alert.alertMessage)
                      : null;

                    return (
                      <TableCell sx={{ color: cellColor }} key={column.id}>
                        {column.render(alert)}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  {t("noAlertsInfo")}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[ROWS_PER_PAGE]}
        component="div"
        count={alerts.length}
        rowsPerPage={ROWS_PER_PAGE}
        page={page}
        onPageChange={handleChangePage}
      />
    </Paper>
  );
};
