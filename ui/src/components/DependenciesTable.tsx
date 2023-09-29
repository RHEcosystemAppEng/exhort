import {useState} from 'react';

import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Divider,
  EmptyState,
  EmptyStateBody,
  EmptyStateHeader,
  EmptyStateIcon,
  EmptyStateVariant,
  SearchInput,
  Stack,
  StackItem,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
  ToolbarItemVariant,
  ToolbarToggleGroup,
} from '@patternfly/react-core';
import {ExpandableRowContent, Table, TableVariant, Tbody, Td, Th, Thead, Tr} from '@patternfly/react-table';
import spacing from '@patternfly/react-styles/css/utilities/Spacing/spacing';
import FilterIcon from '@patternfly/react-icons/dist/esm/icons/filter-icon';
import SearchIcon from '@patternfly/react-icons/dist/esm/icons/search-icon';


import {useAppContext} from '../App';
import {Dependency} from '../api/report';
import {useSelectionState} from '../hooks/useSelectionState';
import {useTable} from '../hooks/useTable';
import {useTableControls} from '../hooks/useTableControls';

import {ConditionalTableBody} from './TableControls/ConditionalTableBody';
import {SimplePagination} from './TableControls/SimplePagination';
import {DependencyLink} from './DependencyLink';
import {VulnerabilityScore} from './VulnerabilityScore';
import {VulnerabilityLink} from './VulnerabilityLink';
import {TransitiveDependenciesTable} from './TransitiveDependenciesTable';
import {VulnerabilitiesTable} from './VulnerabilitiesTable';

export const DependenciesTable = () => {
  const appContext = useAppContext();

  const providerName = 'snyk';
  const synkReport = appContext.report;
  const tableData = synkReport.dependencies;

  // Filters
  const [filterText, setFilterText] = useState('');

  // Rows
  const { isItemSelected: isRowExpanded, toggleItemSelected: toggleRowExpanded } =
    useSelectionState<Dependency>({
      items: tableData,
      isEqual: (a, b) => a.ref === b.ref,
    });

  const {
    page: currentPage,
    sortBy: currentSortBy,
    changePage: onPageChange,
    changeSortBy: onChangeSortBy,
  } = useTableControls();

  const { pageItems, filteredItems } = useTable({
    items: tableData,
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
        <CardTitle>Commonly Known Vulnerabilities</CardTitle>
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
          <Table isExpandable>
            <Thead>
              <Tr>
                <Th></Th>
                <Th
                  width={25}
                  sort={{
                    columnIndex: 1,
                    sortBy: { ...currentSortBy },
                    onSort: onChangeSortBy,
                  }}
                >
                  Dependency
                </Th>
                <Th>Direct</Th>
                <Th>Transitive</Th>
                <Th width={20}>Highest CVSS</Th>
                <Th width={30}>Highest Severity</Th>
              </Tr>
            </Thead>
            <ConditionalTableBody
              isNoData={filteredItems.length === 0}
              numRenderedColumns={8}
              noDataEmptyState={
                <EmptyState variant={EmptyStateVariant.sm}>
                  <EmptyStateHeader
                      icon={<EmptyStateIcon icon={SearchIcon} />}
                      titleText="No results found"
                      headingLevel="h2"
                  />
                  <EmptyStateBody>Clear all filters and try again.</EmptyStateBody>
                </EmptyState>
              }
            >
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
                      <Td>
                        <DependencyLink name={item.ref} />
                      </Td>
                      <Td>{item.issues?.length || 0}</Td>
                      <Td>
                        {item.transitive
                          .map((e) => e.issues.length)
                          .reduce((prev, current) => prev + current, 0)}
                      </Td>
                      <Td>
                        {item.highestVulnerability && (
                          <VulnerabilityScore vulnerability={item.highestVulnerability} />
                        )}
                      </Td>
                      <Td>
                        {item.highestVulnerability && (
                          <VulnerabilityLink
                            providerName={providerName}
                            vulnerability={item.highestVulnerability}
                          />
                        )}
                      </Td>
                    </Tr>
                    {isRowExpanded(item) ? (
                      <Tr isExpanded>
                        <Td />
                        <Td className={spacing.pyLg} colSpan={6}>
                          <ExpandableRowContent>
                            <Stack hasGutter>
                              {item.issues && item.issues.length > 0 && (
                                <StackItem>
                                  <VulnerabilitiesTable
                                    providerName={providerName}
                                    dependency={item}
                                    vulnerabilities={item.issues}
                                  />
                                </StackItem>
                              )}
                              {item.transitive && item.transitive.length > 0 && (
                                <StackItem>
                                  <TransitiveDependenciesTable
                                    providerName={providerName}
                                    dependency={item}
                                    transitiveDependencies={item.transitive}
                                  />
                                </StackItem>
                              )}
                            </Stack>
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
