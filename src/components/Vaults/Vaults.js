import React, { useContext } from 'react';

import { VaultsContext } from "../Context/ContextProvider";
import { formatTvl } from '../../utils/format';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, ContractAddress, ContractTVL } from './style';

export default function BasicTable() {
	const { vaults } = useContext(VaultsContext);
	const sortedVaults = vaults.sort((a, b) =>  Number(a.tvl) < Number(b.tvl));

	return (
		<TableContainer>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Vault </TableCell>
						<TableCell>Address</TableCell>
						<TableCell>TVL</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{sortedVaults.map((row) => (
						<TableRow key={row.id}>
							<TableCell>{row.name}</TableCell>
							<TableCell>
								<ContractAddress href={`https://bscscan.com/address/${row.contract}`} target="_blank" rel="noreferrer">{row.contract}</ContractAddress>
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
