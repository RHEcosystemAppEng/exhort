import React, { useState } from 'react';

import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Divider,
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  EmptyStateVariant, Flex, FlexItem, Icon,
  SearchInput,
  Stack,
  StackItem,
  Title,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
  ToolbarItemVariant,
  ToolbarToggleGroup,
} from '@patternfly/react-core';
import {ExpandableRowContent, Table, Tbody, Td, TdProps, Th, Thead, Tr} from '@patternfly/react-table';
import spacing from '@patternfly/react-styles/css/utilities/Spacing/spacing';
import FilterIcon from '@patternfly/react-icons/dist/esm/icons/filter-icon';
import CubesIcon from '@patternfly/react-icons/dist/esm/icons/cubes-icon';

import { useAppContext } from '../App';
import {Dependency, Provider} from '../api/report';
import { useSelectionState } from '../hooks/useSelectionState';
import { useTable } from '../hooks/useTable';
import { useTableControls } from '../hooks/useTableControls';

import { ConditionalTableBody } from './TableControls/ConditionalTableBody';
import { SimplePagination } from './TableControls/SimplePagination';
import { DependencyLink } from './DependencyLink';
import { VulnerabilityScore } from './VulnerabilityScore';
import { VulnerabilityLink } from './VulnerabilityLink';
import { RemediationsCount } from './RemediationsCount';
import { TransitiveDependenciesTable } from './TransitiveDependenciesTable';
import { VulnerabilitiesTable } from './VulnerabilitiesTable';
import { extractDependencyVersion } from '../utils/utils';
import ShieldAltIcon from "@patternfly/react-icons/dist/esm/icons/shield-alt-icon";

