import React, { useState } from 'react';

import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  DescriptionList,
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTerm,
  Divider,
  Label,
  List,
  ListItem,
  SearchInput,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
  ToolbarItemVariant,
  ToolbarToggleGroup,
} from '@patternfly/react-core';
import { ExpandableRowContent, Table, Tbody, Td, Th, Thead, Tr } from '@patternfly/react-table';
import spacing from '@patternfly/react-styles/css/utilities/Spacing/spacing';
import FilterIcon from '@patternfly/react-icons/dist/esm/icons/filter-icon';

import { useSelectionState } from '../hooks/useSelectionState';

import { useAppContext } from '../App';
import { Dependency } from '../api/sbom';
import { useTable } from '../hooks/useTable';
import { useTableControls } from '../hooks/useTableControls';
import { ConditionalTableBody } from './TableControls/ConditionalTableBody';
import { SimplePagination } from './TableControls/SimplePagination';

interface DependenciesProps {}

export const Dependencies: React.FC<DependenciesProps> = () => {
  const sbom = useAppContext();

  // Filters
  const [filterText, setFilterText] = useState('');

  // Rows
  const { isItemSelected: isRowExpanded, toggleItemSelected: toggleRowExpanded } =
    useSelectionState<Dependency>({
      items: sbom.report.dependencies,
      isEqual: (a, b) => a.ref === b.ref,
    });

  const {
    page: currentPage,
    sortBy: currentSortBy,
    changePage: onPageChange,
    changeSortBy: onChangeSortBy,
  } = useTableControls();

  const { pageItems, filteredItems } = useTable({
    items: sbom.report.dependencies,
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dependencies</CardTitle>
      </CardHeader>
      <Divider />
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
                  count={filteredItems.length}
                  params={currentPage}
                  onChange={onPageChange}
                />
              </ToolbarItem>
            </ToolbarContent>
          </Toolbar>
          <Table isExpandable>
            <Thead>
              <Tr>
                <Th></Th>
                <Th
                  sort={{
                    columnIndex: 1,
                    sortBy: { ...currentSortBy },
                    onSort: onChangeSortBy,
                  }}
                >
                  Ref
                </Th>
                <Th>Recomendation</Th>
              </Tr>
            </Thead>
            <ConditionalTableBody isNoData={filteredItems.length === 0} numRenderedColumns={8}>
              {pageItems?.map((item, rowIndex) => {
                return (
                  <Tbody key={rowIndex} isExpanded={isRowExpanded(item)}>
                    <Tr>
                      <Td
                        expand={{
                          rowIndex,
                          isExpanded: isRowExpanded(item),
                          onToggle: () => toggleRowExpanded(item),
                        }}
                      />
                      <Td>{item.ref}</Td>
                      <Td>{item.recommendation}</Td>
                    </Tr>
                    {isRowExpanded(item) ? (
                      <Tr isExpanded>
                        <Td />
                        <Td className={spacing.pyLg}>
                          <ExpandableRowContent>
                            <Card>
                              <CardHeader>
                                <CardTitle>Highest vulnerability</CardTitle>
                              </CardHeader>
                              <CardBody>
                                <DescriptionList columnModifier={{ lg: '3Col' }}>
                                  <DescriptionListGroup>
                                    <DescriptionListTerm>Title</DescriptionListTerm>
                                    <DescriptionListDescription>
                                      {item.highestVulnerability.title}
                                    </DescriptionListDescription>
                                  </DescriptionListGroup>
                                  <DescriptionListGroup>
                                    <DescriptionListTerm>Source</DescriptionListTerm>
                                    <DescriptionListDescription>
                                      {item.highestVulnerability.source}
                                    </DescriptionListDescription>
                                  </DescriptionListGroup>
                                  <DescriptionListGroup>
                                    <DescriptionListTerm>CVEs</DescriptionListTerm>
                                    <DescriptionListDescription>
                                      <List>
                                        {item.highestVulnerability.cves.map((elem, index) => (
                                          <ListItem key={index}>{elem}</ListItem>
                                        ))}
                                      </List>
                                    </DescriptionListDescription>
                                  </DescriptionListGroup>
                                  <DescriptionListGroup>
                                    <DescriptionListTerm>Severity</DescriptionListTerm>
                                    <DescriptionListDescription>
                                      {item.highestVulnerability.severity}{' '}
                                      <Label>{item.highestVulnerability.cvssScore}</Label>
                                    </DescriptionListDescription>
                                  </DescriptionListGroup>
                                </DescriptionList>
                              </CardBody>
                            </Card>
                          </ExpandableRowContent>
                        </Td>
                      </Tr>
                    ) : null}
                  </Tbody>
                );
              })}
            </ConditionalTableBody>
          </Table>
          <SimplePagination
            count={filteredItems.length}
            params={currentPage}
            onChange={onPageChange}
            isTop={true}
          />
        </div>
      </CardBody>
    </Card>
  );
};
