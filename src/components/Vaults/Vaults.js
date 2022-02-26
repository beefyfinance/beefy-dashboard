import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { VaultsContext } from "../Context/ContextProvider";
import { formatTvl, formatUnixToDateTime } from "../../utils/format";
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
  const appLink = getChainAppLink(chainId);
  const explorerLink = getChainExplorerLink(chainId);

  const [sortedVaults, setSortedVaults] = useState({
    vaults: vaults.sort((a,b) => Number(b.tvl) - Number(a.tvl)),
    sort: 'tvlDesc'
  });

  useEffect(() => {
    setSortedVaults({
      vaults: vaults.sort((a,b) => Number(b.tvl) - Number(a.tvl)),
      sort: 'tvlDesc'
    });
  }, [vaults]);

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{t("VaultsColumn-Vault")}</TableCell>
            <TableCell>{t("VaultsColumn-Address")}</TableCell>
            <TableCell onClick={() => sortedVaults.sort === 'tvlDesc'
              ? setSortedVaults({vaults: [...vaults].sort((a,b) => Number(a.tvl) - Number(b.tvl)), sort: 'tvlAsc'})
              : setSortedVaults({vaults: [...vaults].sort((a,b) => Number(b.tvl) - Number(a.tvl)), sort: 'tvlDesc'})}
            >
              { sortedVaults.sort === 'tvlAsc' && <i className="fa far fa-arrow-up"></i> }
              { sortedVaults.sort === 'tvlDesc' && <i className="fa far fa-arrow-down"></i> }
              TVL
            </TableCell>
            <TableCell onClick={() => sortedVaults.sort === 'lastHarvestDesc'
              ? setSortedVaults({vaults: [...vaults].sort((a,b) => Number(a.lastHarvest) - Number(b.lastHarvest)), sort: 'lastHarvestAsc'})
              : setSortedVaults({vaults: [...vaults].sort((a,b) => Number(b.lastHarvest) - Number(a.lastHarvest)), sort: 'lastHarvestDesc'})}
            >
              { sortedVaults.sort === 'lastHarvestAsc' && <i className="fa far fa-arrow-up"></i> }
              { sortedVaults.sort === 'lastHarvestDesc' && <i className="fa far fa-arrow-down"></i> }
              Last Harvest
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedVaults.vaults.map((row) => (
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
              <TableCell>
                {formatUnixToDateTime(row.lastHarvest)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
