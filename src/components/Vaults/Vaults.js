import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { VaultsContext } from "../Context/ContextProvider";
import { formatTvl } from "../../utils/format";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  ContractAddress,
  ContractTVL
} from "./style";
import {getChainAppLink, getChainExplorerLink} from '../../utils/chainHelpers';

export default function BasicTable() {
  const { vaults, chainId } = useContext(VaultsContext);
  const { t } = useTranslation();
  const sortedVaults = vaults.sort((a, b) => Number(b.tvl) - Number(a.tvl));
  const appLink = getChainAppLink(chainId);
  const explorerLink = getChainExplorerLink(chainId);

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{t("VaultsColumn-Vault")}</TableCell>
            <TableCell>{t("VaultsColumn-Address")}</TableCell>
            <TableCell>TVL</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedVaults.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                <ContractAddress href={`${appLink}/vault/${row.id}`} target="_blank"
                                 rel="noreferrer">{row.name}</ContractAddress>
                <div>{`${row.tokenDescription} / ${row.platform}`}</div>
              </TableCell>
              <TableCell>
                <ContractAddress href={`${explorerLink}/address/${row.earnContractAddress}`}
                                 target="_blank"
                                 rel="noreferrer">{row.earnContractAddress}</ContractAddress>
              </TableCell>
              <TableCell>
                <ContractTVL>{formatTvl(row.tvl)}</ContractTVL>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