export const DepCompoundTable = ({ name, provider }: { name: string; provider: Provider }) => {
  const appContext = useAppContext();
  // Filters
  const [filterText, setFilterText] = useState('');

  // Rows
  const { isItemSelected: isRowExpanded, toggleItemSelected: toggleRowExpanded } =
    useSelectionState<Dependency>({
      items: provider.dependencies,
      isEqual: (a, b) => a.ref === b.ref,
    });

  const {
    page: currentPage,
    sortBy: currentSortBy,
    changePage: onPageChange,
    changeSortBy: onChangeSortBy,
  } = useTableControls();

  const { pageItems, filteredItems } = useTable({
    items: provider.dependencies,
    currentPage: currentPage,
    currentSortBy: currentSortBy,
    compareToByColumn: (a: Dependency, b: Dependency, columnIndex?: number) => {
      switch (columnIndex) {
        case 1:
          return a.ref.localeCompare(b.ref);
        default:
          return 0;
      }
    },
    filterItem: (item) => {
      let isFilterTextFilterCompliant = true;
      if (filterText && filterText.trim().length > 0) {
        isFilterTextFilterCompliant =
          item.ref.toLowerCase().indexOf(filterText.toLowerCase()) !== -1;
      }

      return isFilterTextFilterCompliant;
    },
  });

  interface Repository {
    name: string;
    version: number;
    direct: number;
    transitive: number;
    rhRemediation: string;
  }

    const columnNames = {
      name: 'Dependency Name',
      version: 'Current Version',
      direct: 'Direct Vulnerabilities',
      transitive: 'Transitive Vulnerabilities',
      rhRemediation: 'Red Hat Remediation available'
    };
    type ColumnKey = keyof typeof columnNames;

    // In this example, expanded cells are tracked by the repo and property names from each row. This could be any pair of unique identifiers.
    // This is to prevent state from being based on row and column order index in case we later add sorting and rearranging columns.
    // Note that this behavior is very similar to selection state.
    const [expandedCells, setExpandedCells] = React.useState<Record<string, ColumnKey>>({
      'siemur/test-space': 'name' // Default to the first cell of the first row being expanded
    });
    const setCellExpanded = (repo: Dependency, columnKey: ColumnKey, isExpanding = true) => {
      const newExpandedCells = { ...expandedCells };
      if (isExpanding) {
        newExpandedCells[repo.ref] = columnKey;
      } else {
        delete newExpandedCells[repo.ref];
      }
      setExpandedCells(newExpandedCells);
    };
    const compoundExpandParams = (
        dependency: Dependency,
        columnKey: ColumnKey,
        rowIndex: number,
        columnIndex: number
    ): TdProps['compoundExpand'] => ({
      isExpanded: expandedCells[dependency.ref] === columnKey,
      onToggle: () => setCellExpanded(dependency, columnKey, expandedCells[dependency.ref] !== columnKey),
      expandId: 'compound-expandable-example',
      rowIndex,
      columnIndex
    });

  return (
    <Card>
      <CardBody>
        <div
          style={{
            backgroundColor: 'var(--pf-v5-global--BackgroundColor--100)',
          }}
        >
          <Toolbar>
            <ToolbarContent>
              <ToolbarToggleGroup toggleIcon={<FilterIcon />} breakpoint="xl">
                <ToolbarItem variant="search-filter">
                  <SearchInput
                    style={{ width: '250px' }}
                    placeholder="Filter by Dependency name"
                    value={filterText}
                    onChange={(_, value) => setFilterText(value)}
                    onClear={() => setFilterText('')}
                  />
                </ToolbarItem>
              </ToolbarToggleGroup>
              <ToolbarItem
                variant={ToolbarItemVariant.pagination}
                align={{ default: 'alignRight' }}
              >
                <SimplePagination
                  isTop={true}
                  count={filteredItems.length}
                  params={currentPage}
                  onChange={onPageChange}
                />
              </ToolbarItem>
            </ToolbarContent>
          </Toolbar>
          <Table aria-label="Compound expandable table">
            <Thead>
              <Tr>
                <Th>{columnNames.name}</Th>
                <Th>{columnNames.version}</Th>
                <Th>{columnNames.direct}</Th>
                <Th>{columnNames.transitive}</Th>
                <Th>{columnNames.rhRemediation}</Th>
                <Th />
              </Tr>
            </Thead>
            {pageItems?.map((item, rowIndex) => {
              const expandedCellKey = expandedCells[item.ref];
              const isRowExpanded = !!expandedCellKey;
              return (
                  <Tbody key={item.ref} isExpanded={isRowExpanded}>
                    <Tr>
                      <Td width={35} dataLabel={columnNames.name} component="th">
                        <DependencyLink name={item.ref} />
                      </Td>
                      <Td
                          width={15}
                          dataLabel={columnNames.version}
                      >
                        {extractDependencyVersion(item.ref)}
                      </Td>
                      <Td
                          width={15}
                          dataLabel={columnNames.direct}
                          compoundExpand={compoundExpandParams(item, 'direct', rowIndex, 2)}
                      >
                        {(item.issues?.length )? (
                            <Flex>
                            <FlexItem>{item.issues?.length}</FlexItem>
                            <Divider
                                orientation={{
                                  default: 'vertical'
                                }}
                            />
                              <FlexItem>
                                <Icon isInline status="danger">
                                  <ShieldAltIcon />
                                </Icon>
                                <Icon isInline status="warning">
                                  <ShieldAltIcon />
                                </Icon>
                                <Icon isInline status="custom">
                                  <ShieldAltIcon />
                                </Icon>
                                <Icon isInline status="info">
                                  <ShieldAltIcon />
                                </Icon>
                              </FlexItem>
                          </Flex>
                        ) : 0}
                        {/*{item.issues?.length || 0}*/}
                      </Td>
                      <Td
                          width={15}
                          dataLabel={columnNames.transitive}
                          compoundExpand={compoundExpandParams(item, 'transitive', rowIndex, 3)}
                      >
                        {(item.transitive.length )? (
                            <Flex>
                              <FlexItem>{item.transitive
                                  .map((e) => e.issues.length)
                                  .reduce((prev, current) =>
                                      prev + current)}</FlexItem>
                              <Divider
                                  orientation={{
                                    default: 'vertical'
                                  }}
                              />
                              <FlexItem>
                                <Icon isInline >
                                  <ShieldAltIcon />
                                </Icon>
                                <Icon isInline >
                                  <ShieldAltIcon />
                                </Icon>
                                <Icon isInline>
                                  <ShieldAltIcon />
                                </Icon>
                                <Icon isInline >
                                  <ShieldAltIcon style={{fill: "green"}}/>
                                </Icon>
                              </FlexItem>
                            </Flex>
                        ) : 0}

                        {/*{item.transitive*/}
                        {/*    .map((e) => e.issues.length)*/}
                        {/*    .reduce((prev, current) =>*/}
                        {/*        prev + current, 0)}*/}
                      </Td>
                      <Td width={15}
                          dataLabel={columnNames.rhRemediation}
                      >
                        <RemediationsCount dependency={item} />
                      </Td>
                    </Tr>
                    {isRowExpanded ? (
                        <Tr isExpanded={isRowExpanded}>
                          <Td dataLabel={columnNames[expandedCellKey]} noPadding colSpan={6}>
                            <ExpandableRowContent>
                              <div className="pf-v5-u-m-md">
                                {(expandedCellKey === 'direct' && item.issues && item.issues.length > 0 )? (
                                    // Content for direct column
                                    <VulnerabilitiesTable
                                        providerName={provider.status.name}
                                        dependency={item}
                                        vulnerabilities={item.issues}
                                    />
                                ) : (expandedCellKey === 'transitive' && item.transitive && item.transitive.length > 0 )? (
                                    // Content for transitive column
                                    <TransitiveDependenciesTable
                                        providerName={provider.status.name}
                                        dependency={item}
                                        transitiveDependencies={item.transitive}
                                    />
                                ) : null}
                              </div>
                            </ExpandableRowContent>
                          </Td>
                        </Tr>
                    ) : (null)
                    }
                  </Tbody>
              );
            })}
          </Table>

          <SimplePagination
            isTop={false}
            count={filteredItems.length}
            params={currentPage}
            onChange={onPageChange}
          />
        </div>
      </CardBody>
    </Card>
  );
};
