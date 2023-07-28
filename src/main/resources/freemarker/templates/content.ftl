<script type="text/babel">
      "use strict";

      const TableBasic = () => {
        const repositories = [
          {
            name: "one",
            branches: "two",
            prs: "three",
            workspaces: "four",
            lastCommit: "five",
          },
          {
            name: "one - 2",
            branches: null,
            prs: null,
            workspaces: "four - 2",
            lastCommit: "five - 2",
          },
          {
            name: "one - 3",
            branches: "two - 3",
            prs: "three - 3",
            workspaces: "four - 3",
            lastCommit: "five - 3",
          },
        ];
        const columnNames = {
          name: "Repositories",
          branches: "Branches",
          prs: "Pull requests",
          workspaces: "Workspaces",
          lastCommit: "Last commit",
        };
        const [exampleChoice, setExampleChoice] = React.useState("default");
        const onExampleTypeChange = (event, _isSelected) => {
          const id = event.currentTarget.id;
          setExampleChoice(id);
        };
        return (
          <React.Fragment>
            <PatternFlyTable.Table
              aria-label="Simple table"
              variant={exampleChoice !== "default" ? "compact" : undefined}
              borders={exampleChoice !== "compactBorderless"}
            >
              <PatternFlyTable.Caption>
                Simple table using composable components
              </PatternFlyTable.Caption>
              <PatternFlyTable.Thead>
                <PatternFlyTable.Tr>
                  <PatternFlyTable.Th>{columnNames.name}</PatternFlyTable.Th>
                  <PatternFlyTable.Th>
                    {columnNames.branches}
                  </PatternFlyTable.Th>
                  <PatternFlyTable.Th>{columnNames.prs}</PatternFlyTable.Th>
                  <PatternFlyTable.Th>
                    {columnNames.workspaces}
                  </PatternFlyTable.Th>
                  <PatternFlyTable.Th>
                    {columnNames.lastCommit}
                  </PatternFlyTable.Th>
                </PatternFlyTable.Tr>
              </PatternFlyTable.Thead>
              <PatternFlyTable.Tbody>
                {repositories.map((repo) => (
                  <PatternFlyTable.Tr key={repo.name}>
                    <PatternFlyTable.Td dataLabel={columnNames.name}>
                      {repo.name}
                    </PatternFlyTable.Td>
                    <PatternFlyTable.Td dataLabel={columnNames.branches}>
                      {repo.branches}
                    </PatternFlyTable.Td>
                    <PatternFlyTable.Td dataLabel={columnNames.prs}>
                      {repo.prs}
                    </PatternFlyTable.Td>
                    <PatternFlyTable.Td dataLabel={columnNames.workspaces}>
                      {repo.workspaces}
                    </PatternFlyTable.Td>
                    <PatternFlyTable.Td dataLabel={columnNames.lastCommit}>
                      {repo.lastCommit}
                    </PatternFlyTable.Td>
                  </PatternFlyTable.Tr>
                ))}
              </PatternFlyTable.Tbody>
            </PatternFlyTable.Table>
          </React.Fragment>
        );
      };

      const Report = () => {
        const [liked, setLiked] = React.useState(false);

        if (liked) {
          return (
            <PatternFlyReact.Alert title="Cool!" variant="info">
              Wowza
            </PatternFlyReact.Alert>
          );
        }

        const onClick = () => setLiked(true);
        return (
          <React.Fragment>
            <TableBasic />
            <PatternFlyReact.Button onClick={onClick}>
              Like me!
            </PatternFlyReact.Button>
          </React.Fragment>
        );
      };

      const container = document.getElementById("root");
      const root = ReactDOM.createRoot(container);
      root.render(<Report />);
    </script>